import React from "react";
import { Col, Row, Link } from "framework7-react";
import Bookmark from "./bookmark";

function ItemInList({ items, setItems }) {
  return (
    <div className="p-3 grid grid-cols-2 md:grid-cols-5 justify-items-center">
      {items.map((item, index) => (
        <div key={item.itemId}
          className="text-base mt-5 w-40 border rounded-xl p-3">
          <Row>
            <Col className='h-40 p-3'>
              <Link
                href={`/item/${item.itemId}`}
              ><img
                  src={`http://localhost:3000/img/small/${item.name}`}
                  className="w-full h-full"
                /></Link>
            </Col>
          </Row>
          <Row className="text font-me justify-between">
            <Link
              href={`/item/${item.itemId}`}
            ><Col width='80'>{item.name}</Col></Link>
            <Col width='20'><Bookmark item={item} setItem={(newItem) => {
              setItems([...items.slice(0, index), newItem, ...items.slice(index + 1)]);
            }} /></Col>
          </Row>
          <Row>
            <Col className='text-sm'><b>
              {
                item.minPrice === item.maxPrice
                  ? `${item.minPrice}원`
                  : `${item.minPrice}원 ~ ${item.maxPrice}원`
              }
            </b></Col>
          </Row>
        </div>
      ))}</div>);
}

export default ItemInList;