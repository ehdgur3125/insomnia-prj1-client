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
    <Views tabs className="safe-areas">
      {/* Tabbar for switching views-tabs */}
      <Toolbar tabbar labels bottom>
        <Link tabLink="#view-home" tabLinkActive
          icon="las la-gift" text="쇼핑" />
        {loggedIn ? (
          <Link tabLink="#view-carts" icon="las la-shopping-cart"
            iconBadge={cart ? cart.listItems.length : undefined}
            text="장바구니" badgeColor="default" />
        ) : (
          <Link tabLink="#view_home" href="/users/sign_in/"
            icon="las la-shopping-cart" text="장바구니" />
        )}
      </Toolbar>
      <View id="view-home" name="home" main tab
        tabActive url="/" iosDynamicNavbar={false} />
      <View id="view-carts" name="carts" tab url="/cart/" />
    </Views>
  );
};
export default TabView;
