import React from 'react';
import ParticleBackground from '../components/ParticleBackground';
import MainLogo from '../components/MainLogo';
import SecondInputForm from '../components/SecondInputForm';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Modal, ModalContents } from './Root';
import Lottie from 'react-lottie';
import animationData from '../lottie.json';
const Loading: React.FC = () => {
  const option = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  const LoadingText = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    color: #000;
    margin-top: 2rem;
    text-align: center;
    margin-bottom: 50px;
  `;

  return (
    <div>
      <ParticleBackground />
      <Modal>
        <ModalContents>
          <MainLogo />
          <Lottie options={option} height={300} width={300} />
          <LoadingText>qGAN을 사용한 모의지원 결과 연산중..</LoadingText>
        </ModalContents>
      </Modal>
    </div>
  );
};

export default Loading;
