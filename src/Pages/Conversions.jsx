import React, { useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Button } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileSpreadsheet, 
  File, 
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import './Conversions.css';

const ConversionAnalytics = () => {
  const [expandedSections, setExpandedSections] = useState({
    today: false,
    yesterday: false,
    last7Days: false,
    last30Days: false
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  const fileTypeData = [
    { name: 'Excel (.xlsx)', value: 28, color: '#8884d8' },
    { name: 'Excel 97-2003 (.xls)', value: 10, color: '#82ca9d' },
    { name: 'CSV', value: 4, color: '#ffc658' }
  ];
  return (
    <Container className="conversion-analytics">
      <div className="report-header">
        <h1>Conversion Analytics Report</h1>
        <p className="text-muted">Detailed insights and statistics about your file conversions</p>
      </div>

      {/* Stats Cards */}
      <Row className="stats-row">
        <Col xs={12} sm={6} md={3} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="icon-wrapper purple">
                <TrendingUp size={20} />
              </div>
              <h6>Total Conversions</h6>
              <h2>42</h2>
              <p className="text-muted">This Month</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="icon-wrapper blue">
                <CheckCircle size={20} />
              </div>
              <h6>Successful</h6>
              <h2>38</h2>
              <p className="text-muted">90.5% success rate</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="icon-wrapper blue">
                <XCircle size={20} />
              </div>
              <h6>Failed</h6>
              <h2>4</h2>
              <p className="text-muted">9.5% failure rate</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="icon-wrapper blue">
                <Clock size={20} />
              </div>
              <h6>Time Saved</h6>
              <h2>2.5 hrs</h2>
              <p className="text-muted">Estimated efficiency gain</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Conversion Trends */}
      <Card className="mb-4">
        <Card.Body>
          <div className="section-header">
            <h2>Conversion Trends</h2>
          </div>
          
          <div className="trend-content">
            <div className="icon-wrapper purple-light">
              <FileText size={20} />
            </div>
            <div>
              <h4>Monthly Conversion Activity</h4>
              <p>Your conversion activity has increased by 15% compared to last month.</p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* File Type Distribution */}
      <Card className="mb-4">
  <Card.Body>
    <div className="section-header">
      <h2>File Type Distribution</h2>
    </div>

    <PieChart width={400} height={300}>
      <Pie 
        data={fileTypeData} 
        cx="50%" 
        cy="50%" 
        outerRadius={100} 
        dataKey="value"
        label
      >
        {fileTypeData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </Card.Body>
</Card>

      {/* Conversion History Timeline */}
      <Card className="mb-4">
        <Card.Body>
          <div className="section-header">
            <h2>Conversion History Timeline</h2>
          </div>
          
          <div className="timeline-item" onClick={() => toggleSection('today')}>
            <div className="timeline-header">
              <div className="timeline-date">
                <div className="icon-wrapper purple-light">
                  <FileText size={18} />
                </div>
                <div>
                  <h5>Today</h5>
                  <p>3 conversions</p>
                </div>
              </div>
              {expandedSections.today ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {expandedSections.today && (
              <div className="timeline-details">
                <p>Details about today's conversions would appear here.</p>
              </div>
            )}
          </div>
          
          <div className="timeline-item" onClick={() => toggleSection('yesterday')}>
            <div className="timeline-header">
              <div className="timeline-date">
                <div className="icon-wrapper purple-light">
                  <FileText size={18} />
                </div>
                <div>
                  <h5>Yesterday</h5>
                  <p>2 conversions</p>
                </div>
              </div>
              {expandedSections.yesterday ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {expandedSections.yesterday && (
              <div className="timeline-details">
                <p>Details about yesterday's conversions would appear here.</p>
              </div>
            )}
          </div>
          
          <div className="timeline-item" onClick={() => toggleSection('last7Days')}>
            <div className="timeline-header">
              <div className="timeline-date">
                <div className="icon-wrapper purple-light">
                  <FileText size={18} />
                </div>
                <div>
                  <h5>Last 7 Days</h5>
                  <p>12 conversions</p>
                </div>
              </div>
              {expandedSections.last7Days ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {expandedSections.last7Days && (
              <div className="timeline-details">
                <p>Details about conversions in the last 7 days would appear here.</p>
              </div>
            )}
          </div>
          
          <div className="timeline-item" onClick={() => toggleSection('last30Days')}>
            <div className="timeline-header">
              <div className="timeline-date">
                <div className="icon-wrapper purple-light">
                  <FileText size={18} />
                </div>
                <div>
                  <h5>Last 30 Days</h5>
                  <p>42 conversions</p>
                </div>
              </div>
              {expandedSections.last30Days ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {expandedSections.last30Days && (
              <div className="timeline-details">
                <p>Details about conversions in the last 30 days would appear here.</p>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
      {/* Action Buttons */}
      <div className="action-buttons">
        <Button variant="primary" className="export-btn">Export Report</Button>
        <Button variant="outline-primary" className="print-btn">Print Report</Button>
        <Button variant="outline-secondary" className="history-btn">Back to History</Button>
      </div>
    </Container>
  );
};

export default ConversionAnalytics;