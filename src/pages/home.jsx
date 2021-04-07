import {
  Block,
  BlockTitle,
  Button, Col, Link,
  List,
  ListItem, Navbar,
  NavLeft,
  NavTitle, Page,
  Row
} from 'framework7-react';
import React,{useState, useEffect} from 'react';
import {createAsyncPromise} from '../common/api/api.config';


const HomePage = (props) => {
  const [categoryId,setCategoryId]=useState(-1);
  const [items,setItems]=useState([]);
  useEffect(async()=>{
    const getItems=createAsyncPromise('GET',props.categoryId?`/items/${props.categoryId}`:'/items');
    const data=await getItems();
    setItems(data.items);
    setCategoryId(props.categoryId||0);
  },[]);
  return <Page name="home">
      {/* Top Navbar */}
      <Navbar sliding={false}>
        <NavLeft>
          <Link icon='las la-bars' panelOpen="left" />
        </NavLeft>
      </Navbar>
      {/* Page content */}
      <div className="p-3">
        {categoryId>=0
        ?<ul><List>
          {items.map(item=><ListItem key={item.itemId} title={item.name} link={`/item/${item.itemId}`}/>)}
        </List></ul>
        :null}
      </div>

    </Page>
  };
export default HomePage;