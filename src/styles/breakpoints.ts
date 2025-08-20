// Breakpoints para responsividade
export const breakpoints = {
  mobile: '320px',
  mobileLarge: '480px',
  tablet: '768px',
  desktop: '1024px',
  desktopLarge: '1280px',
  desktopXL: '1440px',
};

// Media queries helpers
export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.tablet})`,
  tablet: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  desktopLarge: `@media (min-width: ${breakpoints.desktopLarge})`,
  
  // Específicos
  mobileOnly: `@media (max-width: 767px)`,
  tabletUp: `@media (min-width: ${breakpoints.tablet})`,
  desktopUp: `@media (min-width: ${breakpoints.desktop})`,
  
  // Para componentes específicos do Coap
  editorCollapse: `@media (max-width: 1200px)`,
  sidebarCollapse: `@media (max-width: 900px)`,
  mobileEditor: `@media (max-width: 768px)`,
};
