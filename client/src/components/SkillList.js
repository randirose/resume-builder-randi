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
      <div>
        {showTitle && <h3>{title}</h3>}
        {skills &&
          skills.map((skill) => (
            <div key={skill._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0">
                  {skill.skillName}
              </h4>
              <Button
                className="btn-block btn-danger"
                onClick={() => handleRemoveSkill(skill._id)}
                >
                Delete Skill
            </Button>
              
            </div>
          ))}
      </div>
    );
  };
  
  export default SkillList;
  