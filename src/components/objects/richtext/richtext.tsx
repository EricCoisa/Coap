import { useRef, useEffect, useState, useMemo } from 'react';
import Quill, { Delta } from 'quill';
import 'quill/dist/quill.snow.css';
// Importar módulos específicos do Quill para garantir funcionalidade
import 'quill/dist/quill.core.css';
import { RichTextContainer, RichTextViewer } from './richtext.styles';
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

type ToolbarConfig = ToolbarOption[][] | ToolbarOption[] | string | false;

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
      toolbar === false ? false : {
        container: toolbar
      }
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
    
    if (container && mode === 'edit' && !isQuillInitialized && !quillInstance.current) {
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
        theme: 'snow',
        modules: quillModules,
        formats: quillFormats,
        placeholder: 'Digite seu texto rico aqui...'
      });

      console.log('Quill criado:', quillInstance.current);

      // Marcar como inicializado APÓS criar com sucesso
      setIsQuillInitialized(true);

      // Definir conteúdo inicial se existir
      if (currentValue.current) {
        setQuillContent(quillInstance.current, currentValue.current);
      }

      // Listener para mudanças
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

    // Cleanup apenas quando o modo mudar para não-edit
    if (mode !== 'edit' && quillInstance.current) {
      console.log('Limpando Quill - mudança de modo');
      quillInstance.current.off('text-change');
      if (container) {
        container.innerHTML = ''; // Limpar DOM
      }
      quillInstance.current = null;
      setIsQuillInitialized(false);
    }

    // Cleanup para Strict Mode
    return () => {
      // No Strict Mode, este cleanup roda após primeira execução
      // MAS só limpamos se realmente vamos desmontar
      if (mode === 'edit') {
        console.log('Strict Mode cleanup - mantendo instância');
        return; // Não limpar no Strict Mode se ainda estamos em modo edit
      }
    };

  }, [mode, isQuillInitialized, quillModules, quillFormats]);

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
    if (quillInstance.current && isQuillInitialized && mode === 'edit') {
      // Verificar se o conteúdo atual é diferente do novo value
      const currentHtml = quillInstance.current.root.innerHTML;
      const newHtml = getHtmlFromValue(value);
      
      if (newHtml !== currentHtml) {
        isUpdating.current = true;
        setQuillContent(quillInstance.current, value);
        isUpdating.current = false;
      }
    }
  }, [value, mode, isQuillInitialized]);

  // Função para renderizar apenas o conteúdo HTML no modo view
  function renderViewContent() {
    const htmlContent = getHtmlFromValue(value) || '<p>Clique para editar...</p>';
    
    return (
      <RichTextViewer 
        dangerouslySetInnerHTML={{ 
          __html: htmlContent
        }} 
      />
    );
  }

  if (mode === 'view') {
    return renderViewContent();
  }

  return (
    <RichTextContainer>
      <div ref={containerRef} />
    </RichTextContainer>
  );
}

export default RichText;
