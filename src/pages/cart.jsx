import React,{useEffect,useState} from 'react';
import { Page, Navbar, Block, NavLeft, Link, List, ListItem } from 'framework7-react';
import {createAsyncPromise} from '../common/api/api.config';

const Cart = (props) =>{ 
  const [cart,setCart]=useState(null);
  const getCart=createAsyncPromise('GET','/cart');
  useEffect(async()=>{
    const data=await getCart();
    if(data) setCart(data.data);
  },[])
  return (
    <Page>
      <Navbar sliding={false}>
      </Navbar>
      {cart
      ?(<>
        <ul><List>
          {cart.listItems.map(listItem=><ListItem key={listItem.optionId} link={`/item/${listItem.itemId}`}>
            {`${listItem.optionText}, ${listItem.quantity}개, 개당 ${listItem.price}원`}
          </ListItem>)}
        </List></ul>
        <div>Total : {cart.total}</div>
      </>)
      :null}
      <button>결제</button>
    </Page>
);
};

export default Cart;
