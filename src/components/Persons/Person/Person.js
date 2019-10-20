import React, { Component, Fragment} from 'react';
import classes from './Person.module.css';
import Radium from 'radium';
import Auxilliary from '../../../hoc/Auxilliary';
import withClass from '../../../hoc/withClassAlt';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

//const person = ( props ) => {
class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
    //document.querySelector('input').focus();  //focusses first input component only but we want focus on last                                              element by default
   //   this.inputElement.focus();
     this.inputElementRef.current.focus();
     console.log(this.context.authenticated);
    }

    render() {
        // const style = {
    //     '@media (min-width: 500px)': {
    //         width: '450px'
    //     }
    // };
        console.log('[Person.js] rendering...');
        return (
            // <div className="Person" style={style}>
            // <div className={classes.Person}>
            <Auxilliary>
                {/* <AuthContext.Consumer>
                  {(context) => context.authenticated ? <p>Authenticated!</p> : <p>Please login!</p>}
                </AuthContext.Consumer> */}
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please login!</p>}
            {/* <Fragment> */}
                <p onClick={this.props.click}>
                  I'm {this.props.name} and I am {this.props.age} years old!
                </p>
                <p>{this.props.children}</p>
                <input
                  type="text"
                  onChange={this.props.changed}
                  value={this.props.name}
                //   ref={(inputEl) => {this.inputElement = inputEl}} 
                  ref = {this.inputElementRef}
                  >
                </input>
            {/* </Fragment> */}
            </Auxilliary>
            //  </div>
        );
    }
    
};

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number
}

// export default Radium(person);
export default withClass(Person, classes.Person);