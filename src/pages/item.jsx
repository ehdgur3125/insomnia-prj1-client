import React, { useState, useEffect } from "react";
import { f7, Page, Navbar, Row, Col, Swiper, SwiperSlide, Toolbar, Button, Icon } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilState, useRecoilValue } from "recoil";
import { likesState, cartState, itemState, cartReadyState } from "../js/atoms";
import ItemDesc from "../components/itemDesc";
import ItemOption from "../components/itemOption";
import PostReview from '../components/postReview';
import Reviews from '../components/reviews';
import { getToken } from "../common/auth";
import Bookmark from "../components/bookmark";

const Item = (props) => {
  const [item, setItem] = useRecoilState(itemState);
  const cart = useRecoilValue(cartState);
  const [, setCartReady] = useRecoilState(cartReadyState);
  const [imgs, setImgs] = useState([]);
  useEffect(async () => {
    const data = await createAsyncPromise("GET", `/item/${props.itemId}`)();
    setItem(data.item);
    const newImgs = await createAsyncPromise("GET", `/img/big/${data.item.name}`)();
    setImgs(newImgs);
    setCartReady([]);
  }, [cart]);
  return (
    <Page noToolbar>
      <Navbar
        title={item ? item.name : ""}
        sliding={false}
        backLink="Back"
      ></Navbar>
      {item && <Toolbar bottom className='flex md:hidden justify-center'>
        <Bookmark {...{ item, setItem }} />
        <Button
          fill
          sheetOpen=".option-sheet"
          className='w-1/2'
        >
          옵션
          </Button>
      </Toolbar>}
      {item
        ? (
          <div className="p-10 text-base mb-16 md:grid md:grid-cols-4 md:mt-20">
            <div className="md:col-start-2 md:col-span-1">
              <Row className="flex-col items-center">
                <Col width="80">
                  <Swiper pagination>
                    <SwiperSlide><img
                      src={`http://localhost:3000/img/small/${item.name}`}
                      className="w-full mb-5"
                    /></SwiperSlide>
                    {imgs.length > 0
                      ? imgs.map(img =>
                        <SwiperSlide key={img}><img
                          src={`http://localhost:3000/img/big/${item.name}/${img}`}
                          className="w-full"
                        /></SwiperSlide>)
                      : null}
                  </Swiper>
                </Col>
              </Row>
            </div>
            <div className="md:col-end-4 md:col-span-1">
              <ItemDesc></ItemDesc>
              <ItemOption></ItemOption>
            </div>
          </div>
        ) : null}
      {item && item.purchased
        ? <PostReview />
        : null}
      {item
        ? <Reviews />
        : null}
    </Page>
  );
};

export default Item;
