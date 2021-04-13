import React from "react";
import { Button, Row, Col, Icon } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { cartState, cartReadyState } from "../js/atoms";
import { useRecoilState } from "recoil";
import QuanNBtn from "./quanNBtn";

const CartReadyList = () => {
  const [, setCart] = useRecoilState(cartState);
  const [cartReady, setCartReady] = useRecoilState(cartReadyState);

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
  };

  return (<>
    <ul className="mx-10 items-center mt-5 md:mx-0">
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
                <Col width="20">{option.price}</Col>
                <Col width="50">
                  <QuanNBtn {...{ index, handleDelete, handleQuantity, array: cartReady }}></QuanNBtn>
                </Col>
              </Row>
            </li>
          ))}
        </>
      ) : null}
    </ul>
    <div className="flex justify-center mt-1 mb-5">
      {cartReady.length > 0 ? (
        <Button
          fill
          className="w-32"
          onClick={handleClick}
        >
          카트에 담기
        </Button>
      ) : null}
    </div>
  </>
  );
};

export default CartReadyList;
