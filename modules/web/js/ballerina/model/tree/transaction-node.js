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

import AbstractTransactionNode from './abstract-tree/transaction-node';

class TransactionNode extends AbstractTransactionNode {
    /**
     * Set Children Alias
     * */
    setChildrenAlias() {
        if (this.abortedBody) {
            this.abortedBody.viewState.alias = 'Aborted';
        }
        if (this.committedBody) {
            this.committedBody.viewState.alias = 'Committed';
        }
        if (this.failedBody) {
            this.failedBody.viewState.alias = 'Failed';
        }
        if (this.transactionBody) {
            this.transactionBody.viewState.alias = 'Transaction';
        }
    }
}

export default TransactionNode;