import React, { useEffect } from "react";
import { f7, Page, Navbar, List, ListInput } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";

const FailPage = (props) => {

  useEffect(async () => {
    f7.view.main.app.tab.show('#view-home');
    location.replace('/');
  }, []);

  return (
    <Page noToolbar>
      <Navbar title="결제 취소중" sliding={false} />
      <div h-full flex flex-col justify-center>
        <div text-base text-center>결제가 취소중입니다...</div>
      </div>
    </Page>
  );
};

export default FailPage;
