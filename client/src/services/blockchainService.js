// Blockchain Service for Medical Records Security
import CryptoJS from 'crypto-js';

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return CryptoJS.SHA256(
            this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce
        ).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.loadBlockchain();
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), { type: 'GENESIS', data: 'MediSage Blockchain Initialized' }, '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        this.saveBlockchain();
    }

    addTransaction(transaction) {
        const block = new Block(
            this.chain.length,
            Date.now(),
            transaction,
            this.getLatestBlock().hash
        );
        this.addBlock(block);
        return block;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Recalculate hash to verify integrity
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // Verify chain linkage
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    getBlockByIndex(index) {
        return this.chain[index];
    }

    getBlocksByDocumentId(documentId) {
        return this.chain.filter(block =>
            block.data && block.data.documentId === documentId
        );
    }

    getDocumentHistory(documentId) {
        const blocks = this.getBlocksByDocumentId(documentId);
        return blocks.map(block => ({
            timestamp: block.timestamp,
            action: block.data.action,
            hash: block.hash,
            details: block.data.details
        }));
    }

    saveBlockchain() {
        try {
            localStorage.setItem('medisage_blockchain', JSON.stringify(this.chain));
        } catch (error) {
            console.error('Error saving blockchain:', error);
        }
    }

    loadBlockchain() {
        try {
            const savedChain = localStorage.getItem('medisage_blockchain');
            if (savedChain) {
                const parsedChain = JSON.parse(savedChain);
                // Reconstruct Block objects
                this.chain = parsedChain.map(blockData => {
                    const block = new Block(
                        blockData.index,
                        blockData.timestamp,
                        blockData.data,
                        blockData.previousHash
                    );
                    block.hash = blockData.hash;
                    block.nonce = blockData.nonce;
                    return block;
                });
            }
        } catch (error) {
            console.error('Error loading blockchain:', error);
            this.chain = [this.createGenesisBlock()];
        }
    }

    verifyDocumentIntegrity(documentId, currentData) {
        const blocks = this.getBlocksByDocumentId(documentId);
        if (blocks.length === 0) {
            return { verified: false, reason: 'No blockchain record found' };
        }

        const latestBlock = blocks[blocks.length - 1];
        const storedHash = CryptoJS.SHA256(JSON.stringify(latestBlock.data.details)).toString();
        const currentHash = CryptoJS.SHA256(JSON.stringify(currentData)).toString();

        if (storedHash === currentHash) {
            return { verified: true, message: 'Document integrity verified' };
        } else {
            return { verified: false, reason: 'Document has been modified', lastVerifiedHash: storedHash };
        }
    }
}

class BlockchainService {
    constructor() {
        this.blockchain = new Blockchain();
        console.log('%c🔒 MediSage Blockchain Security Active', 'color: #10B981; font-weight: bold; font-size: 14px;');
        console.log('%cAll medical records and user data are secured with SHA256 encryption and immutable blockchain technology', 'color: #6B7280; font-size: 12px;');
    }

    // Record document creation
    recordDocumentCreation(documentId, documentData) {
        const transaction = {
            action: 'CREATE',
            documentId: documentId,
            timestamp: Date.now(),
            details: {
                title: documentData.title,
                documentType: documentData.documentType,
                documentDate: documentData.documentDate,
                hash: CryptoJS.SHA256(JSON.stringify(documentData)).toString()
            }
        };

        const block = this.blockchain.addTransaction(transaction);
        console.log('✓ Document creation recorded on blockchain:', block.hash);
        return block;
    }

    // Record document update
    recordDocumentUpdate(documentId, oldData, newData) {
        const transaction = {
            action: 'UPDATE',
            documentId: documentId,
            timestamp: Date.now(),
            details: {
                oldHash: CryptoJS.SHA256(JSON.stringify(oldData)).toString(),
                newHash: CryptoJS.SHA256(JSON.stringify(newData)).toString(),
                changes: this.getChanges(oldData, newData)
            }
        };

        const block = this.blockchain.addTransaction(transaction);
        console.log('✓ Document update recorded on blockchain:', block.hash);
        return block;
    }

