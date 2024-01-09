import React, { useState } from "react";
import { Select } from "antd";
import { GetAllUsers } from "../../apiHandler/User";
import { UserModel } from "../models";
import { PaginatedResponse } from "../models/PaginatedResponse";

const { Option } = Select;

interface ISelectUserProps {
  onSelectionChange: (values: any) => (void);
};

const SelectUser: React.FC<ISelectUserProps> = (props: ISelectUserProps) => {

  const [users, setUsers] = useState<UserModel[]>();

  async function fetchUsersAsync() {
    let users: PaginatedResponse<UserModel> = await GetAllUsers();
    setUsers(users.data);
  }

  function onChangeUser(userId: number) {
    props.onSelectionChange(userId);
  }

  return (
    <Select
      showSearch
      allowClear
      style={{ width: 200 }}
      onFocus={fetchUsersAsync}
      placeholder="Select User"
      optionFilterProp="children"
      onChange={onChangeUser}
    >
      {users ? users.map(u => {
        return (<Option value={u.id}>{u.userName}</Option>)
      }) : ""
      }
    </Select>
  );
}
export default SelectUser;
