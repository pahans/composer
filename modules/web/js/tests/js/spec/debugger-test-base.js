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

import {expect} from 'chai';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import {fetchConfigs, parseContent} from 'api-client/api-client';
import File from 'workspace/file';
import LaunchManager from './../../../launcher/launch-manager';
// import Debugger from './../../../debugger/module';
import DebugManager from './../../../debugger/debug-manager';
// import Launcher from './../../../launcher/launcher';

/**
 * Class for the debugger test bases.
 * @class DebuggerTestBase
 * */
class DebuggerTestBase {
    static testDebugger(testFileName, directory, done) {
        const testFilePath = path.join(directory, 'js', 'tests', 'resources', 'debugger');
        const testFile = path.resolve(path.join(testFilePath, testFileName));
        const testFileContent = fs.readFileSync(testFile, 'utf8');

        let file = new File({
            name: testFileName,
            path: testFilePath,
            content: testFileContent,
            isPersisted: true,
            isDirty: false,
        });
        console.log(file);

        const config = {
            application: {
                config: {
                    services: {
                        workspace: {
                            endpoint: "http://localhost:8289/service/workspace",
                        },
                        packages: {
                            endpoint: "http://localhost:8289/service/packages",
                        },
                        swagger: {
                            endpoint: "http://localhost:8289/service/swagger",
                        },
                        parser: {
                            endpoint: "http://localhost:8289/ballerina/model/content",
                        },
                        fragmentParser: {
                            endpoint: "http://localhost:8289/ballerina/model/parse-fragment",
                        },
                        validator: {
                            endpoint: "http://localhost:8289/ballerina/validate",
                        },
                        launcher: {
                            endpoint: "ws://localhost:8290/launch",
                        },
                        debugger: {
                            endpoint: "ws://localhost:5006/debug",
                        },
                        langserver: {
                            endpoint: "ws://localhost:8291/blangserver",
                        },
                        programNativeTypes: {
                            endpoint: "http://localhost:8289/service/program/native/types",
                        },
                        programPackages: {
                            endpoint: "http://localhost:8289/service/program/packages",
                        },
                        typeLattice: {
                            endpoint: "http://localhost:8289/typelattice",
                        },
                    },
                },
                reRender: () => {
                },
                browserStorage: {
                    get: () => {
                    },
                },
            },
        };

        LaunchManager.init(config);

        const debuggerOpts = {};
        _.set(debuggerOpts, 'application', config.application);
        _.set(debuggerOpts, 'launchManager', LaunchManager);
        // this.debugger = new Debugger(debuggerOpts);

        DebugManager.init(debuggerOpts);
        DebugManager.addBreakPoint(3, testFileName, file.getPackageName());
        LaunchManager.debugApplication(file);
    }
}

/**
 *
 * */
export default DebuggerTestBase;
