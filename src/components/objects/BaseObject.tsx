import React, { useState } from 'react';
import { MoveObject, RemoveObject } from '../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../store/rootReducer';
import type { BaseComponentProps } from '../../types';
import type { Object, ObjectMode } from '../../types/objects/index';

import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';


const connector = connectUtil(
  (_state: RootStateBase) => ({
    objectsUsed: _state.ApplicationReducer.ObjectsUsed ?? []
  }),
  { RemoveObject, MoveObject }
);

export interface IBaseObjectProps {
    object: Object
    index: number
    mode: ObjectMode;
}

export interface BaseObjectProps extends BaseComponentProps, IBaseObjectProps, PropsFromRedux<typeof connector> {
}

function BaseObject(props : BaseObjectProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverPosition, setDragOverPosition] = useState<'top' | 'bottom' | null>(null);

  function handleRemove() {
    console.log('Removendo objeto:', props.object);
    if (props.RemoveObject && props.object) {
      props.RemoveObject(props.object);
    }
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    setIsDragging(true);
    e.dataTransfer.setData('objectId', props.object.id.toString());
    e.dataTransfer.setData('draggedIndex', props.index.toString());
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragEnd() {
    setIsDragging(false);
    setDragOverPosition(null);
  }
  
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    
    const draggedId = e.dataTransfer.getData('objectId');
    const draggedIndex = Number(e.dataTransfer.getData('draggedIndex'));
    
    if (draggedId === props.object.id) {
      setDragOverPosition(null);
      return; // Não move para si mesmo
    }

    if (props.MoveObject && draggedId && !isNaN(draggedIndex)) {
      const draggedObject = props.objectsUsed.find(obj => obj.id === draggedId);
      if (draggedObject) {
        let newIndex = props.index;
        
        // Se estamos arrastando para baixo na metade inferior, inserir após
        if (dragOverPosition === 'bottom') {
          newIndex = props.index + 1;
        }
        // Se o objeto arrastado estava antes da posição atual, ajustar o índice
        else if (draggedIndex < props.index) {
          newIndex = props.index;
        }
        
        props.MoveObject(draggedObject, newIndex);
      }
    }
    
    setDragOverPosition(null);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    
    const draggedId = e.dataTransfer.getData('objectId');
    if (draggedId === props.object.id) return; // Não mostrar indicador para si mesmo
    
    const rect = e.currentTarget.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const mouseY = e.clientY;
    
    if (mouseY < midpoint) {
      setDragOverPosition('top');
    } else {
      setDragOverPosition('bottom');
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    // Só remove o indicador se estivermos realmente saindo do elemento
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverPosition(null);
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Indicador de drop superior */}
      {dragOverPosition === 'top' && (
        <div 
          style={{ 
            height: '3px', 
            background: '#007acc', 
            marginBottom: '4px',
            borderRadius: '2px',
            opacity: 0.8
          }} 
        />
      )}
      
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{ 
          position: 'relative', 
          marginBottom: '1rem', 
          background: isDragging ? '#f0f0f0' : '#f8f8f8', 
          borderRadius: 8, 
          padding: 16,
          cursor: 'move',
          opacity: isDragging ? 0.5 : 1,
          transition: 'all 0.2s ease',
          border: dragOverPosition ? '2px dashed #007acc' : '2px solid transparent'
        }}
      >
        <button
          onClick={handleRemove}
          style={{ 
            position: 'absolute', 
            top: 8, 
            right: 8, 
            background: '#e53e3e', 
            color: '#fff', 
            border: 'none', 
            borderRadius: 4, 
            padding: '4px 8px', 
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          Remover
        </button>
        {props.children}
      </div>
      
      {/* Indicador de drop inferior */}
      {dragOverPosition === 'bottom' && (
        <div 
          style={{ 
            height: '3px', 
            background: '#007acc', 
            marginTop: '-12px',
            marginBottom: '12px',
            borderRadius: '2px',
            opacity: 0.8
          }} 
        />
      )}
    </div>
  );
}

const ConnectedBaseObject = connector(BaseObject);
export default ConnectedBaseObject;
