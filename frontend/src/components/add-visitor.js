import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class AddVisitor extends Component {
    handleFormSubmit(formProps) {
        this.props.addVisitor(formProps);
    }

    render() {
        const { handleSubmit, fields: { firstname, lastname }} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>First name:</label>
                    <input className="form-control" {...firstname} />
                    {firstname.touched && firstname.error && <div className="error">{firstname.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Last name:</label>
                    <input className="form-control" {...lastname} />
                    {lastname.touched && lastname.error && <div className="error">{lastname.error}</div>}
                </fieldset>
                <button action="submit" className="btn btn-primary">Add visitor</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if (!formProps.firstname) {
        errors.firstname = 'Please enter firstname';
    }

    if (!formProps.lastname) {
        errors.lastname = 'Please enter lastname';
    }

    return errors;
}


function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'add-visitor',
    fields: ['firstname', 'lastname'],
    validate
}, mapStateToProps, actions)(AddVisitor);
