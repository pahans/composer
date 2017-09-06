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

import { expect } from 'chai';
import path from 'path';
import LaunchChannel from 'js/launcher/launch-channel';
import File from 'workspace/file';
import Base from './debugger-test-base';

const directory = process.env.DIRECTORY ? process.env.DIRECTORY : '';

describe('Ballerina Composer Test Suite', () => {

    it('launcher run main', function (done) {
        this.timeout(10000);
        const testFilePath = path.resolve(path.join(directory, 'js', 'tests', 'resources', 'debugger'));

        const file = new File({
            name: 'mainFunction.bal',
            path: testFilePath,
            isPersisted: true,
            isDirty: false,
        });
        const message = {
            command: 'RUN_PROGRAM',
            fileName: file.getName(),
            filePath: file.getPath(),
        };
        const launchChannel = Base.testLauncher(message);
        launchChannel.parseMessage = (strInMsg) => {
            const inMsg = JSON.parse(strInMsg.data);
            expect(inMsg.code).to.be.equal('EXECUTION_STARTED');
            // launchChannel.websocket.close();
            done();
        };

        launchChannel.onOpen = () => {
            if (launchChannel.websocket.readyState === 1) {
                launchChannel.sendMessage(message);
            } else {
                launchChannel.connect();
            }
        };
    });

    it('launcher run echo service', function (done) {
        this.timeout(10000);
        const testFilePath = path.resolve(path.join(directory, 'js', 'tests', 'resources', 'debugger'));

        const file = new File({
            name: 'echoService.bal',
            path: testFilePath,
            isPersisted: true,
            isDirty: false,
        });
        const message = {
            command: 'RUN_SERVICE',
            fileName: file.getName(),
            filePath: file.getPath(),
        };
        const launchChannel = Base.testLauncher(message);
        launchChannel.parseMessage = (strInMsg) => {
            const inMsg = JSON.parse(strInMsg.data);
            expect(inMsg.code).to.be.equal('EXECUTION_STARTED');
            done();
        };

        launchChannel.onOpen = () => {
            if (launchChannel.websocket.readyState === 1) {
                launchChannel.sendMessage(message);
            } else {
                launchChannel.connect();
            }
        };
    });
});
