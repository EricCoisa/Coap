import styled from 'styled-components';

export const RichTextContainer = styled.div`
  padding: 8px;
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  
  .ql-container {
    flex: 1;
    width: 100%;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-radius: 0 0 4px 4px;
    font-family: inherit;
    height: auto;
  }
  
  .ql-editor {
    height: auto;
    max-height: none;
    width: 100%;
    font-size: 14px;
    line-height: 1.5;
    overflow-y: auto;
    resize: vertical;
    box-sizing: border-box;
  }
  
  .ql-toolbar {
    width: 100%;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-radius: 4px 4px 0 0;
    flex-shrink: 0;
    box-sizing: border-box;
  }
  
  &.view-mode {
    .ql-toolbar {
      display: none;
    }
    
    .ql-container {
      border: none;
      border-radius: 4px;
    }
    
    .ql-editor {
      padding: 8px;
      background: transparent;
    }
  }
`;

export const RichTextViewer = styled.div`
  padding: 8px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  
  /* Estilos para elementos HTML do Quill */
  h1, h2, h3, h4, h5, h6 {
    margin: 0.5em 0;
  }
  
  p {
    margin: 0.5em 0;
  }
  
  ul, ol {
    margin: 0.5em 0;
    padding-left: 1.5em;
  }
  
  blockquote {
    border-left: 4px solid #ccc;
    margin: 0.5em 0;
    padding-left: 1em;
    font-style: italic;
  }
  
  strong {
    font-weight: bold;
  }
  
  em {
    font-style: italic;
  }
  
  u {
    text-decoration: underline;
  }
  
  s {
    text-decoration: line-through;
  }
`;
