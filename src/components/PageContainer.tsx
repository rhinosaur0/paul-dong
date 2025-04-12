import React, { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  return (
    <div className="page-container">
      <h1>{title}</h1>
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;