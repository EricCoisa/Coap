import { css } from 'styled-components';
import { breakpoints } from './breakpoints';

export const responsiveContainer = css`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: ${breakpoints.tablet}) {
    padding: 0 2rem;
  }
  
  @media (min-width: ${breakpoints.desktop}) {
    padding: 0 3rem;
  }
`;

export const editorLayout = css`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 200px 1fr;
  }
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
