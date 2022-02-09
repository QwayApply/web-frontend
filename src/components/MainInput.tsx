import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const FormDiv = styled.div`
  background-color: #2d2d2d;
  opacity: 0.7;
  margin-top: 5%;
  padding: 5%;
  margin-left: 15%;
  margin-right: 15%;
  border-radius: 10px;
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
const SubmitButton = styled.button`
  width: 30%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-top: 5%;
  margin-bottom: 0.5%;
  margin-left: 35%;
  margin-right: 35%;
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

  // const handleSubmit = (e: any) => {
  //   // console.log('A');
  //   // //@ts-ignore
  //   // const tempData = {
  //   //   score: {
  //   //     history: 0,
  //   //     korean: 0,
  //   //     math: 0,
  //   //     english: 0,
  //   //     addtional: 0,
  //   //     additional2: 0,
  //   //     secondLanguage: 0,
  //   //   },
  //   // };
  //   // tempData.score.history = e.getElementById('korea-history').value;
  //   // tempData.score.korean = e.getElementById('korean').value;
  //   // tempData.score.math = e.getElementById('math').value;
  //   // tempData.score.english = e.getElementById('english').value;
  //   // tempData.score.addtional = e.getElementById('additional').value;
  //   // tempData.score.additional2 = e.getElementById('additional2').value;
  //   // tempData.score.secondLanguage = e.getElementById('secondLanguage').value;
  //   // console.log(tempData);

  // };
  const onChangeHandler = (e: any) => {
    setScoreData({
      ...scoreData,
      [e.target.id]: e.target.value,
    });
    console.log(scoreData);
  };
  return (
    <div>
      <FormDiv>
        <InfoText>
          모든 점수는 표준점수를 입력해주시고, 미응시 과목은 비워주세요
        </InfoText>
        <InputForm>
          <Input
            onChange={onChangeHandler}
            id="history"
            type="number"
            placeholder="한국사"
          />
          <Input
            onChange={onChangeHandler}
            id="korean"
            type="number"
            placeholder="국어"
          />
          <Input
            onChange={onChangeHandler}
            id="math"
            type="number"
            placeholder="수학"
          />
          <Input
            onChange={onChangeHandler}
            id="english"
            type="number"
            placeholder="영어"
          />
          <Input
            onChange={onChangeHandler}
            id="additional"
            type="number"
            placeholder="탐구 1"
          />
          <Input
            onChange={onChangeHandler}
            id="additional2"
            type="number"
            placeholder="탐구 2"
          />
          <Input
            onChange={onChangeHandler}
            id="secondLanguage"
            type="number"
            placeholder="제2외국어"
          />
        </InputForm>
        <button onClick={() => history.push('/second', scoreData)}>제출</button>
      </FormDiv>
    </div>
  );
};

export default MainInput;
