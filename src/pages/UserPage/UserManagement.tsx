import React, { useState } from 'react';
import { TablePagination } from '@mui/material';
import styles from './UserManagement.module.css';
import { User } from '../../types/account.types';
import UserFormDialog from './UserFormDialog';

export interface App {
  id: number;
  name: string;
  icon?: string; // Optional icon path or name
  color?: string; // Optional color for the app tile
}

const UserManagement: React.FC = () => {
  // Predefined list of available apps
  const availableApps: App[] = [
    { 
      id: 1, 
      name: 'Analytics', 
      icon: 'A', 
      color: '#FF6B6B' 
    },
    { 
      id: 2, 
      name: 'CRM', 
      icon: 'C', 
      color: '#4ECDC4' 
    },
    { 
      id: 3, 
      name: 'Marketing', 
      icon: 'M', 
      color: '#45B7D1' 
    },
    { 
      id: 4, 
      name: 'Sales', 
      icon: 'S', 
      color: '#FDCB6E' 
    },
    { 
      id: 5, 
      name: 'Support', 
      icon: 'H', 
      color: '#6C5CE7' 
    },
    { 
      id: 6, 
      name: 'Finance', 
      icon: 'F', 
      color: '#A8E6CF' 
    }
  ];

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleSaveUser = (userData: Omit<User, 'id'>) => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...userData, id: editingUser.id }
          : user
      ));
    } else {
      const newUser: User = {
        ...userData,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      };
      setUsers([...users, newUser]);
    }
    setOpenDialog(false);
  };

  // Helper function to get app name by ID
  const getAppName = (appId: number): string => {
    const app = availableApps.find(a => a.id === appId);
    return app ? app.name : `App ${appId}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>User Management</h1>
        <button className={styles.addButton} onClick={handleAddUser}>
          Add User
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>App List</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.userId}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className={styles.appTags}>
                      {user.appList.map((appId) => (
                        <span key={appId} className={styles.appTag}>
                          {getAppName(appId)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button 
                        className={styles.editButton}
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </button>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </div>

      <UserFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveUser}
        user={editingUser}
        availableApps={availableApps}
      />
    </div>
  );
};

export default UserManagement;