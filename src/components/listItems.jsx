import React from "react";
import { ListItem, Row, Col } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilState } from "recoil";
import { cartState } from "../js/atoms";
import QuanNBtn from "./quanNBtn";

const ListItems = (props) => {
  const [cart, setCart] = useRecoilState(cartState);
  const getCart = createAsyncPromise("GET", "/cart");
  const patchCartSub = createAsyncPromise("PATCH", "/cart");
  const handleDelete = async (index) => {
    await createAsyncPromise("DELETE", `/cart/${cart.listItems[index].optionId}`)();
    const newCart = await getCart();
    setCart(newCart.data);
  };
  const handleQuantity = async (index, quantity) => {
    if (quantity < 0) return;
    if (quantity === "") quantity = 0;
    await patchCartSub({ optionId: cart.listItems[index].optionId, quantity });
    const newCart = await getCart();
    setCart(newCart.data);
  };
  return cart.listItems.map((listItem, index) => (
    <ListItem key={listItem.optionId}>
      <Row noGap className="w-full text-center items-center">
        <Col width='50'>
          <Row className="items-center">
            <Col>{listItem.itemName}</Col>
            <Col>{listItem.optionText}</Col>
            <Col>{listItem.price}</Col>
          </Row>
        </Col>
        <Col width='50'>
          <QuanNBtn {...{ index, handleDelete, handleQuantity, array: cart.listItems }}></QuanNBtn>
        </Col>
      </Row>
    </ListItem>
  ));
};

export default ListItems;
