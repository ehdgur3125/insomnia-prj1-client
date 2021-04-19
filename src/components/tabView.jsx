import { Link, Toolbar, View, Views } from "framework7-react";
import "lodash";
import React from "react";
import { getToken } from "../common/auth";
import i18n from "../lang/i18n";
import { cartState } from "../js/atoms";

import { useRecoilState } from "recoil";
global.i18next = i18n;

const TabView = () => {
  // Login screen demo data
  let loggedIn = !!getToken().token;
  const [cart,] = useRecoilState(cartState);
  //const device = getDevice();
  // Framework7 Parameters
  return (
    <Views tabs className="safe-areas" >
      {/* Tabbar for switching views-tabs */}
      <Toolbar tabbar labels bottom>
        <Link tabLink="#view-home" tabLinkActive
          icon="las la-gift" text="쇼핑" />
        <Link tabLink="#view-search"
          icon="las la-search" text="찾기" />
        <Link tabLink="#view-likes"
          icon="las la-bookmark" text="북마크" />
        <Link tabLink="#view-carts" icon="las la-shopping-cart"
          iconBadge={cart ? cart.listItems.length : undefined}
          text="장바구니" badgeColor="default" />
      </Toolbar>
      <View id="view-home" name="home" main tab
        tabActive url="/" iosDynamicNavbar={false} browserHistory='true' browserHistorySeparator="" />
      <View id="view-carts" iosDynamicNavbar={false} name="carts" tab url="/cart" />
      <View id="view-search" iosDynamicNavbar={false} name="search" tab url="/search" />
      <View id="view-likes" iosDynamicNavbar={false} name="likes" tab url="/likes" />
    </Views>
  );
};
export default TabView;
