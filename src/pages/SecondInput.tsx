import React from 'react';
import ParticleBackground from '../components/ParticleBackground';
import MainLogo from '../components/MainLogo';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

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

const Root: React.FC = () => {
  const data = useParams();
  console.log(data);
  return (
    <div>
      <ParticleBackground />
      <Modal>
        <MainLogo />
      </Modal>
    </div>
  );
};

export default Root;
