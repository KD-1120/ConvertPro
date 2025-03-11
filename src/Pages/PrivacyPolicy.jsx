import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Mail, FileText, Monitor, Server, User, Edit, Trash } from 'lucide-react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <Container className="privacy-policy-container">
      <div className="policy-content">
        <h1>Privacy Policy</h1>
        
        <div className="update-date">
          <p>Last Updated: March 11, 2025</p>
        </div>
        
        <div className="intro-text">
          <p>This Privacy Policy describes how ConvertPro collects, uses, and shares your personal information when you use our Excel to CSV conversion service.</p>
        </div>
        
        <section className="info-section">
          <h2>Information We Collect</h2>
          <p>When you use ConvertPro, we collect the following types of information <em style={{fontWeight:'700'}}>(Applies to Logged in Users Only)</em>:</p>
          
          <div className="info-item">
            <div className="icon-container purple">
              <User size={20} />
            </div>
            <div className="info-content">
              <h3>Account Information</h3>
              <p>Email address, name, and account preferences</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="icon-container lavender">
              <FileText size={20} />
            </div>
            <div className="info-content">
              <h3>Usage Data</h3>
              <p>Conversion history, file metadata, and feature usage</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="icon-container purple">
              <Monitor size={20} />
            </div>
            <div className="info-content">
              <h3>Technical Information</h3>
              <p>Browser type, device information, and IP address</p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          
          <div className="info-item">
            <div className="icon-container purple">
              <Server size={20} />
            </div>
            <div className="info-content">
              <h3>Provide Services</h3>
              <p>Process file conversions and maintain your account</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="icon-container lavender">
              <FileText size={20} />
            </div>
            <div className="info-content">
              <h3>Improve Experience</h3>
              <p>Enhance features and develop new functionality</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="icon-container purple">
              <Mail size={20} />
            </div>
            <div className="info-content">
              <h3>Communicate</h3>
              <p>Send service updates and respond to inquiries</p>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <h2>Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, accidental loss, or damage. Your files are processed securely and are not stored permanently on our servers after conversion is complete.</p>
        </section>
        
        <section className="info-section">
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal information:</p>
          
          <Row className="rights-container">
            <Col md={4} className="right-item">
              <div className="right-icon-container">
                <User size={22} />
              </div>
              <h3>Access</h3>
              <p>Request a copy of your personal information</p>
            </Col>
            
            <Col md={4} className="right-item">
              <div className="right-icon-container">
                <Edit size={22} />
              </div>
              <h3>Correction</h3>
              <p>Request correction of inaccurate information</p>
            </Col>
            
            <Col md={4} className="right-item">
              <div className="right-icon-container">
                <Trash size={22} />
              </div>
              <h3>Deletion</h3>
              <p>Request deletion of your personal information</p>
            </Col>
          </Row>
        </section>
        
        <section className="info-section">
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
          
          <Form className="contact-form">
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value="privacy@convertpro.com"
                readOnly
                className="email-field"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Type your privacy-related question here..."
              />
            </Form.Group>
            
            <Button variant="primary" className="submit-btn">
              Submit Inquiry
            </Button>
          </Form>
        </section>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;