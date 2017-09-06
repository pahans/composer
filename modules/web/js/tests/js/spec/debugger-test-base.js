/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the 'License'); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint-env es6 */

import LaunchChannel from 'js/launcher/launch-channel';

/**
 * Class for the debugger test bases.
 * @class DebuggerTestBase
 * */
class DebuggerTestBase {
    static testLauncher() {
        const launchChannel = new LaunchChannel({ endpoint: 'ws://localhost:8290/launch' });
        launchChannel.onError = (err) => {
            throw err;
        };
        launchChannel.onClose = function () { };

        return launchChannel;
    }
}

/**
 *
 * */
export default DebuggerTestBase;
