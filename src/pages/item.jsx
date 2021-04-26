import React, { useState, useEffect } from "react";
import { f7, Page, Navbar, Row, Col, Swiper, SwiperSlide, Toolbar, Button, Icon } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, itemState, cartReadyState, reviewsState, reloadTriggerState } from "../js/atoms";
import ItemDesc from "../components/itemDesc";
import ItemOption from "../components/itemOption";
import PostReview from '../components/postReview';
import Reviews from '../components/reviews';
import { getToken } from "../common/auth";
import Bookmark from "../components/bookmark";
import GradeDistribution from "../components/gradeDistribution";
const infLen = 3;

let ishandlingInfinite = false;
const Item = (props) => {
  const [item, setItem] = useRecoilState(itemState);
  const cart = useRecoilValue(cartState);
  const [inf, setInf] = useState(true);
  const [, setCartReady] = useRecoilState(cartReadyState);
  const [imgs, setImgs] = useState([]);
  const [reviews, setReviews] = useRecoilState(reviewsState);
  const reloadTrigger = useRecoilValue(reloadTriggerState);

  useEffect(async () => {
    if (item === null) return;
    const newImgs = await createAsyncPromise("GET", `/img/big/${item.name}`)();
    setCartReady([]);
    setImgs(newImgs);
  }, [item?.itemId]);

  const getMore = async (begin) => {
    if (ishandlingInfinite) return;
    ishandlingInfinite = true;
    const newReviews = await createAsyncPromise("GET", `/reviews?itemId=${props.itemId}&begin=${begin}&limit=${infLen}`)();
    if (newReviews.length < infLen) setInf(false);
    if (begin !== 0) setReviews([...reviews, ...newReviews]);
    else setReviews(newReviews);
    ishandlingInfinite = false;
  };

  useEffect(async () => {
    const dataPromise = createAsyncPromise("GET", `/item/${props.itemId}`)();
    getMore(0);
    setItem((await dataPromise).item);
    setCartReady([]);
  }, [cart, reloadTrigger]);

  const handleInfinite = async () => {
    if (!inf) return;
    getMore(reviews.length);
  };
  return (
    <Page noToolbar infinite infinitePreloader={inf} onInfinite={handleInfinite}>
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
          구매하기
          </Button>
      </Toolbar>}
      {item
        ? (
          <div className="text-base mb-10 md:grid md:grid-cols-4 md:mt-20">
            <div className="md:col-start-2 md:col-span-1 border-b mb-1">
              <Swiper pagination>
                {imgs.length > 0
                  ? imgs.map(img =>
                    <SwiperSlide key={img}><img
                      className='w-full min-h-full'
                      src={`http://localhost:3000/img/big/${item.name}/${img}`}
                    /></SwiperSlide>)
                  : null}
              </Swiper>
            </div>
            <div className="px-5 md:col-end-4 md:col-span-1">
              <ItemDesc></ItemDesc>
              <ItemOption></ItemOption>
              {item.grade ? <GradeDistribution></GradeDistribution> : null}
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
