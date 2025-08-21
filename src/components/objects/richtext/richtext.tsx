import { useRef, useEffect, useState, useMemo } from 'react';
import Quill, { Delta } from 'quill';
import 'quill/dist/quill.snow.css';
// Importar módulos específicos do Quill para garantir funcionalidade
import 'quill/dist/quill.core.css';
import { RichTextContainer } from './richtext.styles';
import type { ObjectMode } from '../../../types/objects';
import type { BaseComponentProps } from '../../../types';

// Tipos para configuração da toolbar do Quill
type ToolbarOption = 
  | 'bold' | 'italic' | 'underline' | 'strike'
  | 'blockquote' | 'code-block'
  | 'link' | 'image' | 'video'
  | 'clean'
  | { 'header': number[] | number | false }
  | { 'font': string[] | false }
  | { 'size': string[] | false }
  | { 'color': string[] | false }
  | { 'background': string[] | false }
  | { 'align': string[] | false }
  | { 'list': 'ordered' | 'bullet' }
  | { 'indent': '+1' | '-1' }
  | { 'direction': 'rtl' | false }
  | { 'script': 'sub' | 'super' };

export type ToolbarConfig = ToolbarOption[][] | ToolbarOption[] | string | false;

// Tipo para definir estilos iniciais (formatação de texto)
export type DefaultStyle = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  font?: string;
  size?: string;
  color?: string;
  background?: string;
  align?: string;
  header?: number | false;
  [key: string]: unknown; // Para permitir outras propriedades do Quill
};

export interface RichTextResponse{
    values: string;
    delta: Delta
}

export interface RichTextProps extends BaseComponentProps{
    value:string | Delta;
    setValue: (value: RichTextResponse) => void;
    mode : ObjectMode;
    toolbar?: ToolbarConfig; // Configuração da toolbar do Quill
    formats?: string[]; // Formatos permitidos do Quill
    defaultStyle?: DefaultStyle; // Estilo inicial do texto
}

// Configuração dos módulos do Quill
const modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['clean']
    ]
  }
};

// Formatos permitidos padrão
const defaultFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list',
  'color', 'background',
  'align',
  'blockquote', 'code-block'
];

// Função para verificar se value é Delta
function isDelta(val: string | Delta): val is Delta {
  return typeof val === 'object' && val !== null && 'ops' in val;
}

// Função para obter HTML do value (seja string ou Delta)
function getHtmlFromValue(val: string | Delta): string {
  if (!val) return '';
  
  if (typeof val === 'string') {
    return val;
  }
  
  // Se for Delta, criar uma instância temporária do Quill para converter
  if (isDelta(val)) {
    const tempDiv = document.createElement('div');
    const tempQuill = new Quill(tempDiv);
    tempQuill.setContents(val);
    const html = tempQuill.root.innerHTML;
    tempDiv.remove();
    return html;
  }
  
  return '';
}

// Função para definir conteúdo no Quill baseado no tipo do value
function setQuillContent(quill: Quill, val: string | Delta) {
  if (!val) {
    quill.setContents([]);
    return;
  }

  if (typeof val === 'string') {
    // Se for string HTML
    quill.clipboard.dangerouslyPasteHTML(val);
  } else if (isDelta(val)) {
    // Se for Delta
    quill.setContents(val);
  }
}

