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

  useEffect(async () => {
    const dataPromise = createAsyncPromise("GET", `/item/${props.itemId}`)();
    const newReviewsPromise = createAsyncPromise("GET", `/reviews?itemId=${props.itemId}&begin=0&limit=${infLen}`)();
    setItem((await dataPromise).item);
    const newReviews = await newReviewsPromise;
    if (newReviews.length < infLen) {
      setInf(false);
    }
    else setInf(true);
    setReviews([...newReviews.slice(0, infLen)]);
    setCartReady([]);
  }, [cart, reloadTrigger]);

  const handleInfinite = async () => {
    if (!inf) return;
    if (ishandlingInfinite) return;
    ishandlingInfinite = true;
    const newReviews = await createAsyncPromise("GET", `/reviews?itemId=${item.itemId}&begin=${reviews.length}&limit=${infLen}`)();
    if (newReviews.length < infLen) setInf(false);
    if (newReviews.length === 0) {
      ishandlingInfinite = true;
      return;
    }
    setReviews([...reviews, ...newReviews.slice(0, infLen)]);
    ishandlingInfinite = false;
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
                      className='w-full'
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
