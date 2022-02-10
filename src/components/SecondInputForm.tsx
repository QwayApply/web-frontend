import React, { ReactNode, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import data from '../freq_score.json';
import { Autocomplete, TextField } from '@mui/material';
import { color } from '@mui/system';
import { FormDiv, SubmitButton } from './MainInput';
import CustomAutoComplete from './CustomAutoComplete';
import axios from 'axios';
import Cookies from 'js-cookie';

const InputForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4.5%;
  margin-top: 3%;
  margin-bottom: 3%;
`;

const majorDataContantArray = [
  '가천대 방사선',
  '가톨릭 약학',
  '가톨릭 의예',
  '강릉대 치의예',
  '강원대 수의예',
  '강원대 수의예(지)',
  '강원대 의예',
  '건국대 국제무역',
  '건국대 수의예',
  '건국대 융합인재',
  '건국대 전기전자',
  '건국대 컴퓨터공',
  '건국대 ICT융합',
  '건양대 의예',
  '경북대 경제통상',
  '경북대 산림과학',
  '경북대 수의예',
  '경북대 약학',
  '경북대 의예',
  '경북대 자전인문',
  '경북대 정치외교',
  '경북대 치의예',
  '경북대 행정',
  '경상대 의예',
  '경성대 약학',
  '경인교 초등교육',
  '경희대 경제',
  '경희대 빅데이터응용',
  '경희대 산업공',
  '경희대 식물환경',
  '경희대 의예',
  '경희대 일본어',
  '경희대 자유전공',
  '경희대 지리학자연',
  '경희대 치의예',
  '경희대 프랑스어',
  '경희대 한의예자연',
  '경희대 행정',
  '경희대 호경',
  '계명대 약학',
  '계명대 의예',
  '고려대 건축',
  '고려대 경영',
  '고려대 경제',
  '고려대 교육학',
  '고려대 국어국문',
  '고려대 기계',
  '고려대 물리',
  '고려대 미디어',
  '고려대 바의공',
  '고려대 반도체',
  '고려대 사회',
  '고려대 산업공',
  '고려대 생명과학',
  '고려대 수학',
  '고려대 식품자원경제',
  '고려대 신소재',
  '고려대 언어',
  '고려대 영어교육',
  '고려대 영어영문',
  '고려대 의예',
  '고려대 일어일문',
  '고려대 자전자연',
  '고려대 전기',
  '고려대 정치외교',
  '고려대 중어중문',
  '고려대 철학',
  '고려대 체육교육',
  '고려대 컴퓨터인문',
  '고려대 컴퓨터자연',
  '고려대 통계',
  '고려대 한문',
  '고려대 행정',
  '고려대 환경생태',
  '고려세 약학',
  '고신대 의예',
  '고신대 의예(지)',
  '공주교 초등교육',
  '관동대 의예',
  '교원대 영어교육',
  '교원대 컴퓨터교육',
  '국민대 국어국문',
  '국민대 산림환경',
  '국민대 중국정경',
  '국민대 AI경영인문',
  '금오공 기계시스템',
  '금오공 신소재',
  '단국대 도시계획',
  '단국대 특수교육',
  '단국천 약학',
  '단국천 의예',
  '단국천 치의예',
  '대가대 약학',
  '대가대 의예',
  '대구한 한의예인문',
  '대전대 한의예',
  '덕성여 글로벌융합',
  '동국경 의예',
  '동국경 한의예인문',
  '동국경 한의예자연',
  '동국대 가정교육',
  '동국대 경영',
  '동국대 경영정보',
  '동국대 경제',
  '동국대 교육학',
  '동국대 국제통상',
  '동국대 영어영문',
  '동국대 전자전기',
  '동국대 정보통신',
  '동국대 지리교육',
  '동국대 AI융합자연',
  '동덕여 국어국문',
  '동덕여 약학',
  '동덕여 큐레이터학',
  '동신대 한의예',
  '동아대 의예',
  '동아대 의예(지)',
  '동의대 한의예자연',
  '목포대 약학',
  '부경대 유아교육',
  '부산대 경영',
  '부산대 약학',
  '부산대 의예',
  '부산대 정치외교',
  '부산대 통계',
  '부산대 한문',
  '부산대 한의예',
  '삼육대 약학',
  '상명대 영어교육',
  '상지대 한의예인문',
  '상지대 한의예자연',
  '서강대 경영',
  '서강대 경제',
  '서강대 기계',
  '서강대 수학',
  '서강대 영미문화',
  '서강대 인문',
  '서강대 전자',
  '서강대 중국문화',
  '서강대 지식융합',
  '서강대 컴퓨터공',
  '서강대 화공',
  '서강대 화학',
  '서울과 글로벌경영',
  '서울과 산업정보인문',
  '서울교 초등교육',
  '서울대 간호인문',
  '서울대 경영',
  '서울대 경제',
  '서울대 농경제사회학',
  '서울대 사회복지',
  '서울대 사회학',
  '서울대 산업공',
  '서울대 생명과학',
  '서울대 생물교육',
  '서울대 소비자',
  '서울대 식동생',
  '서울대 식물생산',
  '서울대 심리',
  '서울대 약학',
  '서울대 의예',
  '서울대 인문',
  '서울대 재료',
  '서울대 전기',
  '서울대 정치외교',
  '서울대 치의예',
  '서울대 컴퓨터공',
  '서울대 항공우주',
  '서울여 사회복지',
  '성균관 건설환경',
  '성균관 경영',
  '성균관 공학',
  '성균관 글로벌경영',
  '성균관 글로벌경제',
  '성균관 글로벌리더',
  '성균관 반도체',
  '성균관 사회',
  '성균관 소프트웨어',
  '성균관 의예',
  '성균관 인문',
  '성균관 자연과학',
  '성균관 전자전기',
  '성신여 사회교육',
  '세종대 국제',
  '세종대 전자정보',
  '숙명여 응용물리',
  '숙명여 TESL',
  '순천대 약학',
  '순천향 의예',
  '숭실대 글로벌통상',
  '숭실대 금융학',
  '숭실대 보험수리',
  '숭실대 유기소재',
  '숭실대 IT융합',
  '시립대 경영',
  '시립대 경제',
  '시립대 사회복지',
  '시립대 신소재',
  '시립대 융합응용화학',
  '시립대 자유전공',
  '시립대 전자전기',
  '시립대 통계',
  '시립대 행정',
  '시립대 환경공',
  '아주대 금융공',
  '아주대 산업공',
  '아주대 수학',
  '아주대 약학',
  '아주대 의예',
  '아주대 정치외교',
  '연세대 간호인문',
  '연세대 경영',
  '연세대 경제',
  '연세대 교육학',
  '연세대 기계',
  '연세대 노어노문',
  '연세대 도시공',
  '연세대 물리',
  '연세대 반도체',
  '연세대 사학',
  '연세대 사환시',
  '연세대 산업공',
  '연세대 신소재',
  '연세대 신학',
  '연세대 언론홍보',
  '연세대 영어영문',
  '연세대 융합인문사회',
  '연세대 응용통계',
  '연세대 전기',
  '연세대 정치외교',
  '연세대 철학',
  '연세대 컴퓨터',
  '연세대 행정',
  '연세대 화공',
  '연세원 의예',
  '영남대 약학',
  '영남대 의예',
  '외국어 경영',
  '외국어 국제금융',
  '외국어 국제통상',
  '외국어 네덜란드어',
  '외국어 독일어',
  '외국어 러시아어',
  '외국어 말레이어',
  '외국어 베트남어',
  '외국어 아랍어',
  '외국어 영미문화',
  '외국어 융합일본',
  '외국어 인도어',
  '외국어 일본어문화',
  '외국어 정치외교',
  '외국어 중국어문',
  '외국어 페르시아어',
  '외국어 프랑스어',
  '외국어 행정',
  '외국어 EICC',
  '외국어 ELLT',
  '우석대 약학',
  '우석대 한의예',
  '울산대 화공',
  '원광대 약학',
  '원광대 의예',
  '원광대 치의예자연',
  '원광대 한의예자연',
  '을지대 의예',
  '이화여 약학',
  '이화여 자전인문',
  '이화여 자전자연',
  '인제대 약학인문',
  '인제대 약학자연',
  '인제대 의예',
  '인천대 윤리교육',
  '인천대 행정',
  '인하대 경영',
  '인하대 소비자',
  '인하대 의예',
  '인하대 정치외교',
  '인하대 행정',
  '전남대 수의예',
  '전남대 약학',
  '전남대 역사교육',
  '전남대 의예',
  '전북대 수의예',
  '전북대 의예',
  '전북대 치의예',
  '제주대 사회교육',
  '제주대 수의예',
  '제주대 약학',
  '제주대 의예',
  '조선대 약학',
  '조선대 약학(지)',
  '조선대 의예',
  '조선대 의예(지)',
  '조선대 치의예',
  '중앙대 간호인문',
  '중앙대 간호자연',
  '중앙대 경영',
  '중앙대 경영(지)',
  '중앙대 경영경제',
  '중앙대 공공인재',
  '중앙대 글로벌금융',
  '중앙대 기계',
  '중앙대 미디어',
  '중앙대 소프트웨어',
  '중앙대 약학',
  '중앙대 영화',
  '중앙대 의예',
  '중앙대 인문',
  '중앙대 창의ICT',
  '중앙대 AI학과',
  '진주교 초등교육',
  '차의대 약학',
  '청주교 초등교육',
  '청주대 건축공',
  '충북대 공업화학',
  '충북대 수의예',
  '충북대 약학',
  '충북대 의예',
  '충북대 정보통계',
  '충북대 화학',
  '한림대 의예',
  '한양대 경영',
  '한양대 경제금융',
  '한양대 관광',
  '한양대 교육공학',
  '한양대 기계',
  '한양대 데이터과학부',
  '한양대 미디어',
  '한양대 미래자동차',
  '한양대 바이오메디컬',
  '한양대 사회',
  '한양대 산업공',
  '한양대 생명과학',
  '한양대 수학',
  '한양대 신소재',
  '한양대 에너지',
  '한양대 연기',
  '한양대 융합전자',
  '한양대 전기',
  '한양대 정보시스템',
  '한양대 정보시스템(지)',
  '한양대 정치외교',
  '한양대 중어중문',
  '한양대 파이낸스경영',
  '한양대 행정',
  '한양대 화공',
  '한양에 광고홍보',
  '한양에 보험계리',
  '한양에 약학',
  '한양에 한국어문',
  '한양에 ICT융합',
  '항공대 경영',
  '항공대 항공교통',
  '항공대 항공전자',
  '홍익대 경영',
  '홍익대 경제',
  '홍익대 도시공',
  '홍익대 법학',
  '홍익대 역사교육',
  '홍익대 영어교육',
  '홍익대 자전인문',
  '홍익대 자전자연',
  '홍익대 전자전기',
];

const InfoText = styled.text`
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  text-align: right;
  justify-content: center;
`;

const CaculatedScore = styled.text`
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  word-break: keep-all;
  white-space: pre;
`;
const randomIdA = Math.floor(100000 + Math.random() * 900000);
const randomIdB = Math.floor(100000 + Math.random() * 900000);
const randomIdC = Math.floor(100000 + Math.random() * 900000);

const SecondInputForm: React.FC<{ [key: string]: any }> = (props) => {
  const history = useHistory();
  const [isCalculated, setIsCalculated] = useState(false);
  const univList = useMemo(() => {
    return Array.from(new Set(data.map((v: any) => v.univ)));
  }, [data]);

  const categoryList = useMemo(() => {
    return Array.from(new Set(data.map((v: any) => v.line)));
  }, [data]);

  const [aGroupUniv, setAGroupUniv] = useState('');
  const [aGroupLine, setAGroupLine] = useState('');
  const [aGroupMajor, setAGroupMajor] = useState('');
  const [aScore, setAScore] = useState(0.0);

  const [bGroupUniv, setBGroupUniv] = useState('');
  const [bGroupLine, setBGroupLine] = useState('');
  const [bGroupMajor, setBGroupMajor] = useState('');
  const [bScore, setBScore] = useState(0.0);

  const [cGroupUniv, setCGroupUniv] = useState('');
  const [cGroupLine, setCGroupLine] = useState('');
  const [cGroupMajor, setCGroupMajor] = useState('');
  const [cScore, setCScore] = useState(0.0);

  const [aGroupResult, setAGroupResult] = useState<any>(null);
  const [bGroupResult, setBGroupResult] = useState<any>(null);
  const [cGroupResult, setCGroupResult] = useState<any>(null);

  useEffect(() => {
    if (aGroupUniv !== '' && aGroupLine !== '') {
      console.log(props.newData);
      const result = data.filter(
        (v: any) => v.univ === aGroupUniv && v.line === aGroupLine
      );
      setAGroupResult(result);
      const aFinalScore =
        props.newData.koreanData +
        props.newData.mathData +
        props.newData.englishData +
        props.newData.addtionalData +
        props.newData.addtional2Data;
      setAScore(aFinalScore);
    }
  }, [aGroupUniv, aGroupLine]);

  useEffect(() => {
    if (bGroupUniv !== '' && bGroupLine !== '') {
      const result = data.filter(
        (v: any) => v.univ === bGroupUniv && v.line === bGroupLine
      );
      setBGroupResult(result);
      const bFinalScore =
        props.newData.koreanData +
        props.newData.mathData +
        props.newData.englishData +
        props.newData.addtionalData +
        props.newData.addtional2Data;
      setBScore(bFinalScore);
    }
  }, [bGroupUniv, bGroupLine]);

  useEffect(() => {
    if (cGroupUniv !== '' && cGroupLine !== '') {
      const result = data.filter(
        (v: any) => v.univ === cGroupUniv && v.line === cGroupLine
      );
      setCGroupResult(result);
      const cFinalScore =
        props.newData.koreanData +
        props.newData.mathData +
        props.newData.englishData +
        props.newData.addtionalData +
        props.newData.addtional2Data;
      setCScore(cFinalScore);
    }
  }, [cGroupUniv, cGroupLine]);

  const AutocompleteStyle = {
    width: '30%',
  };

  const submitHandler = async () => {
    // await axios.post(
    //   `http://localhost:5001/setqdata?school=${aGroupMajor}&score=${aScore}&randomid=${randomIdA}`
    // );

    // await axios.post(
    //   `http://localhost:5001/setqdata?school=${bGroupMajor}&score=${bScore}&randomid=${randomIdB}`
    // );

    // await axios.post(
    //   `http://localhost:5001/setqdata?school=${cGroupMajor}&score=${cScore}&randomid=${randomIdC}`
    // );
    // Cookies.set('aGroupId', randomIdA.toString());
    // Cookies.set('bGroupId', randomIdB.toString());
    // Cookies.set('cGroupId', randomIdC.toString());
    history.push('/loading');
  };

  return (
    <div>
      <FormDiv>
        <InfoText>정시 가군 선발을 위해 선택해주세요.</InfoText>
        <InputForm>
          <CustomAutoComplete
            placeholder="가군 지망 대학"
            options={univList}
            setValue={setAGroupUniv}
          />
          <CustomAutoComplete
            placeholder="가군 지망 계열"
            options={categoryList}
            setValue={setAGroupLine}
          />
          <CustomAutoComplete
            placeholder="가군 지망 전공"
            options={majorDataContantArray}
            setValue={setAGroupMajor}
          />
          <CaculatedScore>
            {aScore === 0.0 ? '계산중' : `${aScore}점`}
          </CaculatedScore>
        </InputForm>
        <InfoText>정시 나군 선발을 위해 선택해주세요.</InfoText>
        <InputForm>
          <CustomAutoComplete
            placeholder="나군 지망 대학"
            options={univList}
            setValue={setBGroupUniv}
          />
          <CustomAutoComplete
            placeholder="나군 지망 계열"
            options={categoryList}
            setValue={setBGroupLine}
          />
          <CustomAutoComplete
            placeholder="나군 지망 전공"
            options={majorDataContantArray}
            setValue={setBGroupMajor}
          />
          <CaculatedScore>
            {bScore === 0.0 ? '계산중' : `${bScore}점`}
          </CaculatedScore>
        </InputForm>
        <InfoText>정시 다군 선발을 위해 선택해주세요.</InfoText>
        <InputForm>
          <CustomAutoComplete
            placeholder="다군 지망 대학"
            options={univList}
            setValue={setCGroupUniv}
          />
          <CustomAutoComplete
            placeholder="다군 지망 계열"
            options={categoryList}
            setValue={setCGroupLine}
          />
          <CustomAutoComplete
            placeholder="다군 지망 전공"
            options={majorDataContantArray}
            setValue={setCGroupMajor}
          />
          <CaculatedScore>
            {cScore === 0.0 ? '계산중' : `${cScore}점`}
          </CaculatedScore>
        </InputForm>
        {/* <SubmitButton name="calc" onClick={}>
          계산하기
        </SubmitButton> */}
        <SubmitButton name="submit" onClick={() => submitHandler()}>
          제출하기
        </SubmitButton>
      </FormDiv>
    </div>
  );
};

export default SecondInputForm;
