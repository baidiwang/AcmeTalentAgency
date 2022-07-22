import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateSkill } from './store';

class SkillForm extends Component{
  constructor(){
    super();
    this.state = {
      name: ''
    };
    this.save = this.save.bind(this);
  }
  async componentDidMount(){
    const { match } = this.props;
    const id = match.params.id;
    const skill = (await axios.get(`/api/skills/${id}`)).data;
    this.setState({ name: skill.name });
    /*
    this.setState({ name: this.props.skill.name });
    */
  }
  save(ev){
    ev.preventDefault();
    const skill = {id: this.props.match.params.id, name: this.state.name };
    console.log(skill);
    this.props.save(skill);


  }
  componentDidUpdate(prevProps){
    /*
    if(!prevProps.skill.id && this.props.skill.id){
      this.setState({ name: this.props.skill.name });
    }
    */
  }
  render(){
    const { name } = this.state;
    const { save } = this;
    return (
      <div>
        <h2>Edit Skill</h2>
        <form onSubmit={ save }>
          <input value={ name } onChange={ ev => this.setState({ name: ev.target.value })}/>
          <input type='submit' disabled={!name} value='Save'/>
          <button onClick={()=> {
            this.props.history.push('/')
          }}>Cancel</button>
        </form>
      </div>
    );
  }
}

/*
const mapState = (state, { match }) => {
  const id = match.params.id * 1;
  const skill = state.skills.find(skill=> skill.id === id) || { name: ''};
  return {
    skill
  };
};
*/

const mapDispatch = (dispatch)=> {
  return {
    save: (skill)=> dispatch(updateSkill(skill))
  };
};
//export default connect(mapState)(SkillForm);
export default connect(null, mapDispatch)(SkillForm);