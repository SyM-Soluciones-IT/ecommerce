import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { Modal, Form, Input, message, Select } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";

function AdminCourses() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { courses } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;

      if (selectedItemForEdit) {
        response = await axios.post(
          "https://peniamatias.alwaysdata.net/api/portfolio/update-course",
          {
            ...values,
            _id: selectedItemForEdit._id,
          }
        );
      } else {
        response = await axios.post(
          "https://peniamatias.alwaysdata.net/api/portfolio/add-course",
          values
        );
      }

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(ReloadData(true));
        form.resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://peniamatias.alwaysdata.net/api/portfolio/delete-course",
        {
          _id: item._id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleAddClick = () => {
    setSelectedItemForEdit(null);
    form.resetFields();
    setShowAddEditModal(true);
  };

  const handleEditClick = (course) => {
    setSelectedItemForEdit(course);
    form.setFieldsValue(course);
    setShowAddEditModal(true);
  };

  const handleCancelClick = () => {
    form.resetFields();
    setSelectedItemForEdit(null);
    setShowAddEditModal(false);
  };

  return (
    <div className="">
      <div className="flex justify-end mb-5">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={handleAddClick}
        >
          Add course
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 sm:grid-cols-1 sm:text-center">
        {courses.map((course) => (
          <div
            className="shadow border p-5 border-gray-400 flex flex-col gap-5"
            key={course._id}
          >
            <h1 className="text-primary text-xl font-bold">{course.title}</h1>
            <hr />
            <img
              src={course.image}
              alt=""
              className="h-60 w-80 sm:self-center"
            />
            <h1>Description: {course.description}</h1>
            <h1 className="truncate">Link: {course.link}</h1>
            <h1>Language: {course.language}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="px-5 py-2 bg-primary text-white"
                onClick={() => handleEditClick(course)}
              >
                Edit
              </button>
              <button
                className="px-5 py-2 bg-red-500 text-white"
                onClick={() => onDelete(course)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit course" : "Add course"}
        footer={null}
        onCancel={handleCancelClick}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="image" label="Image">
            <Input type="text" placeholder="Image" />
          </Form.Item>
          <Form.Item name="title" label="Title">
            <Input type="text" placeholder="Title" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea type="text" placeholder="Description" />
          </Form.Item>
          <Form.Item name="link" label="Link">
            <Input type="text" placeholder="Link" />
          </Form.Item>
          <Form.Item name="language" label="Language">
            <Select placeholder="Language">
              <Select.Option value="EN">English</Select.Option>
              <Select.Option value="ES">Spanish</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-5">
            <button
              className="px-5 py-2 bg-red-500 text-white"
              onClick={handleCancelClick}
              type="button"
            >
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-primary text-white">
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminCourses;
