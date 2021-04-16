import React from "react";
import { f7, Row, Col, Icon, Button } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { getToken } from "../common/auth";
import { useRecoilState } from "recoil";
import { likesState, itemState } from "../js/atoms";

const ItemDesc = (props) => {
  const [, setItems] = useRecoilState(likesState);
  const [item, setItem] = useRecoilState(itemState);
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
    <>
      <p className="text-xl md:mt-5">{item.name}</p>
      <Row className="">
        <Col width="100">
          <Row className='justify-center'>
            <Col width='0' medium='30' className='hidden md:block' onClick={handleClick}>
              <Icon
                f7={!item.liked ? "hand_thumbsup" : "hand_thumbsup_fill"}
                color="default" />
            </Col>
            <Col width='0' medium='30' className='hidden md:block' >{item.likes}</Col>
          </Row>
          <Row className='justify-center'>
            <Col width='50' medium='80'>
              {Array(5).fill(0).map((x, index) => index + 1 <= item.grade
                ? <Icon color='yellow' f7='star_filled' key={`star${index}`} />
                : (index + 0.5 <= item.grade)
                  ? <Icon color='yellow' f7='star_lefthalf_filled' key={`star${index}`} />
                  : <Icon color='yellow' f7='star' key={`star${index}`} />)
              }
            </Col>
            <Col width='20' medium='20'>{item.grade ? item.grade.toFixed(2) : 0}</Col>
          </Row>
        </Col>
      </Row>
      <p className="my-3">{item.text}</p>
    </>
  );
};

export default ItemDesc;
