import React, { ReactNode, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import data from '../freq_score.json';
import { Autocomplete, TextField } from '@mui/material';
import { color } from '@mui/system';
import { FormDiv, SubmitButton } from './MainInput';
import CustomAutoComplete from './CustomAutoComplete';

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
  '가천대방사선',
  '가톨릭약학',
  '가톨릭의예',
  '강릉대치의예',
  '강원대수의예',
  '강원대수의예(지)',
  '강원대의예',
  '건국대국제무역',
  '건국대수의예',
  '건국대융합인재',
  '건국대전기전자',
  '건국대컴퓨터공',
  '건국대ICT융합',
  '건양대의예',
  '경북대경제통상',
  '경북대산림과학',
  '경북대수의예',
  '경북대약학',
  '경북대의예',
  '경북대자전인문',
  '경북대정치외교',
  '경북대치의예',
  '경북대행정',
  '경상대의예',
  '경성대약학',
  '경인교초등교육',
  '경희대경제',
  '경희대빅데이터응용',
  '경희대산업공',
  '경희대식물환경',
  '경희대의예',
  '경희대일본어',
  '경희대자유전공',
  '경희대지리학자연',
  '경희대치의예',
  '경희대프랑스어',
  '경희대한의예자연',
  '경희대행정',
  '경희대호경',
  '계명대약학',
  '계명대의예',
  '고려대건축',
  '고려대경영',
  '고려대경제',
  '고려대교육학',
  '고려대국어국문',
  '고려대기계',
  '고려대물리',
  '고려대미디어',
  '고려대바의공',
  '고려대반도체',
  '고려대사회',
  '고려대산업공',
  '고려대생명과학',
  '고려대수학',
  '고려대식품자원경제',
  '고려대신소재',
  '고려대언어',
  '고려대영어교육',
  '고려대영어영문',
  '고려대의예',
  '고려대일어일문',
  '고려대자전자연',
  '고려대전기',
  '고려대정치외교',
  '고려대중어중문',
  '고려대철학',
  '고려대체육교육',
  '고려대컴퓨터인문',
  '고려대컴퓨터자연',
  '고려대통계',
  '고려대한문',
  '고려대행정',
  '고려대환경생태',
  '고려세약학',
  '고신대의예',
  '고신대의예(지)',
  '공주교초등교육',
  '관동대의예',
  '교원대영어교육',
  '교원대컴퓨터교육',
  '국민대국어국문',
  '국민대산림환경',
  '국민대중국정경',
  '국민대AI경영인문',
  '금오공기계시스템',
  '금오공신소재',
  '단국대도시계획',
  '단국대특수교육',
  '단국천약학',
  '단국천의예',
  '단국천치의예',
  '대가대약학',
  '대가대의예',
  '대구한한의예인문',
  '대전대한의예',
  '덕성여글로벌융합',
  '동국경의예',
  '동국경한의예인문',
  '동국경한의예자연',
  '동국대가정교육',
  '동국대경영',
  '동국대경영정보',
  '동국대경제',
  '동국대교육학',
  '동국대국제통상',
  '동국대영어영문',
  '동국대전자전기',
  '동국대정보통신',
  '동국대지리교육',
  '동국대AI융합자연',
  '동덕여국어국문',
  '동덕여약학',
  '동덕여큐레이터학',
  '동신대한의예',
  '동아대의예',
  '동아대의예(지)',
  '동의대한의예자연',
  '목포대약학',
  '부경대유아교육',
  '부산대경영',
  '부산대약학',
  '부산대의예',
  '부산대정치외교',
  '부산대통계',
  '부산대한문',
  '부산대한의예',
  '삼육대약학',
  '상명대영어교육',
  '상지대한의예인문',
  '상지대한의예자연',
  '서강대경영',
  '서강대경제',
  '서강대기계',
  '서강대수학',
  '서강대영미문화',
  '서강대인문',
  '서강대전자',
  '서강대중국문화',
  '서강대지식융합',
  '서강대컴퓨터공',
  '서강대화공',
  '서강대화학',
  '서울과글로벌경영',
  '서울과산업정보인문',
  '서울교초등교육',
  '서울대간호인문',
  '서울대경영',
  '서울대경제',
  '서울대농경제사회학',
  '서울대사회복지',
  '서울대사회학',
  '서울대산업공',
  '서울대생명과학',
  '서울대생물교육',
  '서울대소비자',
  '서울대식동생',
  '서울대식물생산',
  '서울대심리',
  '서울대약학',
  '서울대의예',
  '서울대인문',
  '서울대재료',
  '서울대전기',
  '서울대정치외교',
  '서울대치의예',
  '서울대컴퓨터공',
  '서울대항공우주',
  '서울여사회복지',
  '성균관건설환경',
  '성균관경영',
  '성균관공학',
  '성균관글로벌경영',
  '성균관글로벌경제',
  '성균관글로벌리더',
  '성균관반도체',
  '성균관사회',
  '성균관소프트웨어',
  '성균관의예',
  '성균관인문',
  '성균관자연과학',
  '성균관전자전기',
  '성신여사회교육',
  '세종대국제',
  '세종대전자정보',
  '숙명여응용물리',
  '숙명여TESL',
  '순천대약학',
  '순천향의예',
  '숭실대글로벌통상',
  '숭실대금융학',
  '숭실대보험수리',
  '숭실대유기소재',
  '숭실대IT융합',
  '시립대경영',
  '시립대경제',
  '시립대사회복지',
  '시립대신소재',
  '시립대융합응용화학',
  '시립대자유전공',
  '시립대전자전기',
  '시립대통계',
  '시립대행정',
  '시립대환경공',
  '아주대금융공',
  '아주대산업공',
  '아주대수학',
  '아주대약학',
  '아주대의예',
  '아주대정치외교',
  '연세대간호인문',
  '연세대경영',
  '연세대경제',
  '연세대교육학',
  '연세대기계',
  '연세대노어노문',
  '연세대도시공',
  '연세대물리',
  '연세대반도체',
  '연세대사학',
  '연세대사환시',
  '연세대산업공',
  '연세대신소재',
  '연세대신학',
  '연세대언론홍보',
  '연세대영어영문',
  '연세대융합인문사회',
  '연세대응용통계',
  '연세대전기',
  '연세대정치외교',
  '연세대철학',
  '연세대컴퓨터',
  '연세대행정',
  '연세대화공',
  '연세원의예',
  '영남대약학',
  '영남대의예',
  '외국어경영',
  '외국어국제금융',
  '외국어국제통상',
  '외국어네덜란드어',
  '외국어독일어',
  '외국어러시아어',
  '외국어말레이어',
  '외국어베트남어',
  '외국어아랍어',
  '외국어영미문화',
  '외국어융합일본',
  '외국어인도어',
  '외국어일본어문화',
  '외국어정치외교',
  '외국어중국어문',
  '외국어페르시아어',
  '외국어프랑스어',
  '외국어행정',
  '외국어EICC',
  '외국어ELLT',
  '우석대약학',
  '우석대한의예',
  '울산대화공',
  '원광대약학',
  '원광대의예',
  '원광대치의예자연',
  '원광대한의예자연',
  '을지대의예',
  '이화여약학',
  '이화여자전인문',
  '이화여자전자연',
  '인제대약학인문',
  '인제대약학자연',
  '인제대의예',
  '인천대윤리교육',
  '인천대행정',
  '인하대경영',
  '인하대소비자',
  '인하대의예',
  '인하대정치외교',
  '인하대행정',
  '전남대수의예',
  '전남대약학',
  '전남대역사교육',
  '전남대의예',
  '전북대수의예',
  '전북대의예',
  '전북대치의예',
  '제주대사회교육',
  '제주대수의예',
  '제주대약학',
  '제주대의예',
  '조선대약학',
  '조선대약학(지)',
  '조선대의예',
  '조선대의예(지)',
  '조선대치의예',
  '중앙대간호인문',
  '중앙대간호자연',
  '중앙대경영',
  '중앙대경영(지)',
  '중앙대경영경제',
  '중앙대공공인재',
  '중앙대글로벌금융',
  '중앙대기계',
  '중앙대미디어',
  '중앙대소프트웨어',
  '중앙대약학',
  '중앙대영화',
  '중앙대의예',
  '중앙대인문',
  '중앙대창의ICT',
  '중앙대AI학과',
  '진주교초등교육',
  '차의대약학',
  '청주교초등교육',
  '청주대건축공',
  '충북대공업화학',
  '충북대수의예',
  '충북대약학',
  '충북대의예',
  '충북대정보통계',
  '충북대화학',
  '한림대의예',
  '한양대경영',
  '한양대경제금융',
  '한양대관광',
  '한양대교육공학',
  '한양대기계',
  '한양대데이터과학부',
  '한양대미디어',
  '한양대미래자동차',
  '한양대바이오메디컬',
  '한양대사회',
  '한양대산업공',
  '한양대생명과학',
  '한양대수학',
  '한양대신소재',
  '한양대에너지',
  '한양대연기',
  '한양대융합전자',
  '한양대전기',
  '한양대정보시스템',
  '한양대정보시스템(지)',
  '한양대정치외교',
  '한양대중어중문',
  '한양대파이낸스경영',
  '한양대행정',
  '한양대화공',
  '한양에광고홍보',
  '한양에보험계리',
  '한양에약학',
  '한양에한국어문',
  '한양에ICT융합',
  '항공대경영',
  '항공대항공교통',
  '항공대항공전자',
  '홍익대경영',
  '홍익대경제',
  '홍익대도시공',
  '홍익대법학',
  '홍익대역사교육',
  '홍익대영어교육',
  '홍익대자전인문',
  '홍익대자전자연',
  '홍익대전자전기',
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
        props.newData.koreanData * ((Number(result?.[0]?.lang) || 0) / 100) +
        props.newData.mathData * ((Number(result?.[0]?.math) || 0) / 100) +
        props.newData.englishData * ((Number(result?.[0]?.eng) || 0) / 100) +
        props.newData.addtionalData * ((Number(result?.[0]?.spec) || 0) / 100) +
        props.newData.addtional2Data * ((Number(result?.[0]?.spec) || 0) / 100);
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
        props.newData.koreanData * ((Number(result?.[0]?.lang) || 0) / 100) +
        props.newData.mathData * ((Number(result?.[0]?.math) || 0) / 100) +
        props.newData.englishData * ((Number(result?.[0]?.eng) || 0) / 100) +
        props.newData.addtionalData * ((Number(result?.[0]?.spec) || 0) / 100) +
        props.newData.addtional2Data * ((Number(result?.[0]?.spec) || 0) / 100);
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
        props.newData.koreanData * ((Number(result?.[0]?.lang) || 0) / 100) +
        props.newData.mathData * ((Number(result?.[0]?.math) || 0) / 100) +
        props.newData.englishData * ((Number(result?.[0]?.eng) || 0) / 100) +
        props.newData.addtionalData * ((Number(result?.[0]?.spec) || 0) / 100) +
        props.newData.addtional2Data * ((Number(result?.[0]?.spec) || 0) / 100);
      setCScore(cFinalScore);
    }
  }, [cGroupUniv, cGroupLine]);

  const AutocompleteStyle = {
    width: '30%',
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
        <SubmitButton name="submit" onClick={() => history.push('/loading')}>
          제출하기
        </SubmitButton>
      </FormDiv>
    </div>
  );
};

export default SecondInputForm;