import React, { useEffect, useRef, useContext} from 'react';
import classes from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {

    const toggleButtonRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log(authContext);

    useEffect(() => {   
      console.log('[Cockpit.js] useEffect');
      // Http request...
      const timer = setTimeout(() => {
      alert('Saved data to cloud!');
      }, 1000);
      toggleButtonRef.current.click();
      return () => {  
       clearTimeout(timer);
       console.log('[Cockpit.js] cleanup work in progress....');
      };
    // }, [props.persons]);     // to let useEffect() run only on changes to props.persons
      }, []);                   // to let useEffect() run initially


    useEffect(() => {   
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
        console.log('[Cockpit.js] 2nd cleanup work in progress....');
    };
    });  

    //let classes = ['red','bold'].join(' ');   // classes = "red bold"
    const assignedClasses = [];
    let btnClass = '';
    if(props.showPersons) {
        btnClass = classes.Red;
    }

    if(props.personsLength <= 2) {
      assignedClasses.push(classes.red);   // classes = ['red']
    }
    if(props.personsLength <= 1) {
      assignedClasses.push(classes.bold);   // classes = ['red', 'bold']
    }

    return (
        <div className={classes.Cockpit}>
        <h1>{props.title}</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        {/* <button 
          style={basicStyles}
          onClick={() => this.switchNameHandler('Dipanshu')}>Switch Name and Age</button>
        <br /> */}
        <button 
         // style={dynamicStyles}
          ref={toggleButtonRef}
          className={btnClass}
          onClick={props.clicked}>Toggle Persons
        </button>
        {/* <AuthContext.Consumer>
                  {(context) => <button onClick={context.login}>Log In</button>}
        </AuthContext.Consumer> */}
        {<button onClick={authContext.login}>Log In</button>}
        </div>
    );
};

export default React.memo(cockpit);