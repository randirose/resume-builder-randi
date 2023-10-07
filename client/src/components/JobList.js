// import { Link } from 'react-router-dom';

const JobList = ({
  jobs,
  title,
  showTitle = true,
}) => {
  if (!jobs.length) {
    return <h3>No Jobs Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {jobs &&
        jobs.map((job) => (
          <div key={job._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
                {job.jobTitle}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{job.employer}</p>
            </div>
            <div className="card-body bg-light p-2">
              <p>{job.jobDescription}</p>
            </div>
            
          </div>
        ))}
    </div>
  );
};

export default JobList;
