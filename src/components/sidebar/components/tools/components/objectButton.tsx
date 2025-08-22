import { useDragAndTouch } from "../../../../../hooks/useDragAndTouch";
import type { AnyObject } from "../../../../../types/objects";

// Componente para cada botão de objeto com drag and touch
export  function ObjectButton({ obj, handleAddObject }: { obj: AnyObject, handleAddObject: (object: AnyObject) => void }) {
    const dragAndTouchProps = useDragAndTouch({
      data: JSON.stringify(obj),
      onDragStart: (data) => {
        console.log('🚀 Drag/Touch started with data:', data);
      },
      onDragEnd: () => {
        console.log('🏁 Drag/Touch ended');
      }
    });

      function handleAddObjectClick(obj: AnyObject) {
    return () => handleAddObject(obj);
  }

    return (
      <button 
        key={obj.id} 
        data-object={JSON.stringify(obj)}
        onClick={handleAddObjectClick(obj)}
        {...dragAndTouchProps}
        style={{
          cursor: 'grab',
          padding: '8px 12px',
          margin: '4px 0',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s ease'
        }}
      >
        {obj.icon} {obj.label}
      </button>
    );
  }