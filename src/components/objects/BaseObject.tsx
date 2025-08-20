import { MoveObject, RemoveObject } from '../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../store/rootReducer';
import type { BaseComponentProps } from '../../types';
import type { Object, ObjectMode } from '../../types/objects/index';

import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';


const connector = connectUtil(
  (_state: RootStateBase) => ({
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
  // Espera receber props: id, index, children

  function handleRemove() {
    console.log('Removendo objeto:', props.object);
    if (props.RemoveObject && props.object) {
      props.RemoveObject(props.object);
    }
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData('objectId', props.object.id.toString());
    e.dataTransfer.setData('objectIndex', props.index.toString());
  }
  
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    const draggedId = e.dataTransfer.getData('objectId');
    const draggedIndex = Number(e.dataTransfer.getData('objectIndex'));
    if (props.MoveObject && draggedId && typeof draggedIndex === 'number') {
      props.MoveObject( props.object, draggedIndex);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ position: 'relative', marginBottom: '1rem', background: '#f8f8f8', borderRadius: 8, padding: 16 }}
    >
      <button
        onClick={handleRemove}
        style={{ position: 'absolute', top: 8, right: 8, background: '#e53e3e', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 8px', cursor: 'pointer' }}
      >
        Remover
      </button>
      {props.children}
    </div>
  );
}

const ConnectedBaseObject = connector(BaseObject);
export default ConnectedBaseObject;
