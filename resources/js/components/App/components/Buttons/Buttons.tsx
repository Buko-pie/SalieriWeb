import * as React from 'react';
import styled from 'styled-components';
import { WrapperZNdx } from '../Wrappers';

const NavBtnStyle = styled.div`
  display: flex;
  // opacity: 0.5;
  position: absolute;
  height: 4rem;
  width: 4rem;
  background-color: red;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -ms-transform: translateX(-65%);
  transform: translateX(-65%);
  border-radius: 50%;
  &: hover {
    background-color: cyan;
  }
`;

const Buttons: React.FC = () => {
  return (
    <>
      <WrapperZNdx>
        <p>Buttons</p>
      </WrapperZNdx>
    </>
  );
};

export const NavBtn: React.FC = () => {
  return (
    <>
      <WrapperZNdx>
        <NavBtnStyle />
      </WrapperZNdx>
    </>
  );
};

export default Buttons;
