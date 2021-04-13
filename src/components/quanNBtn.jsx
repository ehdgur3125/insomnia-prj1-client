import React from "react";
import { Row, Col, Icon, Button } from "framework7-react";
import { getDevice } from "../js/framework7-custom.js";

const QuanNBtn = ({ index, array, handleQuantity, handleDelete }) => {
  if (getDevice().desktop) {
    return (
      <Row noGap className='items-center'>
        <Col width="70" className="border-2">
          <input type="number" min="1" className="text-center w-full"
            onChange={(event) => handleQuantity(index, event.target.value)}
            value={array[index].quantity || ""}
          />
        </Col>
        <Col width="30" className="p-1">
          <Button fill onClick={() => handleDelete(index)}
          >
            X
        </Button>
        </Col>
      </Row>
    );
  }
  return (
    <Row className='items-center' gap='10'>
      <Col width="20">
        <Button fill onClick={() => handleQuantity(index, array[index].quantity - 1)}>
          <Icon f7="chevron_left" className="text-sm mb-2" />
        </Button>
      </Col>
      <Col width="30" className="border-2">
        <input type="number" min="1" className="text-center w-full"
          onChange={(event) => handleQuantity(index, event.target.value)}
          value={array[index].quantity || ""}
        />
      </Col>
      <Col width="20" className="flex-row items-center">
        <Button fill onClick={() => handleQuantity(index, array[index].quantity + 1)}>
          <Icon f7="chevron_right" className="text-sm mb-2" />
        </Button>
      </Col>
      <Col width="20" className="p-1">
        <Button fill onClick={() => handleDelete(index)}
        >
          X
      </Button>
      </Col>
    </Row>
  );
};

export default QuanNBtn;
