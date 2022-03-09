import styled from 'styled-components';

export const WrapperPage = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 0;
  display: flex;
  box-sizing: content-box;
`;

export const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  padding: 0 0;
`;

export const WrapperNav = styled.div`
  z-index: 1000;
  padding: 1rem;
  height: 100vh;
  background-color: white;
  width: 8rem;
`;

export const WrapperNavHid = styled.div`
  position: absolute;
  z-index: 998;
  // background-color: #001803;
  width: 20rem;
  height: 100vh;
  transform: translateX(-100%);
  padding: 1rem 0.5rem 1rem 3rem;

  &:after {
    content: ' ';
    display: block;
    position: relative;
    overflow: hidden;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(18, 16, 16, 0.1);
    opacity: 0;
    z-index: 2;
    pointer-events: none;
    /* animation: flicker 0.15s infinite; */
  }

  &:before {
    content: ' ';
    display: block;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
        rgba(18, 16, 16, 0) 50%,
        rgba(0, 0, 0, 0.25) 50%
      ),
      linear-gradient(
        90deg,
        rgba(255, 0, 0, 0.06),
        rgba(0, 255, 0, 0.02),
        rgba(0, 0, 255, 0.06)
      );
    z-index: 3;
    opacity: 0.6;
    background-size: auto 4px, 3px auto;
    pointer-events: none;
  }
`;

export const WrapperTxtScroller = styled.div`
  z-index: 1000;
  padding: 0.3rem;
  height: 100vh;
  background-color: black;
  min-width: 3rem;
  max-width: 3rem;
  font-size: 1.3rem;
  display: flex;
`;

export const WrapperZNdx = styled.div`
  z-index: 999;
`;
