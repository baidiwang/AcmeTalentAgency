import React from 'react';
import { connect } from 'react-redux';
import { createClientSkill } from './store';

class SkillChooser extends React.Component{
  constructor(){
    super();
    this.state = {
      skillId: ''
    };
    this.save = this.save.bind(this);
  }
  save(ev){
    ev.preventDefault();
    this.props.create(this.state.skillId);
  }
  render(){
    const skills = this.props.skills;
    const { skillId } = this.state;
    const { save } = this;
    return (
      <form onSubmit= { save }>
        <select value={ skillId } onChange={ev => this.setState({ skillId: ev.target.value })}>
          <option value=''>-- choose a skill --</option>
          { 
            skills.map( skill => {
              return (
                <option value={ skill.id } key={ skill.id }>{ skill.name }</option>
              );
            })
          }
        </select>
        <button disabled={ !skillId }>Add Skill</button>
      </form>
    );
  }
}

const Client = ({ client, clientSkills, skills, lackingSkills, createClientSkill, deleteClientSkill }) => {
  return (
    <div>
      <h2>{ client.name }</h2>
      <ul>
        {
          clientSkills.map( clientSkill=> {
            const skill = skills.find(skill => skill.id === clientSkill.skillId) || {};

            return <li key={ clientSkill.id }>{ skill.name } <button onClick={()=> deleteClientSkill(clientSkill)}>x</button></li>
          })
        }
      </ul>
      <SkillChooser skills={ lackingSkills } create={(skillId) => createClientSkill(skillId)}/>
    </div>
  );
}; 


const mapDispatch = (dispatch, otherParams)=> {
  const clientId = otherParams.match.params.id * 1;
  return {
    createClientSkill: (skillId)=> dispatch(createClientSkill({clientId, skillId: skillId*1})),
    deleteClientSkill: (clientSkill)=> console.log(clientSkill)
  }
}

const mapState = (state, otherParams)=> {
  const id = otherParams.match.params.id * 1;
  const client = state.clients.find(client => client.id === id) || {};
  const clientSkills = state.clientSkills.filter(clientSkill => clientSkill.clientId === client.id);
  const lackingSkills = state.skills.filter( skill => !clientSkills.find(clientSkill => clientSkill.skillId === skill.id));

  return {
    client,
    clientSkills,
    skills: state.skills,
    lackingSkills
  };
};
export default connect(mapState, mapDispatch)(Client);