import React, { useRef, useEffect } from 'react';

interface DestinationNodeProps {
  id: string;
  registerNode: (id: string, element: HTMLElement | null) => void;
  children?: React.ReactNode;
}

const DestinationNode: React.FC<DestinationNodeProps> = ({ id, registerNode, children }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (nodeRef.current) {
      registerNode(id, nodeRef.current);
    }
    
    return () => {
      // Clean up by registering null (this will be handled in the ConnectionManager)
      registerNode(id, null);
    };
  }, [id, registerNode]);

  return (
    <div 
      ref={nodeRef}
      className="destination-node" 
      id={`destination-${id}`}
    >
      {children}
    </div>
  );
};

export default DestinationNode;