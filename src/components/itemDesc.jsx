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
      <p className="my-3">{item.text}</p>
      <Row className="mx-10">
        <Col width="33" medium='0'>
          <Button
            className="md:hidden"
            fill
            sheetOpen=".option-sheet"
          >
            옵션
          </Button>
        </Col>
        <Col width="66" medium='100'>
          <Row className='justify-center'>
            <Col width='25' onClick={handleClick}>
              <Icon
                f7={!item.liked ? "hand_thumbsup" : "hand_thumbsup_fill"}
                color="default" />
            </Col>
            <Col width='25'>{item.likes}</Col>
            <Col width='25'>
              <Icon color='yellow' f7='star_filled' />
            </Col>
            <Col width='25'>{item.grade ? item.grade.toFixed(2) : 0}</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ItemDesc;
