import React from 'react';
import {
    HomeOutlined,
    FileAddOutlined,
    SolutionOutlined
} from '@ant-design/icons';
import { Button, Card, Select, Form, Input, notification, Menu, Row } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/Public.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AddEvent, getDoctorList, DeleteEvent, UpdateEvent, GetAnalytics } from '../services/api';
import { Header } from 'antd/es/layout/layout';
import { Chart } from "react-google-charts";

const EventMenu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [docform] = Form.useForm();
    const [docList,setDocList] = useState([]);
    const [barGraphData,setBarGraphData] = useState([])
    const [action, setAction] = useState("add");
    const [content, setContent] = useState("2");
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, notification_message) => {
        api[type]({
            message: 'Success',
            description: notification_message,
        });
    };
    const onFinish = async (values) => {
        if (action === "add") {
            values['registered_users'] = [];
            values['release'] = 'new';
            values['reviews'] = JSON.stringify([]);
            values['approval'] = 'notapproved';
            await AddEvent(values).then((data) => {
                openNotificationWithIcon('success', data.data);
                docform.resetFields()
            })
        }
        if (action === "modify") {
            values['release'] = 'modified';
            values['reviews'] = JSON.stringify([]);
            values['approval'] = 'notapproved';
            await UpdateEvent(values).then((data) => {
                openNotificationWithIcon('success', data.data);
                docform.resetFields()
            })
        }
        if (action === "delete") {
            await DeleteEvent(values).then((data) => {
                openNotificationWithIcon('success', data.data);
                docform.resetFields()
            })
        }

    };
    const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


  const options = {
    title: "My Daily Activities",
    is3D: true,
  };
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
    return (
        <>
            {contextHolder}
            <div className='bg-background h-100 position-absolute w-100'>
                <Header>
                    <Menu theme="dark" mode="horizontal" onSelect={(event) => {
                        if (event.key !== "1") {
                            docform.resetFields()
                            setContent(event.key)
                        }
                    }} >
                        <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => {
                            navigate("/", { state: location.state });
                        }}>
                            Home
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FileAddOutlined />}>Add Event</Menu.Item>
                        <Menu.Item key="3" icon={<SolutionOutlined />}>Modify Event</Menu.Item>
                        <Menu.Item key="4" icon={<SolutionOutlined />} onClick={async() => {
                            await GetAnalytics().then((data) => {
                                setBarGraphData(data.data)
                            })
                        }}>View Event Analytics</Menu.Item>
                    </Menu>
                </Header>
                {
                    <div className='d-flex justify-content-center mt-5 w-100 h-100'>
                        {content !== "4" &&
                        <Card title="Events" bordered={true} style={{ width: 700, height: 480 }}>
                            <Form
                                form={docform}
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}

                            >
                                {content === "3" && <>
                                    <Form.Item 
                                    name="select"
                                    >
                                    <Select
                                        showSearch
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        onClick={async () => {
                                            //get Event from db
                                            await getDoctorList("all").then((dataColl) => {
                                                var docArr = [];
                                                dataColl.map((doc) => {
                                                    var docObj = {};
                                                    docObj['value'] = JSON.stringify(doc);
                                                    docObj['label'] = doc["_source"]['eventname'];
                                                    docArr.push(docObj);
                                                })
                                                setDocList(docArr);
                                            })
                                        }}
                                        onSelect={(value) => {
                                            
                                            var formval = JSON.parse(value);
                                            docform.setFieldValue("id",formval["_id"]);
                                            docform.setFieldValue("eventname",formval["_source"]["eventname"]);
                                            docform.setFieldValue("address",formval["_source"]["address"]);
                                            docform.setFieldValue("date",formval["_source"]["date"]);
                                            docform.setFieldValue("timing",formval["_source"]["timing"]);
                                        }}
                                        filterOption={filterOption}
                                        options={docList}
                                    />
                                    </Form.Item>
                                    <Form.Item
                                        name="id"
                                        label="ID number"
                                    >
                                        <Input disabled={true} placeholder="id" />
                                    </Form.Item>
                                </>
                                }
                                <Form.Item
                                    name="eventname"
                                    label="Event Name"
                                    rules={[{ required: true, message: 'Please input your Eventname!' }]}
                                >
                                    <Input placeholder="Eventname" />
                                </Form.Item>
                                <Form.Item
                                    name="address"
                                    label="Address"
                                    rules={[{ required: true, message: 'Please input your Address!' }]}
                                >
                                    <Input placeholder="Address" />
                                </Form.Item>
                                <Form.Item
                                    name="date"
                                    label="Date"
                                    rules={[{ required: true, message: 'Please input your date!' }]}
                                >
                                    <Input placeholder="Date" />
                                </Form.Item>
                                <Form.Item
                                    name="timing"
                                    label="Timing"
                                    rules={[{ required: true, message: 'Please input your timing details!' }]}
                                >
                                    <Input placeholder="eg: Mon - Fri 9am to 10 am" />
                                </Form.Item>


                                <Form.Item className='d-flex justify-content-center'>
                                    {content === "2" &&
                                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => {
                                            setAction("add")
                                        }}>
                                            Add
                                        </Button>
                                    }
                                    {content === "3" &&
                                        <>
                                            <Button type="primary" htmlType="submit" className="login-form-button me-5" onClick={() => {
                                                setAction("modify")
                                            }}>
                                                Modify
                                            </Button>
                                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => {
                                                setAction("delete")
                                            }}>
                                                Delete
                                            </Button>
                                        </>
                                    }
                                </Form.Item>
                            </Form>
                        </Card>
}
                        {
  content === "4" &&
<div className='d-flex'>
<Row>
    <Chart
  chartType="BarChart"
  data={barGraphData}
  width="100%"
//   height="600px"
height={"100%"}
  legendToggle
/>

<Chart
      chartType="PieChart"
      data={barGraphData}
      className='d-flex'
      options={options}
      width={"100%"}
      height={"100%"}
    />
    </Row>
    </div>
}
                    </div>
                }
            </div>
        </>)
}

export default EventMenu;