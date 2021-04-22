import { List, ListItem, Navbar, Page, Panel } from "framework7-react";
import "lodash";
import React from "react";
import { logout } from "../common/api";
import { getToken } from "../common/auth";
import Categories from "./categories.jsx";

const SideNavBar = () => {
  let loggedIn = !!getToken().token;
  const handleLogout = async () => {
    await logout();
    location.replace("/");
  };
  return (
    <Panel left cover>
      <Page className="border-r">
        <Navbar title="메뉴" />
        <div className='text-lg border-b ml-3 mt-3'><b>카테고리</b></div>
        <ul className='-my-7'>
          <List>
            <Categories></Categories>
          </List>
        </ul>
        <ul className='-my-7 ml-3'>
          <List>
            {loggedIn ? (
              <>
                <ListItem
                  title="마이페이지"
                  link="/users"
                  panelClose
                ></ListItem>
                <ListItem
                  title="로그아웃"
                  link="#"
                  panelClose
                  onClick={handleLogout}
                ></ListItem>
              </>
            ) : (
              <ListItem
                title="로그인"
                link="/users/sign_in"
                panelClose
              ></ListItem>
            )}
          </List>
        </ul>
      </Page>
    </Panel>
  );
};
export default SideNavBar;
