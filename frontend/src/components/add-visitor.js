import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class AddVisitor extends Component {
    constructor(props) {
        super(props);
        this.makePhoto = this.makePhoto.bind(this);
    }

    handleFormSubmit(formProps) {
        this.props.addVisitor(formProps);
    }

    makePhoto() {
        this.props.ws.send("photo;make");
    }

    render() {
        const { handleSubmit, fields: { firstname, lastname }} = this.props;

        return (
            <div>
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
                <br />
                
                <button onClick={this.makePhoto} className="btn btn-primary">Make photo</button>
                <form>
                    <fieldset className="form-group">
                        <label>Choose a photo from your PC:</label>
                        <input type="file" 
                            onChange={
                                (e)=> {
                                    e.preventDefault();
                                    const files = [ ...e.target.files ];
                                    const filePath = 
                                    console.log(files);
                                }
                            } 
                            className="form-control" {...photopath} />
                    </fieldset>
                    <button className="btn btn-primary">Save</button>
                </form>
            </div>
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
    return { errorMessage: state.bell.error, ws: state.bell.socket };
}

export default reduxForm({
    form: 'add-visitor',
    fields: ['firstname', 'lastname'],
    validate
}, mapStateToProps, actions)(AddVisitor);
