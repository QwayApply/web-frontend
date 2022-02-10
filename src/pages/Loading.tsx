import React from 'react';
import ParticleBackground from '../components/ParticleBackground';
import MainLogo from '../components/MainLogo';
import styled from 'styled-components';
import { Modal, ModalContents } from './Root';
import Lottie from 'react-lottie';
import animationData from '../lottie.json';
import { useHistory } from 'react-router-dom';
const Loading: React.FC = () => {
  const history = useHistory();
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
  setTimeout(function () {
    history.push('/result');
  }, 3000);
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
