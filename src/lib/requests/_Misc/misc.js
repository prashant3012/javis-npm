import performRequest from "..";
import { urls } from "../utility/url";
import { GET_METHOD } from "../utility/constants";

const getTemplateDownloadUrl = async (fileType) => {
  const res = await performRequest(
    `${urls._MISC.TEMPLATE_DOWNLOAD_URL}${fileType}`,
    GET_METHOD,
    {}
  );
  return res;
};

export default getTemplateDownloadUrl;
