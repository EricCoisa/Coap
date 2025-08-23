import { useRef, useCallback } from 'react';
import { globalDragState } from '../utils/dragState';

interface UseDragAndTouchProps {
  onDragStart?: (data: string) => void;
  onDragEnd?: () => void;
  data: string;
}

export function useDragAndTouch({ onDragStart, onDragEnd, data }: UseDragAndTouchProps) {
  const dragImageRef = useRef<HTMLElement | null>(null);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);
  const touchElement = useRef<HTMLElement | null>(null);

  // Funções auxiliares para elementos visuais
  const createDragImage = useCallback((element: HTMLElement, x: number, y: number) => {
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.position = 'fixed';
    clone.style.top = `${y - 20}px`;
    clone.style.left = `${x - 20}px`;
    clone.style.opacity = '0.8';
    clone.style.transform = 'scale(0.9)';
    clone.style.pointerEvents = 'none';
    clone.style.zIndex = '9999';
    clone.style.backgroundColor = '#fff';
    clone.style.border = '2px solid #007acc';
    clone.style.borderRadius = '4px';
    clone.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    clone.id = 'drag-preview';
    
    document.body.appendChild(clone);
    dragImageRef.current = clone;
  }, []);

  const updateDragImage = useCallback((x: number, y: number) => {
    if (dragImageRef.current) {
      dragImageRef.current.style.top = `${y - 20}px`;
      dragImageRef.current.style.left = `${x - 20}px`;
    }
  }, []);

  const removeDragImage = useCallback(() => {
    if (dragImageRef.current) {
      document.body.removeChild(dragImageRef.current);
      dragImageRef.current = null;
    }
  }, []);

  const handleTouchDragOver = useCallback((element: Element | null) => {
    // Remover classes de hover anteriores
    document.querySelectorAll('.touch-drag-over').forEach(el => {
      el.classList.remove('touch-drag-over');
    });
    
    // Adicionar classe ao elemento atual
    if (element && (element.classList.contains('canvas-area') || element.closest('.canvas-area'))) {
      const targetElement = element.classList.contains('canvas-area') ? element : element.closest('.canvas-area');
      targetElement?.classList.add('touch-drag-over');
    }
  }, []);

  const handleTouchDrop = useCallback((element: Element | null) => {
    // Limpar classes de hover
    document.querySelectorAll('.touch-drag-over').forEach(el => {
      el.classList.remove('touch-drag-over');
    });
    
    if (element) {
      const canvasArea = element.classList.contains('canvas-area') ? element : element.closest('.canvas-area');
      
      if (canvasArea) {
        // Simular evento de drop
        const dropEvent = new CustomEvent('touchDrop', {
          detail: { sidebarObjectData: data }
        });
        canvasArea.dispatchEvent(dropEvent);
      }
    }
  }, [data]);

  // Eventos de drag para desktop
  const handleDragStart = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.setData('sidebarObjectData', data);
    e.dataTransfer.effectAllowed = 'copy';
    
    // Atualizar estado global
    globalDragState.isDragging = true;
    globalDragState.isSidebarDrag = true;
    globalDragState.draggedObjectId = null;
    
    onDragStart?.(data);
  }, [data, onDragStart]);

  const handleDragEnd = useCallback(() => {
    globalDragState.isDragging = false;
    globalDragState.isSidebarDrag = false;
    globalDragState.draggedObjectId = null;
    onDragEnd?.();
  }, [onDragEnd]);

  // Eventos de touch para mobile
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLElement>) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    touchElement.current = e.currentTarget as HTMLElement;
    
    // NÃO prevenir comportamentos padrão no touchStart para permitir clicks
    // O preventDefault será chamado apenas no touchMove quando realmente arrastar
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLElement>) => {
    if (!touchStartPos.current || !touchElement.current) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);
    
    // Iniciar drag se movimento for suficiente
    if (!isDragging.current && (deltaX > 10 || deltaY > 10)) {
      isDragging.current = true;
      
      // Atualizar estado global
      globalDragState.isDragging = true;
      globalDragState.isSidebarDrag = true;
      globalDragState.draggedObjectId = null;
      
      // Criar elemento visual para feedback
      createDragImage(touchElement.current, touch.clientX, touch.clientY);
      
      onDragStart?.(data);
    }
    
    if (isDragging.current) {
      // Atualizar posição do elemento visual
      updateDragImage(touch.clientX, touch.clientY);
      
      // Detectar elemento embaixo do dedo
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      handleTouchDragOver(elementBelow);
    }
    
    e.preventDefault();
  }, [data, onDragStart, createDragImage, updateDragImage, handleTouchDragOver]);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLElement>) => {
    if (isDragging.current) {
      const touch = e.changedTouches[0];
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      
      // Simular drop
      handleTouchDrop(elementBelow);
      
      // Limpar estado
      isDragging.current = false;
      globalDragState.isDragging = false;
      globalDragState.isSidebarDrag = false;
      globalDragState.draggedObjectId = null;
      
      removeDragImage();
      onDragEnd?.();
    }
    
    touchStartPos.current = null;
    touchElement.current = null;
    e.preventDefault();
  }, [onDragEnd, handleTouchDrop, removeDragImage]);

  return {
    // Props para desktop drag
    draggable: true,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    
    // Props para mobile touch
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
}
