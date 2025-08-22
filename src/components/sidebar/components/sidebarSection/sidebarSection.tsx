import React, { useState } from 'react';
import type { BaseComponentProps } from '../../../../types';
import { 
  SidebarSectionContainer, 
  SidebarSectionHeader, 
  SidebarSectionTitle, 
  SidebarSectionToggle,
  SidebarSectionContent 
} from './sidebarSection.styles';

export interface SidebarSectionProps extends BaseComponentProps {
  title?: string;
  defaultCollapsed?: boolean;
  collapsible?: boolean;
  children: React.ReactNode;
}

function SidebarSection(props: SidebarSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(props.defaultCollapsed ?? false);

  function toggleCollapse() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <SidebarSectionContainer className={props.className} style={props.style}>
      {props.title && (
        <SidebarSectionHeader>
          <SidebarSectionTitle>{props.title}</SidebarSectionTitle>
          {props.collapsible !== false && (
            <SidebarSectionToggle onClick={toggleCollapse}>
              {isCollapsed ? '▼' : '▲'}
            </SidebarSectionToggle>
          )}
        </SidebarSectionHeader>
      )}
      <SidebarSectionContent $isCollapsed={isCollapsed}>
        {props.children}
      </SidebarSectionContent>
    </SidebarSectionContainer>
  );
}

export default SidebarSection;
