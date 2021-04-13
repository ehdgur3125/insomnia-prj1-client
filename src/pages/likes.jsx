import { Link, Navbar, NavLeft, NavRight, Page } from "framework7-react";
import React, { useEffect } from "react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilState } from "recoil";
import { likesState } from "../js/atoms";
import ItemInList from "../components/itemInList";

const Likes = (props) => {
  const [items, setItems] = useRecoilState(likesState);
  useEffect(async () => {
    const getItems = createAsyncPromise("GET", "myLikes");
    const data = await getItems();
    setItems(data.items);
  }, []);
  return (
    <Page>
      <Navbar className="text-center " sliding={false}>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        찜목록
        <NavRight className="w-10"> </NavRight>
      </Navbar>
      <div className="flex justify-center">
        <img
          src={`https://insomenia.com/svgs/artificial`}
          alt=""
          className="w-full md:w-72"
        />
      </div>
      <div className="p-3 grid grid-cols-2 md:grid-cols-8 justify-items-center">
        {
          items
            ? <ItemInList items={items}></ItemInList>
            : null
        }
      </div>
    </Page>
  );
};
export default Likes;
