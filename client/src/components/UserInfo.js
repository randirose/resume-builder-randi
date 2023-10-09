

const UserInfo = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  linkedIn,
  title,
  showTitle = true,
}) => {

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
        
          <div className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
                First Name: {firstName}
            </h4>
            <h4 className="card-header bg-primary text-light p-2 m-0">
                Last Name: {lastName}
            </h4>
            <h4 className="card-header bg-primary text-light p-2 m-0">
                Email: {email}
            </h4>
            <h4 className="card-header bg-primary text-light p-2 m-0">
                Phone Number: {phoneNumber}
            </h4>
            <h4 className="card-header bg-primary text-light p-2 m-0">
                Address: {address}
            </h4>
            <h4 className="card-header bg-primary text-light p-2 m-0">
                LinkedIn URL: {linkedIn}
            </h4>
            
          </div>
    </div>
  );
};

export default UserInfo;
