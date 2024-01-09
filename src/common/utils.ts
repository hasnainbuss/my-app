import axios from "axios";
import { HandleApiError } from "./errorUtils";
import { TablePagination } from "../components/models/TablePagination";

export function getTablePaginationTotal(
  pagination: TablePagination, 
  lengthOfdata: number
) {
  let start = (pagination.current - 1) * pagination.pageSize + 1;
  let end = (pagination.current - 1) * pagination.pageSize + lengthOfdata;
  return `${start} - ${end} Of  ${pagination.total}`;
}

export function downloadFile(endpoint: string, fileName: string) {
  try {
    const FileDownload = require("js-file-download");

    axios({
      url: endpoint,
      method: "GET",
      responseType: "blob", // Important
    }).then((response) => {
      FileDownload(response.data, fileName);
    });
  } catch (error) {
    HandleApiError(error);
  }
}

export function FormatDuration(seconds: number) {
  var mins = Math.floor(seconds / 60);
  var secs = seconds - mins * 60;

  return `${mins}:${secs}`;
}
