import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class AddVisitor extends Component {
    constructor(props) {
        super(props);
        this.makePhoto = this.makePhoto.bind(this);
    }
    componentWillMount() {
    }
    componentWillUnmount() {
        //when user leaves the component without making photo or upload after adding visitor
        console.log(this.props.makePhoto);
        if(this.props.addFlag=='success' && (this.props.photoMakeBell !='success'&& this.props.photoUpload!='success')){
            onClick: alert('Adding visitor has been canceled.')
            this.onClickFormCancel();
            // stop unmount using react-router?
            // delete saved visitor without photo, maybe using python
        }
    }

    componentDidUpdate() {
        // form reset after adding visitor
        let addForm = document.getElementById('addVisitorForm');
        setTimeout(() => {
			if(this.props.addFlag=='success'&&(this.props.photoMakeBell =='success' || this.props.photoUpload=='success')) {
				onClick: alert("Succeed to add the visitor.");
				this.props.resetAddForm();
				this.resetFormValues(addForm);
			}
			else {
			}	
		},100);
        
        
    }
    onClickAddForm(hideOrShow) {
        let newClass = "fadeIn"
        if (hideOrShow == 'success'){
            newClass = 'displayNone fadeIn';
        }
        else if (hideOrShow == 'fail') {
            onClick: alert('There is error while adding a visitor.\nPlease refresh the browser and do it again.')
        }
        return newClass;
    }

    onClickMakePhoto(hideOrShow) {
        let newClass = 'displayNone fadeIn';
        if (hideOrShow == 'success'){
            newClass = 'fadeIn';
        }
        return newClass;
    }

    handleFormSubmit(formProps) {
        this.props.addVisitor(formProps);
        setTimeout(() => {
			this.props.fetchVisitors();	
		}, 100);
        
    }

    makePhoto() {
        this.props.ws.send("photo_make");
        this.props.photoMake();
    }
    
    onClickCheckMakePhoto(hOs) {
        let newClass = "btn btn-primary";
        if(hOs == 'success') {
            onClick: alert("success");
        }
        else if(hOs == 'fail') {
            onClick: alert("fail");
        }
        return newClass;
    }

    handleFileUpload = e => {
        this.props.uploadDocument({
            file: e.target.files[0]
        }, this.props.ws);
    }
    
    onClickCheckFileUpload(hOs) {
        let newClass = "";
        if(hOs == 'success') {
            onClick: alert("success");
        }
        else if(hOs == 'fail') {
            onClick: alert("fail");
            
        }
        return newClass;
    }
    deleteLatestVisitor() {
        setTimeout(()=> {
            if(this.props.visitors) {
                let visitorLen = this.props.visitors.length;
                //console.log(visitorLen);
                return this.props.visitors.map((visitor,i) => {
					let id = visitor._id;
                    if(visitorLen === i + 1){
                        console.log('delete ' + i +", " + visitor.firstname);
                        this.props.deleteVisitor(id);
                        this.props.ws.send(id);
                    }
                });
            }
        },100);
    }
    onClickFormCancel = () => {
        if(this.props.addFlag == 'fail' || this.props.addFlag == 'none'){
            onClick: alert("Cancel without adding basic information is unavailable.");
            return
        }
        let addForm = document.getElementById('addVisitorForm');
        this.props.fetchVisitors();
        this.deleteLatestVisitor();
        this.resetFormValues(addForm);
    }

    resetFormValues(addForm) {
        setTimeout(() => {
            this.props.resetAddForm();
            addForm.reset();
            console.log('Form value reset');
            //console.log(addForm);
			/*console.log(this.props.values.firstname);
			this.props.setProps({
				values: {
					firstname: "none"
					}
				});
			console.log("change to"+this.props.firstname);
			console.log("change to"+this.props.values.firstname);*/
		}, 100);
    }
    render() {
        const { handleSubmit, fields: { firstname, lastname, email }} = this.props;
			//console.log(this.props.values);
			return (
            <div>
                <form id="addVisitorForm" className={this.onClickAddForm(this.props.addFlag)} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="form-group">
                        <label style={{color:"white"}}>First name:</label>
                        <input className="form-control" {...firstname} />
                        {firstname.touched && firstname.error && <div className="error">{firstname.error}</div>}
                    </fieldset>
                    <fieldset className="form-group">
                        <label style={{color:"white"}}>Last name:</label>
                        <input className="form-control" {...lastname} />
                        {lastname.touched && lastname.error && <div className="error">{lastname.error}</div>}
                    </fieldset>
                    <fieldset className="form-group">
                        <label style={{color:"white"}}>E-mail address:</label>
                        <input type="email" className="form-control" {...email} />
                        {email.touched && email.error && <div className="error">{email.error}</div>}
                    </fieldset>
                    <button action="submit" className="btn btn-default">Add visitor</button>
                </form>
                <div className={this.onClickMakePhoto(this.props.addFlag)}>
                    <p>Basic information is saved.</p>
                    <p>Please save your photo via either 'Make photo' or 'File upload'</p>
                    <fieldset className="form-group">
                        <label>Photo Upload:</label>
                        <br />
                        <input className={this.onClickCheckFileUpload(this.props.photoUpload)} type="file" onChange={this.handleFileUpload} />
                    </fieldset>
                    <button onClick={this.makePhoto} className={this.onClickCheckMakePhoto(this.props.photoMakeBell)}>Make photo</button>
                    <button onClick={()=>{if(confirm('Are you sure to cancel adding the visitor?')){this.onClickFormCancel()}}} className='btn btn-danger'>Cancel Addition</button>
                    <br />
                </div>
                {/*<br />
                this is addflag: {this.props.addFlag}
                <br />
                this is make: {this.props.photoMakeBell}
                <br />
                this is upload: {this.props.photoUpload}*/}
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

    if (!formProps.email) {
        errors.email = 'Please enter email';
    }
    
    return errors;
}


function mapStateToProps(state) {
    return { errorMessage: state.bell.error, ws: state.bell.socket, addFlag: state.bell.visitor_add,
                photoUpload: state.bell.photo_upload, photoMakeBell: state.bell.photo_make, /* photoMake was same name as the function photoMake in actions. so Jun changed the name*/
                visitors: state.bell.visitors  };
}

export default reduxForm({
    form: 'add_visitor',
    fields: ['firstname', 'lastname', 'email'],
    validate
}, mapStateToProps, actions)(AddVisitor);
