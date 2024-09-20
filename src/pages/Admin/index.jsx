import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminCourses from "./AdminCourses";
import AdminContact from "./AdminContact";
import { useSelector } from "react-redux";

function Admin() {
  const { portfolioData } = useSelector((state) => state.root);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="flex items-center justify-between border-b border-gray-500 mx-5">
        <div>
          <h1 className="text-2xl py-2 text-primary">Portfolio Admin</h1>
        </div>
        <h1
          className="underline text-primary text-xl cursor-pointer"
          onClick={() => {
            localStorage.clear()
            window.location.href = "/admin-login"
          }}
        >
          Logout
        </h1>
      </div>
      {portfolioData && (
        <div className="px-5 pb-10">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Intro" key="1">
              <AdminIntro />
            </TabPane>
            <TabPane tab="About" key="2">
              <AdminAbout />
            </TabPane>
            <TabPane tab="Experiences" key="3">
              <AdminExperiences />
            </TabPane>
            <TabPane tab="Projects" key="4">
              <AdminProjects />
            </TabPane>
            <TabPane tab="Courses" key="5">
              <AdminCourses />
            </TabPane>
            <TabPane tab="Contact" key="6">
              <AdminContact />
            </TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default Admin;
