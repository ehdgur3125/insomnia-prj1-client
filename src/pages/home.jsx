import {
  f7,
  Block,
  BlockTitle,
  Button,
  Col,
  Link,
  List,
  ListItem,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  Row,
} from "framework7-react";
import React, { useState, useEffect } from "react";
import { createAsyncPromise } from "../common/api/api.config";
import ItemInList from "../components/itemInList";
import { useRecoilValue } from "recoil"
import { reloadTriggerState } from "../js/atoms";

const HomePage = (props) => {
  const [items, setItems] = useState([]);
  const reloadTrigger = useRecoilValue(reloadTriggerState);
  useEffect(async () => {
    const getItems = createAsyncPromise(
      "GET",
      props.categoryName ? `/items/${props.categoryName}` : "/items"
    );
    const data = await getItems();
    setItems(data.items);
  }, [reloadTrigger]);
  return (
    <Page name="home" className='md:flex md:flex-col md:items-end'>
      {/* Top Navbar */}
      <Navbar className="text-center " sliding={false}>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <b>{props.categoryName || "Insomenia Shop"}</b>
        <NavRight className="w-10"> </NavRight>
      </Navbar>
      {/* Page content */}
      {/*<div className="flex flex-col items-center">
        <div className='text-xl'>혼자 사는 당신을 위한 한 끼 식사</div>
        <img
          src={`http://localhost:3000/img/main.jpg`}
          alt=""
          className="w-full md:w-72"
        />
  </div>*/}
      {items.length > 0
        ? <ItemInList items={items} setItems={setItems}></ItemInList>
        : null}
    </Page>
  );
};
export default HomePage;
