import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";
import { useOutletContext } from 'react-router-dom';
import { FaBars } from "react-icons/fa6";

export default function UserDetails() {
  const [users, setUsers] = useState([]);
  const { toggleSidebar } = useOutletContext();

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=50")
      .then((response) => {
        const formattedUsers = response.data.results.map((u, index) => ({
          id: index + 1,
          name: `${u.name.first} ${u.name.last}`,
          dateCreated: new Date(u.registered.date).toLocaleDateString(),
          role: ["Admin", "Publisher", "Reviewer", "Moderator"][index % 4],
          status: ["Active", "Suspended", "Inactive"][index % 3],
          picture: u.picture.thumbnail,
        }));
        setUsers(formattedUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const nameTemplate = (rowData) => (
    <div className="flex items-center gap-3">
      <Avatar image={rowData.picture} shape="circle" />
      <span className="font-semibold">{rowData.name}</span>
    </div>
  );

  const statusTemplate = (rowData) => (
    <Tag
      value={rowData.status}
      severity={
        rowData.status === "Active" ? "success" :
          rowData.status === "Suspended" ? "warning" :
            "danger"
      }
      className="px-3 py-2 text-sm"
    />
  );

  const actionTemplate = () => (
    <div className="flex gap-2">
      <Button icon="pi pi-cog" className="p-button-rounded p-button-sm p-button-info" />
      <Button icon="pi pi-times" className="p-button-rounded p-button-sm p-button-danger" />
    </div>
  );

  return (
    <div className="flex-1 flex flex-col p-4 overflow-hidden">
      <div className="flex items-center gap-2 py-4 text-gray-600">
        <FaBars className="md:hidden cursor-pointer text-3xl font-bold" onClick={toggleSidebar} />
        <h2 className="text-3xl font-semibold">User Management</h2>
      </div>

      <div className="p-6 bg-white text-sm shadow-md rounded-lg w-full hideScroll">
        <div className="overflow-x-auto">
          <DataTable
            value={users}
            paginator rows={5}
            stripedRows
            responsiveLayout="scroll"
            className="border border-gray-200 rounded-lg w-full text-nowrap p-4 hideScroll"
          >
            <Column field="id" header="#" className="min-w-[50px]" />
            <Column field="name" header="Name" body={nameTemplate} className="min-w-[150px]" />
            <Column
              field="dateCreated"
              header="Date Created"
              className="min-w-[120px] sm:min-w-[150px]"
            />
            <Column
              field="role"
              header="Role"
              className="min-w-[100px] sm:min-w-[120px]"
            />
            <Column
              field="status"
              header="Status"
              body={statusTemplate}
              className="min-w-[120px] sm:min-w-[150px]"
            />
            <Column header="Action" body={actionTemplate} />
          </DataTable>
        </div>
      </div>
    </div>
  );
}
