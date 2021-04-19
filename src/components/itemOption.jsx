import React, { useState } from "react";
import { Sheet, Button, Row, Col } from "framework7-react";
import { cartReadyState, selectState } from "../js/atoms";
import { useRecoilState } from "recoil";
import CartReadyList from "./cartReadyList";
import SelectOption from "./selectOption";
import { getDevice } from "../js/framework7-custom.js";

const ItemOption = (props) => {
  const [cartReady, setCartReady] = useRecoilState(cartReadyState);
  const [sheetOpened, setSheetOpened] = useState(false);
  if (getDevice().desktop) {
    return (<>
      <SelectOption></SelectOption>
      <CartReadyList {...{ cartReady, setCartReady }}></CartReadyList>
    </>);
  }
  const [select, setSelect] = useRecoilState(selectState);
  return (
    <Sheet
      className="option-sheet h-auto min-h-1/10 border-yellow-500 rounded-t-xl border-r-8 border-l-8 border-t-8 pt-5"
      closeByOutsideClick
      opened={sheetOpened}
      onSheetClosed={() => setSheetOpened(false)}>
      {
        select
          ? <SelectOption></SelectOption>
          : <Col>
            <Row className='justify-center'><Col width='50'><Button fill onClick={() => setSelect(true)}>옵션 추가</Button></Col></Row>
            <CartReadyList {...{ cartReady, setCartReady }}></CartReadyList>
          </Col>
      }
    </Sheet>
  );
};

export default ItemOption;
