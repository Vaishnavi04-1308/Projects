import React from 'react';
import {
    HomeOutlined,
    FileAddOutlined,
    SolutionOutlined
} from '@ant-design/icons';
import { Button, Card, Select, Form, Input, notification, Menu, Col, Row, Modal } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/Public.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { getDoctorList, BookAppointment, getAppointmentList, deleteEvent } from '../services/api';
import { Header } from 'antd/es/layout/layout';

const Appointment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [doctorForm] = Form.useForm();
    const [docList, setDocList] = useState([]);
    const [appntList, setappntList] = useState([]);
    const [modalDetail,setModalDetail] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState("book");
    const [content, setContent] = useState("2");
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, notification_message) => {
        api[type]({
            message: 'Success',
            description: notification_message,
        });
    };
    const onFinish = async (values) => {
        values["user_name"] = location.state
        if (action === "book") {
            await BookAppointment(values).then((data) => {
                openNotificationWithIcon('success', data.data);
                doctorForm.resetFields()
            })
        }


    };
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
        const showModal = () => {
            setIsModalOpen(true);
          };
          const handleOk = () => {
            setIsModalOpen(false);
          };
          const handleCancel = () => {
            setIsModalOpen(false);
          };
    return (
        <>
            {contextHolder}
            <div className='bg-background h-auto position-absolute w-100'>
                <Header>
                    <Menu theme="dark" mode="horizontal" onSelect={(event) => {
                        if (event.key !== "1") {
                            doctorForm.resetFields()
                            setContent(event.key)
                        }
                    }} >
                        <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => {
                            navigate("/", { state: location.state });
                        }}>
                            Home
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FileAddOutlined />}>Register for Event</Menu.Item>
                        <Menu.Item key="3" icon={<SolutionOutlined />} onClick={async () => {
                            
                            await getAppointmentList(location.state.id).then((data) => {
                                setappntList(data);
                                console.log("appntList", appntList);
                            })
                        }}>View Registered Event</Menu.Item >
                    </Menu>
                </Header>
                {content === "2" &&
                    <div className='d-flex justify-content-center mt-5 w-100 mb-5'>

                        <Card title="Events" bordered={true} style={{ width: 700, height: 700 }}>
                            <Form
                                form={doctorForm}
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}

                            >

                                <Form.Item
                                    name="select"
                                >
                                    <Select
                                        showSearch
                                        placeholder="Select a event"
                                        optionFilterProp="children"
                                        onClick={async () => {
                                            //get doctor from db
                                            await getDoctorList("approved").then((dataColl) => {
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
                                            doctorForm.setFieldValue("id", formval["_id"]);
                                            doctorForm.setFieldValue("fullname", formval["_source"]["eventname"]);
                                            doctorForm.setFieldValue("address", formval["_source"]["address"]);
                                            doctorForm.setFieldValue("date", formval["_source"]["date"]);
                                            doctorForm.setFieldValue("timing", formval["_source"]["timing"]);
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

                                <Form.Item
                                    name="fullname"
                                    label="Fullname"

                                >
                                    <Input disabled={true} placeholder="Fullname" />
                                </Form.Item>
                                <Form.Item
                                    name="address"
                                    label="Address"
                                >
                                    <Input disabled={true} placeholder="Address" />
                                </Form.Item>
                                <Form.Item
                                    name="timing"
                                    label="Timing"
                                >
                                    <Input disabled={true} placeholder="eg: Mon - Fri 9am to 10 am" />
                                </Form.Item>

                                <Form.Item
                                    name="date"
                                    label="Date"
                                >
                                    <Input disabled={true} placeholder="eg: MM/DD/YYYY" />
                                </Form.Item>

                                {/* <Form.Item
                                    name="user_phone"
                                    label="User Phone"
                                    rules={[{ required: true, message: 'Please input your Phone!' }]}
                                >
                                    <Input placeholder="eg:2232567890" />
                                </Form.Item> */}
                                {/* <Form.Item
                                    name="credit_card_no"
                                    label="Credit Card"
                                    rules={[{ required: true, message: 'Please input your card number!' }]}
                                >
                                    <Input placeholder="2445 9988 7766 0035" />
                                </Form.Item> */}
                                <Form.Item className='d-flex justify-content-center'>

                                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => {
                                        setAction("book")
                                    }}>
                                        Book
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                }
                {
                    content === "3" && (

                        appntList.length != 0 &&
                        <>
                            <div className='d-flex justify-content-center mt-5 w-100 mb-5'>
                            <Row gutter={16}>
                                {
                                appntList.map((appnt,index) => 
                                    <Col span={appntList.length === 2 ? 12 : 8}>
                                    <Card
                                        title= {appnt['_source']['eventname']}
                                        bordered={true}
                                        hoverable
                                        style={{
                                            width: 300,
                                        }}
                                        onClick={async () => {
                                            await getDoctorList(appnt.doctor_id).then((docdata) => { 
                                                var modalParam = {
                                                    ...docdata[0],
                                                    ...appnt
                                                }
                                                setModalDetail(modalParam);
                                                console.log("modalDetail",modalDetail);
                                                showModal();
                                            })
                                            
                                        }}
                                    >
                                        <p>Date : {appnt['_source']['date']}</p>
                                        <p>Time : {appnt['_source']['timing']}</p>
                                        <p>Address : {appnt['_source']['address']}</p>
                                    </Card>
                                    </Col>
                                )

                                }
                                </Row>
                                <Modal title="Appointment Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[<div className='d-flex justify-content-center'>
      
          <Button type="primary" className="login-form-button ms-5" onClick={
            async () => {
                var param_val = {
                    user: location.state.username,
                    usertype: location.state.usertype
                }
                var del_param = modalDetail
                del_param["user_id"] = location.state.id
                await deleteEvent(del_param).then(async () => {
                    window.location.reload();
                // await getAppointmentList(location.state.id).then((data) => {
                    // setappntList(data);
                    // setIsModalOpen(false)
                    // console.log("appntList", appntList);
                // })
            })
            }
          }> 
            Cancel Appointment
          </Button>
          </div>
        ]}>{ modalDetail && <>
                                        <p>Event ID : {modalDetail["_id"]}</p>
                                        <p>Event Name : {modalDetail["_source"]["eventname"]}</p>
                                        <p>Address : {modalDetail["_source"]["address"]}</p>
                                        <p>Timing : {modalDetail["_source"]["timing"]}</p>
                                        <p>Date : {modalDetail["_source"]["date"]}</p></>
        }
                                </Modal>
                            </div>
                        </>

                    )
                }
            </div>
        </>
    );
};
export default Appointment;