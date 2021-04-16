import React, { useState, useEffect } from "react";
import { Page, Navbar, Row, Col, Swiper, SwiperSlide, Toolbar, Button, Icon } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilState, useRecoilValue } from "recoil";
import { likesState, cartState, itemState, cartReadyState } from "../js/atoms";
import ItemDesc from "../components/itemDesc";
import ItemOption from "../components/itemOption";
import PostReview from '../components/postReview';
import Reviews from '../components/reviews';
import { getToken } from "../common/auth";

const Item = (props) => {
  const [item, setItem] = useRecoilState(itemState);
  const cart = useRecoilValue(cartState);
  const [, setCartReady] = useRecoilState(cartReadyState);
  const [, setItems] = useRecoilState(likesState);
  const [imgs, setImgs] = useState([]);
  useEffect(async () => {
    const data = await createAsyncPromise("GET", `/item/${props.itemId}`)();
    setItem(data.item);
    const newImgs = await createAsyncPromise("GET", `/img/big/${data.item.name}`)();
    setImgs(newImgs);
    setCartReady([]);
  }, [cart]);
  const handleClick = async () => {
    if (getToken().token) {
      if (!item.liked) {
        await createAsyncPromise("POST", "/like")({ itemId: item.itemId });
        setItem({
          ...item,
          likes: item.likes + 1,
          liked: true,
        });
        const myLikes = await createAsyncPromise("GET", "/mylikes")();
        setItems(myLikes.items);
      } else {
        await createAsyncPromise("DELETE", `/like/${item.itemId}`)();
        setItem({
          ...item,
          likes: item.likes - 1,
          liked: false,
        });
        const myLikes = await createAsyncPromise("GET", "/mylikes")();
        setItems(myLikes.items);
      }
    } else {
      f7.dialog.alert("로그인이 필요합니다.", "회원 전용");
    }
  }
  return (
    <Page noToolbar>
      <Navbar
        title={item ? item.name : ""}
        sliding={false}
        backLink="Back"
      ></Navbar>
      {item && <Toolbar bottom className='flex md:hidden justify-center'>
        <Button onClick={handleClick}>
          <Icon
            f7={!item.liked ? "hand_thumbsup" : "hand_thumbsup_fill"}
            color="default" />
          {item.likes}
        </Button>
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
          <div className="text-center text-base mb-16 md:grid md:grid-cols-4 md:mt-20">
            <div className="md:col-start-2 md:col-span-1">
              <Row className="flex-col items-center">
                <Col width="80">
                  <Swiper pagination>
                    <SwiperSlide><img
                      src={`http://localhost:3000/img/small/${item.name}`}
                      className="w-full"
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
