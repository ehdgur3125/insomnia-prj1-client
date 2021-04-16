import React from "react";
import { Col, Row } from "framework7-react";

function ItemInList({ items }) {

  return items.map((item) => (
    <a key={item.itemId}
      href={`/item/${item.itemId}`}
      className="text-center text-base mt-5 w-40"
    >
      <Row>
        <Col className='h-40'>
          <img
            src={`http://localhost:3000/img/small/${item.name}`}
            className="w-full h-full border-b"
          />
        </Col>
      </Row>
      <Row className="text-lg border-b">
        <Col>{item.name}</Col>
      </Row>
      <Row>
        <Col>
          {
            item.minPrice === item.maxPrice
              ? item.minPrice
              : `${item.minPrice}원 ~ ${item.maxPrice}원`
          }
        </Col>
      </Row>
    </a>
  ));
}

export default ItemInList;