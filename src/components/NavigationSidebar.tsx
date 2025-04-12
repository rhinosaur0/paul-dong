import React from 'react';
import { NavigateFunction } from '../pages/Panels';

interface NavigationSidebarProps {
  activePanel: string;
  navigate: NavigateFunction;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ activePanel, navigate }) => {
  // Navigation structure with categories and their child items
  const navigationTree = [
    {
      id: 'position',
      label: 'Position',
      children: []
    },
    {
      id: 'bike',
      label: 'Bike',
      children: [
        { id: 'scamper', label: 'CTMF#1 Scamper' },
        { id: 'morphChart', label: 'CTMF#2 Morph Chart' },
        { id: 'biomimicry', label: 'CTMF#3 Biomimicry' },
      ]
    },
    {
      id: 'bridge',
      label: 'Bridge',
      children: [
        { id: 'stakeholders', label: 'CTMF#1 Stakeholders' },
        { id: 'referenceDesigns', label: 'CTMF#2 Reference Designs' },
        { id: 'prototypes', label: 'CTMF#3 Prototypes' },
      ]
    },
    {
      id: 'hanger',
      label: 'Hanger',
      children: [
        { id: 'dfx', label: 'CTMF#1 DfX' },
        { id: 'pairwiseComparison', label: 'CTMF#2 Pairwise Comparison' },
        { id: 'measurementMatrix', label: 'CTMF#3 Measurement Matrix' },
      ]
    },
    {
        id: 'references',
        label: 'References',
        children: []
    },
  ];

  return (
    <div className="navigation-sidebar">
      <div className="sidebar-header">
        <h2>Navigation</h2>
      </div>
      <nav className="sidebar-nav">
        <ul className="nav-tree">
          {navigationTree.map((category) => (
            <li key={category.id} className="category-item">
              <button
                className={`category-button ${activePanel === category.id ? 'active' : ''}`}
                onClick={() => navigate(category.id)}
              >
                {category.label}
              </button>
              
              {category.children.length > 0 && (
                <ul className="child-items">
                  {category.children.map((child) => (
                    <li key={child.id} className="child-item">
                      <button
                        className={`child-button ${activePanel === child.id ? 'active' : ''}`}
                        onClick={() => navigate(child.id)}
                      >
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationSidebar;