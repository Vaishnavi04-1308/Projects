import React, { useEffect } from 'react';
import {
    HomeOutlined,
    FileAddOutlined,
    SolutionOutlined
} from '@ant-design/icons';
import { Button, Card, Select, Form, Input, notification, Menu, Space, Table, Tag, Switch, Pagination } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/Public.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AddEvent, getDoctorList, DeleteEvent, UpdateEvent, GetUsers, UpdateUsers } from '../services/api';
import { Header } from 'antd/es/layout/layout';

const UserMenu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [docform] = Form.useForm();
    const [docList,setDocList] = useState([]);
    const [switchLoading,setSwitchLoading] = useState(false)
    const [tableData, setTableData] = useState([]);
    const [action, setAction] = useState("add");
    const [content, setContent] = useState("2");
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, notification_message) => {
        api[type]({
            message: 'Success',
            description: notification_message,
        });
    };
    useEffect(() => {
        GetUsers().then((users) =>{
            setTableData(users.data);
        } )
    },[])
    
    const onFinish = async (values) => {
        if (action === "add") {

            await AddEvent(values).then((data) => {
                openNotificationWithIcon('success', data.data);
                docform.resetFields()
            })
        }
        if (action === "modify") {
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
    const columns = [
        {
          title: 'Full Name',
          dataIndex: 'fullname',
          key: 'fullname',
        },
        {
          title: 'Role',
          dataIndex: 'userType',
          key: 'userType',
        },
        {
          title: 'Username',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Enabled',
          key: 'enabled',
          render: (_, record) => (
            <Space size="middle">
               <Switch loading={switchLoading} defaultChecked={record.enabled} onChange={async (eve) => {
                record['enabled'] = eve;
                setSwitchLoading(true)
                await UpdateUsers(record).then((res) => {
                    setSwitchLoading(false)
                    openNotificationWithIcon('success', res.data);
                })
    
               }}/>
            </Space>
          ),
        },
      ];
    return (
        <>
            {contextHolder}
            <div className='bg-background h-100 position-fixed w-100'>
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
                        <Menu.Item key="2" icon={<FileAddOutlined />}>Users</Menu.Item>
                    </Menu>
                </Header>
               
                                    {content === "2" &&
                                        <Table columns={columns} dataSource={tableData} />
                                    }
                                    
            </div>
        </>)
}

export default UserMenu;