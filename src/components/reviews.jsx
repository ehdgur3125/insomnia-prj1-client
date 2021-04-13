import React, { useState, useEffect } from "react";
import { Row, Col, Icon } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilState } from "recoil";
import { cartState, itemState, cartReadyState } from "../js/atoms";
import ItemDesc from "./itemDesc";
import ItemOption from "./itemOption";
import PostReview from './postReview';

function format(i) {
  if (i < 10) return "0" + i;
  return i.toString();
}

const Reviews = (props) => {
  const [item, setItem] = useRecoilState(itemState);

  return item.reviews.map((review, index) => {
    const createdAt = new Date(review.createdAt);
    const day = `${createdAt.getFullYear() % 100}-${format(createdAt.getMonth() + 1)}-${format(createdAt.getDate())}`;
    const time = `${format(createdAt.getHours())}:${format(createdAt.getMinutes())}:${format(createdAt.getSeconds())}`;
    return (
      <Row key={`review${index}`} className='mx-5 border border-b-4 border-r-2 rounded-tl-lg rounded-b-lg my-3'>
        <Col width='100' medium='60'>
          <Row>
            <Col className='text-left text-base'>{review.User.username}</Col>
            <Col className='text-right'>{day} {time}</Col>
          </Row>
          <Row noGap className='justify-start'>
            {Array(5).fill(0).map((x, starIndex) => <Col width='5' key={`reivew${index}star${starIndex}`}><Icon f7={starIndex < review.grade ? 'star_filled' : 'star'} className='text-sm' color='yellow' /></Col>)}
          </Row>
          <Row className='my-2'>
            <Col className='text-left text-base'>{review.text.split('\n').map((line, lineIndex) =>
              <div key={`review${index}line${lineIndex}`}>{line}</div>)}</Col>
          </Row>
        </Col>
      </Row>
    );
  });
};

export default Reviews;
