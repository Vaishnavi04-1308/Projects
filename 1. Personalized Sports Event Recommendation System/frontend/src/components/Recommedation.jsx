import React from 'react';
import { Layout, Space, Modal, Form, Input, Button, Card, Row, Col, Rate  } from 'antd';
import { useState } from 'react';
import {
    HomeOutlined,
    SearchOutlined,
    UserOutlined,
    InfoCircleOutlined,
    PhoneOutlined,
    SubnodeOutlined,
    UnorderedListOutlined,
    FileAddOutlined
  } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import '../public/Public.css';
import Logo from '../public/hhlogo.png';
import { getByZipcode } from '../services/api';


const Recommendation = (props) => {
    const {data} = props;
 return(
    <div className='d-flex mb-3 justify-content-evenly'>
      <Row gutter={16}>
        {data.map((rec) => 
            <Col span={8}>
            <Card
            hoverable
            onClick={() => {
                window.open(rec.link, '_blank');
            }}
            title="Recommended"
              style={{ width: 210, height: 350 }}
              // className = "d-flex"
              cover={<div className='d-flex justify-content-center'><img alt="example" height={100} src={rec.thumbnail} style={{ borderRadius: '50%', width : '100px' }} /></div>}
            >
              <div style={{ textAlign: 'center' }}>
                <b>Event : </b>{rec.title}
              </div>
              <div className='my-2' style={{ textAlign: 'center' }}>
              <b>Address : </b>{rec.address[0]}
              </div>
              <div className='mb-2' style={{ textAlign: 'center' }}>
              <b>Date : </b>{rec.date.start_date},{rec.date.when}
              </div>
            </Card>
            </Col>
    )
}
  </Row>
      </div>
 )
}

export default Recommendation