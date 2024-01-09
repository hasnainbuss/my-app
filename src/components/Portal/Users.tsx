import React, { Fragment, useState, useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Tooltip,
  message,
  Popconfirm,
  Select,
  Input,
  DatePicker,
  DatePickerProps,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterTwoTone,
} from "@ant-design/icons";
import { FormikHelpers } from "formik";
import { CompareElementsById } from "../Common/stringUtils";
import * as UsersApiHandler from "../../apiHandler/User";
import { HandleApiError } from "../../common/errorUtils";
import ContentModal from "../Common/ContentModal";
import DrawerOptionsBar from "./FilterDrawer";
import UserForm from "./Forms/UserForm";
import { getTablePaginationTotal } from "../../common/utils";
import useDebounce from "../Common/Custom Hooks/useDebounce";
import { DEFAULT_DELAY_INTERVAL_MS } from "../../Constants";
import { columns } from "../../components/Configurations/UserTableConfig";
import { PaginatedResponse } from "../../components/models/PaginatedResponse";
import { ISearchPayload } from "../../components/models/Payload";
import { TablePagination } from "../../components/models/TablePagination";
import { UserModel } from "../../components/models";
import OptionsBar from "./OptionsBar";

const { Option } = Select;

interface IUserState {
  data: UserModel[];
  pagination: TablePagination;
  isLoading: boolean;
  search: {
    searchText: string;
    searchBy: string;
  };
  selectedUserIds: string[];
}

