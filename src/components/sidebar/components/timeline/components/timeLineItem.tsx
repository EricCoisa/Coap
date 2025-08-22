import type { AnyObject } from '../../../../../types/objects';
import { TimeLineItemCard } from './timeLineItem.styles';

export interface TimeLineItemProps {
  obj: AnyObject;
  index: number;
  onClick?: (obj: AnyObject) => void;
}

function TimeLineItem(props: TimeLineItemProps) {
  function handleClick() {
    if (props.onClick) {
      props.onClick(props.obj);
    }
  }

  return (
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
  );
}

export default TimeLineItem;
