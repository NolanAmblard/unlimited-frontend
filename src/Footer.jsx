import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import { ImMail4 } from 'react-icons/im';
import logo from './unlimited_logo_light.png';
import './styles/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <img src={logo} alt="Unlimited logo" className="footer-logo" />
      <div className="footer-content">
        <p>&copy; 2023 Unlimited</p>
        <a href="https://twitter.com/unlimited" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="footer-icon" />
        </a>
        <a href="mailto:contact@unlimited.com">
          <ImMail4 className="footer-icon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;