const initailState: IUserState = {
  data: [],
  pagination: {
    current: 1,
    pageSize: 10,
  },
  isLoading: true,
  search: {
    searchText: "",
    searchBy: "FirstName",
  },
  selectedUserIds: [],
};

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<IUserState>(initailState);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [searchFilter, setSearchFilter] = useState<ISearchPayload>({
    searchBy: "Id",
    searchTerm: "",
  });

  const debouncedSearchTerm = useDebounce(
    searchFilter.searchTerm,
    DEFAULT_DELAY_INTERVAL_MS
  );

  useEffect(() => {
    setState({
      ...state,
      isLoading: true,
    });

    let query: string = getFilterQuery();

    fetchDataAsync(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.pagination.pageSize,
    state.pagination.current,
    debouncedSearchTerm,
  ]);

  async function onFormSubmit(
    user: UserModel,
    formOptions: FormikHelpers<UserModel>
  ) {
    if (state.selectedUserIds[0]) {
      // Edit Existing User
      try {
        var updatedUser = await UsersApiHandler.UpdateUser(user);
        message.success("User Updated!");
        let otherUsers = state.data.filter((c) => c.id !== updatedUser.id);
        setState({
          ...state,
          data: [...otherUsers, updatedUser].sort(CompareElementsById),
        });
      } catch (err) {
        HandleApiError(err);
      }
    } else {
      // Add New User
      try {
        var res = await UsersApiHandler.AddUser(user);
        message.success("User Added!");
        setState({
          ...state,
          data: [res, ...state.data].sort(CompareElementsById),
        });
      } catch (err) {
        HandleApiError(err);
      }
    }

    formOptions.setSubmitting(false);
    // If Success
    navigate("/users");
  }

  function getFilterQuery() {
    let query = `pageSize=${state.pagination.pageSize}&pageNo=${state.pagination.current}`;

    if (debouncedSearchTerm) {
      if (searchFilter.searchBy) {
        query += `&${searchFilter.searchBy}=${debouncedSearchTerm}`;
      }
    }

    return query;
  }

  async function fetchDataAsync(query: string) {
    try {
      let paginatedResponse: PaginatedResponse<UserModel>;

      paginatedResponse = await UsersApiHandler.GetAllUsers(query);
      setState({
        ...state,
        isLoading: false,
        data: paginatedResponse.data
          ? paginatedResponse.data.sort(CompareElementsById)
          : [],
        pagination: {
          current: paginatedResponse.pagination?.current!,
          pageSize: paginatedResponse.pagination?.pageSize!,
          total: paginatedResponse.pagination?.total,
        },
      });
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
      });
      HandleApiError(err);
    }
  }

  async function deleteSelectedUser() {
    try {
      await UsersApiHandler.DeleteUser(state.selectedUserIds[0]);

      message.success(`Successfully Deleted User`);

      let newData = state.data.filter(
        (c) => c.id.toString() !== state.selectedUserIds[0]
      );

      setState({
        ...state,
        data: newData,
        selectedUserIds: [],
      });
    } catch (error) {
      HandleApiError(error);
    }
  }

  function handleTableChange(pagination: any, filters: any, sorter: any) {
    setState({
      ...state,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  const onDatePickerChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    console.log(date, dateString);
  };

  const OptionBarLeftOption = (
    <Fragment>
      <Tooltip title="Add User" placement="bottom">
        <Button
          disabled={state.selectedUserIds.length > 0}
          icon={<PlusOutlined />}
          className="options-bar-left-options-button"
          onClick={() => {
            navigate("add");
          }}
        />
      </Tooltip>

      <Tooltip title="Edit User" placement="bottom">
        <Button
          disabled={
            state.selectedUserIds.length <= 0 ||
            state.selectedUserIds.length > 1
          }
          icon={<EditOutlined />}
          className="options-bar-left-options-button"
          onClick={() => navigate(`edit/${state.selectedUserIds[0]}`)}
        />
      </Tooltip>

      <Tooltip title="Delete User" placement="bottom">
        <Popconfirm
          title={`Are you sure to delete selected User?`}
          onConfirm={deleteSelectedUser}
          okText="Yes"
          cancelText="No"
        >
          <Button
            icon={<DeleteOutlined />}
            disabled={
              state.selectedUserIds.length <= 0 ||
              state.selectedUserIds.length > 1
            }
            danger
            className="options-bar-left-options-button"
          />
        </Popconfirm>
      </Tooltip>
    </Fragment>
  );

  const OptionsBarMiddleOption = (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Select
        defaultValue="Id"
        style={{ width: 120 }}
        onChange={(value) => {
          setSearchFilter({
            ...searchFilter,
            searchBy: value,
          });
        }}
      >
        <Option value="Id">ID</Option>
        <Option value="UserName">User Name</Option>
        <Option value="FirstName">First Name</Option>
      </Select>

      <Input.Search
        placeholder="Search..."
        style={{ width: 400 }}
        enterButton
        onChange={(e) => {
          setSearchFilter({
            ...searchFilter,
            searchTerm: e.target.value,
          });
        }}
      />

      <DatePicker onChange={onDatePickerChange} />
    </div>
  );

  const OptionBarRightOption = (
    <Tooltip title="Show Filters" placement="bottom">
      <Button icon={<FilterTwoTone />} onClick={toogleFiltersVisibility}>
        Filters
      </Button>
    </Tooltip>
  );

  function toogleFiltersVisibility() {
    setShowFilters(!showFilters);
  }

  return (
    <div>
      <Routes>
        <Route
          path="add"
          element={
            <ContentModal formTitle="Add User">
              <UserForm onSubmit={onFormSubmit} />
            </ContentModal>
          }
        />
        <Route
          path={`edit/${state.selectedUserIds[0]}`}
          element={
            <ContentModal formTitle="Edit User">
              <UserForm
                user={state.data.find(
                  (c) => c.id.toString() === state.selectedUserIds[0]
                )}
                onSubmit={onFormSubmit}
              />
            </ContentModal>
          }
        />
      </Routes>

      <Outlet />

      <OptionsBar
        left={OptionBarLeftOption}
        middle={OptionsBarMiddleOption}
        right={OptionBarRightOption}
      />

      <DrawerOptionsBar
        isVisible={showFilters}
        toogleVisibility={toogleFiltersVisibility}
      ></DrawerOptionsBar>

      <Table<UserModel>
        dataSource={state.data}
        bordered
        size="large"
        onChange={handleTableChange}
        loading={state.isLoading}
        rowKey={(d) => d.id}
        rowSelection={{
          onChange: (selectedRowKeys: any) =>
            setState({ ...state, selectedUserIds: selectedRowKeys }),
        }}
        pagination={{
          current: state.pagination.current,
          pageSize: state.pagination.pageSize,
          total: state.pagination.total,
          showTotal: () =>
            getTablePaginationTotal(state.pagination, state.data.length),
          position: ["bottomCenter"],
        }}
        columns={columns({ pagination: state.pagination })}
      ></Table>
    </div>
  );
};
export default Users;
