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
      <div className="flex justify-center">
        <img
          src={`https://insomenia.com/svgs/artificial`}
          alt=""
          className="w-full md:w-72"
        />
      </div>
      <div className="p-3 grid grid-cols-2 md:grid-cols-5 justify-items-center">
        {categoryId >= 0
          ? <ItemInList items={items}></ItemInList>
          : null}
      </div>
    </Page>
  );
};
export default HomePage;
