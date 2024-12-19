import React from 'react';
import { TablePagination } from '@mui/material';
import { App, User } from '../../types/account.types';
import styles from './UserTable.module.css';

interface UserTableProps {
  users: User[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
  availableApps: App[];
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEditUser,
  onDeleteUser,
  availableApps,
}) => {
  const getAppName = (appId: number): string => {
    const app = availableApps.find(a => a.id === appId);
    return app ? app.name : `App ${appId}`;
  };

  return (
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
                      onClick={() => onEditUser(user)}
                    >
                      Edit
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => onDeleteUser(user.id)}
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
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

export default UserTable;