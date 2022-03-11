import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { Art, Config } from '../../types'

const _origin = window.location.origin;

const HomePage: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navStat, setNavStat] = useState(false);
  const [Arts, setArts] = useState<Art[]>([])
  const [configs, setConfigs] = useState<Config>()
  const animNav = useSpring({
    translateX: isNavOpen ? 288 : 0,
    zIndex: 999,
    onRest: () => {
      if (isNavOpen) {
        setNavStat(true);
      }
    },
  });

  async function settingUp(arts: Art[], configs: Config){
    setArts(arts);
    setConfigs(configs)

    arts.forEach((art) => {
      const img = new Image();
      img.src = art.img;
    });
  }

  useEffect(() => {
    axios.get(`${_origin}/fetchArts`)
    .then(res => {
      settingUp(res.data.arts, res.data.configs)
    })
    .catch(err =>{
      console.error(err);
    })
  }, [])


  const handleOpenEvent = () => {
    setIsNavOpen(!isNavOpen)
    setTimeout(() => {
      setNavStat(true);
    }, 150);
  }
  // TODO: Make states efficient in refactor;
  return (
    <>
      {Arts && Arts.length &&
        <WrapperPage>
          <styl.Flex>
            <styl.ShadowBox>
              <Nav Arts={Arts}/>
            </styl.ShadowBox>
          </styl.Flex>
          <styl.Flex>
            <styl.AnimFlex
              id="opening"
              style={animNav}
            >
              <NavHid navStat={navStat} />
              <styl.ShadowBox>
                { configs &&
                  <TextScroller textscroller={configs.textscroll}/>
                }
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
              <ShowcaseArt Arts={Arts}/>
          </WrapperContent>
        </WrapperPage>
      }
    </>
  );
}

export default HomePage