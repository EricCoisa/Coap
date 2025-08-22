import React, { useState } from 'react';
import { MoveObject, RemoveObject, AddObject, SetInsertMode } from '../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../store/rootReducer';
import type { BaseComponentProps, ViewMode } from '../../types';
import type { AnyObject } from '../../types/objects/index';

import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { globalDragState } from '../../utils/dragState';
import {
  DragIcon,
  DropZoneTop,
  DropZoneBottom,
  DropZoneContent,
  ActionButtonsContainer
} from './dragObject.styles';


const connector = connectUtil(
  (_state: RootStateBase) => ({
    objectsUsed: _state.ApplicationReducer.ObjectsUsed ?? [],
    toolbar: _state.ApplicationReducer.toolbar,
    insertMode: _state.ApplicationReducer.insertMode
  }),
  { RemoveObject, MoveObject, AddObject, SetInsertMode }
);

export interface IBaseObjectProps {
  object: AnyObject
  index: number
  mode: ViewMode;
  isTimeLine: boolean;
}

export interface BaseObjectProps extends BaseComponentProps, IBaseObjectProps, PropsFromRedux<typeof connector> {
}

function DragObject(props: BaseObjectProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showDropZones, setShowDropZones] = useState(false);
  const [activeDropZone, setActiveDropZone] = useState<'top' | 'bottom' | null>(null);
  const [touchDrag, setTouchDrag] = useState(false);
  const touchDragTimeout = React.useRef<NodeJS.Timeout | null>(null);

  // Verifica se deve mostrar as DropZones (drag normal ou modo de inserção)
  const shouldShowDropZones = showDropZones || (props.insertMode?.isActive && !isDragging);

  // Função para verificar se deve mostrar o dropzone superior
  function shouldShowTopDropZone() {
    if (props.insertMode?.isActive) {
      // No insertMode, sempre mostrar dropzone acima do primeiro elemento
      return props.index === 0;
    }
    return shouldShowDropZones && !isDragging;
  }

  // Função para verificar se deve mostrar o dropzone inferior  
  function shouldShowBottomDropZone() {
    if (props.insertMode?.isActive) {
      // No insertMode, sempre mostrar dropzone abaixo de todos os elementos
      // Isso garante que haja sempre um dropzone entre elementos e após o último
      return true;
    }
    return shouldShowDropZones && !isDragging;
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

  // Touch events para mobile
  function handleDragIconTouchStart(e: React.TouchEvent<HTMLButtonElement>) {
    // Inicia drag após toque longo (500ms)
    touchDragTimeout.current = setTimeout(() => {
      setTouchDrag(true);
      setIsDragging(true);
      setShowDropZones(true);
      globalDragState.isDragging = true;
      globalDragState.draggedObjectId = props.object.id;
      globalDragState.isSidebarDrag = false;
    }, 500);
  }

  function handleDragIconTouchEnd(e: React.TouchEvent<HTMLButtonElement>) {
    if (touchDragTimeout.current) {
      clearTimeout(touchDragTimeout.current);
      touchDragTimeout.current = null;
    }
    // Se estava em drag por touch, encerra
    if (touchDrag) {
      setTouchDrag(false);
      setIsDragging(false);
      setShowDropZones(false);
      setActiveDropZone(null);
      globalDragState.isDragging = false;
      globalDragState.draggedObjectId = null;
      globalDragState.isSidebarDrag = false;
    }
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

  // Drop por toque (mobile)
  function handleTopZoneTouch(e: React.TouchEvent<HTMLDivElement>) {
    if (touchDrag && globalDragState.draggedObjectId) {
      const draggedObject = props.objectsUsed.find(obj => obj.id === globalDragState.draggedObjectId);
      if (draggedObject && props.MoveObject) {
        const newIndex = props.index;
        props.MoveObject(draggedObject, newIndex);
      }
      setTouchDrag(false);
      setIsDragging(false);
      setShowDropZones(false);
      setActiveDropZone(null);
      globalDragState.isDragging = false;
      globalDragState.draggedObjectId = null;
      globalDragState.isSidebarDrag = false;
    }
  }

  // Função para inserção por clique (modo mobile)
  function handleTopZoneClick() {
    if (props.insertMode?.isActive && props.insertMode.selectedObject && props.AddObject) {
      const insertIndex = props.index; // Inserir acima
      const newObject = {
        ...props.insertMode.selectedObject,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9) // Gera ID temporário
      };

      props.AddObject(newObject, insertIndex);
      props.SetInsertMode(false); // Desativa o modo de inserção
    }
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

  // Drop por toque (mobile)
  function handleBottomZoneTouch(e: React.TouchEvent<HTMLDivElement>) {
    if (touchDrag && globalDragState.draggedObjectId) {
      const draggedObject = props.objectsUsed.find(obj => obj.id === globalDragState.draggedObjectId);
      if (draggedObject && props.MoveObject) {
        const newIndex = props.index + 1;
        props.MoveObject(draggedObject, newIndex);
      }
      setTouchDrag(false);
      setIsDragging(false);
      setShowDropZones(false);
      setActiveDropZone(null);
      globalDragState.isDragging = false;
      globalDragState.draggedObjectId = null;
      globalDragState.isSidebarDrag = false;
    }
  }

  // Função para inserção por clique na zona inferior (modo mobile)
  function handleBottomZoneClick() {
    if (props.insertMode?.isActive && props.insertMode.selectedObject && props.AddObject) {
      const insertIndex = props.index + 1; // Inserir abaixo
      const newObject = {
        ...props.insertMode.selectedObject,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9) // Gera ID temporário
      };

      props.AddObject(newObject, insertIndex);
      props.SetInsertMode(false); // Desativa o modo de inserção
    }
  }

  return (
    <div
      style={{ position: 'relative' }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {/* DragSuperior - só aparece quando shouldShowTopDropZone() é true */}
      {shouldShowTopDropZone() && (
        <DropZoneTop
          onDragOver={handleTopZoneDragOver}
          onDrop={handleTopZoneDrop}
          onClick={props.insertMode?.isActive ? handleTopZoneClick : undefined}
          onTouchEnd={handleTopZoneTouch}
          activeDropZone={activeDropZone}
          style={{
            cursor: props.insertMode?.isActive || touchDrag ? 'pointer' : 'default',
            zIndex: props.insertMode?.isActive ? 1000 : 'auto'
          }}
        >
          <DropZoneContent $isTimeLine={props.isTimeLine}>
            <span>⬆️</span>
            <span>
              {props.insertMode?.isActive ?
                `Inserir ${props.insertMode.selectedObject?.label} aqui...` :
                touchDrag ? 'Soltar aqui (acima)' : 'Soltar aqui (acima)'
              }
            </span>
            <span>⬆️</span>
          </DropZoneContent>
        </DropZoneTop>
      )}
      <ActionButtonsContainer $isTimeLine={props.isTimeLine} >
        <DragIcon
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleDragIconMouseEnter}
          onMouseLeave={handleDragIconMouseLeave}
          onMouseDown={handleDragIconMouseDown}
          onMouseUp={handleDragIconMouseUp}
          onTouchStart={handleDragIconTouchStart}
          onTouchEnd={handleDragIconTouchEnd}
          title="Arrastar para mover"
        >
          <span>⋮⋮</span>
        </DragIcon>

      </ActionButtonsContainer>

      {props.children}

      {/* DragInferior - só aparece quando shouldShowBottomDropZone() é true */}
      {shouldShowBottomDropZone() && (
        <DropZoneBottom
          onDragOver={handleBottomZoneDragOver}
          onDrop={handleBottomZoneDrop}
          onClick={props.insertMode?.isActive ? handleBottomZoneClick : undefined}
          onTouchEnd={handleBottomZoneTouch}
          activeDropZone={activeDropZone}
          style={{
            cursor: props.insertMode?.isActive || touchDrag ? 'pointer' : 'default',
            zIndex: props.insertMode?.isActive ? 1000 : 'auto'
          }}
        >
          <DropZoneContent $isTimeLine={props.isTimeLine}>
            <span>⬇️</span>
            <span>
              {props.insertMode?.isActive ?
                `Inserir ${props.insertMode.selectedObject?.label} aqui...` :
                touchDrag ? 'Soltar aqui (abaixo)' : 'Soltar aqui (abaixo)'
              }
            </span>
            <span>⬇️</span>
          </DropZoneContent>
        </DropZoneBottom>
      )}
    </div>
  );
}

const ConnectedDragObject = connector(DragObject);
export default ConnectedDragObject;
