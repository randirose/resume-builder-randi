// import { Link } from 'react-router-dom';

const SkillList = ({
    skills,
    title,
    showTitle = true,
  }) => {
    if (!skills.length) {
      return <h3>No Skills Yet</h3>;
    }
  
    return (
      <div>
        {showTitle && <h3>{title}</h3>}
        {skills &&
          skills.map((skill) => (
            <div key={skill._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0">
                  {skill.skillName}
              </h4>
              
            </div>
          ))}
      </div>
    );
  };
  
  export default SkillList;
  