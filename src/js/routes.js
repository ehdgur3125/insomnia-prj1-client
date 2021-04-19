import HomePage from "../pages/home.jsx";
//import IntroPage from "../pages/intro.jsx";
import NotFoundPage from "../pages/404.jsx";
import LoginPage from "../pages/users/sessions/new.jsx";
import SignUpPage from "../pages/users/registrations/new.jsx";
import CartPage from "../pages/cart";
import MyPage from "../pages/mypage";
import MyOrderPage from "../pages/myOrder.jsx";
import ItemPage from "../pages/item";
import PurchasePage from "../pages/purchase";
import LikesPage from "../pages/likes";
import SuccessPage from "../pages/success";
import FailPage from "../pages/fail";
import SearchPage from "../pages/search";

const routes = [
  {
    path: "/users",
    component: MyPage,
    routes: [
      { path: "/mypage", component: MyPage },
      { path: "/sign_in", component: LoginPage },
      { path: "/sign_up", component: SignUpPage }
    ]
  },
  { path: "/success", component: SuccessPage },
  { path: "/fail", component: FailPage },
  { path: "/cart", component: CartPage },
  { path: "/search", component: SearchPage },
  { path: "/purchase", component: PurchasePage },
  { path: "/users/my_orders/:orderId", component: MyOrderPage },
  { path: "/item", component: HomePage },
  { path: "/item/:itemId", component: ItemPage },
  { path: "/likes", component: LikesPage },
  { path: "/", component: HomePage },
  { path: "/:categoryId", component: HomePage },
  { path: "(.*)", component: NotFoundPage },
];

export default routes;
