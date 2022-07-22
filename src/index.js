import { createRoot } from 'react-dom/client';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import store, { fetchClients, fetchSkills, fetchClientSkills}  from './store';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import SkillForm from './SkillForm';
import Client from './Client';

const App = connect(
  state => state,
  dispatch => {
    return {
      loadData: ()=> {
        dispatch(fetchClients());
        dispatch(fetchSkills());
        dispatch(fetchClientSkills());
      } 
    };
  }
)(class App extends Component{
  componentDidMount(){
    this.props.loadData();
  }
  render(){
    const { clients, skills, clientSkills } = this.props;
    return (
      <div>
        <h1><Link to='/'>Acme Talent Agency</Link></h1>
        <Route path='/' exact component={ Home } />
        <Route path='/skills/:id' component={ SkillForm } />
        <Route path='/clients/:id' component={ Client } />
      </div>
    );
  }
});

const root = createRoot(document.querySelector('#root'));
root.render(<Provider store={ store }><Router><App /></Router></Provider>);