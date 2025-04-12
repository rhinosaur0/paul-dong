import React, { useRef } from 'react';

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
  children 
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  

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