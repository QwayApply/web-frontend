import React from 'react';
import ParticleBackground from '../components/ParticleBackground';
import MainLogo from '../components/MainLogo';
import styled from 'styled-components';
import MainInput from '../components/MainInput';

export const Modal = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ModalContents = styled.div`
  width: 100%;
  max-width: 1000px;
  height: fit-content;
  border-radius: 10px;
  opacity: 0.8;
  background-color: #ffffff;
  z-index: 10;
  padding: 34px;
`;

const IntroductionText = styled.text`
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
  color: #000000;
  text-align: left;
  margin-top: 5%;
  margin-bottom: 5%;
  align-content: center;
  justify-content: center;
  line-height: 1.5;
`;

const Root: React.FC = () => {
  return (
    <div>
      <ParticleBackground />
      <Modal>
        <ModalContents>
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
        </ModalContents>
      </Modal>
    </div>
  );
};

export default Root;
