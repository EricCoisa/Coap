import { connectUtil, type PropsFromRedux } from '../../../utils/reduxUtil';
import BaseObject, { type IBaseObjectProps } from '../BaseObject';
import { EditObject } from '../../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../../store/rootReducer';
import RichText, { type RichTextResponse } from '../richtext/richtext';
import { TextContainer } from './title.styles';
import type { Delta } from 'quill';

const connector = connectUtil(
  (_state : RootStateBase) => ({
     objectsUsed: _state.ApplicationReducer.ObjectsUsed ?? []
  }),
  { EditObject}
);

export interface TitleData  {
  content: Delta | string, // Pode ser Delta ou string dependendo do modo
  fontSize: string,
  color: string
}

export interface TitleProps extends IBaseObjectProps, PropsFromRedux<typeof connector> {
}

function TitleObject(props: TitleProps) {
  const data = props.object.data as unknown as TitleData; // Garantir que data é do deste elemento
  function handleContentChange(value: RichTextResponse) {
    props.EditObject(props.object.id, { ...props.object.data, content: value.delta });
  }

  return (
    <BaseObject object={props.object} index={props.index} mode={props.mode}>
      <TextContainer>
        <RichText
          value={data.content}
          setValue={handleContentChange}
          mode={props.mode}
        />
      </TextContainer>
    </BaseObject>
  );
}

const ConnectedTextObject = connector(TitleObject);
export default ConnectedTextObject;
