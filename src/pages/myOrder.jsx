import React, { useState, useEffect } from "react";
import { Page, Navbar, List, ListItem, Row, Col } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";

const MyOrder = (props) => {
  const [myOrder, setMyOrder] = useState(null);
  const getMyOrder = createAsyncPromise("GET", `/myorder/${props.orderId}`);
  useEffect(async () => {
    const data = await getMyOrder();
    setMyOrder(data.order);
  }, []);
  return (
    <Page noToolbar>
      <Navbar title="my order" backLink="Back" />
      <div className="md:flex md:justify-center"><div className="md:w-2/3">
        {!myOrder
          ? null
          : (
            <div className="text-center text-base">
              <div className="border my-5 mx-10">
                <Row>
                  <Col width="40" className="border-r">
                    주문번호
                  </Col>
                  <Col width="60">{myOrder.orderId}</Col>
                </Row>
                <Row>
                  <Col width="40" className="border-r">
                    주문상태
                  </Col>
                  <Col width="60">{myOrder.state}</Col>
                </Row>
                <Row>
                  <Col width="40" className="border-r">
                    결제금액
                  </Col>
                  <Col width="60">{myOrder.total}</Col>
                </Row>
              </div>
              <ul>
                <List>
                  <ListItem>
                    <Row noGap className="w-full text-center pr-5">
                      <Col width="25" small="10"></Col>
                      <Col width="25" small="30"></Col>
                      <Col width="25" small="30">
                        개당가격
                      </Col>
                      <Col width="25" small="30">
                        수량
                      </Col>
                    </Row>
                  </ListItem>
                  {myOrder.listItems.map((listItem) => (
                    <ListItem
                      key={listItem.optionId}
                      href={`/item/${listItem.itemId}`}
                    >
                      <Row noGap className="w-full text-center items-center">
                        <Col width="25" small="10">
                          <img
                            src={`http://localhost:3000/img/small/${listItem.itemName}`}
                            className="w-full"
                          />
                        </Col>
                        <Col width="25" small="30">
                          <Row>
                            <Col>{listItem.itemName}</Col>
                          </Row>
                          <Row>
                            <Col>{listItem.optionText}</Col>
                          </Row>
                        </Col>
                        <Col width="25" small="30">
                          {listItem.price}
                        </Col>
                        <Col width="25" small="30">
                          {listItem.quantity}
                        </Col>
                      </Row>
                    </ListItem>
                  ))}
                </List>
              </ul>
            </div>
          )}
      </div></div>
    </Page>
  );
};

export default MyOrder;
