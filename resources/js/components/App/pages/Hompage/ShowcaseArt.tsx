import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
  easings
} from 'react-spring';
import { usePalette } from 'react-palette'

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

const IMAGES = [
  "./images/art/art_0.jpg",
  "./images/art/art_1.jpg",
  "./images/art/art_2.jpg"
];

export default function ShowcaseArt(){
  const [activeIndex, setActiveIndex] = useState(0);
  const [delayC, setDelay] = useState(false);
  const [delayMS, setDelayMS] = useState(500);
  const springApi = useSpringRef();

  const Arts = IMAGES.map(image => {
    const { data, loading, error } = usePalette(image)
    return ({img: image, color: data.vibrant})
  })

  const [bgColor, setBgColor] = useState<any>(Arts[0].color)
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
        setActiveIndex(activeIndex === IMAGES.length - 1 ? 0 : activeIndex + 1);
      }
      const nextindex = activeIndex === IMAGES.length - 1 ? 0 : activeIndex + 1
      if(!delayC){
        setBgColor(Arts[nextindex].color)
      }

      setDelay(!delayC);
      setDelayMS(delayC ? 50 : 3000);
    },
    exitBeforeEnter: true,
    delay: delayMS,
    ref: springApi
  });


  const [show, setShow] = useState(false)

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
                <h1>LOGO HERE</h1>
              </div>
              <Sleeve style={{
                backgroundColor: `${Arts[item].color}75`,
                translateX
              }}/>
              <Frame style={{clipPath, display: 'flex'}} src={IMAGES[item]}/>
            </div>
          )
        })}
      </div>
    </>
  );
};

// {
//   backgroundColor: data.vibrant,
//   position: 'absolute',
//   top: 0,
//   bottom: 0,
//   left: 0,
//   right: 0,
//   height: '100vh',
//   margin: 'auto',
//   translateX
// }