import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Radium, { StyleRoot }  from 'radium';
import WithClass from '../hoc/WithClass';
import Auxilliary from '../hoc/Auxilliary';
import withClass from '../hoc/withClassAlt';
import AuthContext from '../context/auth-context';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    this. state = {
                persons: [
                  { id: 1, name: 'Max', age: 28 },
                  { id: 2, name: 'Manu', age: 29 },
                  { id: 3, name: 'Stephanie', age: 26 }
                ],
                otherState: 'some other value',
                showPersons: false,
                showCockpit: true,
                changedCounter: 0,
                authenticate: false
              };
  }
 
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }
  
  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { id: 1, name: newName, age: 28 },
        { id: 2, name: 'Manu', age: 29 },
        { id: 3, name: 'Stephanie', age: 27 }
      ]
    });
  };

  nameChangedHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
          ...this.state.persons[personIndex]       // ES6 way to create object copy
        };
    
   // const person = Object.assign({}, this.state.persons[personIndex]); //another way to create object copy

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    // this.setState({
    //   persons: persons,
    //   changedCounter: this.state.changedCounter + 1});

    this.setState((prevState, props) => {
        return  {
            persons: persons,
            changedCounter: prevState.changedCounter + 1};
        });
    };

  deletePersonHandler = (deletedPersonIndex) => {
    
   // const persons = this.state.persons.slice();  //to create a copy of reference types
    const persons = [...this.state.persons]; // ES6 method to create copy of reference types
    persons.splice(deletedPersonIndex,1);
    this.setState({
      persons: persons
    });
  };

  togglePersonHandler = () => {
   const doesShow = this.state.showPersons;
   this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticate: true});
  }

  render() {
    console.log('[App.js] render');  
    const basicStyles = {
      backgroundColor: 'white',
      font: 'inherit', // use inherit to use surrounding font
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      margin: '8px auto'
    }
    
    const dynamicStyles = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit', // use inherit to use surrounding font
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      // ':hover': {
      //     backgroundColor: 'lightgreen',
      //     color: 'black'
      // }
    }

    let persons = null;

    if(this.state.showPersons){
      persons =  <Persons 
                  persons={this.state.persons}
                  clicked={this.deletePersonHandler}
                  changed={this.nameChangedHandler}
                  isAuthenticated={this.state.authenticate} />
    }

    return (
    //  <StyleRoot>
      // <div className={classes.App}>
      // <WithClass classes={classes.App}>
      <Auxilliary>
      {/* { 
        this.state.showPersons ?  */}
      <button onClick={() => {
        this.setState({ showCockpit: false});
      }}
      >
      Remove Cockpit
      </button>
      <AuthContext.Provider value={{ authenticated: this.state.authenticate,
                                     login: this.loginHandler
                                  }}>
      {this.state.showCockpit ? 
      <Cockpit 
         title={this.props.appTitle}
         personsLength={this.state.persons.length}
         showPersons={this.state.showPersons}
         clicked={this.togglePersonHandler}
         login={this.loginHandler}/> 
         : null}
      {persons}
      </AuthContext.Provider>
        {/* : null
      } */}
       {/* </div> */}
      {/* </StyleRoot> */}
      {/* </WithClass> */}
      </Auxilliary>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

//export default Radium(App);
export default withClass(App, classes.App);
