import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
    handleFormSubmit(formProps) {
        // Call action creator to sign up the user!
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
        return (
            <div className="wrapper bg-signin">
                <div className="container-fluid content-wrapper" style={{verticalAlign:"middle"}}>
                    <div className="row">
                    <div className="col-md-4" style={{paddingLeft:"5rem"}}>
                            <h1 style={{color:"white"}}>Smart Bell</h1>
                            <p style={{color:"rgba(255, 255, 255, 0.5)"}}>The unique mechanism of our SmartBell (to trigger the lock you simply face the door while pressing the doorbell button) is nearly as fast as using a key but far more convenient.
                                Granting access to the building depending on whether a person has been granted rights to enter makes it the best method for everyday use.</p>
                    </div>
                    <div className="col-md-4 col-md-offset-3" style={{paddingLeft:"15rem"}}>
                            <h2 style={{color:"white"}}>Create account</h2>
                            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <fieldset className="form-group">
                                <label style={{color:"white"}}>Email:</label>
                                <input className="form-control" {...email} />
                                {email.touched && email.error && <div className="error">{email.error}</div>}
                            </fieldset>
                            <fieldset className="form-group">
                                <label style={{color:"white"}}>Password:</label>
                                <input className="form-control" {...password} type="password" />
                                {password.touched && password.error && <div className="error">{password.error}</div>}
                            </fieldset>
                            <fieldset className="form-group">
                                <label style={{color:"white"}}>Confirm Password:</label>
                                <input className="form-control" {...passwordConfirm} type="password" />
                                {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                            </fieldset>
                            {this.renderAlert()}
                            <button action="submit" className="btn btn-default">Sign up!</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.bell.error };
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup);
