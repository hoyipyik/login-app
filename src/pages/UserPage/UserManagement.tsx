import React, { useState } from "react";
import styles from "./UserManagement.module.css";
import { User } from "../../types/account.types";
import UserFormDialog from "./UserFormDialog";
import UserTable from "../../components/UserManagement/UserTable";
import Header from "../../components/UserManagement/Header";
import { availableApps } from "../../data/account";
import { useNavigate } from "react-router-dom";

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const backHandler = () => {
    navigate("/app")
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setOpenDialog(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setOpenDialog(true);
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };



  const handleSaveUser = (userData: Omit<User, "id">) => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? { ...userData, id: editingUser.id }
            : user
        )
      );
    } else {
      const newUser: User = {
        ...userData,
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      };
      setUsers([...users, newUser]);
    }
    setOpenDialog(false);
  };

  return (
    <>
      {/* <TopBar /> */}
      <div className={styles.container}>
        <Header onAddUser={handleAddUser} onBack={backHandler}/>
        <UserTable
          users={users}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          availableApps={availableApps}
        />
        <UserFormDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSave={handleSaveUser}
          user={editingUser}
          availableApps={availableApps}
        />
      </div>
    </>
  );
};

export default UserManagement;
