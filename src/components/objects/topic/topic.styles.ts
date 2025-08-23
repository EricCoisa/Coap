export const AddButton = styled.button`
  padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    cursor: pointer;
    transition: all 0.15s ease;
    background: #3B82F6;
    color: #FFFFFF;
`;
import styled from 'styled-components';

export const TextContainer = styled.div`
  font-size: 12px;
  color: #000000;
  padding: 8px;
`;

export const TopicList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TopicItem = styled.li<{ isDraggable: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${props => props.isDraggable ? 'move' : 'default'};
  margin-bottom: 8px;
`;

export const DragButton = styled.button`
  margin-right: 8px;
  cursor: grab;
  background: transparent;
  border: none;
  font-size: 18px;
`;

export const TopicMarker = styled.span`
  margin-right: 8px;
  font-size: 22px;
  color: #333;
`;

export const TrashButton = styled.button`
  margin-left: 8px;
  background: transparent;
  border: none;
  color: #d00;
  font-size: 20px;
  cursor: pointer;
`;
