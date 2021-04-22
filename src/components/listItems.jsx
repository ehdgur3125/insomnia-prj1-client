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
        <Col width='50'><img src={`http://localhost:3000/img/big/${listItem.itemName}/${listItem.optionId}`} /></Col>
        <Col width='50' className='flex flex-col items-end'>
          <div>{listItem.itemName} {listItem.optionText}</div>
          <div className='text-sm'>개당 {listItem.price}원</div>
          <div className='text-sm'>총 {listItem.quantity * listItem.price}원</div>
          <div className='w-full'><QuanNBtn {...{ index, handleDelete, handleQuantity, array: cart.listItems }}></QuanNBtn></div>
        </Col>
      </Row>
    </ListItem>
  ));
};

export default ListItems;
