import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { 
  FileText, 
  Download, 
  Trash2, 
  Info, 
  RotateCw,
  Folder,
  Search
} from 'lucide-react';
import './history.css';

const ConversionHistory = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for recent conversions
  const recentConversions = [
    { id: 1, filename: 'sales_report_2023.csv', date: 'Today, 2:45 PM', status: 'Completed' },
    { id: 2, filename: 'customer_data.csv', date: 'Today, 2:30 PM', status: 'Completed' },
    { id: 3, filename: 'inventory_q4.csv', date: 'Today, 1:15 PM', status: 'Completed' },
    { id: 4, filename: 'financial_report.xlsx', date: 'Yesterday, 4:20 PM', status: 'Failed' },
    { id: 5, filename: 'employee_data_2023.csv', date: 'Yesterday, 11:30 AM', status: 'Completed' }
  ];

  // Sample data for batch conversions
  const batchConversions = [
    { id: 1, name: 'Q4 Financial Reports', files: 5, date: 'Converted on Jan 15, 2023' },
    { id: 2, name: 'Customer Data 2023', files: 3, date: 'Converted on Jan 10, 2023' },
    { id: 3, name: 'Marketing Analytics', files: 7, date: 'Converted on Dec 28, 2022' }
  ];

  // Filter conversions based on active tab and search term
  const filteredConversions = recentConversions.filter(conversion => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'completed' && conversion.status === 'Completed') || 
      (activeTab === 'failed' && conversion.status === 'Failed');
    
    const matchesSearch = 
      !searchTerm || 
      conversion.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversion.date.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <Container fluid className="conversion-container px-4 py-4">
      <header>
        <h1 className="conversion-title">Conversion History</h1>
        <p className="conversion-subtitle">View and manage your past Excel to CSV conversions</p>
      </header>

      {/* Tab Navigation */}
      <div className="tabs-container">
        <ul className="nav-tabs">
          <li className={`tab ${activeTab === 'all' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('all')}>All Conversions</button>
          </li>
          <li className={`tab ${activeTab === 'completed' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('completed')}>Completed</button>
          </li>
          <li className={`tab ${activeTab === 'failed' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('failed')}>Failed</button>
          </li>
        </ul>
      </div>

      {/* Search and Filter Controls */}
      <div className="controls-container">
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by filename or date" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="light" className="filter-btn">Filter</Button>
        </div>
        <Button variant="light" className="clear-btn">Clear History</Button>
      </div>

      {/* Recent Conversions Section */}
      <section className="conversions-section">
        <h2 className="section-header">Recent Conversions</h2>
        <div className="conversion-list">
          {filteredConversions.map(item => (
            <div key={item.id} className="conversion-item">
              <div className="file-icon">
                <FileText size={20} />
              </div>
              <div className="filename">{item.filename}</div>
              <div className="date">{item.date}</div>
              <div className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </div>
              <div className="actions">
                <button className="action-btn">
                  {item.status === 'Completed' ? <Download size={18} /> : <RotateCw size={18} />}
                </button>
                <button className="action-btn">
                  <Trash2 size={18} />
                </button>
                <button className="action-btn">
                  <Info size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Batch Conversions Section */}
      <section className="conversions-section">
        <h2 className="section-header">Batch Conversions</h2>
        <div className="batch-list">
          {batchConversions.map(batch => (
            <div key={batch.id} className="batch-item">
              <div className="folder-icon">
                <Folder size={20} />
              </div>
              <div className="batch-info">
                <div className="batch-name">{batch.name}</div>
                <div className="batch-details">{batch.files} files • {batch.date}</div>
              </div>
              <div className="batch-actions">
                <button className="action-btn">
                  <Download size={18} />
                </button>
                <button className="action-btn">
                  <Info size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Action Buttons */}
      <div className="bottom-actions">
        <Button variant="primary" className="export-btn">Export History</Button>
        <Button variant="light" className="new-btn">New Conversion</Button>
      </div>
    </Container>
  );
};

export default ConversionHistory;