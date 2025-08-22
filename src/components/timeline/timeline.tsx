
import type { RootStateBase } from '../../store/rootReducer';
import type { BaseComponentProps } from '../../types';
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { TimeLine, TimeLineTitle, TimeLineContainer, ToolsOptions, MinimizeButton, TimeLineContent, TimeLineHeader } from './timeline.styles';
import Switch from '../switch/switch';

const connector = connectUtil(
  (state: RootStateBase) => ({
    objectsUsed: state.ApplicationReducer.ObjectsUsed ?? [],
  }),
  { }
);

export interface TimeLineProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
  isMinimized: boolean;
}

function TimeLineComponent(props : TimeLineProps) {

  return (
    <TimeLine className={props.className} style={props.style} $isMinimized={props.isMinimized}>
      <TimeLineHeader>
        <TimeLineTitle $isMinimized={props.isMinimized}>Objetos</TimeLineTitle>
      </TimeLineHeader>
      <TimeLineContent $isMinimized={props.isMinimized}>
        <TimeLineContainer>
          {props.objectsUsed.length > 0 && (
            props.objectsUsed.map(obj => (
              <ObjectButton key={obj.id} obj={obj} />
            ))
        )}
        </TimeLineContainer>
      </TimeLineContent>
    </TimeLine>
  );
}

const ConnectedTimeLine = connector(TimeLineComponent);
export default ConnectedTimeLine;
