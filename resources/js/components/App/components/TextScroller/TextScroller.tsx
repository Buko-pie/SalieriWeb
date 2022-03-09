import * as React from 'react';
import styled from 'styled-components';
import { WrapperTxtScroller } from '../Wrappers';
import Marquee from 'react-fast-marquee';

const Text = styled.p`
  letter-spacing: 3px;
  font-weight: 800;
`;

const TextScroller: React.FC = () => {
  return (
    <>
      <WrapperTxtScroller>
        <div className="text-shadow marquee-force-visible">
          <Marquee
            gradient={false}
            speed={2}
            pauseOnHover={true}
            direction="right"
          >
            <Text>
              - TextScroller - TextScroller - TextScroller - TextScroller -
              TextScroller - TextScroller - TextScroller&nbsp;
            </Text>
          </Marquee>
        </div>
      </WrapperTxtScroller>
    </>
  );
};

export default TextScroller;