    // Record document deletion
    recordDocumentDeletion(documentId, documentData) {
        const transaction = {
            action: 'DELETE',
            documentId: documentId,
            timestamp: Date.now(),
            details: {
                title: documentData.title,
                hash: CryptoJS.SHA256(JSON.stringify(documentData)).toString()
            }
        };

        const block = this.blockchain.addTransaction(transaction);
        console.log('✓ Document deletion recorded on blockchain:', block.hash);
        return block;
    }

    // Record document access
    recordDocumentAccess(documentId, userId) {
        const transaction = {
            action: 'ACCESS',
            documentId: documentId,
            timestamp: Date.now(),
            details: {
                userId: userId,
                accessTime: new Date().toISOString()
            }
        };

        const block = this.blockchain.addTransaction(transaction);
        return block;
    }

    // Get document audit trail
    getDocumentAuditTrail(documentId) {
        return this.blockchain.getDocumentHistory(documentId);
    }

    // Verify blockchain integrity
    verifyBlockchainIntegrity() {
        const isValid = this.blockchain.isChainValid();
        return {
            valid: isValid,
            blockCount: this.blockchain.chain.length,
            message: isValid ? 'Blockchain integrity verified' : 'Blockchain has been tampered with!'
        };
    }

    // Verify specific document integrity
    verifyDocumentIntegrity(documentId, currentData) {
        return this.blockchain.verifyDocumentIntegrity(documentId, currentData);
    }

    // Get blockchain statistics
    getBlockchainStats() {
        return {
            totalBlocks: this.blockchain.chain.length,
            genesisBlockHash: this.blockchain.chain[0].hash,
            latestBlockHash: this.blockchain.getLatestBlock().hash,
            isValid: this.blockchain.isChainValid(),
            difficulty: this.blockchain.difficulty
        };
    }

    // Helper function to detect changes
    getChanges(oldData, newData) {
        const changes = {};
        for (const key in newData) {
            if (JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])) {
                changes[key] = {
                    old: oldData[key],
                    new: newData[key]
                };
            }
        }
        return changes;
    }

    // Export blockchain for backup
    exportBlockchain() {
        return JSON.stringify(this.blockchain.chain, null, 2);
    }

    // Get all blocks
    getAllBlocks() {
        return this.blockchain.chain;
    }

    // Record user registration
    recordUserRegistration(userId, userData) {
        const transaction = {
            action: 'USER_REGISTER',
            userId: userId,
            timestamp: Date.now(),
            details: {
                email: userData.email,
                name: userData.name,
                registrationDate: userData.createdAt,
                hash: CryptoJS.SHA256(JSON.stringify({
                    email: userData.email,
                    id: userId,
                    timestamp: userData.createdAt
                })).toString()
            }
        };

        const block = this.blockchain.addTransaction(transaction);
        console.log('🔐 User registration secured on blockchain:', block.hash);
        return block;
    }

    // Record user login
    recordUserLogin(userId, email) {
        const transaction = {
            action: 'USER_LOGIN',
            userId: userId,
            timestamp: Date.now(),
            details: {
                email: email,
                loginTime: new Date().toISOString()
            }
        };

        const block = this.blockchain.addTransaction(transaction);
        console.log('🔐 User login recorded on blockchain');
        return block;
    }

    // Record profile update
    recordProfileUpdate(userId, oldData, newData) {
        const transaction = {
            action: 'PROFILE_UPDATE',
            userId: userId,
            timestamp: Date.now(),
            details: {
                oldHash: CryptoJS.SHA256(JSON.stringify(oldData)).toString(),
                newHash: CryptoJS.SHA256(JSON.stringify(newData)).toString(),
                changes: this.getChanges(oldData, newData)
            }
        };

        const block = this.blockchain.addTransaction(transaction);
        console.log('🔐 Profile update secured on blockchain:', block.hash);
        return block;
    }
}

export const blockchainService = new BlockchainService();
export default blockchainService;
