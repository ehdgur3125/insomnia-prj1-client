import React, { useState } from "react";
import { Sheet, Button, Row, Col, Toolbar, Link, Icon } from "framework7-react";
import { cartReadyState, selectState } from "../js/atoms";
import { useRecoilState } from "recoil";
import CartReadyList from "./cartReadyList";
import SelectOption from "./selectOption";
import { getDevice } from "../js/framework7-custom.js";

const ItemOption = (props) => {
  const [cartReady, setCartReady] = useRecoilState(cartReadyState);
  const [sheetOpened, setSheetOpened] = useState(false);
  // if (getDevice().desktop) {
  //   return (<>
  //     <SelectOption></SelectOption>
  //     <CartReadyList {...{ cartReady, setCartReady }}></CartReadyList>
  //   </>);
  // }
  const [select, setSelect] = useRecoilState(selectState);
  return (
    <Sheet
      className="option-sheet h-auto min-h-0"
      closeByOutsideClick
      opened={sheetOpened}
      onSheetClosed={() => setSheetOpened(false)}>
      <Toolbar>
        <div className="left"></div>
        <Button color='black' onClick={() => setSelect(x => !x)}>
          {select ? "취소" : (<div className='flex'><Icon f7='chevron_compact_down' />상품을 선택하세요</div>)}
        </Button>
        <div className="right">
          <Link sheetClose><Icon f7='multiply' /></Link>
        </div>
      </Toolbar>
      {
        select
          ? <SelectOption></SelectOption>
          :
          <CartReadyList {...{ cartReady, setCartReady }}></CartReadyList>
      }
    </Sheet>
  );
};

export default ItemOption;
