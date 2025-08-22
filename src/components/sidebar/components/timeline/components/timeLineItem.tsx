import type { ViewMode } from '../../../../../types';
import type { AnyObject } from '../../../../../types/objects';
import DragObject from '../../../../dragComponent/dragObject';
import { TimeLineItemCard } from './timeLineItem.styles';

export interface TimeLineItemProps {
  obj: AnyObject;
  index: number;
  mode: ViewMode ;
  onClick?: (obj: AnyObject) => void;
}

function TimeLineItem(props: TimeLineItemProps) {
  function handleClick() {
    if (props.onClick) {
      props.onClick(props.obj);
    }
  }

  return (
     <DragObject isTimeLine={true} index={props.index} mode={props.mode} object={props.obj}>
    <TimeLineItemCard onClick={handleClick}>
      <div className="item-icon">
        {props.obj.icon}
      </div>
      <div className="item-content">
        <div className="item-name">
          {props.obj.label}
        </div>
        <div className="item-type">
          {props.obj.type}
        </div>
      </div>
      <div className="item-index">
        #{props.index + 1}
      </div>
    </TimeLineItemCard>
    </DragObject>
  );
}

export default TimeLineItem;
