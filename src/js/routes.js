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

const routes = [
  { path: "/users/sign_in/", component: LoginPage },
  { path: "/users/sign_up/", component: SignUpPage },
  { path: "/cart/", component: CartPage },
  { path: "/purchase/", component: PurchasePage },
  { path: "/users/mypage/", component: MyPage },
  { path: "/users/my_orders/:orderId", component: MyOrderPage },
  { path: "/item/:itemId", component: ItemPage },
  { path: "/likes/", component: LikesPage},
  { path: "/", component: HomePage },
  { path: "/:categoryId", component: HomePage },
  { path: "(.*)", component: NotFoundPage },
];

export default routes;
