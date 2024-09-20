import React from "react";
import { Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("https://peniamatias.alwaysdata.net/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData.contact._id,
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
        initialValues={portfolioData.contact}
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="age" label="Age">
          <Input placeholder="Age" />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Input placeholder="Gender" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="mobile" label="Mobile">
          <Input placeholder="Mobile" />
        </Form.Item>
        <Form.Item name="country" label="Country">
          <Input placeholder="Country" />
        </Form.Item>
        <Form.Item name="city" label="City">
          <Input placeholder="City" />
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

export default AdminContact;
