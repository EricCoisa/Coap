import styled from 'styled-components';

export const TextContainer = styled.div`
  font-size: 12px;
  color: #000000;
  padding: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const TextViewWrapper = styled.div`
  padding: 8px;
  font-size: 12px;
  color: #000000;
  word-wrap: break-word;
  
  /* Estilos para HTML rico no modo visualização */
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