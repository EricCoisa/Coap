import { connectUtil, type PropsFromRedux } from '../../../utils/reduxUtil';
import BaseObject, { type IBaseObjectProps } from '../BaseObject';
import { EditObject } from '../../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../../store/rootReducer';
import RichText, { type RichTextResponse } from '../richtext/richtext';
import type { DefaultStyle, ToolbarConfig } from '../richtext/richtext';
import type { ToolbarOption } from '../richtext/richtext';
import { ImageContainer } from './image.styles';
import type { Delta } from 'quill';
import { useState } from 'react';

const connector = connectUtil(
  (_state : RootStateBase) => ({
     objectsUsed: _state.ApplicationReducer.ObjectsUsed ?? []
  }),
  { EditObject }
);

export interface ImageData  {
  title: Delta | string; // Título da imagem
  imageUrl: string; // URL da imagem
  imageAlt: string; // Texto alternativo da imagem
  source: Delta | string; // Fonte/créditos da imagem
  imageWidth?: string; // Largura da imagem (opcional)
  imageHeight?: string; // Altura da imagem (opcional)
}

export interface ImageProps extends IBaseObjectProps, PropsFromRedux<typeof connector> {
}

function ImageObject(props: ImageProps) {
  const data = props.object.data as unknown as ImageData;
  const [isUploadSectionCollapsed, setIsUploadSectionCollapsed] = useState(false);
  
  function handleTitleChange(value: RichTextResponse) {
    props.EditObject(props.object.id, { ...props.object.data, title: value.delta });
  }

  function handleSourceChange(value: RichTextResponse) {
    props.EditObject(props.object.id, { ...props.object.data, source: value.delta });
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      // Criar URL temporária para preview
      const imageUrl = URL.createObjectURL(file);
      props.EditObject(props.object.id, { 
        ...props.object.data, 
        imageUrl,
        imageAlt: file.name 
      });
    }
  }

  function handleImageUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    const imageUrl = event.target.value;
    props.EditObject(props.object.id, { 
      ...props.object.data, 
      imageUrl 
    });
  }

  function handleAltTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    const imageAlt = event.target.value;
    props.EditObject(props.object.id, { 
      ...props.object.data, 
      imageAlt 
    });
  }

  function toggleUploadSection() {
    setIsUploadSectionCollapsed(!isUploadSectionCollapsed);
  }

  // Toolbars corrigidas para tipagem
  const titleToolbar: ToolbarConfig = [
    [{ 'header': [1, 2, 3, false] } as ToolbarOption],
    ['bold', 'italic', 'underline'] as ToolbarOption[],
    ['clean'] as ToolbarOption[]
  ];

  
  const defaultTitleStyle: DefaultStyle = {
    bold: true,
    color: '#ff0000',
    size: 'large',
    align: 'center'
  };

  function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    if (target.nextElementSibling) {
      target.nextElementSibling.classList.remove('hidden');
    }
  }

  return (
    <BaseObject object={props.object} index={props.index} mode={props.mode}>
      <ImageContainer>
        {/* Título da imagem */}
        <div className="image-title">
          <RichText
            value={data.title || ''}
            setValue={handleTitleChange}
            mode={props.mode}
            toolbar={props.mode === 'editor' ? titleToolbar : false}
            defaultStyle={defaultTitleStyle}
          />
        </div>

        {/* Upload/Configuração da imagem - apenas no modo edit */}
        {props.mode === 'editor' && (
          <div className="image-upload-section">
            <button 
              className="collapse-button"
              onClick={toggleUploadSection}
              aria-label={isUploadSectionCollapsed ? "Expandir configurações" : "Recolher configurações"}
            >
              <span className={`arrow ${isUploadSectionCollapsed ? 'collapsed' : 'expanded'}`}>
                ▼
              </span>
              {isUploadSectionCollapsed ? 'Mostrar configurações' : 'Ocultar configurações'}
            </button>
            
            {!isUploadSectionCollapsed && (
              <div className="upload-controls">
                <label htmlFor={`image-upload-${props.object.id}`} className="upload-button">
                  📁 Escolher Arquivo
                </label>
                <input
                  id={`image-upload-${props.object.id}`}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                
                <div className="url-input-group">
                  <label htmlFor={`image-url-${props.object.id}`}>
                    🔗 Ou inserir URL da imagem:
                  </label>
                  <input
                    id={`image-url-${props.object.id}`}
                    type="url"
                    value={data.imageUrl || ''}
                    onChange={handleImageUrlChange}
                    placeholder="https://exemplo.com/imagem.jpg"
                    className="url-input"
                  />
                </div>

                <div className="alt-input-group">
                  <label htmlFor={`image-alt-${props.object.id}`}>
                    ♿ Descrição para acessibilidade:
                  </label>
                  <input
                    id={`image-alt-${props.object.id}`}
                    type="text"
                    value={data.imageAlt || ''}
                    onChange={handleAltTextChange}
                    placeholder="Descreva a imagem para leitores de tela"
                    className="alt-input"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Imagem central */}
        <div className="image-display">
          {data.imageUrl ? (
            <img 
              src={data.imageUrl} 
              alt={data.imageAlt || 'Imagem'} 
              className="main-image"
              onError={handleImageError}
            />
          ) : (
            <div className="image-placeholder">
              {props.mode === 'editor' ? (
                <>
                  <span className="placeholder-icon">🖼️</span>
                  <p>Faça upload de uma imagem ou insira uma URL</p>
                </>
              ) : (
                <span className="placeholder-icon">🖼️</span>
              )}
            </div>
          )}
          {data.imageUrl && (
            <div className="image-error hidden">
              <span className="error-icon">❌</span>
              <p>Erro ao carregar imagem</p>
            </div>
          )}
        </div>

        {/* Fonte da imagem */}
        <div className="image-source">
          <RichText
            value={data.source || ''}
            setValue={handleSourceChange}
            mode={props.mode}
            toolbar={false}
          />
        </div>
      </ImageContainer>
    </BaseObject>
  );
}

const ConnectedTextObject = connector(ImageObject);
export default ConnectedTextObject;
