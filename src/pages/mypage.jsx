import React, { useEffect, useState } from "react";
import { f7, Page, Navbar, Row, Col, Button } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilState } from "recoil";
import { myInfoState } from "../js/atoms";
import MyOrders from "../components/myOrders"
import DaumPostcode from "react-daum-postcode"
import MyInfo from "../components/myinfo";
import PatchMyInfo from "../components/patchMyInfo";

const MyPage = () => {
  const [info, setInfo] = useRecoilState(myInfoState);
  const [modify, setModify] = useState(false);
  const getMypage = createAsyncPromise("GET", "/myinfo");
  useEffect(async () => {
    const newInfo = await getMypage();
    setInfo(newInfo);
  }, []);
  return (
    <Page noToolbar className="md:flex md:flex-col md:items-center">
      <Navbar title="Mypage" backLink="Back" />
      <div className="md:w-2/3">
        {!info ? null :
          modify
            ? <PatchMyInfo setModify={setModify} />
            : <MyInfo setModify={setModify} />
        }
        <MyOrders></MyOrders>
      </div>
    </Page>
  );
};

export default MyPage;
