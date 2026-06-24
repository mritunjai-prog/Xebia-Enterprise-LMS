import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { IconAdd } from '../../components/Icons';
import { clsx } from 'clsx';
import { Modal } from '../../components/ui/Modal';

export default function Users() {
  const { users, isLoadingUsers, fetchUsers, createUser } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Student',
    tenant: 'Global'
  });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(formData);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', role: 'Student', tenant: 'Global' });
  };

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Users & Access</div>
          <div className="page-subtitle">Manage users, roles, and tenant assignments.</div>
        </div>
        <div className="page-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <IconAdd />
            Create User
          </button>
        </div>
      </div>

      <div className="card">
        {isLoadingUsers ? (
          <div className="p-4 text-center text-dark-gray animate-pulse">Loading users...</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Tenant</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="avatar-cell">
                        <div className="avatar" style={{background: user.avatarColor}}>
                          {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="cell-name">{user.name}</div>
                          <div className="cell-sub">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span style={{fontSize: '12.5px', fontWeight: 500, color: 'var(--primary)'}}>{user.role}</span></td>
                    <td><span style={{fontSize: '12px', color: 'var(--dark-gray)'}}>{user.tenant}</span></td>
                    <td>
                      <span className={clsx(
                        "status-badge",
                        user.status === 'Active' && "status-active",
                        user.status === 'Inactive' && "status-inactive"
                      )}>
                        <span className="status-dot"></span>{user.status}
                      </span>
                    </td>
                    <td><span style={{fontSize: '12px', color: 'var(--dark-gray)'}}>{user.lastLogin}</span></td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn" onClick={() => useAppStore.getState().addToast('Opening user editor...', 'info')}>Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create User">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input required type="text" className="form-input" placeholder="e.g. John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input required type="email" className="form-input" placeholder="e.g. john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Role Definition</label>
            <select className="form-select" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Trainer">Trainer</option>
              <option value="Organiser">Organiser</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Tenant Scope</label>
            <input type="text" className="form-input" placeholder="e.g. Global" value={formData.tenant} onChange={e => setFormData({...formData, tenant: e.target.value})} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Provision User</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
