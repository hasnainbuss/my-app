import axios from "axios";
import config from "../components/Configurations/config";
import { ApplicationUser } from "../components/models";
import { ApiResponseError } from "../components/models/ApiResponseError";
import { AuthenticationRequest } from "../components/models/auth/AuthenticationRequest";

export async function AuthenticateUser(
  authRequest: AuthenticationRequest
): Promise<ApplicationUser> {
  const endpoint = `${config.API_URL}/Auth/authenticate`;
  try {
    var res = await axios.post(endpoint, authRequest);
    let user: ApplicationUser = res.data;
    return user;
  } catch (error: any) {
    throw new ApiResponseError(error.response.data);
  }
}
