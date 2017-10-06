import React, {Component} from 'react';
import ControlPanel from './control-panel';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Stream extends Component {
    constructor(props) {
        super(props);
        this.state = {url: ""};
    }

    // Setting up websocket client connection
    componentWillMount() {
        this.ws = new WebSocket("ws://localhost:8000/ws");
        this.ws.onopen = () => {
            this.ws.binaryType = "arraybuffer";
            this.props.addSocketToState(this.ws);
            console.log("opened socket");
        };
    }

    componentDidMount() {
        this.ws.onmessage = msg => {
            if (msg.data == 'log') {
                this.props.fetchLogs();
            } else if (msg.data == 'success' || msg.data == 'fail') {
                this.props.photoMake(msg.data);
            }  else {
                var url = 'data:image/jpg;base64,'+msg.data
                this.setState({url: url});
            }

        };
    }

    render() {
        return (
            <div className="wrapper bg-main" style={{paddingTop:"90px", paddingBottom:"50px"}}>
                <div className="container-fluid content-wrapper">
<<<<<<< HEAD
                <div className="col-md-4 col-md-offset-1">
                    <div>
                        <img id="stream" src={this.state.url} height="auto" width="100%"/>
=======
                <div className="col-md-6">
                    <div className="col-md-8 col-md-offset-2">
                        <img id="stream" src={this.state.url} height="300" width="400"/>
>>>>>>> 2b8033262193c72acedad61702660b82b080dc0e
                    </div>
                </div>
                <div className="col-md-6">
                    <ControlPanel />
                </div>
                </div>
            </div>
        );
    }

}

export default connect(null, actions)(Stream);
