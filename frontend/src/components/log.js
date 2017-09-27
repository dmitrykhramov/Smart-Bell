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
                    <div className="list-group-item fadeIn" key={log._id}>
                        Name: {log.firstname} {log.lastname}
                        <br />
                        Time: {log.time}
                        <img src={"data:image/jpg;base64," + log.photo} />
                        <br />
                        {log.access}
                    </div>
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
