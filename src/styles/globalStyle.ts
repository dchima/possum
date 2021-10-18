import { createGlobalStyle } from 'styled-components';

/**
 * Default Global Styling
 */
export default createGlobalStyle`

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fff;
    font-family: 'Open Sane', sans-serif;
  }

`;