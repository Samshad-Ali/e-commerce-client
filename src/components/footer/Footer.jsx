import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineMail,
  AiOutlineTwitter,
} from "react-icons/ai";
import CreditCardImg from '../../assets/creditcardicons.png'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content">
          <div className="footer-left">
            <h3 className="title">Follow us</h3>
            <ul className="follow-box">
              <li className="hover-link">
                {" "}
                <AiOutlineInstagram />{" "}
              </li>
              <li className="hover-link">
                {" "}
                <AiOutlineFacebook />{" "}
              </li>
              <li className="hover-link">
                {" "}
                <AiOutlineTwitter />{" "}
              </li>
              <li className="hover-link">
                {" "}
                <AiOutlineMail />{" "}
              </li>
            </ul>
          
          </div>
          <div className="footer-right">
              <h3 className="title">Company</h3>
              <ul className="company">
                <li className="hover-link">Contact Us</li>
                <li className="hover-link">Privacy Policy</li>
                <li className="hover-link">Return and Exchange Policy</li>
                <li className="hover-link">Shipping Policy</li>
                <li className="hover-link">Terms & Conditions</li>
              </ul>
          </div>
        </div>
        <div className="sub-footer flex-center">
          <div className="img-box">
            <img src={CreditCardImg} alt="credit-card-img" />
          </div>
          <p> Copyright {new Date().getFullYear()} ©️ <strong>Posterz.</strong> </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
