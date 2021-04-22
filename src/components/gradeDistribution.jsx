import React from "react";
import { Row, Col, Icon, Progressbar } from "framework7-react";
import { useRecoilValue } from "recoil";
import { itemState } from "../js/atoms";

const GradeDistribution = () => {
  const { grade, gradeDistribution, reviewCount } = useRecoilValue(itemState);

  return (
    <Row className='border-4 rounded-xl mt-10 border-yellow-500 items-stretch'>
      <Col width='30' className='flex flex-col justify-center items-center'>
        <Row><Col className='text-2xl'><b>{grade.toFixed(1)}</b></Col></Row>
        <Row><Col><Icon f7="star_filled" color='yellow' /></Col></Row>
      </Col>
      <Col width='70'>
        {gradeDistribution.slice(0).reverse().map((count, index) =>
          <Row key={`star${5 - index}'s counts`} className='items-center'>
            <Col width='20'>{5 - index}점</Col>
            <Col width='60'><Progressbar progress={Math.floor(count / reviewCount * 100)} /></Col>
            <Col width='20'>{count}명</Col>
          </Row>
        )}
      </Col>

    </Row>
  );
};

export default GradeDistribution;
