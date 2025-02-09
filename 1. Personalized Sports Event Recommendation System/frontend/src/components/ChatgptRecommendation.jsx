import React, { useEffect } from 'react';
import {
    HomeOutlined,
    FileAddOutlined,
    SolutionOutlined
} from '@ant-design/icons';
import { Button, Card, Select, Form, Input, notification, Menu, Col, Row, Modal, Spin } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/Public.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { getDoctorList, BookAppointment, getAppointmentList, deleteEvent, Geocode, Agent, Recommendation } from '../services/api';
import { Header } from 'antd/es/layout/layout';
import {
    APIProvider,
    Map,
    useMarkerRef,
    InfoWindow,
    AdvancedMarker,
    Pin,
    Marker,
    useAdvancedMarkerRef,
  } from "@vis.gl/react-google-maps";

const Chatgpt = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [doctorForm] = Form.useForm();
    const [docList, setDocList] = useState([]);
    const [appntList, setappntList] = useState([]);
    const [modalDetail,setModalDetail] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState("book");
    const [content, setContent] = useState("2");
    const [recomLoader, setRecomLoader] = useState(true);
    const [sportsJson, setSportsJson] = useState();
    const [sportAddress, setSportAddress] = useState();
    const [api, contextHolder] = notification.useNotification();
    const [currentLocalLocation, setCurrentLocalLocation] = useState({});
    const [recom, setRecom] = useState();
    const closeInfoWindow = () => {

        setIssportToggle(false);
      };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocalLocation(pos);
        });
        Recommendation(
            "suggest 3 sports events in chicago based on my weather and location"
          ).then((res) => {
            setRecom(res);
          });
          Agent(
            "suggest 3 sports events with event details in chicago including time and address in central time with the fromat HH:MM only as json data"
          ).then(async (data) => {
            
            await Geocode(data).then((code) => {
              setSportAddress(code);
            });
            setSportsJson(data);
            setRecomLoader(false)
          });
      }, []);
      const [issporttoggle, setIssportToggle] = useState(false);
      const togglewindow = (event) => {
        // setInfoDisplay(values)
          setIssportToggle(true);
      };
      const [markerRef, marker] = useMarkerRef();
      const [mapref,mapper] = useMarkerRef();
    return (
        <>
            {contextHolder}
            <div className='bg-background h-100 position-fixed w-100'>
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
                        <Menu.Item key="2" icon={<FileAddOutlined />}>Chat GPT Recommendation</Menu.Item>

                    </Menu>
                </Header>
                {content === "2" &&
                        <Row className='d-flex h-100'>
     

                        {recomLoader ? (
                             <Col span={12} className='d-flex justify-content-center align-items-center'>
  
                      <p className="d-flex align-items-center"><Spin tip="Loading" size="large">
      </Spin></p>
                      </Col>
                  ) : (
                    <>
                    <Col span={12}>
                      <div className="d-flex w-100 h-100">
                        {sportAddress && (
                              <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY.replace(/[<>]/g, '')}>
                              <Map zoom={10} center={{
                                lat: currentLocalLocation.lat,
                                lng: currentLocalLocation.lng,
                              }} mapId={'mymap'}>
                              <InfoWindow anchor={mapper} position={currentLocalLocation}>
                              You are here
                            </InfoWindow>
                            
                            <Marker ref={mapref} position={currentLocalLocation} background={"green"} />

                              {sportAddress.data.map((details, index) => (
                                <>
                                  <AdvancedMarker
                                    id={"sports" + index}
                                    collisionBehavior={"REQUIRED"}
                                    position={{
                                      lat: details.ltlg.location.lat + 0.00005,
                                      lng: details.ltlg.location.lng + 0.00005,
                                    }}
                                    onClick={() => {
                                      togglewindow("sports");
                                    }}
                                  >
                                    <Pin
                                      background={"green"}
                                      glyphColor={"#fff"}
                                      borderColor={"#000"}
                                    >
                                    </Pin>
                                  </AdvancedMarker>
                                  {issporttoggle && (
                                    <div className="display-none">
                                    <InfoWindow
                                      shouldFocus={issporttoggle}
                                      position={{
                                        lat: details.ltlg.location.lat,
                                        lng:
                                          details.ltlg.location.lng +
                                          0.00005,
                                      }}
                                      onCloseClick={closeInfoWindow}
                                    >
                                      <b>Name :</b>{" "}
                                      {details.name ??
                                        details.sport ??
                                        details.title}{" "}
                                      <br />
                                      <b>Address :</b> {details.address}
                                      <br />
                                      <b>Date:</b> {details.date}
                                      <br />
                                      <b>Time :</b> {details.time}
                                      <br />
                                    </InfoWindow>
                                  </div>
                                  )}
                                </>
                              ))}


                            </Map>
                          </APIProvider>
                        )}
                      </div>
                      </Col>
                      <Col span={12}>
                      <div className="d-flex w-100 h-100"><pre>{recom}</pre></div>
                      </Col>
                      </>
                  )}

                  </Row>
                }
                
            </div>
        </>
    );
};
export default Chatgpt;