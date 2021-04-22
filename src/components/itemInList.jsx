import React from "react";
import { Col, Row, Link, Icon } from "framework7-react";
import Bookmark from "./bookmark";

function ItemInList({ items, setItems }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 justify-items-center">
      {items.map((item, index) => (
        <div key={item.itemId}
          className="text-base m-1 border border-b-4 border-r-4 rounded-b-xl relative">
          <div className="absolute z-50 -right-4 -top-0.5">{/*item.likes > 0 && item.likes*/}<Bookmark item={item} setItem={(newItem) => {
            setItems([...items.slice(0, index), newItem, ...items.slice(index + 1)]);
          }} /></div>
          <Link
            className='flex flex-col'
            href={`/item/${item.itemId}`}
          ><Row>
              <Col className='h-40'>
                <img
                  src={`http://localhost:3000/img/small/${item.name}`}
                  className="w-full h-full border-b"
                />
              </Col>
            </Row>
            <Row className="w-full font-me justify-between p-2">
              <Col>{item.name}</Col>
              <Col className='flex flex-row justify-end'>{item.grade > 0 && <><Icon f7='star_filled' className='text-sm relative top-0.5 -left-1' color='yellow' /> {item.grade.toFixed(1)}</>}</Col>
            </Row>
            <Row>
              <Col className='text-sm p-2'><b>
                {
                  item.minPrice === item.maxPrice
                    ? `${item.minPrice}원`
                    : `${item.minPrice}원 ~ ${item.maxPrice}원`
                }
              </b></Col>
            </Row>
          </Link>
        </div>
      ))
      }</div >);
}

export default ItemInList;