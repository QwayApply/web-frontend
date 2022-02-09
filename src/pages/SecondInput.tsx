import React from 'react';
import ParticleBackground from '../components/ParticleBackground';
import MainLogo from '../components/MainLogo';
import SecondInputForm from '../components/SecondInputForm';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Modal, ModalContents } from './Root';

const SecondInput: React.FC = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <div>
      <ParticleBackground />
      <Modal>
        <ModalContents>
          <MainLogo />
          <SecondInputForm newData={data} />
        </ModalContents>
      </Modal>
    </div>
  );
};

export default SecondInput;
