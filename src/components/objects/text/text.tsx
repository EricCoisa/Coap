import { useState } from 'react';
import { connectUtil, type PropsFromRedux } from '../../../utils/reduxUtil';
import BaseObject, { type IBaseObjectProps } from '../BaseObject';
import { EditObject } from '../../../store/application/actions/applicationAction';

const connector = connectUtil(
  () => ({}),
  { EditObject}
);

export interface TextData  {
  content: string,
  fontSize: string,
  color: string
}

export interface TextProps extends IBaseObjectProps, PropsFromRedux<typeof connector> {
}

function TextObject(props: TextProps) {
  const [data, setData] = useState({
    content: 'Este é um texto de exemplo.',
    fontSize: '16px',
    color: '#000000'
  } as TextData);

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log("Texto alterado:", e.target.value);
    setData({ ...data, content: e.target.value });
    props.EditObject(props.object.id, { ...data, content: e.target.value });
  }

  return (
    <BaseObject object={props.object} index={props.index} mode={props.mode}>
      <div style={{ fontSize: 12, color: '#000000', padding: '8px' }}>

        {props.mode === 'edit' ? (
          <textarea
            value={data.content}
            onChange={handleContentChange}
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
            placeholder="Digite seu texto aqui..."
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
