import React, { useState } from 'react';
import { connectUtil, type PropsFromRedux } from '../../../utils/reduxUtil';
import BaseObject, { type IBaseObjectProps } from '../BaseObject';
import { EditObject } from '../../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../../store/rootReducer';
import { TextContainer, TopicList, TopicItem, DragButton, TopicMarker, TrashButton, AddButton } from './topic.styles';
import RichText, { type RichTextResponse } from '../richtext/richtext';

const connector = connectUtil(
  (_state: RootStateBase) => ({
    objectsUsed: _state.ApplicationReducer.ObjectsUsed ?? [],
  }),
  { EditObject }
);

import type { Delta } from 'quill';
import type { SerializableDelta } from '../richtext/richtext';

export type TopicContent = Delta | string | SerializableDelta;
export interface TopicItem {
  content: TopicContent;
}

export interface TopicData {
  topics: TopicItem[];
}

export interface TopicProps extends IBaseObjectProps, PropsFromRedux<typeof connector> {}

function TopicObject(props: TopicProps) {
  function toDelta(content: TopicContent): Delta | string {
    if (typeof content === 'string') return content;
    if (content && typeof content === 'object' && 'ops' in content) return content as Delta;
    return '';
  }
  function getSetValueHandler(idx: number) {
    return function(value: RichTextResponse) {
      handleTopicContentChange(idx, value);
    };
  }
  const data = props.object.data as unknown as TopicData;
  const [topics, setTopics] = useState<TopicItem[]>(data.topics || []);
  const [dragIndex, setDragIndex] = useState<number | null>(null);


  function handleAddTopic() {
    const updated = [...topics, { content: '' as TopicContent }];
    setTopics(updated);
    props.EditObject(props.object.id, { ...props.object.data, topics: updated });
  }

  function handleRemoveTopic(idx: number) {
    const updated = topics.filter((_, i) => i !== idx);
    setTopics(updated);
    props.EditObject(props.object.id, { ...props.object.data, topics: updated });
  }

  function handleTopicContentChange(idx: number, value: RichTextResponse) {
    const updated = topics.map((topic, i) =>
      i === idx ? { ...topic, content: value.delta } : topic
    );
    setTopics(updated);
    props.EditObject(props.object.id, { ...props.object.data, topics: updated });
  }

  function handleDragStart(idx: number) {
    setDragIndex(idx);
  }

  function handleDrop(idx: number) {
    if (dragIndex === null || dragIndex === idx) return;
    const updated = [...topics];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(idx, 0, removed);
    setTopics(updated);
    setDragIndex(null);
    props.EditObject(props.object.id, { ...props.object.data, topics: updated });
  }

  // Removido input

  function handleDragOver(e: React.DragEvent<HTMLLIElement>) {
    e.preventDefault();
  }

  // Funções para evitar arrow functions no JSX
  function handleRemoveTopicClick(event: React.MouseEvent<HTMLButtonElement>) {
    const idx = Number(event.currentTarget.getAttribute('data-idx'));
    handleRemoveTopic(idx);
  }

  function handleDragStartWrapper(event: React.DragEvent<HTMLLIElement>) {
    const idx = Number(event.currentTarget.getAttribute('data-idx'));
    handleDragStart(idx);
  }

  function handleDropWrapper(event: React.DragEvent<HTMLLIElement>) {
    const idx = Number(event.currentTarget.getAttribute('data-idx'));
    handleDrop(idx);
  }

  return (
    <BaseObject object={props.object} index={props.index} mode={props.mode}>
      <TextContainer>
        {props.mode !== 'preview' && (
          <AddButton onClick={handleAddTopic}>Adicionar tópico</AddButton>
        )}
        <TopicList>
          {topics.map((topic, idx) => (
            <TopicItem
              key={idx}
              draggable={props.mode !== 'preview'}
              data-idx={idx}
              onDragStart={props.mode !== 'preview' ? handleDragStartWrapper : undefined}
              onDragOver={props.mode !== 'preview' ? handleDragOver : undefined}
              onDrop={props.mode !== 'preview' ? handleDropWrapper : undefined}
              isDraggable={props.mode !== 'preview'}
            >
              {/* Botão de mover (drag handle) */}
              {props.mode !== 'preview' && (
                <DragButton
                  title="Mover tópico"
                  tabIndex={-1}
                  disabled
                >
                  ☰
                </DragButton>
              )}
              {/* Marcador de tópico */}
              <TopicMarker>•</TopicMarker>
              <div style={{ flex: 1 }}>
                <RichText
                  value={toDelta(topic.content)}
                  setValue={getSetValueHandler(idx)}
                  mode={props.mode}
                />
              </div>
              {/* Ícone de lixeira para remover */}
              {props.mode !== 'preview' && (
                <TrashButton
                  data-idx={idx}
                  onClick={handleRemoveTopicClick}
                  title="Remover tópico"
                >
                  🗑️
                </TrashButton>
              )}
            </TopicItem>
          ))}
        </TopicList>
      </TextContainer>
    </BaseObject>
  );
}

const ConnectedTopicObject = connector(TopicObject);
export default ConnectedTopicObject;
