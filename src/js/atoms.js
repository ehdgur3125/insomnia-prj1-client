import { atom } from "recoil";

const cartState = atom({
  key: "cartState",
  default: null,
});

const myInfoState = atom({
  key: "myInfo",
  default: null,
});


const cartReadyState = atom({
  key: "cartReady",
  default: []
});

const itemState = atom({
  key: "item",
  default: null
});

const reloadTriggerState = atom({
  key: "reloadTrigger",
  default: 0
});

const reviewsState = atom({
  key: "reviews",
  default: []
});
const selectState = atom({
  key: "selectState",
  default: false
});

export { cartState, myInfoState, cartReadyState, itemState, selectState, reloadTriggerState, reviewsState };