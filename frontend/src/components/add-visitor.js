import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import ImagesUploader from 'react-images-uploader';
import * as actions from '../actions';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

class AddVisitor extends Component {
    constructor(props) {
        super(props);
        this.state = {photo_accept: ""};
        this.makePhoto = this.makePhoto.bind(this);
    }

    componentDidMount() {
        this.props.ws.onmessage = msg => {
            if (typeof msg.data === "string") {
                if (msg.data == 'success') {
                    this.setState({photo_accept: true});
                } else if (msg.data == 'fail') {
                    this.setState({photo_accept: false});
                }
            }
        };
    }

    componentWIllUpdate() {
        if (this.props.photoUpload == 'success') {
            this.props.ws.send("photo_upload");
        }
    }

    componentWillUnmount() {
        this.setState({photo_accept: ""});
    }

    handleFormSubmit(formProps) {
        this.props.addVisitor(formProps);
    }

    makePhoto() {
        this.props.ws.send("photo_make");
    }

    handleFileUpload = e => {
        this.props.uploadDocument({
            file: e.target.files[0]
        });
    };

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
                <button onClick={this.makePhoto} className="btn btn-primary">Make photo</button>
                <input type="file" onChange={this.handleFileUpload} />
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
    return { errorMessage: state.bell.error, ws: state.bell.socket, addFlag: state.bell.visitor_add,
                photoUpload: state.bell.photo};
}

export default reduxForm({
    form: 'add-visitor',
    fields: ['firstname', 'lastname'],
    validate
}, mapStateToProps, actions)(AddVisitor);
