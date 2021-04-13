import React, { useEffect } from "react";
import { f7, Page, Navbar, List, Button, Row, Col } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { getToken } from "../common/auth";
import { useRecoilState } from "recoil";
import { cartState } from "../js/atoms";
import ListItems from "../components/listItems";

const Cart = (props) => {
  const [cart, setCart] = useRecoilState(cartState);
  const getCart = createAsyncPromise("GET", "/cart");
  useEffect(async () => {
    if (!getToken().token) return;
    const data = await getCart();
    if (data) setCart(data.data);
  }, []);
  return (
    <Page>
      <Navbar sliding={false}></Navbar>
      {cart && cart.listItems.length > 0 ? (
        <ul>
          <List>
            <ListItems></ListItems>
            <Row className>
              <Col width="50"></Col>
              <Col width="50" className="flex justify-center">
                <Button
                  className="border text-base mt-10 w-40"
                  {...{
                    href: cart.total ? "/purchase/" : undefined,
                    onClick: cart.total ? undefined : () => {
                      f7.dialog.alert("구매하는 물건이 없습니다.", "빈 카트");
                    }
                  }}
                >
                  {cart.total}원 결제
                </Button>
              </Col>
            </Row>
          </List>
        </ul>
      ) : (
        <div className='h-full flex flex-col justify-center'>
          <div className='text-base text-center '>카트가 비어있습니다.</div>
        </div>
      )}
    </Page>
  );
};

export default Cart;
