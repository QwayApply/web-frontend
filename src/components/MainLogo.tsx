import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 34px;
`;

const LogoMainText = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #000000;
`;

const LogoSubText = styled.h2`
  font-size: 1rem;
  font-weight: semi-bold;
  margin-top: 2%;
  margin-left: 0.5rem;
  color: #000000;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MainLogo: React.FC = () => {
  //@ts-ignore
  return (
    <div>
      <MainContainer>
        <img src="./logo.png" width="10%" />
        <SubContainer>
          <LogoMainText> Q-way Apply </LogoMainText>
          <LogoSubText>
            {' '}
            Powered By <a>TeQuila</a>{' '}
          </LogoSubText>
        </SubContainer>
      </MainContainer>
    </div>
  );
};

export default MainLogo;
