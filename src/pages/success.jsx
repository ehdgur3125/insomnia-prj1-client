import React, { useEffect } from "react";
import { f7, Page, Navbar, List, ListInput } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";

const SuccessPage = (props) => {

  useEffect(async () => {
    await createAsyncPromise("POST", "purchase_approval")(props.f7route.query);
    f7.view.main.app.tab.show('#view-home');
    location.replace('/');
  }, []);

  return (
    <Page noToolbar>
      <Navbar title="결제 진행중" sliding={false} />
      <div className="h-full flex flex-col justify-center">
        <div className="text-base text-center">결제가 진행중입니다...</div>
      </div>
    </Page>
  );
};

export default SuccessPage;
