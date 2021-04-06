import React from 'react';
import { Page, Navbar, Block, NavLeft, Link } from 'framework7-react';

const Cart = () =>{ 
  return (
    <Page>
      <Navbar sliding={false}>
        <NavLeft>
          <Link icon='las la-bars' panelOpen="left" />
        </NavLeft>
      </Navbar>
      <Block strong>
        <p>Cart</p>
      </Block>
    </Page>
);
};

export default Cart;
