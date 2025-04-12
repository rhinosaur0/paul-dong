import React, { useRef, useEffect } from 'react';

interface NavigationNodeProps {
  targetId: string;
  destinationId: string; 
  onNavigate: (targetId: string, destinationId?: string) => void;
  registerNode: (id: string, element: HTMLElement | null) => void;
  children: React.ReactNode;
}

const NavigationNode: React.FC<NavigationNodeProps> = ({ 
  targetId, 
  destinationId,
  onNavigate, 
  registerNode,
  children 
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    // No need to register navigation nodes separately as connections
    // will now be drawn between destination nodes
    return () => {};
  }, []);

  return (
    <span 
      ref={nodeRef}
      className="nav-node"
      onClick={() => onNavigate(targetId, destinationId)}
      data-target={targetId}
      data-destination={destinationId}
    >
      {children}
    </span>
  );
};

export default NavigationNode;