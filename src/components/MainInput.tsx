import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import data from '../freq_score.json';
export const FormDiv = styled.div`
  background-color: #2d2d2d;
  opacity: 0.7;
  border-radius: 10px;
  padding: 34px;
  text-align: center;
`;
const InputForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2%;
`;

const Input = styled.input`
  width: 70%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-top: 5%;
  margin-bottom: 5%;
`;

export const SubmitButton = styled.button`
  padding: 18px 52px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
  border-radius: 32px;
`;

const InfoText = styled.text`
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  text-align: right;
  justify-content: center;
`;

const MainInput: React.FC = () => {
  const history = useHistory();
  const [scoreData, setScoreData] = useState({});

  const [koreaHistoryData, setKoreaHistoryData] = useState(0);
  const [koreanData, setKoreanData] = useState(0);
  const [englishData, setEnglishData] = useState(0);
  const [mathData, setMathData] = useState(0);
  const [addtionalData, setAddtionalData] = useState(0);
  const [addtional2Data, setAddtional2Data] = useState(0);
  const [secondLanguageData, setSecondLanguageData] = useState(0);

  const koreaHistoryChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKoreaHistoryData(parseInt(event.target.value, 10));
  };

  const koreanChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKoreanData(parseInt(event.target.value, 10));
  };

  const englishChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnglishData(parseInt(event.target.value, 10));
  };

  const mathChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMathData(parseInt(event.target.value, 10));
  };

  const addtionalChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddtionalData(parseInt(event.target.value, 10));
  };

  const addtional2ChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddtional2Data(parseInt(event.target.value, 10));
  };

  const secondLanguageChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondLanguageData(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <FormDiv>
        <InfoText>
          모든 점수는 표준점수를 입력해주시고, 미응시 과목은 비워주세요
        </InfoText>
        <InputForm>
          <Input
            onChange={koreaHistoryChangeHandler}
            id="koreaHistory"
            type="number"
            placeholder="한국사"
          />
          <Input
            onChange={koreanChangeHandler}
            id="korean"
            type="number"
            placeholder="국어"
          />
          <Input
            onChange={englishChangeHandler}
            id="math"
            type="number"
            placeholder="수학"
          />
          <Input
            onChange={mathChangeHandler}
            id="english"
            type="number"
            placeholder="영어"
          />
          <Input
            onChange={addtionalChangeHandler}
            id="additional"
            type="number"
            placeholder="탐구 1"
          />
          <Input
            onChange={addtional2ChangeHandler}
            id="additional2"
            type="number"
            placeholder="탐구 2"
          />
          <Input
            onChange={secondLanguageChangeHandler}
            id="secondLanguage"
            type="number"
            placeholder="제2외국어"
          />
        </InputForm>
        <SubmitButton
          onClick={() =>
            history.push('/second', {
              koreaHistoryData,
              koreanData,
              englishData,
              mathData,
              addtionalData,
              addtional2Data,
              secondLanguageData,
            })
          }
        >
          제출
        </SubmitButton>
      </FormDiv>
    </div>
  );
};

export default MainInput;
