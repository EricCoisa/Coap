import type { AnyObject } from "../../../../../types/objects";

export interface ObjectButtonProps {
  obj: AnyObject;
  handleAddObject: (object: AnyObject) => void;
  isSelected?: boolean;
  isInsertMode?: boolean;
}

// Componente para cada botão de objeto - APENAS CLICK (sem drag)
export function ObjectButton({ obj, handleAddObject, isSelected = false, isInsertMode = false }: ObjectButtonProps) {
    function handleAddObjectClick(obj: AnyObject) {
      return () => handleAddObject(obj);
    }

    // Estilos dinâmicos baseados no estado - SIMPLIFICADO
    const buttonStyle = {
      cursor: 'pointer', // Mudado para pointer já que não teremos drag
      padding: '8px 12px',
      margin: '4px 0',
      border: isSelected ? '2px solid #007acc' : '1px solid #ccc',
      borderRadius: '4px',
      background: isSelected ? '#007acc15' : '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease',
      position: 'relative' as const,
      boxShadow: isSelected ? '0 0 8px rgba(0, 122, 204, 0.3)' : 'none',
      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
      // Estilos otimizados para touch
      touchAction: 'manipulation',
      userSelect: 'none' as const,
      WebkitUserSelect: 'none' as const,
      WebkitTouchCallout: 'none' as const,
      WebkitTapHighlightColor: 'transparent'
    };

    return (
      <button 
        key={obj.id} 
        data-object={JSON.stringify(obj)}
        onClick={handleAddObjectClick(obj)}
        style={buttonStyle}
        title={isInsertMode && isSelected ? 
          "Selecionado - Clique em uma área para inserir" : 
          "Clique para adicionar"
        }
      >
        {obj.icon} {obj.label}
        {isSelected && isInsertMode && (
          <span style={{ 
            marginLeft: 'auto', 
            fontSize: '0.8rem',
            color: '#007acc',
            fontWeight: 'bold'
          }}>
            ✓
          </span>
        )}
      </button>
    );
}