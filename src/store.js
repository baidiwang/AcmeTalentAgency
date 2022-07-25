import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';

const clientsReducer = (state = [], action)=> {
  if(action.type === 'SET_CLIENTS'){
    return action.clients;
  }
  return state;
};

const skillsReducer = (state = [], action)=> {
  if(action.type === 'SET_SKILLS'){
    return action.skills;
  }
  else if(action.type === 'UPDATE_SKILL'){
    return state.map(skill => skill.id === action.skill.id ? action.skill : skill);
  }
  return state;
};

const clientSkillsReducer = (state = [], action)=> {
  if(action.type === 'SET_CLIENT_SKILLS'){
    return action.clientSkills;
  }
  else if(action.type === 'CREATE_CLIENT_SKILL'){
    return [...state, action.clientSkill];
  }
  return state;
};

const reducer = combineReducers({
  clients: clientsReducer,
  skills: skillsReducer,
  clientSkills: clientSkillsReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export const fetchClients = ()=> {
  return async(dispatch)=> {
    const clients = (await axios.get('/api/clients')).data;
    dispatch({ type: 'SET_CLIENTS', clients });
  };
};

export const fetchSkills = ()=> {
  return async(dispatch)=> {
    const skills = (await axios.get('/api/skills')).data;
    dispatch({ type: 'SET_SKILLS', skills });
  };
};

export const createClientSkill = (clientSkill)=> {
  return async(dispatch)=> {
    clientSkill = (await axios.post('/api/clientSkills', clientSkill)).data;
    dispatch({ type: 'CREATE_CLIENT_SKILL', clientSkill });
  };
};

export const updateSkill = (skill)=> {
  return async(dispatch)=> {
    skill = (await axios.put(`/api/skills/${skill.id}`, skill)).data;
    dispatch({ type: 'UPDATE_SKILL', skill });
  };
};

// export const fetchClientSkills = ()=> {
//   return async(dispatch)=> {
//     const clientSkills = (await axios.get('/api/clientSkills')).data;
//     dispatch({ type: 'SET_CLIENT_SKILLS', clientSkills });
//   };
// };


// export default store;