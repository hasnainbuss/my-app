import React from "react";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { UserModel } from "../models";
import { TablePagination } from "../models/TablePagination";

interface ColumnsProps {
  pagination: TablePagination; // Define pagination prop
}

export const columns: (props: ColumnsProps) => ColumnsType<UserModel> = (
  props
) => [
  {
    key: "index",
    title: "#",
    align: "center",
    width: "5%",
    render: (text, row: UserModel, index: number) =>
      (props.pagination.current - 1) * props.pagination.pageSize + index + 1,
  },
  {
    key: "id",
    title: "Id",
    align: "center",
    dataIndex: "id",
  },
  {
    key: "firstName",
    title: "First Name",
    align: "center",
    dataIndex: "firstName",
  },
  {
    key: "lastName",
    title: "Last Name",
    align: "center",
    dataIndex: "lastName",
  },
  {
    key: "userName",
    title: "User Name",
    align: "center",
    dataIndex: "userName",
  },
  {
    key: "role",
    title: "Role",
    align: "center",
    render: (text, user: UserModel) => <Tag color="orange">{user.role}</Tag>,
  },
];
