import '../../src/index.css';
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillPhone } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";


const UserInfo = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  linkedIn,
}) => {

  return (
    <div>
        
          <div className="card mb-3 mt-3">
            <h4 className="card-header text-dark p-2 m-0">
            <span className="user-info-key"><BsFillPersonFill /></span> {firstName} {lastName}
            </h4>
            <h4 className="card-header text-dark p-2 m-0">
            <span className="user-info-key"><AiOutlineMail /></span> {email}
            </h4>
            <h4 className="card-header text-dark p-2 m-0">
            <span className="user-info-key"><AiFillPhone /></span> {phoneNumber}
            </h4>
            <h4 className="card-header text-dark p-2 m-0">
            <span className="user-info-key"><FaLocationDot /></span> {address}
            </h4>
            <h4 className="card-header text-dark p-2 m-0">
            <span className="user-info-key"><AiOutlineLinkedin /></span> {linkedIn}
            </h4>
            
          </div>
    </div>
  );
};

export default UserInfo;
