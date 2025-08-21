
import React from 'react';
import { AddObject, SetToolbar } from '../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../store/rootReducer';
import type { BaseComponentProps } from '../../types';
import type { AnyObject } from '../../types/objects';
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { Sidebar, SidebarTitle, ToolsContainer, ToolsOptions } from './sidebar.styles';
import { globalDragState } from '../../utils/dragState';
import Switch from '../switch/Switch';

const connector = connectUtil(
  (state: RootStateBase) => ({
    objectsList: state.ApplicationReducer.ObjectsList ?? [],
    toolbar: state.ApplicationReducer.toolbar
  }),
  { AddObject, SetToolbar}
);

export interface SidebarProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
  onAddObject?: (type: string) => void;
}

function SidebarComponent(props : SidebarProps) {
  function handleAddObject(object: AnyObject) {
    if (props.AddObject) props.AddObject(object);
  }

  function handleDragStart(e: React.DragEvent<HTMLButtonElement>) {
    console.log(`🚀 Sidebar Drag Start`);
    const objectData = e.currentTarget.getAttribute('data-object');
    if (objectData) {
      const object = JSON.parse(objectData);
      // Atualizar estado global
      globalDragState.isDragging = true;
      globalDragState.isSidebarDrag = true;
      globalDragState.draggedObjectId = null; // Sidebar não tem ID específico
      
      e.dataTransfer.setData('sidebarObjectType', object.type);
      e.dataTransfer.setData('sidebarObjectData', objectData);
      e.dataTransfer.effectAllowed = 'copy';
    }
  }

  function handleDragEnd() {
    console.log(`🏁 Sidebar Drag End`);
    globalDragState.isDragging = false;
    globalDragState.isSidebarDrag = false;
    globalDragState.draggedObjectId = null;
  }

  function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.cursor = 'grabbing';
  }

  function handleMouseUp(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.cursor = 'grab';
  }


  function handleToolbar() {
    props.SetToolbar(!props.toolbar);
  }

  return (
    <Sidebar className={props.className} style={props.style}>
      <SidebarTitle>Objetos</SidebarTitle>
      <ToolsContainer>
         <ToolsOptions style={{ alignItems: 'center', gap: '10px', display: 'flex' }}>
          <label style={{ margin: 0, whiteSpace: 'nowrap', fontWeight: 500 }}>Barra de Ferramentas</label>
          <Switch checked={props.toolbar} onChange={handleToolbar} />
         </ToolsOptions>
      </ToolsContainer>
      <ToolsContainer>
        {props.objectsList.length > 0 && (
          props.objectsList.map(obj => (
            <button 
              key={obj.id} 
              data-object={JSON.stringify(obj)}
              onClick={() => handleAddObject(obj)}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              style={{
                cursor: 'grab',
                padding: '8px 12px',
                margin: '4px 0',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              {obj.icon} {obj.label}
            </button>
          ))
      )}
      </ToolsContainer>
    </Sidebar>
  );
}

const ConnectedSidebar = connector(SidebarComponent);
export default ConnectedSidebar;
