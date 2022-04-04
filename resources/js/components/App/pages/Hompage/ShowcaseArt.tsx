import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux'
import { actions, State } from "../../state";
import styled from 'styled-components';
import Logo from '../../components/Logo';
import {
  Spring,
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
function invertColor(hex?: string, bw?: boolean) {
  if(hex){
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    let R = (255 - r).toString(16);
    let G = (255 - g).toString(16);
    let B = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(R, R.length) + padZero(G, G.length) + padZero(B, B.length);
  }
  return hex
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}


const ShowcaseArt: React.FC<{Arts: Art[]}> = ({Arts}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [delayC, setDelay] = useState(false);
  const [delayMS, setDelayMS] = useState(500);
  const springApi = useSpringRef();
  const [bgColor, setBgColor] = useState(Arts[0].color)
  const [currImg, setCurrImg] = useState(Arts[0].img)
  const active = useSelector((state: State) => state.hover)
  const center = {
    display: 'flex',
    inset: '0 0 0 0',
    height: '100vh',
    margin: 'auto'
  }

  const transitions = useTransition(activeIndex, {
    from: {
      clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
      translateX: '-160%',
      width: '100vh',
    },
    enter: {
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
      translateX: '-160%',
      width: '100vh',
    },
    leave: {
      clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%) ",
      translateX: '120%',
      width: '140vh',
    },
    onRest: (_springs, _ctrl, item) => {
      const nextindex = activeIndex === Arts.length - 1 ? 0 : activeIndex + 1
      if (activeIndex === item) {
        setActiveIndex(nextindex);
      }
      if(!delayC){
        setDelay(true);
        setBgColor(Arts[nextindex].color)
      }
      if(delayC){
        setDelay(false);
        setCurrImg(Arts[activeIndex].img)
      }

      setDelayMS(delayC ? 500 : 3500);
    },
    exitBeforeEnter: true,
    delay: delayMS,
    ref: springApi
  });

  useLayoutEffect(() => {
    springApi.start();
  }, [activeIndex]);

  useEffect(() => {
    if(active !== null){
      setDelay(true)
      springApi.pause()
    }else{
      springApi.resume()
    }
  },[active])

  return (
    <>
      <div style={{position: 'relative', display: 'flex', width: '100%', height: '100%'}}>
        {transitions((springs, item) => {
          const { clipPath, translateX, width } = springs
          return(
            <div style={{position: 'relative', display: 'flex', width: '100%', height: '100%', backgroundColor: bgColor}}>
              <div style={{...center, position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{textAlign: 'center'}}>
                  <Logo src='./images/logo/logo2' size='15rem'/>
                  <h1>{item + 1} | {Arts.length}</h1>
                </div>
              </div>
              <Sleeve style={{
                backgroundColor: `${Arts[item].color}75`,
                translateX,
                width
              }}/>
              <Spring
                from={{
                  translateX: '-100%'
                }}
                to={{
                  translateX: '100%'
                }}
                reset
              >
                {props => (
                    <>
                    {!delayC &&
                      <Sleeve style={{
                        ...props,
                        backgroundColor: `${invertColor(bgColor)}`,
                      }}/>
                    }
                    </>
                  )
                }
              </Spring>

              {active !== null ?
                <Frame src={Arts[active].img}/>
                :
                <Frame style={{clipPath, display: 'flex'}} src={currImg}/>
              }
            </div>
          )
        })}
      </div>
    </>
  );
};

export default ShowcaseArt;