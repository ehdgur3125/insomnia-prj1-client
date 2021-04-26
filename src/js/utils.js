import { createAsyncPromise } from "../common/api/api.config";

const sleep = (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(t);
    }, t);
  });
};
const infiniteModule = (url, items, setItems, setInf, ishandlingInfinite) => {
  const infLen = 6;
  return {
    getMore: async (begin) => {
      if (ishandlingInfinite[0]) return;
      ishandlingInfinite[0] = true;
      const newData = await createAsyncPromise(
        "GET",
        url.indexOf('?') > 0
          ? `${url}&begin=${begin}&limit=${infLen}`
          : `${url}?begin=${begin}&limit=${infLen}`
      )();
      if (newData.items.length < infLen) setInf(false);
      else setInf(true);
      if (begin === 0) setItems(newData.items);
      else setItems([...items, ...newData.items]);
      ishandlingInfinite[0] = false;
    }
  }
};

export { sleep, infiniteModule };