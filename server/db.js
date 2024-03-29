var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Block = new Schema(
{
    "number": {type: Number, index: {unique: true}},
    "hash": String,
    "parentHash": String,
    "nonce": String,
    "sha3Uncles": String,
    "logsBloom": String,
    "transactionsRoot": String,
    "stateRoot": String,
    "receiptRoot": String,
    "miner": String,
    "difficulty": String,
    "totalDifficulty": String,
    "size": Number,
    "extraData": String,
    "gasLimit": Number,
    "gasUsed": Number,
    "timestamp": Number,
    "blockTime": Number,
    "txns": Number,
    "reward": Number,
    "avgGasprice": Number,
    "uncles": [String]
});


var Account = new Schema(
{
    "address": {type: String, index: {unique: true}},
    "balance": Number,
    "blockNumber": Number,
    "type": {type: Number, default: 0} // address: 0x0, contract: 0x1
});

var AccountInfo = new Schema(
{
    "address": String,
    "balance": {type: Number, index: {unique: true}},
    "BTCbalance": Number,
    "ETHbalance": Number,
    "BNBbalance": Number,
    "MKRbalance": Number,
    "GUSDbalance": Number,
    "HTbalance": Number,
    "BNTbalance": Number,
    "blockNumber": Number,
    "TxCount": Number,
    "Percentage": String,
    "timestamp": Number,
    "updateTime": Number,
    "type": {type: Number, default: 0} // address: 0x0, contract: 0x1
});

var Contract = new Schema(
{
    "address": {type: String, index: {unique: true}},
    "creationTransaction": String,
    "contractName": String,
    "compilerVersion": String,
    "optimization": Boolean,
    "sourceCode": String,
    "abi": String,
    "byteCode": String
}, {collection: "Contract"});

var Transaction = new Schema(
{
    "hash": {type: String, index: {unique: true}},
    "nonce": Number,
    "blockHash": String,
    "blockNumber": Number,
    "transactionIndex": Number,
    "from": String,
    "to": String,
    "value": String,
    "gas": Number,
    "gasPrice": String,
    "gasLimit": String,
    "timestamp": Number,
    "input": String
}, {collection: "Transaction"});



var TransactionChart = new Schema(
{
    "timestamp": Number,
    "difficultyAvg": Number,
    "blockTimeAvg": Number,
    "blockSizeAvg": Number,
    "blockCount": Number,
    "addressCount": Number,
		"addressNum": Number,
    "txnCount": Number,
		"EstHashRate": String,
		"unclesCount": Number
});

var BlockStat = new Schema(
{
    "number": {type: Number, index: {unique: true}},
    "timestamp": Number,
    "difficulty": String,
    "hashrate": String,
    "txCount": Number,
    "gasUsed": Number,
    "gasLimit": Number,
    "miner": String,
    "blockTime": Number,
    "uncleCount": Number
});

// create indices
// Block.index({miner:1, blockNumber:-1});
Block.index({number:-1, timestamp:-1});
// Block.index({timestamp:-1});
// Block.index({miner:1});
Transaction.index({timestamp:-1, blockNumber:-1});
// Transaction.index({blockNumber:-1});
// Transaction.index({from:1, blockNumber:-1});
// Transaction.index({to:1, blockNumber:-1});
Account.index({balance:-1});
// Account.index({balance:-1, blockNumber:-1});
// Account.index({type:-1, balance:-1});
// AccountInfo
AccountInfo.index({balance:-1, updateTime: -1});
// AccountInfo.index({balance:-1, blockNumber:-1});
// AccountInfo.index({type:-1, balance:-1});
TransactionChart.index({timestamp:1});
// TransactionChart.index({timestamp:1, blockCount:-1});


mongoose.model('BlockStat', BlockStat);
mongoose.model('Block', Block);
mongoose.model('Account', Account);
mongoose.model('AccountInfo', AccountInfo);
mongoose.model('Contract', Contract);
mongoose.model('Transaction', Transaction);
mongoose.model('TransactionChart', TransactionChart);
module.exports.BlockStat = mongoose.model('BlockStat');
module.exports.Block = mongoose.model('Block');
module.exports.Contract = mongoose.model('Contract');
module.exports.Transaction = mongoose.model('Transaction');
module.exports.Account = mongoose.model('Account');
module.exports.AccountInfo = mongoose.model('AccountInfo');
module.exports.TransactionChart = mongoose.model('TransactionChart');

mongoose.Promise = global.Promise;
console.log("db.js")
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blockDB2', {
  useNewUrlParser: true
});
//
//  mongoose.connect(process.env.MONGO_URI || 'mongodb://54.169.254.177:27017/blockDB', {
//    useNewUrlParser: true
//  });
 
// mongoose.set('debug', true);
