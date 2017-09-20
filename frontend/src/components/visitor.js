import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Visitor extends Component {

    constructor(props) {
        super(props);
        this.deleteVisitor = this.deleteVisitor.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

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
        this.props.ws.send("delete;" + id);
    };

    renderVisitors() {
        if (this.props.visitors) {
            return this.props.visitors.map((visitor) => {
				let id = visitor._id;
                return (
                    <li className="list-group-item" key={id}>
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
                <ul className="list-group">
                    {this.renderVisitors()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { visitors: state.bell.visitors, ws: state.bell.socket };
}

export default connect(mapStateToProps, actions)(Visitor);
