import * as crypto from "crypto";

class Block {
    //hash of this block
    readonly hash: string;

    constructor (
        //idx this block
        readonly index: number,
        // previous hash this block
        readonly previousHash: string,
        //created time
        readonly timestamp: number,
        //app data
        readonly data: string
    ) {
        //calculates hash this block when created
        this.hash = this.calculateHash()
    }

    private calculateHash(): string {
        const data = this.index + this.previousHash + this.timestamp
                    + this.data;
        
        return crypto
                    //created instance obj Hash
                    .createHash('sha256')
                    //calc hash in obj Hash
                    .update(data)
                    //convert in hex string
                    .digest('hex');
    }
}

class Blockchain {
    private readonly chain: Block[] = [];

    //getter to get a reference to the last block
    private get latestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    constructor() {
        //create first block
        this.chain.push(
            new Block(0, '0', Date.now(),
            'genesis block'))
    }

    addBlock(data: string): void {
        const block = new Block(
            this.latestBlock.index + 1,
            this.latestBlock.hash,
            Date.now(),
            data
        );
        //push block in array
        this.chain.push(block);
    }
}

console.log(`Creating the blockchain with genesis block...`);
const blockchain = new Blockchain();

console.log(`Mining block #1...`);
blockchain.addBlock('first block');

console.log('Mining block #2...');
blockchain.addBlock('Second block');

console.log(JSON.stringify(blockchain, null, 2));