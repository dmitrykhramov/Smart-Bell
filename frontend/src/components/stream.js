import React, {Component} from 'react';
import ControlPanel from './control-panel';
import { connect } from 'react-redux';
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
			var decoding = atob(msg.data); // decode a string of data from python which has been encoded using base64 encoding
			var len = decoding.length;
			var buffer = new ArrayBuffer(len);
			var bytes = new Uint8Array(buffer);
			for(var i=0; i<len; i++)
				bytes[i]  = decoding.charCodeAt(i);
			var url = encode(bytes);
			this.setState({url: url});   
        };
	}

    componentWillUnmount() {
        this.ws.close();
    }

    render() {
        return (
            <div>
                <div className="col-md-6">
                    <div>
                        <img id="stream" src={this.state.url} height="300" width="400"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <ControlPanel />
                </div>
            </div>
        );
    }

}

export default connect(null, actions)(Stream);

// Converts image bytes from the server and returns image url
function encode(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
            keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }

    return "data:image/jpg;base64,"+output;
}
