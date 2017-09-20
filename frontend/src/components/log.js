import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Log extends Component {

    componentWillMount() {
        this.props.fetchLogs();
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
    return { logs: state.bell.logs };
}

export default connect(mapStateToProps, actions)(Log);
