import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Log extends Component {

    componentWillMount() {
        this.props.fetchLogs();
    }

    componentDidMount() {
        this.props.ws.onmessage = msg => {
            if (typeof msg.data === "string") {
                if (msg.data == 'log') {
                    this.props.fetchLogs();
                }
            }
        };
    }

    renderLogs() {
        if (this.props.logs) {
            return this.props.logs.map((log) => {
                return (
                    <li className="list-group-item" key={log._id}>
                        {log.firstname} {log.lastname} {log.time}
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
    return { logs: state.bell.logs, ws: state.bell.socket };
}

export default connect(mapStateToProps, actions)(Log);
