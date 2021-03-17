import axios from "axios";
import { adminServerUrl } from "./ServerUrls";

export default axios.create({
  baseURL: `${adminServerUrl}`,
});
