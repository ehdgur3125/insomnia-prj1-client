import { Link, Navbar, NavLeft, NavRight, Page, Button } from "framework7-react";
import React, { useEffect } from "react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilState } from "recoil";
import { likesState } from "../js/atoms";
import ItemInList from "../components/itemInList";
import { getToken } from "../common/auth";

const Likes = (props) => {
  const [items, setItems] = useRecoilState(likesState);
  useEffect(async () => {
    if (!getToken().token) return;
    const getItems = createAsyncPromise("GET", "myLikes");
    const data = await getItems();
    setItems(data.items);
  }, []);
  return (
    <Page>
      <Navbar className="text-center " sliding={false} />
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
