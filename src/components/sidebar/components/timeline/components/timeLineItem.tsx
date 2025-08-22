type QuillDelta = { ops: { insert: string }[] };
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

  let content: string = props.obj.label;
  if (props.obj.data && props.obj.data.content) {

    if (typeof props.obj.data.content === 'string') {
      content = props.obj.data.content;
    } else if (
      typeof props.obj.data.content === 'object' &&
      props.obj.data.content !== null &&
      'ops' in props.obj.data.content &&
      Array.isArray((props.obj.data.content as QuillDelta).ops)

    ) {
      console.log("aaaaaaaaaops");
      // Se for Quill Delta, pega o primeiro insert
      const ops = (props.obj.data.content as QuillDelta).ops;
          
      if (ops.length > 0 && typeof ops[0].insert === 'string') {
         console.log("bbbbbbb", ops);  
        content = ops[0].insert;
      }
    }
  }
  console.log("ccccc", content);  

  return (
     <DragObject isTimeLine={true} index={props.index} mode={props.mode} object={props.obj}>
    <TimeLineItemCard onClick={handleClick}>
      <div className="item-icon">
        {props.obj.icon}
      </div>
      <div className="item-content">
        <div className="item-name">
          {content}
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
