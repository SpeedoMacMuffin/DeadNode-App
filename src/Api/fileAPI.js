import axios from "axios";
import { fileServerUrl } from "./ServerUrls";

export default axios.create({
  baseURL: `${fileServerUrl}`,
});
