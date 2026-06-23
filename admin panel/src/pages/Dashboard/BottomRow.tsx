import React from 'react';
import { Organization, ApprovalRequest } from '../../types';
import { clsx } from 'clsx';
import { useAppStore } from '../../store/useAppStore';

interface BottomRowProps {
  orgs: Organization[];
  approvals: ApprovalRequest[];
}

export const BottomRow: React.FC<BottomRowProps> = ({ orgs, approvals }) => {
  const { setActiveSidebarItem, addToast } = useAppStore();
  
  return (
    <div className="bottom-row">
      <div className="card">
        <div className="card-header">
          <div className="card-title">Recent Organizations</div>
          <button className="btn-outline" style={{fontSize: '12px', padding: '5px 11px'}} onClick={() => setActiveSidebarItem('Organizations')}>View All</button>
        </div>
        <div className="section-tabs">
          <div className="stab active">All</div>
          <div className="stab" onClick={() => setActiveSidebarItem('Universities')}>Universities</div>
          <div className="stab" onClick={() => setActiveSidebarItem('Companies')}>Companies</div>
        </div>
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
              {orgs.map((org) => (
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
                      <button className="action-btn" onClick={() => addToast('Opening org details...', 'info')}>View</button>
                      <button className="action-btn" onClick={() => addToast('Opening org editor...', 'info')}>Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Approval Queue</div>
          <span style={{background: 'rgba(255,98,0,0.1)', color: 'var(--orange)', fontSize: '11.5px', fontWeight: 700, padding: '3px 9px', borderRadius: '20px', cursor:'pointer'}} onClick={() => setActiveSidebarItem('Approvals')}>
            {approvals.length} Pending
          </span>
        </div>
        <div className="approval-list">
          {approvals.map((req) => (
            <div className="approval-card" key={req.id}>
              <div className="approval-top">
                <div>
                  <div className="approval-title">{req.title}</div>
                  <div className="approval-sub">Requested by {req.requester} · {req.timeAgo}</div>
                </div>
                <div 
                  className="approval-sla" 
                  style={{ color: req.isUrgent === false ? 'var(--primary)' : 'var(--orange)' }}>
                  SLA {req.slaHours}h
                </div>
              </div>
              <div className="approval-actions">
                <button className="appr-btn approve" onClick={() => addToast('Manage approvals from the Approvals center.', 'info')}>✓ Approve</button>
                <button className="appr-btn reject" onClick={() => addToast('Manage approvals from the Approvals center.', 'info')}>✕ Reject</button>
                <button className="action-btn" style={{fontSize: '11.5px', padding: '5px 10px'}} onClick={() => addToast('Opening comments...', 'info')}>Comment</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
