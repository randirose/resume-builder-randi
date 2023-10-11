import '../../src/index.css';

const UserInfo = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  linkedIn,
//   title,
//   showTitle = true,
}) => {

  return (
    <div>
        
          <div className="card mb-3 mt-3">
            <h4 className="card-header text-dark p-2 m-0">
                <span className="user-info-key">First Name:</span> {firstName}
            </h4>
            <h4 className="card-header text-dark p-2 m-0">
            <span className="user-info-key">Last Name:</span> {lastName}
            </h4>
            <h4 className="card-header text-dark p-2 m-0">
            <span className="user-info-key">Email:</span> {email}
            </h4>
            <h4 className="card-header text-dark p-2 m-0">
            <span className="user-info-key">Phone Number:</span> {phoneNumber}
            </h4>
            <h4 className="card-header text-dark p-2 m-0">
            <span className="user-info-key">Location:</span> {address}
            </h4>
            <h4 className="card-header text-dark p-2 m-0">
            <span className="user-info-key">LinkedIn:</span> {linkedIn}
            </h4>
            
          </div>
    </div>
  );
};

export default UserInfo;
