import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const LogoImg = styled.div<{ src?: string, size?: string }>`
  display: flex;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  position: relative;
  ${({ src }) => src &&
    `&:before {
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        background-image: url(${src});
        background-repeat: no-repeat;
        // background-attachment: fixed;
        background-position: center;
        background-size: cover;
    }`
  }
`;

const Logo: React.FC<{src? : string, size? : string}> = ({src, size='2rem'}) => {
  return (
    src ? <LogoImg src={src} size={size} /> : <p>Logo Here</p>
  )
}

export default Logo;