import axios from "axios";
import config from "../components/Configurations/config";
import { UserModel } from "../components/models";
import { ApiResponseError } from "../components/models/ApiResponseError";
import { PaginatedResponse } from "../components/models/PaginatedResponse";

export async function GetAllUsers(
  urlQuery?: string
): Promise<PaginatedResponse<UserModel>> {
  const endpoint = `${config.API_URL}/Users?${urlQuery}`;
  let paginatedResult: PaginatedResponse<UserModel> = {};
  try {
    let response = await axios.get(endpoint);
    let pagination = response.headers["x-pagination"];
    paginatedResult.data = response.data;
    paginatedResult.pagination = JSON.parse(pagination);
    return paginatedResult;
  } catch (error: any) {
    throw new ApiResponseError(error.response.data);
  }
}

export async function GetUser(userId: number): Promise<UserModel> {
  const endpoint = `${config.API_URL}/Users/${userId}`;
  try {
    let response = await axios.get(endpoint);
    return response.data;
  } catch (error: any) {
    throw new ApiResponseError(error.response.data);
  }
}

export async function AddUser(user: UserModel): Promise<UserModel> {
  const endpoint = `${config.API_URL}/Users`;
  try {
    var res = await axios.post(endpoint, user);
    let createUser = res.data;
    return createUser;
  } catch (error: any) {
    throw new ApiResponseError(error.response.data);
  }
}

export async function UpdateUser(user: UserModel): Promise<UserModel> {
  const endpoint = `${config.API_URL}/Users/${user.id}`;
  try {
    var res = await axios.put(endpoint, user);
    return res.data;
  } catch (error: any) {
    throw new ApiResponseError(error.response.data);
  }
}

export async function DeleteUser(leadId: string) {
  const endpoint = `${config.API_URL}/Users/${leadId}`;
  try {
    await axios.delete(endpoint);
  } catch (error: any) {
    throw new ApiResponseError(error.response.data);
  }
}
