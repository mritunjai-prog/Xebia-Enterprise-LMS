import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { IconAdd } from '../../components/Icons';
import { clsx } from 'clsx';
import { Modal } from '../../components/ui/Modal';

export default function Organizations() {
  const { organizations, isLoadingOrgs, fetchOrganizations, createOrganization } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    type: 'Company'
  });

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  const filteredOrgs = organizations.filter(org => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Universities') return org.type === 'University';
    return org.type === 'Company';
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createOrganization(formData);
    setIsModalOpen(false);
    setFormData({ name: '', domain: '', type: 'Company' });
  };

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Organizations</div>
          <div className="page-subtitle">Manage universities, colleges, and enterprise clients.</div>
        </div>
        <div className="page-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <IconAdd />
            Add Organization
          </button>
        </div>
      </div>

      <div className="card">
        <div className="section-tabs">
          <div className={clsx("stab", activeTab === 'All' && "active")} onClick={() => setActiveTab('All')}>All</div>
          <div className={clsx("stab", activeTab === 'Universities' && "active")} onClick={() => setActiveTab('Universities')}>Universities</div>
          <div className={clsx("stab", activeTab === 'Companies' && "active")} onClick={() => setActiveTab('Companies')}>Companies</div>
        </div>
        
        {isLoadingOrgs ? (
          <div className="p-4 text-center text-dark-gray animate-pulse">Loading organizations...</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Organization</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrgs.map((org) => (
                  <tr key={org.id}>
                    <td>
                      <div className="avatar-cell">
                        <div className="avatar" style={{background: org.color}}>{org.abbr}</div>
                        <div>
                          <div className="cell-name">{org.name}</div>
                          <div className="cell-sub">{org.domain}</div>
                        </div>
                      </div>
                    </td>
                    <td><span style={{fontSize: '12px', color: 'var(--dark-gray)'}}>{org.type}</span></td>
                    <td>
                      <span className={clsx(
                        "status-badge",
                        org.status === 'Active' && "status-active",
                        org.status === 'Pending' && "status-pending",
                        org.status === 'Inactive' && "status-inactive"
                      )}>
                        <span className="status-dot"></span>{org.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn" onClick={() => useAppStore.getState().addToast('Opening org details...', 'info')}>View</button>
                        <button className="action-btn" onClick={() => useAppStore.getState().addToast('Opening org editor...', 'info')}>Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredOrgs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-dark-gray">No organizations found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Organization">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Organization Name</label>
            <input required type="text" className="form-input" placeholder="e.g. Acme Corp" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Domain Name</label>
            <input required type="text" className="form-input" placeholder="e.g. acme.com" value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Organization Type</label>
            <select className="form-select" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option value="Company">Company</option>
              <option value="University">University</option>
              <option value="College">College</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Create Organization</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
