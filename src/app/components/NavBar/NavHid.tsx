import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WrapperNavHid } from '../Wrappers';

const NavHidBG = styled.div`
  z-index: 1;
  filter: alpha(opacity=60);
  background-color: #001803;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Heading = styled.h2`
  position: absolute;
  font-size: 1.4rem;
  font-weight: 992;
  text-transform: uppercase;
  white-space: nowrap;
  left: -0.7rem;
`;

const NavHidContent = styled.div`
  opacity: 1 !important;
  position: relative;
  z-index: 2;
  color: white;
  // text-shadow: 3px 3px 3px black;
`;

const UlContent = styled.ul`
  padding: 2.5rem 0 0 0.5rem;
`;

const NavHid: React.FC<{ navStat?: boolean }> = ({ navStat = false }) => {
  const [animEnd, setAnimEnd] = useState(false);

  // useEffect(() => {
  //   if (!navStat) {
  //     setAnimEnd(false);
  //   }
  // }, [navStat]);

  return (
    <>
      <WrapperNavHid>
        {animEnd && (
          <NavHidContent
            className={`${navStat ? 'flicker-in' : 'pre-flicker-in'} text-glow`}
          >
            <Heading>「Featured Images」</Heading>
            <UlContent>
              <li>Coffee</li>
              <li>Tea</li>
              <li>Milk</li>
              <li>Coffee</li>
              <li>Tea</li>
              <li>Milk</li>
            </UlContent>
          </NavHidContent>
        )}
        <NavHidBG
          id="NavHidBG"
          className={`${navStat ? 'flicker-in' : 'pre-flicker-in'}`}
          onAnimationEnd={() => {
            setTimeout(() => {
              setAnimEnd(navStat);
            }, 200);
          }}
        />
      </WrapperNavHid>
    </>
  );
};

export default NavHid;