import React, { useState, useRef, useEffect } from 'react';
import { Art, Config } from '../../types'
import styled from 'styled-components';
import { WrapperNav } from '../Wrappers';
import { SiTwitter, SiKofi, SiPixiv } from 'react-icons/si';
import { Flex, Grid, TextVertLR, ButtonIco } from '../../styles/global-styles';
import axios from 'axios'
import Modal from 'react-modal';
import Dashboard from '../Dashboard';
import Logo from '../Logo';

const _origin = window.location.origin;

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
    backgroundColor: '#00000080',
  },
  content: {
    backgroundColor: '#00000080',
    color: 'white',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
  },
};


Modal.setAppElement('#root');

const Nav: React.FC<{Arts: Art[], Config: Config}> = ({Arts, Config}) => {
  // let subtitle;
  const [isLogoPressed, setIsLogoPressed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isLogoPressed) {
      inputRef.current.blur();
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    if (!isLogoPressed) {
      const data = {
        step: 0,
        creds: inputRef.current.value
      }

      axios.post(`${_origin}/creds`, data)
      .then(res => {
        setIsModalOpen(true);
      })
      .catch(err => {
        console.error(err)
      })
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
        <Flex>
          <ButtonIco style={{marginLeft: 'auto'}} onClick={() => setIsModalOpen(false)}>&#x2715;</ButtonIco>
        </Flex>
        <Dashboard Arts={Arts} Config={Config}/>
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
              <Logo src='./images/logo/logo' size='5rem'/>
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