function RichText(props: RichTextProps) {
  const { value, setValue, mode, toolbar, formats } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);
  const isUpdating = useRef(false);
  const [isQuillInitialized, setIsQuillInitialized] = useState(false);
  const setValueRef = useRef(setValue);
  const currentValue = useRef(value);

  console.log('RichText renderizado - mode:', mode, 'value:', value, 'setValue:', !!setValue);

  // Configurar módulos e formatos baseado nas props usando useMemo
  const quillModules = useMemo(() => ({
    toolbar: toolbar !== undefined ? (
      toolbar === false ? false : (
        Array.isArray(toolbar) ? toolbar : {
          container: toolbar
        }
      )
    ) : modules.toolbar
  }), [toolbar]);
  
  const quillFormats = useMemo(() => formats || defaultFormats, [formats]);

  // Manter refs atualizadas
  useEffect(() => {
    setValueRef.current = setValue;
    currentValue.current = value;
  });

  useEffect(() => {
    const container = containerRef.current;
    console.log('useEffect Quill - container:', container, 'mode:', mode, 'isQuillInitialized:', isQuillInitialized, 'quillInstance.current:', quillInstance.current);
    
    if (container && !isQuillInitialized && !quillInstance.current) {
      console.log('Inicializando Quill - primeira vez');
      
      // Verificar se já existe uma instância Quill neste container
      const existingEditor = container.querySelector('.ql-editor');
      if (existingEditor) {
        console.log('Container já tem Quill órfão, limpando completamente');
        container.innerHTML = ''; // Limpar container completamente
      }
      
      // Criar nova instância do Quill
      console.log("instantiate")
      quillInstance.current = new Quill(container, {
        theme: mode === 'view' ? 'bubble' : 'snow',
        modules: mode === 'view' ? { toolbar: false } : quillModules,
        formats: quillFormats,
        placeholder: mode === 'edit' ? 'Digite seu texto rico aqui...' : '',
        readOnly: mode === 'view'
      });

      console.log('Quill criado:', quillInstance.current);

      // Marcar como inicializado APÓS criar com sucesso
      setIsQuillInitialized(true);

      // Definir conteúdo inicial se existir
      if (currentValue.current) {
        setQuillContent(quillInstance.current, currentValue.current);
      }

      // Aplicar estilo inicial se definido - apenas no modo edit
      if (props.defaultStyle && mode === 'edit') {
        setTimeout(() => {
          if (quillInstance.current && props.defaultStyle) {
            const length = quillInstance.current.getLength();
            console.log('Aplicando defaultStyle:', props.defaultStyle, 'no conteúdo de length:', length);
            
            if (length > 1) { // > 1 porque Quill sempre tem um \n no final
              quillInstance.current.formatText(0, length - 1, props.defaultStyle as Record<string, unknown>);
            }
            
            // Também definir formato padrão para novo texto
            Object.entries(props.defaultStyle).forEach(([key, value]) => {
              if (value !== undefined && quillInstance.current) {
                quillInstance.current.format(key, value);
              }
            });
          }
        }, 0);
      }

      // Listener para mudanças - apenas no modo edit
      if (mode === 'edit') {
        console.log('Registrando listener text-change');
        quillInstance.current.on('text-change', () => {
          console.log('Event text-change disparado!');
          if (quillInstance.current && !isUpdating.current) {
            const html = quillInstance.current.root.innerHTML;
            console.log('Texto alterado:', html);
            console.log('setValueRef.current:', setValueRef.current);
            setValueRef.current({
              values: html,
              delta: quillInstance.current.getContents()
            });
          } else {
            console.log('Listener ignorado - isUpdating:', isUpdating.current, 'quillInstance:', !!quillInstance.current);
          }
        });
      }
    }

    // Atualizar readOnly quando o modo mudar
    if (quillInstance.current && isQuillInitialized) {
      const shouldBeReadOnly = mode === 'view';
      if (quillInstance.current.isEnabled() === shouldBeReadOnly) {
        quillInstance.current.enable(!shouldBeReadOnly);
      }
    }

    // Cleanup para Strict Mode
    return () => {
      // No Strict Mode, este cleanup roda após primeira execução
      // MAS só limpamos se realmente vamos desmontar
      if (mode === 'edit' || mode === 'view') {
        console.log('Strict Mode cleanup - mantendo instância');
        return; // Não limpar no Strict Mode se ainda estamos em uso
      }
    };

  }, [mode, isQuillInitialized, quillModules, quillFormats, props.defaultStyle]);

  // Cleanup no unmount do componente
  useEffect(() => {
    return () => {
      if (quillInstance.current) {
        console.log('Limpando Quill - unmount');
        quillInstance.current.off('text-change');
        quillInstance.current = null;
        setIsQuillInitialized(false);
      }
    };
  }, []);

  // Atualizar conteúdo quando value mudar externamente
  useEffect(() => {
    if (quillInstance.current && isQuillInitialized) {
      // Verificar se o conteúdo atual é diferente do novo value
      const currentHtml = quillInstance.current.root.innerHTML;
      const newHtml = getHtmlFromValue(value);
      
      if (newHtml !== currentHtml) {
        isUpdating.current = true;
        setQuillContent(quillInstance.current, value);
        
        // Reaplicar defaultStyle após definir o conteúdo - apenas no modo edit
        if (props.defaultStyle && mode === 'edit') {
          setTimeout(() => {
            if (quillInstance.current && props.defaultStyle) {
              const length = quillInstance.current.getLength();
              if (length > 1) { // > 1 porque Quill sempre tem um \n no final
                quillInstance.current.formatText(0, length - 1, props.defaultStyle as Record<string, unknown>);
              }
            }
          }, 0);
        }
        
        isUpdating.current = false;
      }
    }
  }, [value, mode, isQuillInitialized, props.defaultStyle]);

  if (mode === 'view') {
    return (
      <RichTextContainer className="view-mode">
        <div ref={containerRef} />
      </RichTextContainer>
    );
  }

  return (
    <RichTextContainer>
      <div ref={containerRef} />
    </RichTextContainer>
  );
}

export default RichText;
