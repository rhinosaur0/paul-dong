import React, { useEffect, useState, useRef } from 'react';
import { useConnections } from '../context/ConnectionContext';

interface ConnectionProps {
  from: string;
  to: string;
  color?: string;
  thickness?: number;
  zIndex?: number;
  animated?: boolean;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  midX?: number;
  midY?: number;
}

const Connection: React.FC<ConnectionProps> = ({
  from,
  to,
  color = '#0066cc',
  thickness = 2,
  zIndex = 50,
  animated = true
}) => {
  const { nodes } = useConnections();
  const [line, setLine] = useState<Line | null>(null);
  const rafRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const polygonRef = useRef<SVGPolygonElement>(null);
  
  // Calculate line position between two elements
  useEffect(() => {
    // Use direct DOM manipulation for maximum performance
    const updatePositionDirect = () => {
      const sourceNode = nodes[from];
      const targetNode = nodes[to];
      
      if (!sourceNode || !targetNode || !pathRef.current || !polygonRef.current) return;
      
      const viewport = document.querySelector('.viewport');
      if (!viewport) return;
      const sourceRect = sourceNode.getBoundingClientRect();
      const targetRect = targetNode.getBoundingClientRect();
      const viewportRect = viewport.getBoundingClientRect();
      
      // Determine if target is to the right or left of source
      const isTargetToRight = targetRect.left > sourceRect.right;
      const isTargetToLeft = targetRect.right < sourceRect.left;
      
      // Calculate connection points from the edges
      let sourceX, sourceY, targetX, targetY;
      
      // Determine edge points based on relative positions
      if (isTargetToRight) {
        sourceX = sourceRect.right - viewportRect.left; // Right edge of source
        sourceY = sourceRect.top + sourceRect.height / 2;
        targetX = targetRect.left - viewportRect.left ; // Left edge of target witpx offset
        targetY = targetRect.top + targetRect.height / 2;
      } else if (isTargetToLeft) {
        sourceX = sourceRect.left - viewportRect.left; // Left edge of source
        sourceY = sourceRect.top + sourceRect.height / 2;
        targetX = targetRect.right - viewportRect.left ; // Right edge of target witpx offset
        targetY = targetRect.top + targetRect.height / 2;
      } else {
        sourceX = sourceRect.left - viewportRect.left;
        sourceY = sourceRect.top + sourceRect.height / 2; 
        targetX = targetRect.left - viewportRect.left ;
        targetY = targetRect.top + targetRect.height / 2; // Top edge of target witpx offset
      }
      
      // Calculate the midpoint for the path with an offset
      let midX1, midY1, midX2, midY2;
      
      if (isTargetToRight || isTargetToLeft) {
        // Use a point halfway between source and target for smoother curves
        midX1 = sourceX + (targetX - sourceX) * 0.33; // First control point at 33%
        midY1 = sourceY;
        midX2 = sourceX + (targetX - sourceX) * 0.67; // Second control point at 67%
        midY2 = targetY;
      } else {
        // For vertical connections, create outward control points
        const horizontalDistance = Math.abs(sourceX - targetX);
        const outwardOffset = Math.max(400, horizontalDistance * 1.5); // Create significant outward curve
        
        // First control point - go outward from source
        midX1 = sourceX <= targetX ? sourceX - outwardOffset : sourceX + outwardOffset;
        midY1 = sourceY + (targetY - sourceY) * 0.33;
        
        // Second control point - come inward to target
        midX2 = targetX <= sourceX ? targetX - outwardOffset : targetX + outwardOffset;
        midY2 = sourceY + (targetY - sourceY) * 0.67;
      }
      
      // Create the path for the connection with rounder curves
      // Increase the curvature radius for smoother corners
      const curveRadius = 30; // Increased from 15 for rounder corners
      
      // Calculate control points for the curves
      let pathData;
      
      // Start path at source point
      pathData = `M ${sourceX} ${sourceY} `;
      
      // Create a smooth cubic bezier curve for the entire path
      if (isTargetToRight || isTargetToLeft) {
        // For horizontal connections, use a smooth S-curve
        pathData += `C ${midX1} ${midY1}, ${midX2} ${midY2}, ${targetX} ${targetY}`;
      } else {
        // For vertical connections, use the outward-extending curve
        pathData += `C ${midX1} ${midY1}, ${midX2} ${midY2}, ${targetX} ${targetY}`;
      }
      
      // Update DOM directly instead of using React state
      pathRef.current.setAttribute('d', pathData);
      
      // Update the arrow position and orientation
      let angle;
      if (isTargetToLeft) {
        angle = 180; // Pointing left
      } else if (isTargetToRight) {
        angle = 0; // Pointing right
      } else {
        angle = 80
      }
      
      polygonRef.current.setAttribute('transform', 
        `translate(${targetX},${targetY}) rotate(${angle})`
      );
      
      // Also update React state (less frequently) to keep React in sync
      const now = performance.now();
      if (now - lastUpdateRef.current > 100) { // Only update React state every 100ms
        setLine({
          x1: sourceX,
          y1: sourceY,
          x2: targetX,
          y2: targetY,
          midX: midX1,
          midY: midY1
        });
        lastUpdateRef.current = now;
      }
    };
    
    // Initial position calculation
    const initialUpdate = () => {
      updatePositionDirect();
    };
    
    // Initial setup
    initialUpdate();
    
    // Use Intersection Observer API for more efficient tracking of element visibility
    const observer = new IntersectionObserver(() => {
      updatePositionDirect();
    }, { threshold: [0, 0.1, 0.9, 1.0] });
    
    if (nodes[from]) observer.observe(nodes[from]);
    if (nodes[to]) observer.observe(nodes[to]);
    
    // Add event listeners with passive flag for better performance
    window.addEventListener('scroll', updatePositionDirect, { passive: true });
    window.addEventListener('resize', updatePositionDirect, { passive: true });
    document.addEventListener('mousemove', updatePositionDirect, { passive: true });
    
    // Use high frequency requestAnimationFrame loop for ultra-smooth updates
    const loop = () => {
      updatePositionDirect();
      rafRef.current = requestAnimationFrame(loop);
    };
    
    rafRef.current = requestAnimationFrame(loop);
    
    // Clean up all listeners
    return () => {
      window.removeEventListener('scroll', updatePositionDirect);
      window.removeEventListener('resize', updatePositionDirect);
      document.removeEventListener('mousemove', updatePositionDirect);
      
      if (nodes[from]) observer.unobserve(nodes[from]);
      if (nodes[to]) observer.unobserve(nodes[to]);
      observer.disconnect();
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [from, to, nodes]);
  
  // Create a baseline SVG with refs if line is null
  if (!line) {
    return (
      <svg 
        ref={svgRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex
        }}
      >
        <path
          ref={pathRef}
          stroke={color}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray={animated ? "5,5" : "none"}
        />
        <polygon 
          ref={polygonRef}
          points="-8,-4 0,0 -8,4"
          fill={color}
        />
      </svg>
    );
  }
  
  // Main render with line values - we use the path attribute from the DOM
  // since it contains the full path with multiple segments
  return (
    <svg 
      ref={svgRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex,
        willChange: 'contents', // Hint for browser optimization
      }}
    >
      <path
        ref={pathRef}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
        strokeDasharray={animated ? "5,5" : "none"}
        strokeDashoffset={animated ? "0" : undefined}
        style={animated ? {
          animation: 'dashAnimation 0.5s linear infinite',
        } : undefined}
      />
      <polygon 
        ref={polygonRef}
        points="-8,-4 0,0 -8,4"
        fill={color}
      />
    </svg>
  );
};

export default Connection;