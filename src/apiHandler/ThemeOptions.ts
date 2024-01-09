import axios from "axios";
import windowConfig from "../components/Configurations/config";
import { ApiResponseError } from "../components/models/ApiResponseError";
import { ThemeOptionsModel } from "../components/models/ThemeOptionsModel";

export async function GetThemeOptions(
  urlQuery?: string
): Promise<ThemeOptionsModel> {
  let fetchedDefaultTheme: ThemeOptionsModel;
  const endpoint = `${windowConfig.API_URL}/themeoptions?${
    urlQuery ? urlQuery : ""
  }`;
  try {
    let response = await axios.get(endpoint);
    fetchedDefaultTheme = response.data;
  } catch (error: any) {
    throw new ApiResponseError(error.response.data);
  }
  return fetchedDefaultTheme;
}

export async function PutThemeOption(
  themeOption: ThemeOptionsModel
): Promise<ThemeOptionsModel> {
  const endpoint = `${windowConfig.API_URL}/themeOptions`;
  try {
    var res = await axios.put(endpoint, themeOption);
    return res.data;
  } catch (error: any) {
    throw new ApiResponseError(error.response.data);
  }
}
