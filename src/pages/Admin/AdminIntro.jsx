import React from "react";
import { Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminIntro() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("https://peniamatias.alwaysdata.net/api/portfolio/update-intro", {
        ...values,
        _id: portfolioData.intro._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(response.data.message);
    }
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData.intro}
      >
        <Form.Item name="welcomeText" label="Welcome Text">
          <Input placeholder="Welcome Text" />
        </Form.Item>
        <Form.Item name="firstName" label="First Name">
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item name="image" label="Image">
          <Input placeholder="Image" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item name="language" label="Language">
          <Select placeholder="Language" >
            <Select.Option value="EN">English</Select.Option>
            <Select.Option value="ES">Spanish</Select.Option>
          </Select>
        </Form.Item>
        <div className="flex justify-end">
          <button className="px-10 py-2 bg-primary text-white" type="submit">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminIntro;
