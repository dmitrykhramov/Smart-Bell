import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
    handleFormSubmit({ email, password }) {
        // Need to do something to log user in
        this.props.signinUser({ email, password });
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
        const { handleSubmit, fields: { email, password }} = this.props;

        return (
            <div className="wrapper bg-signin">
                <div className="container-fluid content-wrapper">
                    <div className="row">
                    <div className="col-md-4" style={{paddingLeft:"5rem"}}>
                            <h1 style={{color:"white"}}>Smart Bell</h1>
                            <p>The unique mechanism of our SmartBell (to trigger the lock you simply face the door while pressing the doorbell button) is nearly as fast as using a key but far more convenient.
                                Granting access to the building depending on whether a person has been granted rights to enter makes it the best method for everyday use.</p>
                    </div>
                    <div className="col-md-4 col-md-offset-3" style={{paddingLeft:"15rem"}}>
                            <h2>Sign in</h2>
                            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                                <fieldset className="form-group">
                                    <label>Email:</label>
                                    <input {...email} className="form-control" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Password:</label>
                                    <input {...password} type="password" className="form-control" />
                                </fieldset>
                                {this.renderAlert()}
                                <button action="submit" className="btn btn-default">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.bell.error };
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
