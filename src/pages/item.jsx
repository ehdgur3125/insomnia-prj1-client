import React, { useState, useEffect } from "react";
import { Page, Navbar, Row, Col } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilState } from "recoil";
import { cartState, itemState, cartReadyState } from "../js/atoms";
import ItemDesc from "../components/itemDesc";
import ItemOption from "../components/itemOption";

const Item = (props) => {
  const [item, setItem] = useRecoilState(itemState);
  const [cart,] = useRecoilState(cartState);
  const [, setCartReady] = useRecoilState(cartReadyState);

  useEffect(async () => {
    const data = await createAsyncPromise("GET", `/item/${props.itemId}`)();
    setItem(data.item);
    setCartReady([]);
  }, [cart]);

  return (
    <Page noToolbar>
      <Navbar
        title={item? item.name : ""}
        sliding={false}
        backLink="Back"
      ></Navbar>
      {item? (
        <div className="text-center text-base md:grid md:grid-cols-4 md:mt-20">
          <div className="md:col-start-2 md:col-span-1">
            <Row className="flex-col items-center pb-5">
              <Col width="80">
                <img
                  src={`http://localhost:3000/img/big/${item.name}`}
                  className="w-full"
                />
              </Col>
            </Row>
          </div>
          <div className="md:col-end-4 md:col-span-1">
            <ItemDesc></ItemDesc>
            <ItemOption></ItemOption>
          </div>
        </div>
      ) : null}
    </Page>
  );
};

export default Item;
