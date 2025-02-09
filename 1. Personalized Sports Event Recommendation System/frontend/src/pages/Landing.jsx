import React, { useEffect } from "react";
import {
  Layout,
  Space,
  Modal,
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Rate,
  Skeleton,
  Drawer,
} from "antd";
import { useState } from "react";
import {
  HomeOutlined,
  SearchOutlined,
  UserOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  SubnodeOutlined,
  UnorderedListOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../public/Public.css";
import Logo from "../public/hhlogo.png";
import { Serp, getAppointmentList, getByZipcode, searchEvent } from "../services/api";
import Recommendation from "../components/Recommedation";
import SearchEventCard from "../components/SearchEventCard";

const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};
const Landing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventSearchModal, setEventSearchModal] = useState(false);
  const [searchEvents, setSearchEvents] = useState();
  const [searchEventLoader, setSearchEventLoader] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showEventModal = () => {
    setEventSearchModal(true);
  };
  const hideEventModal = () => {
    setEventSearchModal(false);
  };
  const handleOk = (event) => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    if (values.zipcode.toString().toLowerCase() === "near me") {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        values["zipcode"] = JSON.stringify(pos);
        values["isnearme"] = true;
      });
    } else {
      values["isnearme"] = false;
    }
    setTimeout(async () => {
      await getByZipcode(values).then((data) => {
        navigate("/table-data", {
          state: {
            tabledata: JSON.stringify(data),
            homedata: location.state,
          },
        });
      });
    }, 200);
  };
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem("isLogin") == null || false ? false : true
  );

  const [serpRecom, setSerpRecom] = useState();
  useEffect(() => {
    Serp("upcoming sports event in chicago").then((data) => {
      setSerpRecom(data.events_results);
    });
  }, []);

  const onSearch = (value, _e, info) => {
    showEventModal();
    searchEvent(value).then((data) => {
      setSearchEvents(data.data);
      setSearchEventLoader(false);
    });
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [appntList, setappntList] = useState([]);
  return (
    <Layout className="main-bg-img d-flex w-100 h-100 position-absolute">
      <Header className="d-flex h-auto justify-content-between align-items-center ps-0">
      {isLogin === true && (
        <>
        <Button type="primary bg-transparent border-white shadow-none h-50 ms-3 " onClick={ async () => {
          { location?.state["userType"] !== "moderator" && (
          await searchEvent("modified").then((data) => {
            setappntList(data.data);
        })
      )}
      {location?.state["userType"] === "moderator" && (
        await getAppointmentList("modified").then((data) => {
          setappntList(data);
      })
      )}
      {

      }
          showDrawer()
        }
          }
          >
        Notification
      </Button>
              <Drawer
              title="Event Updates"
              placement={"left"}
              closable={false}
              onClose={onClose}
              open={open}
              key={"left"}
              width={500}
              className="border-black d-flex"
            >
              <SearchEventCard data={appntList} />
            </Drawer>
            </>
      )}
        <div className=" d-flex">
          <img
            className="object-fit-contain"
            src={Logo}
            width={250}
            height={100}
          ></img>
        </div>
        <div className="align-items-center d-flex justify-content-center text-white fs-1 fw-bold">
          Gen Sports
        </div>
        <div className="d-flex pt-4">
          <Menu className="justify-content-end" theme="dark" mode="horizontal">
            {isLogin === true ? (
              <Menu.Item key="1" disabled={true}>
                Hi {location?.state["fullname"]}
              </Menu.Item>
            ) : null}
            <Menu.Item
              key="2"
              icon={<HomeOutlined />}
              onClick={() => {
                navigate("/", { state: location.state });
              }}
            >
              Home
            </Menu.Item>
            {isLogin === true ? (
              <>
                {location?.state["userType"] === "user" && (
                  <>
                    <Menu.Item
                      key="3"
                      icon={<SearchOutlined />}
                      onClick={showModal}
                    >
                      Search By ZipCode
                    </Menu.Item>
                    <Menu.Item
                      key="4"
                      icon={<FileAddOutlined />}
                      onClick={() => {
                        navigate("/appointment", { state: location.state });
                      }}
                    >
                      Register Event
                    </Menu.Item>
                    <Menu.Item
                      key="5"
                      icon={<UnorderedListOutlined />}
                      onClick={() => {
                        navigate("/chat-gpt", { state: location.state });
                      }}
                    >
                      Chat GPT Recommedation
                    </Menu.Item>
                    <Menu.Item
                      key="6"
                      icon={<UnorderedListOutlined />}
                      onClick={() => {
                        navigate("/review", { state: location.state });
                      }}
                    >
                      Feedback
                    </Menu.Item>
                  </>
                )}
                {location?.state["userType"] === "moderator" && (
                  <>
                    <Menu.Item
                      key="5"
                      icon={<SearchOutlined />}
                      onClick={() => {
                        navigate("/view-patients", { state: location.state });
                      }}
                    >
                      View Events
                    </Menu.Item>
                  </>
                )}
                {location?.state["userType"] === "admin" && (
                  <>
                    <Menu.Item
                      key="4"
                      icon={<SubnodeOutlined />}
                      onClick={() => {
                        navigate("/user-menu", { state: location.state });
                      }}
                    >
                      User Menu
                    </Menu.Item>
                  </>
                )}
                {location?.state["userType"] === "organizer" && (
                  <>
                    <Menu.Item
                      key="4"
                      icon={<SubnodeOutlined />}
                      onClick={() => {
                        navigate("/event-menu", { state: location.state });
                      }}
                    >
                      Event Menu
                    </Menu.Item>
                  </>
                )}
              </>
            ) : null}
            {/* <Menu.Item key="5" icon={<InfoCircleOutlined />}>
            About Us
          </Menu.Item> */}
            {isLogin === false ? (
              <Menu.Item
                key="6"
                icon={<UserOutlined />}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Menu.Item>
            ) : (
              <Menu.Item
                key="7"
                icon={<UserOutlined />}
                onClick={() => {
                  sessionStorage.removeItem("isLogin");
                  sessionStorage.removeItem("isDocRegistered");
                  setIsLogin(false);
                }}
              >
                Logout
              </Menu.Item>
            )}
          </Menu>
        </div>
      </Header>
      <Content className="">

          <>
            <Search
              placeholder="Search Your Events"
              allowClear
              enterButton={
                <Button
                  style={{
                    backgroundColor: "#001529",
                    color: "#fff",
                  }}
                >
                  Search
                </Button>
              }
              size="large"
              onSearch={onSearch}
              className="my-2"
            />
            <Modal
              title="Search Results"
              width={800}
              style={{
                height: 600,
              }}
              open={eventSearchModal}
              onOk={hideEventModal}
              onCancel={hideEventModal}
              footer={[]}
            >
              {searchEventLoader ? (
                <Skeleton loading={searchEventLoader} active avatar></Skeleton>
              ) : (
                searchEvents && <SearchEventCard data={searchEvents} />
              )}
            </Modal>
          </>

        <Form
          id="zipcode_form"
          name="search_zipcode"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Modal
            title="Search By ZipCode"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <div className="d-flex justify-content-end">
                <Form.Item>
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    form="zipcode_form"
                    key="submit"
                    type="primary"
                    className="login-form-button ms-5"
                  >
                    Search
                  </Button>
                </Form.Item>
              </div>,
            ]}
          >
            <Form.Item
              name="find"
              label="Find"
              rules={[{ required: true, message: "Please input Sports!" }]}
            >
              <Input
                prefix={<SearchOutlined className="site-form-item-icon" />}
                placeholder="search for Sports"
              />
            </Form.Item>
            <Form.Item
              name="zipcode"
              label="zipcode"
              rules={[{ required: true, message: "Please input zipcode" }]}
            >
              <Input
                prefix={<SearchOutlined className="site-form-item-icon" />}
                placeholder="input zipcode"
              />
            </Form.Item>
          </Modal>
        </Form>
      </Content>
      {serpRecom && <Recommendation data={serpRecom} />}
      <Footer style={{ textAlign: "center" }}>
        Gen Sports ©2024 Created by Team 33
      </Footer>
    </Layout>
  );
};
export default Landing;
