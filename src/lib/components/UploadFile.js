import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, notification } from "antd";
import cookie from "react-cookies";
import getNewJwt from "../services/jwt/getJwt";

const FILE_UPLOAD_STATUS_DONE = "done";
const FILE_UPLOAD_STATUS_SUCCESS = "success";
const FILE_UPLOAD_STATUS_UPLOADING = "uploading";
const FILE_UPLOAD_STATUS_ERROR = "error";

const UploadFile = ({ url }) => {
  const props = {
    name: "file",
    action: url,
    headers: {
      authorization: `Bearer ${cookie.load("activeToken")}`,
    },

    onChange(info) {
      if (info.file.status !== FILE_UPLOAD_STATUS_UPLOADING) {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === FILE_UPLOAD_STATUS_DONE) {
        if (info.file.response.status === FILE_UPLOAD_STATUS_SUCCESS) {
          message.success(`${info.file.name} file uploaded successfully`);
          window.location.reload();
        } else {
          for (let i = 0; i < info.file.response.message.length; i += 1) {
            notification.open({
              message: "Error Occured",
              description: info.file.response.message[i],
            });
          }
        }
      } else if (info.file.status === FILE_UPLOAD_STATUS_ERROR) {
        message.error("Please refresh the page and try again.");
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />} onClick={getNewJwt}>
        Click to Upload
      </Button>
    </Upload>
  );
};

export default UploadFile;
