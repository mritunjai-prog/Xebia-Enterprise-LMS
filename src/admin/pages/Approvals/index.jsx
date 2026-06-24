import React, { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function Approvals() {
  const { approvals, fetchDashboardData, processApproval, isLoading } = useAppStore();

  useEffect(() => {
    // If we haven't loaded approvals, run the initial dashboard fetch
    if (approvals.length === 0 && !isLoading) {
      fetchDashboardData();
    }
  }, [approvals.length, fetchDashboardData, isLoading]);

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Approval Center</div>
          <div className="page-subtitle">Manage pending governance requests and SLA targets.</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Pending Approvals</div>
        </div>
        
        {approvals.length === 0 ? (
          <div className="py-12 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.5" className="mx-auto mb-4"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M9 12L11 14L15 10"/></svg>
            <div className="text-dark-gray font-medium">All caught up! No pending approvals.</div>
          </div>
        ) : (
          <div className="approval-list">
            {approvals.map((req) => (
              <div className="approval-card" key={req.id}>
                <div className="approval-top">
                  <div>
                    <div className="approval-title" style={{ fontSize: '15px' }}>{req.title}</div>
                    <div className="approval-sub" style={{ fontSize: '13px', marginTop: '6px' }}>Requested by {req.requester} · {req.timeAgo}</div>
                  </div>
                  <div 
                    className="approval-sla" 
                    style={{ color: req.isUrgent === false ? 'var(--primary)' : 'var(--orange)', fontSize: '13px', padding: '4px 10px', background: req.isUrgent === false ? 'rgba(108,29,95,0.1)' : 'rgba(255,98,0,0.1)', borderRadius: '6px' }}>
                    SLA {req.slaHours}h
                  </div>
                </div>
                <div className="approval-actions" style={{ marginTop: '16px' }}>
                  <button className="appr-btn approve" onClick={() => processApproval(req.id, 'approve')}>✓ Approve</button>
                  <button className="appr-btn reject" onClick={() => processApproval(req.id, 'reject')}>✕ Reject</button>
                  <button className="action-btn" style={{fontSize: '12px', padding: '6px 12px'}}>Escalate</button>
                  <button className="action-btn" style={{fontSize: '12px', padding: '6px 12px'}}>Comment</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
