import React, { useRef, useEffect } from 'react';

interface NavigationNodeProps {
  targetId: string;
  onNavigate: (targetId: string) => void;
  registerNode: (id: string, element: HTMLElement | null) => void;
  children: React.ReactNode;
}

const NavigationNode: React.FC<NavigationNodeProps> = ({ 
  targetId, 
  onNavigate, 
  registerNode,
  children 
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (nodeRef.current) {
      registerNode(`nav-to-${targetId}`, nodeRef.current);
    }
    
    return () => {
      registerNode(`nav-to-${targetId}`, null);
    };
  }, [targetId, registerNode]);

  return (
    <span 
      ref={nodeRef}
      className="nav-node"
      onClick={() => onNavigate(targetId)}
      data-target={targetId}
    >
      {children}
    </span>
  );
};

export default NavigationNode;