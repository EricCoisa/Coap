import 'styled-components';
import { Theme } from './defaultTheme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
