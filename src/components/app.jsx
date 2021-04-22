import { App } from "framework7-react";
import "lodash";
import React from "react";
import store from "../common/store";
import { getDevice } from "../js/framework7-custom.js";
import routes from "../js/routes";
import i18n from "../lang/i18n";
import TabView from "./tabView";
import SideNavBar from "./sideNavBar";

global.i18next = i18n;

const MyApp = () => {
  // Login screen demo data
  //const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: "Insomenia Shop", // App name
    theme: "ios", // Automatic theme detection
    id: "com.insomenia.practice", // App bundle ID
    // App store
    store: store,
    // App routes
    routes: routes,
    // Input settings
    view: {
      iosDynamicNavbar: getDevice().ios,
    },
  };
  return (
    <App {...f7params}>
      {/* Left panel with cover effect*/}
      <SideNavBar></SideNavBar>
      <TabView></TabView>
    </App>
  );
};
export default MyApp;
