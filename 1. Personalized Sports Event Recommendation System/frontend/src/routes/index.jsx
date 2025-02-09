import ReactDOM from "react-dom/client";
import { createBrowserRouter, BrowserRouter, Routes, Route, createRoutesFromElements, RouterProvider, Link, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import Landing from "../pages/Landing";
import TableData from "../components/TableData";
import Appointment from "../components/Appointment";
import ViewPatients from "../components/ViewPatients";
import Reviews from "../components/Reviews";
import EventMenu from "../components/EventMenu";
import UserMenu from "../components/UserMenu";
import Chatgpt from "../components/ChatgptRecommendation";

function Router() {
    const Router = createBrowserRouter(
        createRoutesFromElements(
          <Route exact path="/" element={<Root />}>   
          <Route index element={<Landing/>}/>
          <Route path="/login" element={< Login />} />
          <Route path="/create-account" element={< CreateAccount />} />
          <Route path="/table-data" element={< TableData />} />
          <Route path="/user-menu" element={< UserMenu />} />
          <Route path="/event-menu" element={< EventMenu />} />
          <Route path="/appointment" element={<Appointment/>}/>
          <Route path="/view-patients" element={<ViewPatients/>}/>
          <Route path="/chat-gpt" element={<Chatgpt/>}/>
          <Route path="/review" element={<Reviews/>}/>
        </Route>
        )
      )
  return (
    <RouterProvider router={Router}/>
  );
}
const Root = () => {
  return(
  <>
  <div>
  <Outlet/>
  </div>
  </>
  );
}
export default Router;
