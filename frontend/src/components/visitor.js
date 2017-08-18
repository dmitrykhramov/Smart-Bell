import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Visitor extends Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        this.deleteVisitor = this.deleteVisitor.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.props.fetchVisitors();
    }

    handleClick = (id) => e => {
        this.props.toogleAccess(id, !this.state.isToggleOn);
        this.setState(prevState => ({
        	isToggleOn: !prevState.isToggleOn
        }));
    };

    deleteVisitor = (id) => e => {
        this.props.deleteVisitor(id);
        this.props.fetchVisitors();
        this.props.ws.send("delete;" + id);
    };

    renderVisitors() {
        if (this.props.visitors) {
            return this.props.visitors.map((visitor) => {
                return (
                    <li className="list-group-item" key={visitor._id}>
                        {visitor.firstname} {visitor.lastname}
                        <button onClick={this.deleteVisitor(visitor._id)} className="btn btn-danger pull-xs-right">Delete</button>s
                        <button className="btn btn-primary pull-xs-right" onClick={this.handleClick(visitor._id)}>{this.state.isToggleOn ? 'Open' : 'Close'}</button>
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
