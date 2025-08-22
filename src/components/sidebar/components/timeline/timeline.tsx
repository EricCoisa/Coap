
import type { RootStateBase } from '../../../../store/rootReducer';
import type { BaseComponentProps } from '../../../../types';
import { connectUtil, type PropsFromRedux } from '../../../../utils/reduxUtil';
import { TimeLineContainer, TimeLineContent } from './timeline.styles';
import TimeLineItem from './components/timeLineItem';

const connector = connectUtil(
  (state: RootStateBase) => ({
    objectsUsed: state.ApplicationReducer.ObjectsUsed ?? [],
    mode: state.ApplicationReducer.viewMode
  }),
  { }
);

export interface TimeLineProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
  isMinimized: boolean;
}

function TimeLineComponent(props : TimeLineProps) {

  return (
    
      <TimeLineContent $isMinimized={props.isMinimized}>
        <TimeLineContainer>
          {props.objectsUsed.length > 0 ? (
            props.objectsUsed.map((obj, index) => (
              <TimeLineItem key={obj.id} obj={obj} index={index} mode={props.mode ? props.mode : "editor"} />
            ))
          ) : (
            <div style={{ 
              textAlign: 'center', 
              color: '#6c757d', 
              fontSize: '0.875rem',
              padding: '1rem'
            }}>
              Nenhum objeto adicionado ainda
            </div>
          )}
        </TimeLineContainer>
      </TimeLineContent>
 
  );
}

const ConnectedTimeLine = connector(TimeLineComponent);
export default ConnectedTimeLine;
