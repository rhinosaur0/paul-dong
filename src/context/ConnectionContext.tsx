import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Types
interface NodeRegistry {
  [key: string]: HTMLElement | null;
}

interface ConnectionContextType {
  registerNode: (id: string, element: HTMLElement | null) => void;
  nodes: NodeRegistry;
}

// Create context
const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

// Provider component
export const ConnectionProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [nodes, setNodes] = useState<NodeRegistry>({});
  
  const registerNode = useCallback((id: string, element: HTMLElement | null) => {
    setNodes(prevNodes => ({
      ...prevNodes,
      [id]: element
    }));
  }, []);
  
  const value = {
    registerNode,
    nodes
  };
  
  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  );
};

// Hook for easy context consumption
export const useConnections = () => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error('useConnections must be used within a ConnectionProvider');
  }
  return context;
};