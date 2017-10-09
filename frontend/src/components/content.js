import React, { Component } from 'react';

import AddVisitor from './add-visitor';
import Log from './log';
import Visitor from './visitor';
import Tab from './tab';
import Tabs from './tabs';

class Content extends Component {
    render(){
        return(
            <div className="content">
                {this.props.currentTab === 1 ?
                    <div className="log">
                        <Log />
                    </div>
                    :null}

                {this.props.currentTab === 2 ?
                    <div className="visitors">
                        <Visitor />
                    </div>
                    :null}

                {this.props.currentTab === 3 ?
                    <div className="addVisitor">
                        <AddVisitor />
                    </div>
                    :null}

            </div>
        );
    }
}
export default Content;
