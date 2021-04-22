import React, { useState, useEffect } from "react";
import { Page, Navbar, List, ListItem, Row, Col, Link, Icon } from "framework7-react";
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
            <div className="text-base px-5">
              <div className='text-xl border-b'><b>주문정보</b></div>
              <div className='text-sm'>주문번호</div>
              <div className='text-lg border-b'>{myOrder.orderId}</div>
              <div className='text-sm'>주문상태</div>
              <div className='text-lg border-b'>{myOrder.state}</div>
              <div className='text-sm'>결제금액</div>
              <div className='text-lg border-b'>{myOrder.total}원</div>
              <div className='text-sm'>주소</div>
              <div className='text-lg border-b' style={{ wordBreak: "keep-all" }}>{myOrder.address}</div>
              <div className='text-sm'>연락처</div>
              <div className='text-lg border-b'>{myOrder.phone}</div>

              <div className='text-xl mt-5 border-b'><b>구매한 상품</b></div>
              {myOrder.listItems.map((listItem) => (
                <Link key={listItem.optionId}
                  className='border-b'
                  href={`/item/${listItem.itemId}/`}>
                  <Row noGap className="w-full text-center items-stretch">
                    <Col width='50'><img src={`http://localhost:3000/img/big/${listItem.itemName}/${listItem.optionId}`} /></Col>
                    <Col width='40' className='flex flex-col items-end'>
                      <div>{listItem.itemName}</div>
                      <div>{listItem.optionText}</div>
                      <div className='text-sm'>개당 {listItem.price}원</div>
                      <div className='text-sm'>{listItem.quantity}개</div>
                      <div className='text-sm'>총 {listItem.quantity * listItem.price}원</div>
                    </Col>
                    <Col width='10' className='flex justify-center items-center'> <Icon f7='chevron_right' /></Col>
                  </Row>
                </Link>
              ))}
            </div>
          )}
      </div></div>
    </Page>
  );
};

export default MyOrder;
