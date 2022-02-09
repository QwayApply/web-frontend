import React from 'react';
import ParticleBackground from '../components/ParticleBackground';
import MainLogo from '../components/MainLogo';
import styled from 'styled-components';
import MainInput from '../components/MainInput';

const Modal = styled.div`
  position: fixed;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  border-radius: 10px;
  opacity: 0.8;
  background-color: #ffffff;
  z-index: 10;
`;

const IntroductionText = styled.text`
  display: flex;
  font-size: 1.25rem;
  font-weight: 600;
  color: #000000;
  text-align: left;
  margin-top: 5%;
  margin-bottom: 5%;
  align-content: center;
  justify-content: center;
`;

const Root: React.FC = () => {
  return (
    <div>
      <ParticleBackground />
      <Modal>
        <MainLogo />
        <MainInput />
        <IntroductionText>
          QWayApply Is mock apply service for K-SAT[Jeong-si] We used
          Quantum-GAN <br />
          to presume empty sample to provide more accurate prediction. Enter{' '}
          <br />
          Your K-SAT score and University to apply and check your probabilty.{' '}
          <br />
        </IntroductionText>
      </Modal>
    </div>
  );
};

export default Root;
