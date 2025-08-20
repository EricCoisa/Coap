import { connectUtil, type PropsFromRedux } from '../../../utils/reduxUtil';
import BaseObject, { type IBaseObjectProps } from '../BaseObject';
import { EditObject } from '../../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../../store/rootReducer';
import RichText from '../richtext/richtext';

const connector = connectUtil(
  (_state : RootStateBase) => ({
     objectsUsed: _state.ApplicationReducer.ObjectsUsed ?? []
  }),
  { EditObject}
);

export interface TextData  {
  content: string,
  fontSize: string,
  color: string
}

export interface TitleProps extends IBaseObjectProps, PropsFromRedux<typeof connector> {
}

function TextObject(props: TitleProps) {
  const data = props.object.data as unknown as TextData; // Garantir que data é do deste elemento

  function handleContentChange(value: string) {
    props.EditObject(props.object.id, { ...props.object.data, content: value });
  }

  return (
    <BaseObject object={props.object} index={props.index} mode={props.mode}>
      <div style={{ fontSize: 12, color: '#000000', padding: '8px' }}>

        {props.mode === 'edit' ? (
          <RichText
          value={data.content}
          setValue={handleContentChange}
          mode={props.mode}
          style={{
              width: '100%',
              minHeight: '60px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '8px',
              fontSize: 12,
              color: '#000000',
              resize: 'vertical'
            }}
          />
        ) : (
          <div style={{ padding: '8px', fontSize: 12, color: '#000000' }}>
            {data.content}
          </div>
        )}
      </div>
    </BaseObject>
  );
}

const ConnectedTextObject = connector(TextObject);
export default ConnectedTextObject;
