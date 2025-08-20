import React, { useEffect } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import type { RootStateBase } from '../../store/rootReducer';
import type { BaseComponentProps } from '../../types';
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { 
  EditorContainer, 
  EditorContent, 
  Canvas,
  CanvasArea,
  CanvasTitle
} from './editor.styles';
import { ObjectElements } from '../../types/objects/index';

const connector = connectUtil(
  (_state: RootStateBase) => ({
    objectsUsed: _state.ApplicationReducer.ObjectsUsed ?? []
  }),
  { }
);

export interface EditorProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
}



function Editor(props : EditorProps) {
  useEffect(()=>{console.log(props.objectsUsed)},[props.objectsUsed]);
  return (
    <EditorContainer className={props.className} style={props.style}>
      <EditorContent>
        <Sidebar />

        <Canvas>
          <CanvasTitle>Canvas do Editor</CanvasTitle>
          <CanvasArea>
            {props.objectsUsed.length === 0 ? (
              <p>Arraste objetos da sidebar para começar a criar seu conteúdo educacional.</p>
            ) : (
              props.objectsUsed.map((o, i) => {
                const Component = ObjectElements.find(element => element.type === o.type)?.element;
                return Component ? React.createElement(Component, { object: o, index: i, mode: "edit" }) : null;
              })
            )}
          </CanvasArea>
        </Canvas>
      </EditorContent>
    </EditorContainer>
  );
}

const ConnectedEditor = connector(Editor);
export default ConnectedEditor;

