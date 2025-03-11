import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="text-center">
          <Col xs={12}>
            <p className="copyright">© 2025 ConvertPro. All rights reserved.</p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col xs={12}>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/conversions">Conversions</a></li>
              <li><a href="/history">History</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
