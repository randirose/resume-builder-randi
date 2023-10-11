// import { Link } from 'react-router-dom';
import { REMOVE_SKILL } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import {
    // Container,
    // Card,
    Button,
    // Row,
    // Col
  } from 'react-bootstrap';

const SkillList = ({
    skills,
    title,
    showTitle = true,
  }) => {
    //eslint-disable-next-line
    const [removeSkill, { error }] = useMutation(REMOVE_SKILL, {
        update(cache, { data: { removeSkill } }) {
          try {
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: removeSkill },
            });
          } catch (e) {
            console.error(e);
          }
        },
      });
    
      const handleRemoveSkill = async (skillId) => {
        try {
            //eslint-disable-next-line
          const { data } = await removeSkill({
            variables: { skillId },
          });
        } catch (err) {
          console.error(err);
        }
      };
    if (!skills.length) {
      return <h3>No Skills Yet</h3>;
    }
  
    return (
      <div className="skill-list mt-2">
        {showTitle && <h3>{title}<hr /></h3>}
        
        {skills &&
          skills.map((skill) => (
            <div key={skill._id} className="card mt-3">
              <h4 className="card-header p-2 m-0">
                  {skill.skillName}
              
              <Button
                className="btn btn-secondary"
                style={{float: 'right'}}
                onClick={() => handleRemoveSkill(skill._id)}
                >
                X
            </Button>
            </h4>
            </div>
          ))}
        
      </div>
    );
  };
  
  export default SkillList;
  