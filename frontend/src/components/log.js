import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
var moment = require('moment');

class Log extends Component {

    componentWillMount() {
        this.props.fetchLogs();
    }

    renderLogs() {
        if (this.props.logs) {
            return this.props.logs.map((log) => {
                let timestamp = log._id.toString().substring(0,8);
                let time_utc =  new Date(parseInt(timestamp, 16) * 1000 );
                return (
                    <li className="list-group-item" key={log._id}>
                        {log.firstname} {log.lastname}
                    </li>
                );
            });
        }
    }

    render() {

        return (
            <div>
                <ul className="list-group">
                    {this.renderLogs()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { logs: state.bell.logs };
}

export default connect(mapStateToProps, actions)(Log);
