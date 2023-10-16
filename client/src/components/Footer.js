import '../../src/index.css';
import { VscGithubAlt } from "react-icons/vsc";
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";


function Footer() {
  return (
    <footer> 
    <div className="footer">
      <h2 className="footer-text">Made by Randi Brown©</h2>
      <p>
        <ul className="logo-list">
        {/* eslint-disable-next-line */}
          <a href="https://github.com/randirose" target="_blank">
            <li className="footer-logo">
              <VscGithubAlt />
            </li>
          </a>
          {/* eslint-disable-next-line */}
          <a href="https://www.linkedin.com/in/randi-brown-03b5aa85/" target="_blank">
            <li className="footer-logo">
              <AiOutlineLinkedin />
            </li>
          </a>
          <a href="mailto:randibrown21@gmail.com">
            <li className="footer-logo">
              <AiOutlineMail />
            </li>
          </a>
        </ul>
      </p>
      </div>
    </footer>
  );
}

export default Footer;