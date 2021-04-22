import React from "react";
import { f7, Row, Col, Icon, Button } from "framework7-react";
import { useRecoilState } from "recoil";
import { itemState } from "../js/atoms";
const ItemDesc = (props) => {
  const [item, setItem] = useRecoilState(itemState);
  return (
    <>
      <Row className='justify-between items-center'>
        <Col width='40'>
          <div className="text-xl md:mt-5">{item.name}</div>
        </Col>
        <Col width='60' medium='80' className='flex flex-row justify-end'>
          {Array(5).fill(0).map((x, index) => index + 1 <= item.grade
            ? <Icon color='yellow' f7='star_filled' key={`star${index}`} />
            : (index + 0.5 <= item.grade)
              ? <Icon color='yellow' f7='star_lefthalf_filled' key={`star${index}`} />
              : <Icon color='yellow' f7='star' key={`star${index}`} />)
          }
        </Col>
      </Row>

      <div>{item.options[0].text} {item.options[0].price}원</div>
      <div className="my-3">{item.text.split('\n').map((line, index) => <div key={`item_text_${index}`}>{line}</div>)}</div>
    </>
  );
};

export default ItemDesc;
