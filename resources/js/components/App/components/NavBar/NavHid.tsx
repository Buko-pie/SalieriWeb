import React, { useState } from 'react';
import styled from 'styled-components';
import { WrapperNavHid } from '../Wrappers';
import { Art } from '../../types'

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
  margin: 0 0 1rem 0;
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
  list-style-type: none;
  font-weight: 700;
  letter-spacing: 0.15rem;
`;

// let users = [];

// const fetchUsers = async () =>
//   await (await fetch('http://localhost:9000/getusers')).json();
// // await (await fetch('/.netlify/functions/getusers')).json();

// fetchUsers().then(data => {
//   console.log(data);
//   users = data;
// });

const NavHid: React.FC<{ Arts: Art[], navStat?: boolean }> = ({ Arts, navStat = false }) => {
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
              {Arts.map(art => {
                return (
                  <a onClick={() => {
                    window.open(art['link'], '_blank');
                  }}>
                    <li style={{margin: '1rem 0 0 0', lineHeight: '0.8rem', cursor: 'pointer'}} className="hover-glow">
                      <p style={{margin: '0'}}>{art['title']}</p>
                      <span style={{fontWeight: '100'}}>{art['date']}</span>
                    </li>
                  </a>
                );
              })}
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
