import React from 'react';
import { Card } from 'antd';
const SearchEventCard = (props) => {
const {data} = props;
console.log("data",data);
    return( 
    data.map((card) => 
         <Card
    title={card['_source']['eventname']}
    bordered={true}
    style={{
      width: 400,
    }}
    className='shadow border-2'
  >
    <p>Address : {card['_source']['address']}</p>
    <p>Date : {card['_source']['date']}</p>
    <p>Time : {card['_source']['timing']}</p>
  </Card>
)  
)
};
export default SearchEventCard;