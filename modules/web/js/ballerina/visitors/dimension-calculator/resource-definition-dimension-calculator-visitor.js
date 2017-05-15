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

import log from 'log';
import _ from 'lodash';
import * as DesignerDefaults from './../../configs/designer-defaults';
import SimpleBBox from './../../ast/simple-bounding-box';
import BallerinaASTFactory from './../../ast/ballerina-ast-factory';
import {util} from './../sizing-utils';
import ResourceParameterDimensionCalculatorVisitor from './resource-parameter-dimension-calculator-visitor';

class ResourceDefinitionDimensionCalculatorVisitor {

    canVisit(node) {
        log.debug('can visit ResourceDefinitionDimensionCalc');
        return true;
    }

    beginVisit(node) {
        log.debug('begin visit ResourceDefinitionDimensionCalc');
    }

    visit(node) {
        log.debug('visit ResourceDefinitionDimensionCalc');
    }

    endVisit(node) {
        util.populatePanelDecoratorBBox(node, node.getResourceName());

        let viewState = node.getViewState();

        viewState.titleWidth = util.getTextWidth(node.getResourceName()).w;

        //// Creating components for parameters of the resource
        // Creating component for openning bracket of the parameters view.
        viewState.components.openingParameter = {};
        viewState.components.openingParameter.w = util.getTextWidth('(', 0).w;

        // Creating component for the Parameters text.
        viewState.components.parametersText = {};
        viewState.components.parametersText.w = util.getTextWidth('Parameters:', 0).w;

        // Creating component for closing bracket of the parameters view. 
        viewState.components.closingParameter = {};
        viewState.components.closingParameter.w = util.getTextWidth(')', 0).w;

    }
}

export default ResourceDefinitionDimensionCalculatorVisitor;