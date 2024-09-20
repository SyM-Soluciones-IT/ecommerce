import React from "react";
import { Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(", ");
      values.skills = tempSkills;
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://peniamatias.alwaysdata.net/api/portfolio/update-about",
        {
          ...values,
          _id: portfolioData.about._id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }; 

  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...portfolioData.about,
          skills: portfolioData.about.skills.join(", "),
        }}
      >
        <Form.Item name="description1" label="Description1">
          <TextArea placeholder="Description1" />
        </Form.Item>
        <Form.Item name="description2" label="Description2">
          <TextArea placeholder="Description2" />
        </Form.Item>
        <Form.Item name="description3" label="Description3">
          <TextArea placeholder="Description3" />
        </Form.Item>
        <Form.Item name="skills" label="Skills">
          <Input placeholder="Skills" />
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

export default AdminAbout;