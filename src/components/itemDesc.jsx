import React from "react";
import { f7, Row, Col, Icon, Button } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { getToken } from "../common/auth";
import { useRecoilState } from "recoil";
import { likesState, itemState } from "../js/atoms";
import Bookmark from "./bookmark";

const ItemDesc = (props) => {
  const [item, setItem] = useRecoilState(itemState);
  return (
    <>
      <p className="text-xl md:mt-5">{item.name}</p>
      <Row className="">
        <Col width="100">
          <Row className='justify-center'>
            <Col width='0' medium='30' className='hidden md:block'>
              <Bookmark {...{ item, setItem }} />
            </Col>
            <Col width='0' medium='30' className='hidden md:block' >{item.likes}</Col>
          </Row>
          <Row className='justify-start'>
            <Col width='60' medium='80'>
              {Array(5).fill(0).map((x, index) => index + 1 <= item.grade
                ? <Icon color='yellow' f7='star_filled' key={`star${index}`} />
                : (index + 0.5 <= item.grade)
                  ? <Icon color='yellow' f7='star_lefthalf_filled' key={`star${index}`} />
                  : <Icon color='yellow' f7='star' key={`star${index}`} />)
              }
            </Col>
            {/*<Col width='20' medium='20'>{item.grade ? item.grade.toFixed(2) : 0}</Col>*/}
          </Row>
        </Col>
      </Row>
      <div className="my-3">{item.text.split('\n').map((line, index) => <div key={`item_text_${index}`}>{line}</div>)}</div>
    </>
  );
};

export default ItemDesc;
