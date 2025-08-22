import React from 'react';
import type { RootStateBase } from '../../store/rootReducer';
import type { BaseComponentProps } from '../../types';
import { ObjectElements } from '../../types/objects/index';
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { 
  PreviewContainer, 
  PreviewContent, 
  PreviewTitle,
  PreviewArea,
  EmptyState
} from './preview.styles';


const connector = connectUtil(
  (_state: RootStateBase) => ({
    objectsUsed: _state.ApplicationReducer.ObjectsUsed ?? []
  }),
  { }
);

export interface PreviewProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
}

function Preview( props : PreviewProps) {
  
  // Exemplo: buscar os objetos usados do editor (ajuste conforme integração real)
  // Aqui simula que Preview recebe os mesmos objetos do Editor
  // Substitua por props.objectsUsed se conectar ao Redux

  return (
    <PreviewContainer className={props.className} style={props.style}>
      <PreviewContent>
        <PreviewTitle>Visualização do Conteúdo</PreviewTitle>
        <PreviewArea id="preview-area">
          {props.objectsUsed.length === 0 ? (
            <EmptyState>
              <h3>Nenhum conteúdo para visualizar</h3>
              <p>Crie objetos no Editor para vê-los aqui em modo de visualização.</p>
            </EmptyState>
          ) : (
            props.objectsUsed.map((o, i) => {
              const Component = ObjectElements.find(element => element.type === o.type)?.element;
              return Component ? React.createElement(Component, { object: o, index: i, mode: 'preview' }) : null;
            })
          )}
        </PreviewArea>
      </PreviewContent>
    </PreviewContainer>
  );
}

const ConnectedPreview = connector(Preview);
export default ConnectedPreview;
