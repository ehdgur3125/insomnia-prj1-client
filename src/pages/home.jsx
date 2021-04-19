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

const HomePage = (props) => {
  const [categoryId, setCategoryId] = useState(-1);
  const [items, setItems] = useState([]);
  useEffect(async () => {
    const getItems = createAsyncPromise(
      "GET",
      props.categoryId ? `/items/${props.categoryId}` : "/items"
    );
    const data = await getItems();
    setItems(data.items);
    setCategoryId(props.categoryId || 0);
  }, []);
  return (
    <Page name="home">
      {/* Top Navbar */}
      <Navbar className="text-center " sliding={false}>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        Insomenia Shop
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
      {categoryId >= 0
        ? <ItemInList items={items} setItems={setItems}></ItemInList>
        : null}
    </Page>
  );
};
export default HomePage;
