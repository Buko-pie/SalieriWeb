import React, { useState } from 'react';
// import { Helmet } from 'react-helmet-async';
import { easings, useSpring } from 'react-spring';
// import ShowcaseArt from './ShowcaseArt';
import Nav from '../../components/NavBar/Nav';
import NavHid from '../../components/NavBar/NavHid';
import TextScroller from '../../components/TextScroller';
import ShowcaseArt from './ShowcaseArt';
import { NavBtn } from '../../components/Buttons/Buttons';
import {
  WrapperPage,
  WrapperContent,
  WrapperZNdx,
} from '../../components/Wrappers';
import * as styl from '../../styles/global-styles';

export default function HomePage() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navStat, setNavStat] = useState(false);
  const animNav = useSpring({
    translateX: isNavOpen ? 288 : 0,
    zIndex: 999,
    onRest: () => {
      if (isNavOpen) {
        setNavStat(true);
      }
    },
  });

  const handleOpenEvent = () => {
    setIsNavOpen(!isNavOpen)
    setTimeout(() => {
      setNavStat(true);
    }, 150);
  }
  // TODO: Make states efficient in refactor;
  return (
    <>
      <WrapperPage>
        <styl.Flex>
          <styl.ShadowBox>
            <Nav />
          </styl.ShadowBox>
        </styl.Flex>
        <styl.Flex>
          <styl.AnimFlex
            id="opening"
            style={animNav}
          >
            <NavHid navStat={navStat} />
            <styl.ShadowBox>
              <TextScroller />
            </styl.ShadowBox>
            <WrapperZNdx>
              <div onClick={() => handleOpenEvent()}>
                <NavBtn />
              </div>
            </WrapperZNdx>
          </styl.AnimFlex>
        </styl.Flex>
        <WrapperContent style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          margin: '0 0 0 8rem',
          zIndex: 0,
        }}>
          <ShowcaseArt />
        </WrapperContent>
      </WrapperPage>
    </>
  );
}
