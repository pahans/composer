/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import ConsoleDecorators from 'plugins/debugger/views/console-decorators';
import View from 'core/view/view';
import { VIEWS } from './../constants';
import './DebugConsole.css';

/**
 * Debugger Console View
 */
class DebuggerConsole extends View {
    /**
     * Creates an instance of DebuggerConsole.
     * @memberof DebuggerConsole
     */
    constructor() {
        super();
        this.state = {
            messages: [],
        };
    }
    /**
     * React.Component lifecycle hook
     *
     * @memberof DebuggerConsole
     */
    componentDidMount() {
        this.props.LaunchManager.on('execution-started', () => {
            this.setState({
                messages: [],
            });
        });
        this.props.LaunchManager.on('print-message', (message) => {
            this.setState({
                messages: this.state.messages.concat([message]),
            });
        });
    }
    /**
     * React.Component lifecycle hook
     *
     * @memberof DebuggerConsole
     */
    componentDidUnMount() {
        this.props.LaunchManager.off('execution-started');
        this.props.LaunchManager.off('print-message');
    }

    /**
     * @inheritdoc
     */
    getID() {
        return VIEWS.DEBUGGER_CONSOLE;
    }

    /**
     * @inheritdoc
     */
    render() {
        const { height } = this.props;
        console.log('Rendering console..............');
        return (
            <div id="console" style={{ height }}>
                {this.state.messages.map((message) => {
                    return (<ConsoleDecorators
                        message={message}
                        command={this.props.debuggerPlugin.appContext.command}
                        key={message.id}
                    />);
                })}
            </div>
        );
    }
}

export default DebuggerConsole;
