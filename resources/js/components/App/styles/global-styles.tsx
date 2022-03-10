import styled, { createGlobalStyle } from 'styled-components';
import { StyleConstants } from './StyleConstants';
import { animated } from 'react-spring';
// import { styled } from 'styled-components/macro';
/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    overflow: hidden;
    background-color: #101010 !important;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    padding-top: ${StyleConstants.NAV_BAR_HEIGHT};
    background-color: white;
  }

  body.fontLoaded {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  p,
  label {
    line-height: 1.5em;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const Flex = styled.div`
  display: flex;
`;

export const AnimFlex = styled(animated.div)`
  display: flex;
`;

export const Grid = styled.div`
  display: grid;
`;

export const ShadowBox = styled.div`
  -webkit-filter: drop-shadow(0.3rem 0 2px #0008);
  filter: drop-shadow(0.3rem 0 2px #0008);
  z-index: 1000;
`;

export const BGSlider = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
`;

export const TextVertLR = styled.p`
  text-orientation: mixed;
  writing-mode: vertical-lr;
  transform: rotate(-180deg);
  text-transform: uppercase;
`;

export const NavOption = styled.button<{ activeIndex: boolean }>`
  background-color: ${({ activeIndex }) => (activeIndex ? 'white' : 'transparent')};
  color: ${({ activeIndex }) => (activeIndex ? 'black' : 'white')};
  border-bottom: ${({ activeIndex }) => activeIndex && '3px solid white'};
`
