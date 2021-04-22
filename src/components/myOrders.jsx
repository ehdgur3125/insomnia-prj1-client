import React, { useState, useEffect } from "react";
import { List, ListItem, Row, Col, Link, Icon } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState(null);
  const getMyOrders = createAsyncPromise("GET", "/myorders");
  useEffect(async () => {
    const orders = await getMyOrders();
    setMyOrders(orders.orders);
  }, []);
  return (
    <>
      <div className='text-xl ml-5 w-full mb-5 border-b'><b>내 주문 내역</b></div>
      <div className="px-5">
        {myOrders === null
          ? null
          : myOrders.length === 0
            ? "주문내역이 없습니다."
            : myOrders.map((order) => (
              <Link
                key={order.orderId}
                href={`/users/my_orders/${order.orderId}/`}
              >
                <Row noGap className="w-full items-stretch mb-5 border-b">
                  <Col width='50'>
                    <img src={`http://localhost:3000/${order.img}`} />
                  </Col>
                  <Col width="40" className="flex flex-col space-y-1 items-end">
                    <div className='text-lg'>{order.summary}</div>
                    <div className='text-sm'>{order.state}</div>
                    <div className='text-sm'>{order.total}원</div>
                  </Col>
                  <Col width='10' className='flex justify-center items-center'> <Icon f7='chevron_right' /></Col>
                </Row>
              </Link>
            ))
        }
      </div>
    </>
  );
};

export default MyOrders;
