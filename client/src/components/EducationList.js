import '../../src/index.css';
import {
    Button,
  } from 'react-bootstrap';
import { GrCertificate } from "react-icons/gr";

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
    <div className="edu-list mt-2">
      {showTitle && <h3>{title}<hr /></h3>}
      {educations &&
        educations.map((education) => (
          <div key={education._id} className="card mt-3">
            <h4 className="card-header p-2 m-0">
                {education.school} | {education.dateRange}
                {/* button to delete education/cert */}
                <Button
                className="btn btn-secondary"
                style={{float: 'right', align: 'center'}}
                onClick={() => handleRemoveEducation(education._id)}
                >
                X
            </Button>
            </h4>
            <div className="d-flex align-items-center card-body bg-light p-2">
                <span className="edu-icon"><GrCertificate /> |</span> <span className="edu-text">{education.degree}</span>
            
            </div>
          </div>
        ))}
    </div>
  );
};

export default EducationList;
