import React, { useEffect, useState } from "react";
import getTemplateDownloadUrl from "../requests/_Misc/misc";

const TemplateDownload = ({ fileType }) => {
  const [url, setUrl] = useState("");

  const fetchTemplateUrl = async () => {
    const res = await getTemplateDownloadUrl(fileType);
    setUrl(res);
  };

  useEffect(() => {
    fetchTemplateUrl();
  }, []);

  return (
    <a style={{ marginRight: "1rem", color: "blue" }} href={url}>
      Template
    </a>
  );
};

export default TemplateDownload;
