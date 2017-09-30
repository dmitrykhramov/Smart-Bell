import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

/*
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';      // refer https://www.npmjs.com/package/react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';
*/
class Visitor extends Component {

    constructor(props) {
        super(props);
        this.state = { delete: 0};
        this.deleteVisitor = this.deleteVisitor.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    /* // for better alerting dialog
    submit = (id) => e => {
        confirmAlert({
            title: 'Confirm to delete.',                        // Title dialog 
            message: 'Are you sure to delete this visitor?',    // Message dialog 
            childrenElement: () => <div></div>,                 // Custom UI or Component 
            confirmLabel: 'Confirm',                            // Text button confirm 
            cancelLabel: 'Cancel',                              // Text button cancel 
            onConfirm: this.deleteVisitor(id),                  // Action after Confirm 
            onCancel: () => close()                               // Action after Cancel 
          });
          
    };*/
    componentWillMount() {
        this.props.fetchVisitors();
    }

    componentDidUpdate() {
        if (this.props.deleteFlag == 'success') {
            this.props.fetchVisitors();
        }
    }

    handleClick = (id, access) => e => {
		if (access == true) {
            this.props.toogleAccess(id, false);
		} else {
            this.props.toogleAccess(id, true);
        }
        
        visitorReload = setTimeout(() => {
            console.log('visitor reloaded');
            let doorPermission = access == false? 'Open' : 'Close';
            let alertStr = 'Permission has been changed: ' + doorPermission;
            onClick: alert(alertStr);
            this.props.fetchVisitors();
        },150);
    };
    
    deleteVisitor = (id) => e => {
        onClick: if(confirm('Are you sure to delete this visitor?')){
            this.props.deleteVisitor(id);
            this.props.ws.send(id); // when it doesn't connect to websocket, it makes fetchvisitors fn disable
            this.setState({delete: 1});
        }
    };
    
    
    renderVisitors() {
        if (this.props.visitors) {
            return this.props.visitors.map((visitor) => {
				let id = visitor._id;
                return (
                    <li className="list-group-item fadeIn" key={id}>
                        {visitor.firstname} {visitor.lastname}
                        <button onClick={this.deleteVisitor(id)} className="btn btn-danger pull-xs-right">Delete</button>
                        <button className="btn btn-primary pull-xs-right" onClick={this.handleClick(id, visitor.access)}>{visitor.access == true ? 'Open' : 'Close'}</button>
                    </li>
                );
            });
        }
    }

    render() {
        return (
            <div>
                <ul className="list-group" onChange={this.fetchVisitors}>
                    {this.renderVisitors()}
                </ul>
                {this.props.deleteFlag}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { visitors: state.bell.visitors, ws: state.bell.socket, deleteFlag: state.bell.visitor_delete };
}

export default connect(mapStateToProps, actions)(Visitor);
