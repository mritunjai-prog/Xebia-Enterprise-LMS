import React from 'react';

export const ChartsRow = () => {
  return (
    <div className="charts-row">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">User Growth</div>
            <div className="card-meta">New enrollments by month, 2025</div>
          </div>
          <div className="card-tabs">
            <div className="card-tab active">Monthly</div>
            <div className="card-tab">Quarterly</div>
          </div>
        </div>
        <div className="chart-area">
          <div className="bar-group"><div className="bar" style={{width: '50%', height: '55%', background: '#D3CCEC'}} title="Jan: 1,820"></div><div className="bar" style={{width: '50%', height: '48%', background: '#9D92B2'}} title="Jan prev: 1,580"></div></div>
          <div className="bar-group"><div className="bar" style={{width: '50%', height: '62%', background: '#D3CCEC'}}></div><div className="bar" style={{width: '50%', height: '54%', background: '#9D92B2'}}></div></div>
          <div className="bar-group"><div className="bar" style={{width: '50%', height: '70%', background: '#D3CCEC'}}></div><div className="bar" style={{width: '50%', height: '61%', background: '#9D92B2'}}></div></div>
          <div className="bar-group"><div className="bar" style={{width: '50%', height: '82%', background: '#D3CCEC'}}></div><div className="bar" style={{width: '50%', height: '72%', background: '#9D92B2'}}></div></div>
          <div className="bar-group"><div className="bar" style={{width: '50%', height: '79%', background: '#6C1D5F'}}></div><div className="bar" style={{width: '50%', height: '68%', background: '#9D92B2'}}></div></div>
          <div className="bar-group"><div className="bar" style={{width: '50%', height: '88%', background: '#6C1D5F'}}></div><div className="bar" style={{width: '50%', height: '75%', background: '#9D92B2'}}></div></div>
          <div className="bar-group"><div className="bar" style={{width: '50%', height: '94%', background: '#6C1D5F'}}></div><div className="bar" style={{width: '50%', height: '80%', background: '#9D92B2'}}></div></div>
          <div className="bar-group"><div className="bar" style={{width: '50%', height: '100%', background: '#84117C'}}></div><div className="bar" style={{width: '50%', height: '82%', background: '#9D92B2'}}></div></div>
        </div>
        <div className="chart-labels">
          <div className="chart-label">Jan</div><div className="chart-label">Feb</div><div className="chart-label">Mar</div><div className="chart-label">Apr</div><div className="chart-label">May</div><div className="chart-label">Jun</div><div className="chart-label">Jul</div><div className="chart-label">Aug</div>
        </div>
        <div style={{display: 'flex', gap: '16px', marginTop: '12px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: 'var(--dark-gray)'}}><div style={{width: '10px', height: '10px', borderRadius: '2px', background: '#6C1D5F'}}></div>2025</div>
          <div style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: 'var(--dark-gray)'}}><div style={{width: '10px', height: '10px', borderRadius: '2px', background: '#9D92B2'}}></div>2024</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Course Distribution</div>
            <div className="card-meta">By category</div>
          </div>
        </div>
        <div className="donut-wrap">
          <svg width="110" height="110" viewBox="0 0 110 110">
            <circle cx="55" cy="55" r="40" fill="none" stroke="#6C1D5F" strokeWidth="18" strokeDasharray="100.5 150.8" strokeDashoffset="0"/>
            <circle cx="55" cy="55" r="40" fill="none" stroke="#84117C" strokeWidth="18" strokeDasharray="62.8 188.5" strokeDashoffset="-100.5"/>
            <circle cx="55" cy="55" r="40" fill="none" stroke="#B8AFCF" strokeWidth="18" strokeDasharray="47.1 204.2" strokeDashoffset="-163.3"/>
            <circle cx="55" cy="55" r="40" fill="none" stroke="#D3CCEC" strokeWidth="18" strokeDasharray="40.8 210.5" strokeDashoffset="-210.4"/>
            <text x="55" y="51" textAnchor="middle" fontSize="16" fontWeight="700" fill="#000" fontFamily="Inter">3,461</text>
            <text x="55" y="65" textAnchor="middle" fontSize="10" fill="#5A5A5A" fontFamily="Inter">courses</text>
          </svg>
          <div className="donut-legend">
            <div className="legend-item"><div className="legend-dot" style={{background: '#6C1D5F'}}></div><div className="legend-label">Technical</div><div className="legend-pct">40%</div></div>
            <div className="legend-item"><div className="legend-dot" style={{background: '#84117C'}}></div><div className="legend-label">Management</div><div className="legend-pct">25%</div></div>
            <div className="legend-item"><div className="legend-dot" style={{background: '#B8AFCF'}}></div><div className="legend-label">Compliance</div><div className="legend-pct">19%</div></div>
            <div className="legend-item"><div className="legend-dot" style={{background: '#D3CCEC'}}></div><div className="legend-label">Soft Skills</div><div className="legend-pct">16%</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
