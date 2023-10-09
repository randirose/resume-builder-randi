// import { Link } from 'react-router-dom';
import {
    // Container,
    // Card,
    Button,
    // Row,
    // Col
  } from 'react-bootstrap';

// import Auth from '../utils/auth';
import { REMOVE_EDUCATION } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const EducationList = ({
  educations,
  title,
  showTitle = true,
}) => {
    //eslint-disable-next-line
    const [removeEducation, { error }] = useMutation(REMOVE_EDUCATION, {
        update(cache, { data: { removeEducation } }) {
          try {
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: removeEducation },
            });
          } catch (e) {
            console.error(e);
          }
        },
      });
    
      const handleRemoveEducation = async (educationId) => {
        try {
            //eslint-disable-next-line
          const { data } = await removeEducation({
            variables: { educationId },
          });
        } catch (err) {
          console.error(err);
        }
      };
  if (!educations.length) {
    return <h3>No Education/Certificates Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {educations &&
        educations.map((education) => (
          <div key={education._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
                {education.school}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{education.dateRange}</p>
            </div>
            <div className="card-body bg-light p-2">
              <p>{education.degree}</p>
            </div>
            <Button
                className="btn-block btn-danger"
                onClick={() => handleRemoveEducation(education._id)}
                >
                Delete Education/Certificate
            </Button>
            
          </div>
        ))}
    </div>
  );
};

export default EducationList;
