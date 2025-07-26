import React from 'react';
import './style.scss';
import MonopolyBoard from '../board';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-root">
      <h1 className="dashboard-title">Monopoly Game Dashboard</h1>
      <MonopolyBoard />
    </div>
  );
};

export default Dashboard;