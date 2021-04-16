import React, { useState, useEffect } from "react";
import { List, ListItem, Row, Col } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState(null);
  const getMyOrders = createAsyncPromise("GET", "/myorders");
  useEffect(async () => {
    const orders = await getMyOrders();
    setMyOrders(orders.orders);
  }, []);
  return (
    <ul className="px-5">
      <List>
        {myOrders === null
          ? null
          : myOrders.length === 0
            ? "주문내역이 없습니다."
            : myOrders.map((order) => (
              <ListItem
                key={order.orderId}
                href={`/users/my_orders/${order.orderId}/`}
              >
                <Row className="w-full">
                  <Col width="80" className="truncate">
                    {order.summary}
                  </Col>
                  <Col width="20" className="text-center">
                    {order.state}
                  </Col>
                </Row>
              </ListItem>
            ))
        }
      </List>
    </ul>
  );
};

export default MyOrders;
