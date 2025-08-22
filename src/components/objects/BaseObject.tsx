import React from 'react';
import { MoveObject, RemoveObject, AddObject, SetInsertMode } from '../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../store/rootReducer';
import type { BaseComponentProps, ViewMode } from '../../types';
import type { AnyObject } from '../../types/objects/index';

import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';

import {
  BaseObjectContainer,
  ActionButtonsContainer,
  RemoveButton,
} from './baseObject.styles';
import DragObject from '../dragComponent/dragObject';


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
}

export interface BaseObjectProps extends BaseComponentProps, IBaseObjectProps, PropsFromRedux<typeof connector> {
}

function BaseObject(props: BaseObjectProps) {

  function handleRemove() {
    if (props.RemoveObject && props.object) {
      props.RemoveObject(props.object);
    }
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

console.log(props.mode, "MODO")
  return (
    <DragObject isTimeLine={false} index={props.index} mode={props.mode} object={props.object}>
      <BaseObjectContainer>
        {props.mode === 'editor' &&

          <ActionButtonsContainer>
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
    </DragObject>
  );
}

const ConnectedBaseObject = connector(BaseObject);
export default ConnectedBaseObject;
