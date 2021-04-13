import React, { useState, useEffect } from "react";
import { Link, ListItem } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState([false]);
  const getCategories = createAsyncPromise("GET", "/categories");
  useEffect(async () => {
    const data = await getCategories();
    setCategories(data.categories);
    setIsLoaded(true);
  }, []);
  return (
    <>
      <ListItem
        title="전체"
        icon="las la-question"
        link="/"
        panelClose
      ></ListItem>
      {isLoaded ? (
        categories.map((category) => (
          <ListItem
            title={`${category.name} (${category.quantity})`}
            key={category.id}
            icon="las la-question"
            link={`/${category.id}`}
            panelClose
          ></ListItem>
        ))
      ) : (
        <ListItem title="로딩중"></ListItem>
      )}
    </>
  );
};

export default Categories;
