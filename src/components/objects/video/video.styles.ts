import styled from 'styled-components';

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  input[type="text"], input[type="url"] {
    padding: 0.5rem;
    border: 2px solid #dee2e6;
    border-radius: 6px;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    transition: border-color 0.2s ease;
    width: 100%;
    box-sizing: border-box;
    &:focus {
      outline: none;
      border-color: #007acc;
      box-shadow: 0 0 0 3px rgba(0, 122, 204, 0.1);
    }
  }

  label {
    font-size: 0.95rem;
    font-weight: 500;
    color: #495057;
    margin-bottom: 0.25rem;
  }

  .video-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 150px;
    border: 2px dashed #dee2e6;
    border-radius: 8px;
    background: #f8f9fa;
    color: #6c757d;
    text-align: center;
    padding: 2rem;
    width: 100%;
    .placeholder-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
    p {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 500;
    }
  }

  iframe, video {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    background: #000;
    margin: 0 auto;
    display: block;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    gap: 0.75rem;
    .video-placeholder {
      min-height: 100px;
      padding: 1rem;
      .placeholder-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }
    }
    iframe, video {
      max-height: 220px;
    }
  }
`;
