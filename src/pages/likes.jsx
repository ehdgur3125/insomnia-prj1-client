import { Link, Navbar, NavLeft, NavRight, Page, Button } from "framework7-react";
import React, { useEffect, useState } from "react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilValue } from "recoil";
import { reloadTriggerState } from "../js/atoms";
import ItemInList from "../components/itemInList";
import { getToken } from "../common/auth";
import { infiniteModule } from "../js/utils";
const ishandlingInfinite = [false];

const Likes = (props) => {
  const [items, setItems] = useState([]);
  const reloadTrigger = useRecoilValue(reloadTriggerState);
  const [inf, setInf] = useState(true);

  const { getMore } = infiniteModule("/myLikes", items, setItems, setInf, ishandlingInfinite);

  useEffect(async () => {
    if (!getToken().token) return;
    getMore(0);
  }, [reloadTrigger]);

  const handleInfinite = async () => {
    if (!inf) return;
    getMore(items.length);
  };

  return (
    <Page infinite infinitePreloader={items.length > 0 && inf} onInfinite={handleInfinite}>
      <Navbar className="text-center" title='북마크' sliding={false} />
      {
        getToken().token
          ? items.length > 0
            ? <ItemInList items={items} setItems={setItems}></ItemInList>
            : (
              <div className='h-full flex flex-col justify-center'>
                <div className='text-base text-center '>북마크된 상품이 없습니다.</div>
              </div>
            )
          :
          <div className='h-full flex flex-col justify-center items-center'>
            <div className='text-base text-center mb-5'>로그인이 필요한 서비스입니다.</div>
            <Button href="/users/sign_in" fill className='w-1/3'>로그인</Button>
          </div>
      }
    </Page>
  );
};
export default Likes;
