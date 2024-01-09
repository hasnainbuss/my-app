
import { ColumnModel } from "./ColumnModel";
import { TablePreferenceModel } from "./TablePreferenceModel";

const defaultColumnsList = [
  {
    name: "Leads",
    columns: [
      { title: "ID", key: "id" },
      { title: "Phone Number", key: "phoneNumber" },
      { title: "Quote Type", key: "quoteType" },
      { title: "date", key: "date" },
      { title: "Website", key: "website" },
    ],
    pageSize: "10",
  },

  {
    name: "User",
    columns: [
      { title: "ID", key: "id" },
      { title: "First Name", key: "firstname" },
      { title: "Last Name", key: "lastname" },
      { title: "User Name", key: "username" },
      { title: "Password", key: "password" },
      { title: "Role", key: "role" },
    ],
    pageSize: "10",
  },
  {
    name: "Website",
    columns: [
      { title: "ID", key: "id" },
      { title: "Url", key: "url" },
      { title: "Created Date", key: "createdDate" },
      { title: "Created By", key: "createdBy" },
      { title: "Modified Date", key: "modifiedDate" },
      { title: "Modified By", key: "modifiedBy" },
    ],
    pageSize: "10",
  },
];

export function getDefaultTablePreference(
  tablename: string
): TablePreferenceModel | undefined {
  const defaultTable = defaultColumnsList.find(
    (table) => table.name === tablename
  );

  if (defaultTable) {
    const columnsPreferenceItems: ColumnModel[] = defaultTable.columns.map(
      (column) => {
        return {
          visible: true,
          title: column.title,
          key: column.key, // Assuming column is  type { title: string; key: string; }
          order: 0,
          sortable: false,
        };
      }
    );

    return {
      name: defaultTable.name,
      pageSize: parseInt(defaultTable.pageSize),
      columns: columnsPreferenceItems,
    };
  }

  return undefined;
}
