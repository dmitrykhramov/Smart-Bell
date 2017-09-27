import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';      // refer https://www.npmjs.com/package/react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';

class Visitor extends Component {

    constructor(props) {
        super(props);
        this.deleteVisitor = this.deleteVisitor.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
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
          
    };
    componentWillMount() {
        this.props.fetchVisitors();
    }

    handleClick = (id, access) => e => {
		if (access == true) {
			this.props.toogleAccess(id, false);
		} else {
			this.props.toogleAccess(id, true);
		}
    };
    
    deleteVisitor = (id) => e => {
        this.props.deleteVisitor(id);
        this.props.fetchVisitors();
        this.props.ws.send(id);
    };

    renderVisitors() {
        if (this.props.visitors) {
            return this.props.visitors.map((visitor) => {
				let id = visitor._id;
                return (
                    <li className="list-group-item" key={id}>
                        {visitor.firstname} {visitor.lastname}
                        <button onClick={this.submit(id)} className="btn btn-danger pull-xs-right">Delete</button>
                        <button className="btn btn-primary pull-xs-right" onClick={this.handleClick(id, visitor.access)}>{visitor.access == true ? 'Open' : 'Close'}</button>
                    </li>
                );
            });
        }
    }

    render() {
        return (
            <div>
                <ul className="list-group fadeIn">
                    {this.renderVisitors()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { visitors: state.bell.visitors, ws: state.bell.socket, deleteFlag: state.bell.visitor_delete };
}

export default connect(mapStateToProps, actions)(Visitor);
