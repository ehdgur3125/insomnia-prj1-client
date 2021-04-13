import React, { useEffect } from "react";
import { Page, Navbar, Row, Col } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilState } from "recoil";
import { myInfoState } from "../js/atoms";
import MyOrders from "../components/myOrders"

const MyPage = () => {
  const [info, setInfo] = useRecoilState(myInfoState);
  const getMypage = createAsyncPromise("GET", "/myinfo");
  useEffect(async () => {
    const infoPromise = getMypage();
    setInfo(await infoPromise);
  }, []);
  return (
    <Page noToolbar>
      <Navbar title="Mypage" backLink="Back" />
      <div className="md:flex md:justify-center">
        <div className="md:w-2/3">
          {!info ? null : (
            <div className="text-base text-center m-10 border">
              <Row>
                <Col width="30" className="border-r">
                  주소
                </Col>
                <Col width="70">{info.address}</Col>
              </Row>
              <Row>
                <Col width="30" className="border-r">
                  전화번호
                </Col>
                <Col width="70">{info.phone}</Col>
              </Row>
            </div>
          )}
          <MyOrders></MyOrders>
        </div>
      </div>
    </Page>
  );
};

export default MyPage;
