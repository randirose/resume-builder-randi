import '../../src/index.css';
// import { Link } from 'react-router-dom';
import {
    // Container,
    // Card,
    Button,
    // Row,
    // Col
  } from 'react-bootstrap';

// import Auth from '../utils/auth';
import { REMOVE_JOB } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const JobList = ({
  jobs,
  title,
  showTitle = true,
}) => {
    //eslint-disable-next-line
    const [removeJob, { error }] = useMutation(REMOVE_JOB, {
        update(cache, { data: { removeJob } }) {
          try {
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: removeJob },
            });
          } catch (e) {
            console.error(e);
          }
        },
      });
    
      const handleRemoveJob = async (jobId) => {
        try {
            //eslint-disable-next-line
          const { data } = await removeJob({
            variables: { jobId },
          });
        } catch (err) {
          console.error(err);
        }
      };
  if (!jobs.length) {
    return <h3>No Jobs Yet</h3>;
  }

  return (
    <div className="job-list mt-2">
      {showTitle && <h3>{title}<hr /></h3>}
      {jobs &&
        jobs.map((job) => (
          <div key={job._id} className="card mt-3">
            <h4 className="card-header p-2 m-0">
                {job.jobTitle} | {job.employer}
                <Button
                className="btn btn-secondary"
                style={{float: 'right', align: 'center'}}
                onClick={() => handleRemoveJob(job._id)}
                >
                X
            </Button>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{job.jobDescription}</p>
            </div>
            
          </div>
        ))}
    </div>
  );
};

export default JobList;
