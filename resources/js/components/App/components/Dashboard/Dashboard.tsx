import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex } from '../../styles/global-styles';

const BoardFlex = styled(Flex)`
  min-width: 20rem;
  min-height: 3rem;
`;

const ArtFrame = styled.input<{ src?: string }>`
  display: flex;
  height: 14rem;
  width: 24rem;
  position: relative;
  ${({ src }) =>
    src &&
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
      }`}
`;

const Dashboard: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  // const [showArts, setShowArts] = useState(artSrcs);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new URLSearchParams(`password=${e.target.password.value}`);
    console.log(data);

  };

  // const uploadArts = (e: any) => {
  //   e.preventDefault();
  //   const data = new FormData();
  //   showArts.forEach(art => {
  //     if (art.file) {
  //       console.log(art.file);
  //       data.append('file', art.file, `art_${art.id}`);
  //     }
  //   });
  //   console.log(data.getAll('file'));

    // const postArt = async () =>
    //   await fetch('http://localhost:9000/postArts', {
    //     method: 'POST',
    //     body: data,
    //   });

    // postArt()
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  // };

  // const onImgChange = async (e : any, index : number) => {
  //   var reader = new FileReader();
  //   var url = reader.readAsDataURL(e.target.files[0]);
  //   const test = [...showArts];

  //   reader.onloadend = async function () {
  //     test[index] = {
  //       ...test[index],
  //       source: reader.result,
  //       file: e.target.files[0],
  //     };
  //     setShowArts(test);
  //   }.bind(this);
  // };

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

  const renderDashBoard = () => {
    return (
      <Flex style={{ justifyContent: 'center' }}>
        <div>
          <h2>
            <b>SETTINGS</b>
          </h2>
          {/* <form
            style={{ display: 'flex', flexFlow: 'row wrap' }}
            method="POST"
            onSubmit={uploadArts}
          >
            {showArts.map((art, index) => {
              return (
                <ArtFrame
                  src={art.source}
                  type="file"
                  id={`art_${index}`}
                  name={`art_${index}`}
                  multiple={false}
                  onChange={e => onImgChange(e, index)}
                  accept="image/jpeg, image/jpg"
                />
              );
            })}
            <button type="submit">submit</button>
          </form> */}
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
