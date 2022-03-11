import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
  easings
} from 'react-spring';
import { Art } from '../../types';

const Frame = styled(animated.div)<{ src?: string }>`
  display: flex;
  align-items: flex-start;
  position: relative;
  justify-content: flex-end;
  background: #101010;
  width: 100%;
  height: 100%;
  ${({ src }) => src &&
    `
    &:before {
      content: ' ';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-image: url(${src});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  `}
  & > * {
    position: relative;
    z-index: 2;
  }
`
const Sleeve = styled(animated.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  margin: auto;
  z-index: 10;
  backdrop-filter: invert(1);
`

const bgCont = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  margin: auto;
`


const ShowcaseArt: React.FC<{Arts: Art[]}> = ({Arts}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [delayC, setDelay] = useState(false);
  const [delayMS, setDelayMS] = useState(500);
  const springApi = useSpringRef();
  const [bgColor, setBgColor] = useState(Arts[0].color)
  const [currImg, setCurrImg] = useState(Arts[0].img)
  const center = {
    display: 'flex',
    inset: '0 0 0 0',
    height: '100vh',
    margin: 'auto'
  }

  const transitions = useTransition(activeIndex, {
    from: {
      clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
      translateX: '-100%'
    },
    enter: {
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
      translateX: '-100%'
    },
    leave: {
      clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%) ",
      translateX: '100%'
    },
    onRest: (_springs, _ctrl, item) => {
      if (activeIndex === item) {
        setActiveIndex(activeIndex === Arts.length - 1 ? 0 : activeIndex + 1);
      }
      const nextindex = activeIndex === Arts.length - 1 ? 0 : activeIndex + 1
      if(!delayC){
        setBgColor(Arts[nextindex].color)
      }
      if(delayC){
        setCurrImg(Arts[activeIndex].img)
      }

      setDelay(!delayC);
      setDelayMS(delayC ? 50 : 3000);
    },
    exitBeforeEnter: true,
    delay: delayMS,
    ref: springApi
  });

  useLayoutEffect(() => {
    springApi.start();
  }, [activeIndex]);

  return (
    <>
      <div style={{position: 'relative', display: 'flex', width: '100%', height: '100%'}}>
        {transitions((springs, item) => {
          const { clipPath, translateX } = springs
          return(
            <div style={{position: 'relative', display: 'flex', width: '100%', height: '100%', backgroundColor: bgColor}}>
              <div style={{...center, position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{textAlign: 'center'}}>
                  <Logo src='./images/logo/logo2' size='15rem'/>
                  <h1>{item + 1} / {Arts.length}</h1>
                </div>
              </div>
              <Sleeve style={{
                backgroundColor: `${Arts[item].color}75`,
                translateX
              }}/>
              <Frame style={{clipPath, display: 'flex'}} src={currImg}/>
            </div>
          )
        })}
      </div>
    </>
  );
};

export default ShowcaseArt;