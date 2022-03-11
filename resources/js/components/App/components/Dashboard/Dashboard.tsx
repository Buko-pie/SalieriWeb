import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex, NavOption } from '../../styles/global-styles';
import axios from 'axios'
import { usePalette } from 'react-palette'
import { Art } from '../../types'

const _origin = window.location.origin;


const BoardFlex = styled(Flex)`
  min-width: 20rem;
  min-height: 3rem;
`;

const ArtFrame = styled.input<{ src?: string }>`
  display: flex;
  height: 14rem;
  width: 24rem;
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

const Dashboard: React.FC<{Arts: Art[]}> = ({Arts}) => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showArts, setShowArts] = useState(Arts);
  const [logos, setLogos] = useState<any[]>(['./images/logo/logo', './images/logo/logo2']);
  const [active, setActive] = useState(1)
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

    const data = new FormData();
    console.log('uploadArts: ', showArts);
    showArts.forEach((art, index) => {
      if (art.file) {
        console.log('ART FILE FOUND @ ', index)
        data.append('artFiles[]', art.file, `art_${art.id}`);
        data.append('names[]', `art_${art.id}`);
      }
    });
    console.log(data.getAll('artFiles[]'))

    axios.post(`${_origin}/uploadArts`, data, {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    })
    .then(res => {

    })
    .catch(err => {
      console.error(err);
    })
  };

  const uploadSettings = async (e: any) => {
    e.preventDefault();

    const data = new FormData();
    if(e.target[0].value){
      data.append('textscroll', e.target[0].value)
    }
    if(e.target[1].files[0]){
      data.append('logo', e.target[1].files[0])
    }
    if(e.target[2].files[0]){
      data.append('logo2', e.target[2].files[0])
    }

    axios.post(`${_origin}/setConfigs`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {

    })
    .catch(err => {
      console.error(err);
    })
  };

  const onImgChange = async (e, index) => {
    var reader = new FileReader();
    var url = reader.readAsDataURL(e.target.files[0]);
    const test = [...showArts];

    console.log('file:', e.target.files[0]);
    reader.onloadend = async function (event) {
      test[index] = {
        ...test[index],
        img: reader.result,
        file: e.target.files[0],
      };
      setShowArts(test);

      console.log('showArts ', Arts)
    }.bind(this);
  };

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
        <button type="submit">submit</button>
      </form>
    );
  };

  const renderArtSetting = () => {
    return (
      <form
        style={{ position: 'relative', width: '100%', }}
        onSubmit={uploadArts}
      >
        <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-evenly', rowGap: '2rem', maxHeight: '24rem', overflowY: 'scroll'}}>
          {showArts.map((art : any, index : any) => {
            return (
              <div style={{display: 'flex', position: 'relative'}}>
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
        <button type="submit">Update</button>
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
        }}
      >
        <input
          type="text"
          id="textscroller"
          name="textscroller"
          placeholder="TEXTSCROLLER TEXT"
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '0.2rem solid black',
            borderRadius: '0.5rem',
          }}
        />
        <br/>
        <h1>Logos</h1>
        <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-evenly'}}>
          {logos.map((logo, index) => {
            return(
              <ArtFrame
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
        <button type="submit">submit</button>
      </form>
    );
  };

  const renderDashBoard = () => {
    return (
      <Flex style={{width: '100vh' }}>
        <div>
          <h2>
            <b>SETTINGS</b>
          </h2>
          <Flex>
            <NavOption onClick={() => setActive(1)} activeIndex={active === 1}>
              Showcase Arts
            </NavOption>
            <NavOption onClick={() => setActive(2)} activeIndex={active === 2}>
              General
            </NavOption>
          </Flex>
          <div style={{position: 'relative', display: 'flex', justifyContent: 'center', width: '100vh' }}>
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
