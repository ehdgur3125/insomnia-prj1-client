import React from "react";
import { f7, Row, Col } from "framework7-react";
import { getToken } from "../common/auth";
import { cartReadyState, itemState, selectState } from "../js/atoms";
import { useRecoilState } from "recoil";

const SelectOption = (props) => {
  const [cartReady, setCartReady] = useRecoilState(cartReadyState);
  const [, setSelect] = useRecoilState(selectState);
  const [item,] = useRecoilState(itemState);

  const handleClick = (index) => {
    if (index === '-1') return;
    const options = item.options;
    if (!getToken().token) {
      f7.dialog.alert("로그인이 필요합니다.", "회원 전용");
      return;
    }
    if (options[index].inCart) {
      f7.dialog.alert(
        "이미 카트에 담긴 상품입니다.",
        "이미 있음"
      );
      return;
    } else if (
      !cartReady.some(
        (optionInList) =>
          optionInList.optionId === options[index].optionId
      )
    ) {
      setCartReady([...cartReady, { ...options[index], quantity: 1 }]);
    }
    setSelect(false);
  };

  return (
    <div className="w-full text-base text-center">
      {item.options.map((option, index) => (
        <Row value={index} key={option.optionId} className='flex md:hover:bg-yellow-200 border-b'
          onClick={() => handleClick(index)}>
          <Col width='25'><img src={`http://localhost:3000/img/big/${item.name}/${option.optionId}`} /></Col>
          <Col width='75' className='flex flex-col justify-begin text-left'>
            <b className='text-lg'>{option.text}</b>
            <div className='text-base'>{option.price}원</div>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default SelectOption;
