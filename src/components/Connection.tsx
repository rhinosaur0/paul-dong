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
      
      const sourceRect = sourceNode.getBoundingClientRect();
      const targetRect = targetNode.getBoundingClientRect();
      
      // Determine if target is to the right or left of source
      const isTargetToRight = targetRect.left > sourceRect.right;
      const isTargetToLeft = targetRect.right < sourceRect.left;
      const isTargetAbove = targetRect.bottom < sourceRect.top;
      const isTargetBelow = targetRect.top > sourceRect.bottom;
      
      // Calculate connection points from the edges
      let sourceX, sourceY, targetX, targetY;
      
      // Determine edge points based on relative positions
      if (isTargetToRight) {
        sourceX = sourceRect.right; // Right edge of source
        sourceY = sourceRect.top + sourceRect.height / 2;
        targetX = targetRect.left; // Left edge of target
        targetY = targetRect.top + targetRect.height / 2;
      } else if (isTargetToLeft) {
        sourceX = sourceRect.left; // Left edge of source
        sourceY = sourceRect.top + sourceRect.height / 2;
        targetX = targetRect.right; // Right edge of target
        targetY = targetRect.top + targetRect.height / 2;
      } else if (isTargetAbove) {
        sourceX = sourceRect.left + sourceRect.width / 2;
        sourceY = sourceRect.top; // Top edge of source
        targetX = targetRect.left + targetRect.width / 2;
        targetY = targetRect.bottom; // Bottom edge of target
      } else {
        sourceX = sourceRect.left + sourceRect.width / 2;
        sourceY = sourceRect.bottom; // Bottom edge of source
        targetX = targetRect.left + targetRect.width / 2;
        targetY = targetRect.top; // Top edge of target
      }
      
      // Calculate the midpoint for the path with an offset
      const offset = 30; // Distance the line extends outward before turning
      let midX1, midY1, midX2, midY2;
      
      if (isTargetToRight || isTargetToLeft) {
        // Horizontal offset first
        midX1 = sourceX + (isTargetToRight ? offset : -offset);
        midY1 = sourceY;
        midX2 = targetX + (isTargetToRight ? -offset : offset);
        midY2 = targetY;
      } else {
        // Vertical offset first
        midX1 = sourceX;
        midY1 = sourceY + (isTargetBelow ? offset : -offset);
        midX2 = targetX;
        midY2 = targetY + (isTargetBelow ? -offset : offset);
      }
      
      // Create the path for the connection
      const pathData = `M ${sourceX} ${sourceY} L ${midX1} ${midY1} L ${midX2} ${midY2} L ${targetX} ${targetY}`;
      
      // Update DOM directly instead of using React state
      pathRef.current.setAttribute('d', pathData);
      
      // Update the arrow position
      let angle;
      if (isTargetToRight) angle = 0;      // Pointing right
      else if (isTargetToLeft) angle = 180; // Pointing left
      else if (isTargetAbove) angle = 270;  // Pointing up
      else angle = 90;                      // Pointing down
      
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
          midX: midX1, // Just store the first midpoint for state (not used in rendering)
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
          points="0,-5 10,0 0,5"
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
        points="0,-5 10,0 0,5"
        fill={color}
      />
    </svg>
  );
};

export default Connection;