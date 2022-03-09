import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { WrapperNav } from '../Wrappers';
import { SiTwitter, SiKofi, SiPixiv } from 'react-icons/si';
import { Flex, Grid, TextVertLR } from '../../styles/global-styles';
import CryptoJS from 'crypto-js';
import Modal from 'react-modal';
import Dashboard from '../Dashboard';

const FJustifyC = styled(Flex)`
  justify-content: center;
`;

const NavContent = styled(Flex)`
  flex-flow: column nowrap;
  justify-content: space-between;
`;

const NavSocials = styled.div`
  align-items: end;
`;

const BorderB = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 0 1rem 0;
  border-style: solid;
  border-color: black;
  border-width: 0 0 0.2rem 0;
  margin: 0 0 1rem 1.8rem;
  width: 4rem;
`;

const AnchorStyle = styled.a<{ color?: string }>`
  position: relative;
  -webkit-animation: color-change-out 0.1s ease both;
  animation: color-change-out 0.1s ease both;
  &:hover {
    cursor: pointer;
    -webkit-animation: color-change-in 0.1s ease both;
    animation: color-change-in 0.1s ease both;
  }

  @-webkit-keyframes color-change-in {
    0% {
      color: black;
    }
    100% {
      color: ${({color}) => color ?? '#19dcea'};
    }
  }
  @keyframes color-change-in {
    0% {
      color: black;
    }
    100% {
      color: ${({color}) => color ?? '#19dcea'};
    }
  }

  @-webkit-keyframes color-change-out {
    0% {
      color: ${({color}) => color ?? '#19dcea'};
    }
    100% {
      color: black;
    }
  }
  @keyframes color-change-out {
    0% {
      color: ${({color}) => color ?? '#19dcea'};
    }
    100% {
      color: black;
    }
  }
`;

const TextNav = styled(TextVertLR)`
  font-size: 2rem;
  font-weight: 900;
  padding: 0 0 0 0.5rem;
`;

const InputType = styled.input`
  position: absolute;
  z-index: 0;
  top -100%;
  left -100%;
`;

const customStyles = {
  overlay: {
    zIndex: 9998,
    backgroundColor: '#484848a1',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
  },
};

// const defaultText = process.env.REACT_APP_DEFAULT_TEXT;
// const sp = process.env.REACT_APP_SP;
// const pp = process.env.REACT_APP_PP;

// var iv = CryptoJS.enc.Utf8.parse(pp);
// var decr = CryptoJS.AES.decrypt(defaultText, sp, { iv: iv });
// decr = decr.toString(CryptoJS.enc.Utf8);

// console.log('decr: ', decr);
// console.log('process.env: ', process.env);

Modal.setAppElement('#root');

const Nav: React.FC = () => {
  // let subtitle;
  const [isLogoPressed, setIsLogoPressed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    console.log('logo change')
    if (isLogoPressed) {
      inputRef.current.blur();
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    if (!isLogoPressed) {
      if (inputRef.current.value === 'test') {
        setIsModalOpen(true);
        console.log('open dashboard');
      }
      inputRef.current.blur();
      inputRef.current.value = '';
    }
  }, [isLogoPressed]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#484848e0';
  }

  function onCloseModal() {
    console.log('On Close Modal');
  }

  return (
    <>
      <Modal
          isOpen={isModalOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={onCloseModal}
          style={customStyles}
          contentLabel="Example Modal"
      >
          <button onClick={() => setIsModalOpen(false)}>X</button>
        <Dashboard />
      </Modal>
      <InputType ref={inputRef} type="text" />
      <WrapperNav className="crt inset-shadow">
        <FJustifyC style={{ height: '100%' }}>
          <NavContent>
            <div
              onMouseDown={() => setIsLogoPressed(true)}
              onMouseUp={() => setIsLogoPressed(false)}
              style={{display: 'flex', justifyContent: 'center'}}
            >
              Logo Here
            </div>
            <FJustifyC style={{ alignItems: 'end', margin: '0 0 0.5rem 0' }}>
              <NavSocials>
                <AnchorStyle
                  color="#19dcea"
                  onClick={() => {
                    window.open('https://ko-fi.com/jltan', '_blank');
                  }}
                >
                  <TextNav>
                    Ko-Fi
                  </TextNav>
                  <BorderB>
                    <SiKofi size="2.3rem" />
                  </BorderB>
                </AnchorStyle>
                <BorderB>
                  <AnchorStyle
                    // color="#fc4d50"
                    onClick={() => {
                      window.open('https://salieri09.booth.pm', '_blank');
                    }}
                  >
                    <TextNav>
                      BooTH
                    </TextNav>
                  </AnchorStyle>
                </BorderB>
                <BorderB>
                  <AnchorStyle
                    // color="#0096fa"
                    onClick={() => {
                      window.open(
                        'https://www.pixiv.net/en/users/54883714',
                        '_blank',
                      );
                    }}
                  >
                    <SiPixiv size="2rem" />
                  </AnchorStyle>
                </BorderB>
                <FJustifyC>
                  <AnchorStyle
                    // color="#1d9bf0"
                    onClick={() => {
                      window.open('https://twitter.com/JL_T4N', '_blank');
                    }}
                  >
                    <SiTwitter size="2rem" />
                  </AnchorStyle>
                </FJustifyC>
              </NavSocials>
            </FJustifyC>
          </NavContent>
        </FJustifyC>
      </WrapperNav>
    </>
  );
};

export default Nav;
