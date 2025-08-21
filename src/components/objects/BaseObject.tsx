import React, { useState } from 'react';
import { MoveObject, RemoveObject, AddObject } from '../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../store/rootReducer';
import type { BaseComponentProps } from '../../types';
import type { AnyObject, ObjectMode } from '../../types/objects/index';

import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { globalDragState } from '../../utils/dragState';
import {
  BaseObjectContainer,
  ActionButtonsContainer,
  DragIcon,
  RemoveButton,
  DropZoneTop,
  DropZoneBottom,
  DropZoneContent
} from './baseObject.styles';


const connector = connectUtil(
  (_state: RootStateBase) => ({
    objectsUsed: _state.ApplicationReducer.ObjectsUsed ?? [],
    toolbar: _state.ApplicationReducer.toolbar
  }),
  { RemoveObject, MoveObject, AddObject }
);

export interface IBaseObjectProps {
  object: AnyObject
  index: number
  mode: ObjectMode;
}

export interface BaseObjectProps extends BaseComponentProps, IBaseObjectProps, PropsFromRedux<typeof connector> {
}

function BaseObject(props: BaseObjectProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showDropZones, setShowDropZones] = useState(false);
  const [activeDropZone, setActiveDropZone] = useState<'top' | 'bottom' | null>(null);

  function handleRemove() {
    if (props.RemoveObject && props.object) {
      props.RemoveObject(props.object);
    }
  }

  // Eventos do ícone de arrastar
  function handleDragIconMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.background = '#005a9e';
    e.currentTarget.style.transform = 'scale(1.1)';
  }

  function handleDragIconMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.background = '#007acc';
    e.currentTarget.style.transform = 'scale(1)';
  }

  function handleDragIconMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.cursor = 'grabbing';
  }

  function handleDragIconMouseUp(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.cursor = 'grab';
  }

  // Eventos do botão de remover
  function handleRemoveButtonMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.background = '#c53030';
    e.currentTarget.style.transform = 'scale(1.05)';
  }

  function handleRemoveButtonMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.background = '#e53e3e';
    e.currentTarget.style.transform = 'scale(1)';
  }

  function handleDragStart(e: React.DragEvent<HTMLButtonElement>) {
    console.log(`🚀 Drag Start - Objeto ${props.object.id}`);
    setIsDragging(true);
    globalDragState.isDragging = true;
    globalDragState.draggedObjectId = props.object.id;
    globalDragState.isSidebarDrag = false;

    e.dataTransfer.setData('objectId', props.object.id.toString());
    e.dataTransfer.setData('draggedIndex', props.index.toString());
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragEnd() {
    console.log(`🏁 Drag End - Objeto ${props.object.id}`);
    setIsDragging(false);
    setShowDropZones(false);
    setActiveDropZone(null);
    globalDragState.isDragging = false;
    globalDragState.draggedObjectId = null;
    globalDragState.isSidebarDrag = false;
  }

  // Detecta quando um objeto está sendo arrastado sobre este elemento
  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    // Verifica se há algo sendo arrastado e não é o próprio elemento
    if (globalDragState.isDragging && globalDragState.draggedObjectId !== props.object.id) {
      setShowDropZones(true);
    } else if (globalDragState.isSidebarDrag) {
      setShowDropZones(true);
    }
  }

  // Detecta movimento do mouse sobre o elemento durante drag
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    // Verifica se há algo sendo arrastado e não é o próprio elemento
    if (globalDragState.isDragging && globalDragState.draggedObjectId !== props.object.id) {
      setShowDropZones(true);
    } else if (globalDragState.isSidebarDrag) {
      setShowDropZones(true);
    }
  }

  // Remove as zonas de drop quando sai do elemento
  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    // Verifica se realmente saiu do container principal (não apenas mudou para uma drop zone)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    // Só remove as drop zones se o mouse realmente saiu da área do container
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setShowDropZones(false);
      setActiveDropZone(null);
    }
  }

  // Handlers para as zonas de drop específicas
  function handleTopZoneDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropZone('top');
  }

  function handleBottomZoneDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropZone('bottom');
  }

  function handleTopZoneDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    const draggedId = e.dataTransfer.getData('objectId');
    const sidebarObjectData = e.dataTransfer.getData('sidebarObjectData');

    // Se é um elemento da sidebar sendo arrastado
    if (sidebarObjectData && props.AddObject) {
      try {
        const sidebarObject = JSON.parse(sidebarObjectData);
        const insertIndex = props.index; // Inserir acima

        const newObject = {
          ...sidebarObject,
          id: undefined
        };

        props.AddObject(newObject, insertIndex);

      } catch (error) {
        console.error('Erro ao processar objeto da sidebar:', error);
      }
    }
    // Se é um objeto existente sendo movido
    else if (draggedId) {
      const draggedObject = props.objectsUsed.find(obj => obj.id === draggedId);
      if (draggedObject && props.MoveObject) {
        const newIndex = props.index; // Mover para acima
        props.MoveObject(draggedObject, newIndex);
      }
    }

    setShowDropZones(false);
    setActiveDropZone(null);
  }

  function handleBottomZoneDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    const draggedId = e.dataTransfer.getData('objectId');
    const sidebarObjectData = e.dataTransfer.getData('sidebarObjectData');

    // Se é um elemento da sidebar sendo arrastado
    if (sidebarObjectData && props.AddObject) {
      try {
        const sidebarObject = JSON.parse(sidebarObjectData);
        const insertIndex = props.index + 1; // Inserir abaixo

        const newObject = {
          ...sidebarObject,
          id: undefined
        };

        props.AddObject(newObject, insertIndex);

      } catch (error) {
        console.error('Erro ao processar objeto da sidebar:', error);
      }
    }
    // Se é um objeto existente sendo movido
    else if (draggedId) {
      const draggedObject = props.objectsUsed.find(obj => obj.id === draggedId);
      if (draggedObject && props.MoveObject) {
        const newIndex = props.index + 1; // Mover para abaixo
        props.MoveObject(draggedObject, newIndex);
      }
    }

    setShowDropZones(false);
    setActiveDropZone(null);
  }

  return (
    <div
      style={{ position: 'relative' }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {/* DragSuperior - só aparece quando showDropZones é true */}
      {showDropZones && !isDragging && (
        <DropZoneTop
          onDragOver={handleTopZoneDragOver}
          onDrop={handleTopZoneDrop}
          activeDropZone={activeDropZone}
        >
          <DropZoneContent>
            <span>⬆️</span>
            <span>Soltar aqui (acima)</span>
            <span>⬆️</span>
          </DropZoneContent>
        </DropZoneTop>
      )}

      {/* BaseObject Children */}
      <BaseObjectContainer
        $isDragging={isDragging}
        $showDropZones={showDropZones}
      >
        {props.mode === 'edit' && props.toolbar &&

          <ActionButtonsContainer>
            {/* Ícone de mover/arrastar */}
            <DragIcon
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onMouseEnter={handleDragIconMouseEnter}
              onMouseLeave={handleDragIconMouseLeave}
              onMouseDown={handleDragIconMouseDown}
              onMouseUp={handleDragIconMouseUp}
              title="Arrastar para mover"
            >
              <span>⋮⋮</span>
            </DragIcon>

            {/* Botão de remover */}
            <RemoveButton
              onClick={handleRemove}
              onMouseEnter={handleRemoveButtonMouseEnter}
              onMouseLeave={handleRemoveButtonMouseLeave}
              title="Remover elemento"
            >
              🗑️
            </RemoveButton>
          </ActionButtonsContainer>
        }


        {props.children}
      </BaseObjectContainer>

      {/* DragInferior - só aparece quando showDropZones é true */}
      {showDropZones && !isDragging && (
        <DropZoneBottom
          onDragOver={handleBottomZoneDragOver}
          onDrop={handleBottomZoneDrop}
          activeDropZone={activeDropZone}
        >
          <DropZoneContent>
            <span>⬇️</span>
            <span>Soltar aqui (abaixo)</span>
            <span>⬇️</span>
          </DropZoneContent>
        </DropZoneBottom>
      )}
    </div>
  );
}

const ConnectedBaseObject = connector(BaseObject);
export default ConnectedBaseObject;
