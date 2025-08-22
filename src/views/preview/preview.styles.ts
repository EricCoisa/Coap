import styled from 'styled-components';
import { flexCenter } from '../../styles/responsive-utils';
import { mediaQueries } from '../../styles/breakpoints';

export const PreviewContainer = styled.div`
  min-height: calc(100vh - 64px);
  background: ${({ theme }) => theme.colors.background};
  padding-top: 64px; /* Compensa o header fixo */
`;

export const PreviewContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  min-height: calc(100vh - 64px - 4rem);

  ${mediaQueries.mobile} {
    padding: 1rem;
  }
`;

export const PreviewTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 2rem 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  text-align: center;
  border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 1rem;

  ${mediaQueries.mobile} {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

export const PreviewArea = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.boxShadow};
  min-height: 600px;
  padding: 2rem;

  ${mediaQueries.mobile} {
    padding: 1.5rem;
    min-height: 400px;
  }
`;

export const EmptyState = styled.div`
  ${flexCenter};
  flex-direction: column;

  min-height: 500px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.heading};

    ${mediaQueries.mobile} {
      font-size: 1.25rem;
    }
  }

  p {
    font-size: 1rem;
    margin: 0;
    max-width: 400px;
    line-height: 1.6;
    font-family: ${({ theme }) => theme.fonts.body};

    ${mediaQueries.mobile} {
      font-size: 0.875rem;
     
    }
  }
`;
