import styled from 'styled-components';
import { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

const scaleOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.96); }
`;

export const ModalOverlay = styled.div<{ state?: 'entered' | 'exiting' }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${({ state }) => state === 'exiting' ? fadeOut : fadeIn} 0.25s ease;
`;

export const ModalContainer = styled.div<{
  size?: 'sm' | 'md' | 'lg';
  state?: 'entered' | 'exiting';
}>`
  z-index: 10000;
  background: ${({ theme }) => theme.colors.background || '#fff'};
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  min-width: ${({ size }) => size === 'sm' ? '340px' : size === 'lg' ? '720px' : '480px'};
  max-width: ${({ size }) => size === 'sm' ? '480px' : size === 'lg' ? '1080px' : '720px'};
  min-height: 180px;
  padding: 32px 48px 48px 48px;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: ${({ state }) => state === 'exiting' ? scaleOut : scaleIn} 0.25s cubic-bezier(.4,0,.2,1);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const ModalClose = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary || '#888'};
  cursor: pointer;
  padding: 0 8px;
  line-height: 1;
`;

export const ModalContent = styled.div`
  flex: 1;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;
