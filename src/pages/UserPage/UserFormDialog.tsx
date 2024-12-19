import React, { useState, useEffect } from 'react';
import styles from './UserFormDialog.module.css';
import { App, User } from '../../types/account.types';

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (userData: Omit<User, 'id'>) => void;
  user: User | null;
  availableApps: App[]; // List of available apps
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({
  open,
  onClose,
  onSave,
  user,
  availableApps
}) => {
  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    password: '',
    appList: [] as number[]
  });

  useEffect(() => {
    if (user) {
      setFormData({
        userId: user.userId,
        email: user.email,
        password: user.password,
        appList: user.appList
      });
    } else {
      setFormData({
        userId: '',
        email: '',
        password: '',
        appList: []
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAppSelection = (appId: number) => {
    setFormData(prevData => {
      const newAppList = prevData.appList.includes(appId)
        ? prevData.appList.filter(id => id !== appId)
        : [...prevData.appList, appId];
      
      return {
        ...prevData,
        appList: newAppList
      };
    });
  };

  if (!open) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        <h2>{user ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              id="userId"
              value={formData.userId}
              onChange={(e) => setFormData({...formData, userId: e.target.value})}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required={!user}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Select Apps</label>
            <div className={styles.appGrid}>
              {availableApps.map(app => (
                <div 
                  key={app.id} 
                  className={`${styles.appTile} ${formData.appList.includes(app.id) ? styles.selected : ''}`}
                  onClick={() => handleAppSelection(app.id)}
                >
                  {app.icon && (
                    <div 
                      className={styles.appIcon} 
                      style={{backgroundColor: app.color || '#e0e0e0'}}
                    >
                      {/* You can replace this with an actual icon */}
                      {app.icon}
                    </div>
                  )}
                  <span className={styles.appName}>{app.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.dialogActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormDialog;