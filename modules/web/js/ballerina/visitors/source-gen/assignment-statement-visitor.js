/**
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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
import _ from 'lodash';
import log from 'log';
import EventChannel from 'event_channel';
import AbstractStatementSourceGenVisitor from './abstract-statement-source-gen-visitor';
import AssignmentStatement from '../../ast/statements/assignment-statement';
import StatementVisitorFactory from './statement-visitor-factory';

class AssignmentStatementVisitor extends AbstractStatementSourceGenVisitor {
    constructor(parent) {
        super(parent);
    }

    canVisitAssignmentStatement(assignmentStatement) {
        return assignmentStatement instanceof AssignmentStatement;
    }

    beginVisitAssignmentStatement(assignmentStatement) {
        log.debug('Begin Visit Assignment Statement');
    }

    visitLeftOperandExpression(expression) {
        var statementVisitorFactory = new StatementVisitorFactory();
        var statementVisitor = statementVisitorFactory.getStatementVisitor(expression, this);
        expression.accept(statementVisitor);
    }

    visitRightOperandExpression(expression) {
        // FIXME: right expression should neglect indentation inherited through
        // parent scope, hence the temp swap of indentCount, should be fixed
        // in a proper way
        let indentCountTmp = this.indentCount;
        this.indentCount = 0;
        var statementVisitorFactory = new StatementVisitorFactory();
        var statementVisitor = statementVisitorFactory.getStatementVisitor(expression, this);
        this.indentCount = indentCountTmp;
        expression.accept(statementVisitor);
    }

    endVisitAssignmentStatement(assignmentStatement) {
        this.getParent().appendSource(this.getGeneratedSource() + ";\n");
        log.debug('End Visit Assignment Statement');
    }
}

export default AssignmentStatementVisitor;
