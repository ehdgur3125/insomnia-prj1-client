import React from "react";
import { Button, Row, Col, f7 } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { cartState, cartReadyState, selectState } from "../js/atoms";
import { useRecoilState } from "recoil";
import QuanNBtn from "./quanNBtn";

const CartReadyList = () => {
  const [, setCart] = useRecoilState(cartState);
  const [cartReady, setCartReady] = useRecoilState(cartReadyState);
  const [, setSelect] = useRecoilState(selectState);

  const handleQuantity = (index, quantity) => {
    if (quantity < 0)
      return;
    setCartReady(cartReady => {
      const tmp = {
        ...cartReady[index],
        quantity
      };
      const res = [...cartReady];
      res[index] = tmp;
      return res;
    });
  };

  const handleDelete = (index) => {
    setCartReady(cartReady => {
      const res = [...cartReady];
      res.splice(index, 1);
      return res;
    });
  };

  const handleClick = async () => {
    if (cartReady.length === 0) {
      f7.dialog.alert('상품을 선택해주세요', '선택안됨');
      /*f7.toast.create({
        text: "상품을 선택해주세요",
        closeTimeout: 2000
      }).open();*/
      return;
    }
    const promises = cartReady.map((option) =>
      createAsyncPromise(
        "POST",
        "/cart"
      )({
        optionId: option.optionId,
        quantity: option.quantity,
      })
    );
    for (let promise of promises) await promise;
    setCartReady([]);
    const newCart = await createAsyncPromise("GET", "/cart")();
    setCart(newCart.data);
    setSelect(true);
  };

  return (<>
    <ul className="items-center mt-5 md:mx-0 border-b">
      {cartReady.length > 0 ? (
        <>
          <Row className="w-full text-center text-base border-b">
            <Col width="30">옵션</Col>
            <Col width="20">가격</Col>
            <Col width="50">갯수</Col>
          </Row>
          {cartReady.map((option, index) => (
            <li key={option.optionId}>
              <Row className="w-full text-center text-base items-center" noGap>
                <Col width="30">{option.text}</Col>
                <Col width="20">{option.price}원</Col>
                <Col width="50">
                  <QuanNBtn {...{ index, handleDelete, handleQuantity, array: cartReady }}></QuanNBtn>
                </Col>
              </Row>
            </li>
          ))}
        </>
      ) : null}
    </ul>
    <div className="flex flex-col items-center mt-1 mb-5">
      <div className='flex w-full justify-between px-10 items-center'>
        <b>주문금액</b>
        <b className='text-xl'>{cartReady.reduce((acc, option) => acc + option.price * option.quantity, 0)}원</b>
      </div>
      <Button
        fill
        className="w-32"
        onClick={handleClick}
        sheetClose
      >
        카트에 담기
        </Button>
    </div>
  </>
  );
};

export default CartReadyList;
