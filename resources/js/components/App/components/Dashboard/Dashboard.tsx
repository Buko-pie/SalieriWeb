import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Flex, NavOption, Button } from '../../styles/global-styles';
import axios from 'axios'
import { usePalette } from 'react-palette'
import { Art, Config } from '../../types'
import FastAverageColor from 'fast-average-color';
import TextScroller from '../TextScroller/TextScroller';

const _origin = window.location.origin;


const BoardFlex = styled(Flex)`
  min-width: 20rem;
  min-height: 3rem;
  height: 35rem;
  display: flex;
  align-items: center;
`;

const ArtFrame = styled.input<{ src?: string }>`
  display: flex;
  height: 14rem;
  width: 100%;
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
        z-index: 1;
        background-image: url(${src});
        background-repeat: no-repeat;
        // background-attachment: fixed;
        background-position: center;
        background-size: cover;
        -moz-box-shadow: inset 0 0 10px #000000;
        -webkit-box-shadow: inset 0 0 10px #000000;
        box-shadow: inset 0 0 10px #000000;
    }`
  }
`;

const ArtFramNum = styled.h1`
  font-size: 12rem;
  opacity: 0.3;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
`

const Dashboard: React.FC<{Arts: Art[], Config: Config}> = ({Arts, Config}) => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showArts, setShowArts] = useState(Arts);
  const [status, setStatus] = useState('');
  const [updating, setUpdating] = useState(false);
  const [txtScroller, setTxtScroller] = useState('')
  const [logos, setLogos] = useState<any[]>(['./images/logo/logo', './images/logo/logo2']);
  const [active, setActive] = useState(1)
  const fac = new FastAverageColor();

  useEffect(() => {
    setTxtScroller(Config.textscroll)
  }, [])

  const center = {
    display: 'flex',
    inset: '0 0 0 0',
    height: '100vh',
    margin: 'auto'
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      step: 1,
      creds: e.target.password.value,
    }

    axios.post(`${_origin}/creds`, data)
    .then(res => {
      setShowDashboard(true);
    })
    .catch(err => {
      console.error(err)
    })
  };

  const uploadArts = async (e: any) => {
    e.preventDefault();
    if(!updating){
      const data = new FormData();
      showArts.forEach((art, index) => {
        if (art.toUpdate) {
        data.append('index[]', `${art.id}`);
        data.append('title[]', `${art.title}`);
        data.append('date[]', `${art.date}`);
        data.append('link[]', `${art.link}`);
        if(art.file){
            data.append('artFiles[]', art.file, `art_${art.id}`);
            data.append('colors[]', `${art.color}`);
        }
        }
      });
      setUpdating(true);
      setStatus('Arts showcase updating...')
      axios.post(`${_origin}/uploadArts`, data, {
        headers: {
          'Content-Type': 'multipart/form-data  '
        }
      })
      .then(res => {
        setUpdating(false);
        setStatus('Arts showcase updated!')
      })
      .catch(err => {
        console.error(err);
        setStatus('Error: ' + err)
        setUpdating(false);
      })
    }else{
      setStatus('Arts showcase is still updating')
    }
  };

  const uploadSettings = async (e: any) => {
    e.preventDefault();

    if(!updating){
      const data = new FormData();
      if(e.target[0].value){
        data.append('textscroll', txtScroller)
      }
      if(e.target[1].files[0]){
        data.append('logo', e.target[1].files[0])
      }
      if(e.target[2].files[0]){
        data.append('logo2', e.target[2].files[0])
      }

      setUpdating(true);
      setStatus('Settings updating...')
      axios.post(`${_origin}/setConfigs`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        setUpdating(false);
        setStatus('Settings updated!')
      })
      .catch(err => {
        console.error(err);
        setStatus('Error: ' + err)
        setUpdating(false);
      })
    }else{
      setStatus('Settings is still updating')
    }
  };

  const onImgChange = async (e, index) => {
    var reader = new FileReader();
    var url = reader.readAsDataURL(e.target.files[0]);
    const test = [...showArts];

    reader.onloadend = async function (event) {
      // test[index] = {
      //   ...test[index],
      //   img: reader.result,
      //   file: e.target.files[0],
      // };

      fac.getColorAsync(`${reader.result}`)
      .then(color => {
        test[index] = {
          ...test[index],
          img: reader.result,
          file: e.target.files[0],
          color: color.hex,
          toUpdate: true,
        };
        setShowArts(test);
      })
      .catch(e => {
          console.log(e);
      });
    }.bind(this);
  };

  const onTxtChange = async (e, index, type) => {
    const temp = [...showArts];
    temp[index].toUpdate = true;
    switch (type) {
      case 0:
        temp[index].title = e.target.value;
        break;

      case 1:
        temp[index].date = e.target.value;
        break;

      case 2:
        temp[index].link = e.target.value;
        break;

      default:
        break;
    }
    setShowArts(temp);
  }

  const onLogoChange = async (e, index) => {
    var reader = new FileReader();
    var url = reader.readAsDataURL(e.target.files[0]);
    const test = [...logos];

    reader.onloadend = async function (event) {
      test[index] = reader.result;
      setLogos(test);
    }.bind(this);
  };

  const renderGetPass = () => {
    return (
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        style={{
          width: '100%',
        }}
      >
        <input
          type="password"
          id="password"
          name="password"
          placeholder="PASSWORD"
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '0.2rem solid black',
            borderRadius: '0.5rem',
          }}
        />
        <Flex>
          <Button style={{marginLeft: 'auto'}} type="submit">Submit</Button>
        </Flex>
      </form>
    );
  };

  const renderArtSetting = () => {
    return (
      <form
        style={{
          position: 'relative',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
        }}
        onSubmit={uploadArts}
      >
        <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-evenly', rowGap: '2rem', maxHeight: '24rem', overflowY: 'scroll'}}>
          {showArts.map((art : any, index : any) => {
            return (
              <div key={art.id} style={{position: 'relative'}}>
                <Flex style={{flexFlow: 'row wrap'}}>
                  <input type='text' placeholder='title' value={art.title}
                    onChange={e => onTxtChange(e, index, 0)}
                    id={`artTitle_${index}`}
                    name={`artTitle_${index}`}
                    style={{
                      padding: '0.5rem',
                      outline: 'none',
                      border: 'thin solid black'
                  }}/>
                  <input type='text' placeholder='date' value={art.date}
                    onChange={e => onTxtChange(e, index, 1)}
                    id={`artDate_${index}`}
                    name={`artDate_${index}`}
                    style={{
                      padding: '0.5rem',
                      outline: 'none',
                      border: 'thin solid black',
                      borderLeft: 'none'
                  }}/>
                </Flex>
                <input type='text' placeholder='link' value={art.link}
                  onChange={e => onTxtChange(e, index, 2)}
                  id={`artLink_${index}`}
                  name={`artLink_${index}`}
                  style={{
                    padding: '0.5rem',
                    outline: 'none',
                    width: '100%',
                    border: 'thin solid black',
                    borderTop: 'none'
                  }}/>
                <ArtFrame
                  src={art.img}
                  type="file"
                  id={`art_${index}`}
                  name={`art_${index}`}
                  multiple={false}
                  onChange={e => onImgChange(e, index)}
                  accept="image/jpeg, image/jpg"
                />
                {/* <div style={{...center, position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 3}}>
                  <ArtFramNum>{index + 1}</ArtFramNum>
                </div> */}
              </div>
            );
          })}
        </div>
        <Flex>
          <Button style={{marginLeft: 'auto'}} type="submit">Update</Button>
        </Flex>
      </form>
    )
  }

  const renderSettingsGeneral = () => {
    return (
      <form
        encType="multipart/form-data"
        onSubmit={uploadSettings}
        style={{
          width: '100%',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'space-between'
        }}
      >
        <input
          type="text"
          id="textscroller"
          name="textscroller"
          placeholder="TEXTSCROLLER TEXT"
          value={txtScroller}
          onChange={e => setTxtScroller(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '0.2rem solid black',
            borderRadius: '0.5rem',
          }}
        />
        <h1 style={{margin: 0,}}>Logos</h1>
        <div style={{display: 'flex', flexFlow: 'row', columnGap: '2rem', justifyContent: 'space-evenly'}}>
          {logos.map((logo, index) => {
            return(
              <ArtFrame
                key={index}
                src={logo}
                type="file"
                id={`logo_${index}`}
                name={`logo_${index}`}
                multiple={false}
                onChange={e => onLogoChange(e, index)}
                accept="image/jpeg, image/jpg"
              />
            )
          })

          }
        </div>
        <Flex>
          <Button style={{marginLeft: 'auto'}} type="submit">Submit</Button>
        </Flex>
      </form>
    );
  };

  const renderDashBoard = () => {
    return (
      <Flex style={{width: '100vh', height: '35rem' }}>
        <div>
          <Flex>
            <h2>
              <b>SETTINGS</b>
            </h2>
            <p style={{marginLeft: 'auto', color: 'green'}}>{status}</p>
          </Flex>
          <Flex style={{margin: '0 0 1rem 0'}}>
            <NavOption onClick={() => {setActive(1); setStatus('')}} activeIndex={active === 1}>
              Showcase Arts
            </NavOption>
            <NavOption onClick={() => {setActive(2); setStatus('')}} activeIndex={active === 2}>
              General
            </NavOption>
          </Flex>
          <div style={{position: 'relative', display: 'flex', justifyContent: 'center', width: '100vh', height: '80%' }}>
            {active === 1 ? renderArtSetting() : active === 2 && renderSettingsGeneral()}
          </div>
        </div>
      </Flex>
    );
  };
  return (
    <BoardFlex>
      {showDashboard ? renderDashBoard() : renderGetPass()}
    </BoardFlex>
  );
};

export default Dashboard;
