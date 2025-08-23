import React, { useState, useEffect } from 'react';
import { MoveObject, RemoveObject, AddObject, SetInsertMode, SetMoveMode } from '../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../store/rootReducer';
import type { BaseComponentProps, ViewMode } from '../../types';
import type { AnyObject } from '../../types/objects/index';

import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { globalDragState } from '../../utils/dragState';

// Estado global para controlar qual elemento tem zonas ativas no modo de movimento
const globalMoveState = {
  activeElementId: null as string | null,
  setActiveElement: (elementId: string | null) => {
    globalMoveState.activeElementId = elementId;
  }
};
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
    insertMode: _state.ApplicationReducer.insertMode,
    moveMode: _state.ApplicationReducer.moveMode
  }),
  { RemoveObject, MoveObject, AddObject, SetInsertMode, SetMoveMode }
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

  // Efeito para limpar zonas quando o modo de movimento muda
  useEffect(() => {
    // Se o modo de movimento foi desativado, limpa as zonas
    if (!props.moveMode?.isActive) {
      setShowDropZones(false);
      setActiveDropZone(null);
      // Limpa o estado global
      globalMoveState.setActiveElement(null);
    }
    // Se mudou o objeto selecionado, limpa as zonas
    else if (props.moveMode?.selectedObjectId !== props.object.id) {
      setShowDropZones(false);
      setActiveDropZone(null);
      // Se este elemento era o ativo, limpa
      if (globalMoveState.activeElementId === props.object.id) {
        globalMoveState.setActiveElement(null);
      }
    }
  }, [props.moveMode?.isActive, props.moveMode?.selectedObjectId, props.object.id]);

  // Função para detectar se é dispositivo mobile
  function isMobile() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  // Verifica se deve mostrar as DropZones (drag normal, modo de inserção ou modo de movimento)
  const shouldShowDropZones = showDropZones ||
    (props.insertMode?.isActive && !isDragging) ||
    // No mobile, se moveMode está ativo e não é o próprio objeto, mostrar zonas automaticamente
    (isMobile() && props.moveMode?.isActive && props.moveMode.selectedObjectId !== props.object.id) ||
    // No modo de movimento, só mostrar se este elemento é o ativo globalmente
    (props.moveMode?.isActive && globalMoveState.activeElementId === props.object.id);

  // Função para verificar se deve mostrar o dropzone superior
  function shouldShowTopDropZone() {
    if (props.insertMode?.isActive) {
      // No insertMode, sempre mostrar dropzone acima do primeiro elemento
      return props.index === 0;
    }
    // Para moveMode e drag normal: só mostrar quando shouldShowDropZones é true e não está arrastando o próprio elemento
    if (props.moveMode?.isActive && props.moveMode.selectedObjectId === props.object.id) {
      // Se é o objeto sendo movido, não mostrar dropzone
      return false;
    }
    return shouldShowDropZones && !isDragging;
  }

  // Função para verificar se deve mostrar o dropzone inferior  
  function shouldShowBottomDropZone() {
    if (props.insertMode?.isActive) {
      // No insertMode, sempre mostrar dropzone abaixo de todos os elementos
      return true;
    }
    // Para moveMode e drag normal: só mostrar quando shouldShowDropZones é true e não está arrastando o próprio elemento
    if (props.moveMode?.isActive && props.moveMode.selectedObjectId === props.object.id) {
      // Se é o objeto sendo movido, não mostrar dropzone
      return false;
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

  // Função para ativar/desativar o modo de movimento (mobile)
  function handleDragIconClick() {
    if (props.SetMoveMode) {
      if (props.moveMode?.isActive && props.moveMode.selectedObjectId === props.object.id) {
        // Se já está ativo para este objeto, desativa
        props.SetMoveMode(false);
        // Limpa o estado local das zonas de drop
        setShowDropZones(false);
        setActiveDropZone(null);
      } else {
        // Ativa o modo de movimento para este objeto
        props.SetMoveMode(true, props.object.id);
        // Limpa o estado local das zonas de drop ao ativar
        setShowDropZones(false);
        setActiveDropZone(null);
      }
    }
  }

  function handleDragStart(e: React.DragEvent<HTMLButtonElement>) {
    setIsDragging(true);
    globalDragState.isDragging = true;
    globalDragState.draggedObjectId = props.object.id;
    globalDragState.isSidebarDrag = false;

    e.dataTransfer.setData('objectId', props.object.id.toString());
    e.dataTransfer.setData('draggedIndex', props.index.toString());
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragEnd() {
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

  // Detecta quando o mouse entra no elemento durante modo de movimento
  function handleMouseEnter() {
    // Se está no modo de movimento e não é o próprio objeto sendo movido
    // E não é mobile (no mobile as zonas já aparecem automaticamente)
    if (!isMobile() && props.moveMode?.isActive && props.moveMode.selectedObjectId !== props.object.id) {
      // Define este elemento como o único ativo
      globalMoveState.setActiveElement(props.object.id);
      setShowDropZones(true);
    }
  }

  // Remove as zonas quando o mouse sai do elemento durante modo de movimento
  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    // Se está no modo de movimento, esconde as drop zones
    // Mas só no desktop (no mobile as zonas ficam sempre visíveis)
    if (!isMobile() && props.moveMode?.isActive) {
      // Verifica se realmente saiu do container (similar à lógica do drag)
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;

      // Só remove as drop zones se o mouse realmente saiu da área do container
      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
        // Limpa o elemento ativo se este era o ativo
        if (globalMoveState.activeElementId === props.object.id) {
          globalMoveState.setActiveElement(null);
        }
        setShowDropZones(false);
        setActiveDropZone(null);
      }
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
    // Modo de movimento - no mobile sempre funciona, no desktop só quando zonas estão visíveis
    else if (props.moveMode?.isActive && props.moveMode.selectedObjectId && props.MoveObject && props.SetMoveMode &&
      (isMobile() || shouldShowDropZones)) {
      const draggedObject = props.objectsUsed.find(obj => obj.id === props.moveMode?.selectedObjectId);
      if (draggedObject) {
        const newIndex = props.index; // Mover para acima
        props.MoveObject(draggedObject, newIndex);
        props.SetMoveMode(false); // Desativa o modo de movimento
        // Força a limpeza das zonas após o movimento
        setShowDropZones(false);
        setActiveDropZone(null);
        // Limpa o estado global
        globalMoveState.setActiveElement(null);
      }
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
    // Modo de movimento - no mobile sempre funciona, no desktop só quando zonas estão visíveis
    else if (props.moveMode?.isActive && props.moveMode.selectedObjectId && props.MoveObject && props.SetMoveMode &&
      (isMobile() || shouldShowDropZones)) {
      const draggedObject = props.objectsUsed.find(obj => obj.id === props.moveMode?.selectedObjectId);
      if (draggedObject) {
        const newIndex = props.index + 1; // Mover para abaixo
        props.MoveObject(draggedObject, newIndex);
        props.SetMoveMode(false); // Desativa o modo de movimento
        // Força a limpeza das zonas após o movimento
        setShowDropZones(false);
        setActiveDropZone(null);
        // Limpa o estado global
        globalMoveState.setActiveElement(null);
      }
    }
  }

  return (
    <div
      style={{ position: 'relative' }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* DragSuperior - só aparece quando shouldShowTopDropZone() é true */}
      {shouldShowTopDropZone() && (
        <DropZoneTop
          onDragOver={handleTopZoneDragOver}
          onDrop={handleTopZoneDrop}
          onClick={(props.insertMode?.isActive || (props.moveMode?.isActive && (isMobile() || shouldShowDropZones))) ? handleTopZoneClick : undefined}
          activeDropZone={activeDropZone}
          style={{
            cursor: (props.insertMode?.isActive || (props.moveMode?.isActive && (isMobile() || shouldShowDropZones))) ? 'pointer' : 'default',
            zIndex: (props.insertMode?.isActive || (props.moveMode?.isActive && (isMobile() || shouldShowDropZones))) ? 1000 : 'auto'
          }}
        >
          <DropZoneContent $isTimeLine={props.isTimeLine}>
            <span>⬆️</span>
            <span>
              {props.insertMode?.isActive ?
                `Inserir ${props.insertMode.selectedObject?.label} aqui...` :
                (props.moveMode?.isActive && (isMobile() || shouldShowDropZones)) ? 'Mover para cima' : 'Soltar aqui (acima)'
              }
            </span>
            <span>⬆️</span>
          </DropZoneContent>
        </DropZoneTop>
      )}
      <ActionButtonsContainer $isTimeLine={props.isTimeLine} >
        {props.mode === 'editor' &&
          <DragIcon
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onMouseEnter={handleDragIconMouseEnter}
            onMouseLeave={handleDragIconMouseLeave}
            onMouseDown={handleDragIconMouseDown}
            onMouseUp={handleDragIconMouseUp}
            onClick={handleDragIconClick}
            title={props.moveMode?.isActive && props.moveMode.selectedObjectId === props.object.id ?
              "Clique nas zonas de drop para mover" :
              "Arrastar para mover ou clique para ativar modo de movimento"
            }
            style={{
              backgroundColor: props.moveMode?.isActive && props.moveMode.selectedObjectId === props.object.id ?
                '#28a745' : undefined
            }}
          >
            <span>⋮⋮</span>
          </DragIcon>
        }
      </ActionButtonsContainer>

      {props.children}

      {/* DragInferior - só aparece quando shouldShowBottomDropZone() é true */}
      {shouldShowBottomDropZone() && (
        <DropZoneBottom
          onDragOver={handleBottomZoneDragOver}
          onDrop={handleBottomZoneDrop}
          onClick={(props.insertMode?.isActive || (props.moveMode?.isActive && (isMobile() || shouldShowDropZones))) ? handleBottomZoneClick : undefined}
          activeDropZone={activeDropZone}
          style={{
            cursor: (props.insertMode?.isActive || (props.moveMode?.isActive && (isMobile() || shouldShowDropZones))) ? 'pointer' : 'default',
            zIndex: (props.insertMode?.isActive || (props.moveMode?.isActive && (isMobile() || shouldShowDropZones))) ? 1000 : 'auto'
          }}
        >
          <DropZoneContent $isTimeLine={props.isTimeLine}>
            <span>⬇️</span>
            <span>
              {props.insertMode?.isActive ?
                `Inserir ${props.insertMode.selectedObject?.label} aqui...` :
                (props.moveMode?.isActive && (isMobile() || shouldShowDropZones)) ? 'Mover para baixo' : 'Soltar aqui (abaixo)'
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
