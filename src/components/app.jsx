import {
  App, f7,
  f7ready,
  Link,
  List,
  ListItem, Navbar, Page, PageContent, Panel,
  Toolbar, View, Views
} from 'framework7-react';
import 'lodash';
import React from 'react';
import { logout } from '../common/api';
import { getToken } from '../common/auth';
import store from '../common/store';
import { getDevice } from '../js/framework7-custom.js';
import routes from '../js/routes';
import i18n from "../lang/i18n";
import {createAsyncPromise} from '../common/api/api.config';
import { create } from 'lodash';
import Categories from './categories.jsx';

global.i18next = i18n;

const MyApp = () => {
  // Login screen demo data
  let loggedIn = !!getToken().token;
  const handleLogout = async ()=>{
    await logout()
    location.replace('/')
  }
  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: 'Practice', // App name
    theme: 'ios', // Automatic theme detection
    id: 'com.insomenia.practice', // App bundle ID
    // App store
    store: store,
    // App routes
    routes: routes,
    // Input settings
    view: {
      iosDynamicNavbar: getDevice().ios,
    }
  };
  return (
    <App { ...f7params } >
      {/* Left panel with cover effect*/}
      <Panel left cover>
          <Page>
            <Navbar title="메뉴"/>
              <ul><List>
                <Categories></Categories>
              </List></ul>
              <ul><List>
                {
                  loggedIn
                  ?<>
                    <ListItem title='마이페이지' link="/users/mypage/" panelClose></ListItem>
                    <ListItem title="로그아웃" link="#" icon="las la-question" panelClose onClick={handleLogout}></ListItem>
                  </>
                  :<ListItem title="로그인" link="/users/sign_in/" icon="las la-question" panelClose></ListItem>
                }
              </List></ul>
          </Page>
      </Panel>
      <Views tabs className="safe-areas">
        {/* Tabbar for switching views-tabs */}
        <Toolbar tabbar labels bottom>
          <Link tabLink="#view-home" tabLinkActive icon="las la-gift" text="쇼핑" />
          <Link tabLink="#view-carts" icon="las la-shopping-cart" text="장바구니" />
        </Toolbar>
        <View id="view-home" main tab tabActive url="/" iosDynamicNavbar={false} />
        <View id="view-carts" name="carts" tab url="/cart/" />
      </Views>
    </App>
  );
}
export default MyApp;