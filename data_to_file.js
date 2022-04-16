var ethers = require('ethers');
const fs = require('fs');
var url = 'https://rpc-df.xdaichain.com';    // https://rpc.gnosischain.com is replaced
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);

const abiDecoder = require('abi-decoder');

const uportAbi = [{"constant":true,"inputs":[{"name":"identity","type":"address"},{"name":"recoveryKey","type":"address"}],"name":"isRecovery","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"},{"name":"newOwner","type":"address"}],"name":"addOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"identity","type":"address"},{"name":"owner","type":"address"}],"name":"isOlderOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"},{"name":"newIdManager","type":"address"}],"name":"initiateMigration","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"migrationNewAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"},{"name":"newOwner","type":"address"}],"name":"addOwnerFromRecovery","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"},{"name":"recoveryKey","type":"address"}],"name":"changeRecovery","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"}],"name":"finalizeMigration","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"}],"name":"cancelMigration","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"},{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"forwardTo","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"recoveryKey","type":"address"}],"name":"registerIdentity","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"identity","type":"address"},{"name":"owner","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"migrationInitiated","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"recoveryKey","type":"address"}],"name":"createIdentity","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"},{"name":"owner","type":"address"}],"name":"removeOwner","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_userTimeLock","type":"uint256"},{"name":"_adminTimeLock","type":"uint256"},{"name":"_adminRate","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"creator","type":"address"},{"indexed":false,"name":"owner","type":"address"},{"indexed":true,"name":"recoveryKey","type":"address"}],"name":"IdentityCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"instigator","type":"address"}],"name":"OwnerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"instigator","type":"address"}],"name":"OwnerRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"recoveryKey","type":"address"},{"indexed":false,"name":"instigator","type":"address"}],"name":"RecoveryChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"newIdManager","type":"address"},{"indexed":false,"name":"instigator","type":"address"}],"name":"MigrationInitiated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"newIdManager","type":"address"},{"indexed":false,"name":"instigator","type":"address"}],"name":"MigrationCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"newIdManager","type":"address"},{"indexed":false,"name":"instigator","type":"address"}],"name":"MigrationFinalized","type":"event"}]

const gnosisABIs = [

    require('./dark-forest/DarkForestTypes.json'),
    require('./dark-forest/Initializable.json'),
    require('./dark-forest/Math.json'),
    require('./dark-forest/owned.json'),
    require('./dark-forest/SafeMath.json'),
    require('./dark-forest/DFAdminFacet.json'),
    require('./dark-forest/DFArtifactFacet.json'),
    require('./dark-forest/DFCaptureFacet.json'),
    require('./dark-forest/DFCoreFacet.json'),
    require('./dark-forest/DFDebugFacet.json'),
    require('./dark-forest/DFGetterFacet.json'),
    require('./dark-forest/DFLobbyFacet.json'),
    require('./dark-forest/DFMoveFacet.json'),
    require('./dark-forest/DFWhitelistFacet.json'),
    require('./dark-forest/LibArtifactUtils.json'),
    require('./dark-forest/LibGameUtils.json'),
    require('./dark-forest/LibLazyUpdate.json'),
    require('./dark-forest/LibPlanet.json'),
    require('./dark-forest/LibStorage.json'),
    require('./dark-forest/Diamond.json'),
    require('./dark-forest/DiamondCutFacet.json'),
    require('./dark-forest/DiamondLoupeFacet.json'),
    require('./dark-forest/OwnershipFacet.json'),
    require('./dark-forest/IDiamondCut.json'),
    require('./dark-forest/IDiamondLoupe.json'),
    require('./dark-forest/IERC165.json'),
    require('./dark-forest/IERC173.json'),
    require('./dark-forest/LibDiamond.json'),
    require('./dark-forest/LibTrig.json'),
    require('./dark-forest/DFInitialize.json'),
    require('./dark-forest/Pairing.json'),
    require('./dark-forest/Verifier.json'),
    require('./dark-forest/DarkForest.json'),
    require('./dark-forest/DarkForest_stripped.json'),

].map(({ abi }) => abi)

abiDecoder.addABI(uportAbi)
gnosisABIs.forEach(abi => { abiDecoder.addABI(abi) })

const func = async () => {
    let tx_list = [];
    var n = 20713468;
    var m = 0;
    for (var i = 20713468; i <= 20743532; i ++) {
        var success = false;
        while (!success) {
            try {
                var block = await customHttpProvider.getBlockWithTransactions(i);
                success = true
            } catch (error) {
            }
        }
        var txs = block.transactions;
        for (let tx in txs) {
            var t = txs[tx];
            var decodedInst = abiDecoder.decodeMethod(t.data);
            if (typeof  decodedInst != "undefined") {
                m += 1;
                var logger = fs.createWriteStream(n.toString() + '.txt', {
                    flags: 'a' // 'a' means appending (old data will be preserved)
                });
                var writeLine = (line) => logger.write(`\n${line}`);
                writeLine(
                    JSON.stringify({
                        to: t.to,
                        from: t.from,
                        time: block.timestamp,
                        name: decodedInst.name,
                        params: decodedInst.params,
                        blockNumber: t.blockNumber,
                        type: t.type,
                        value: t.value,
                        gasPrice: t.gasPrice,
                        gasUsed: block.gasUsed
                    }));
            }
        }
        if (m >= 1000 || i == 20743532) {
            n = i + 1;
            m = 0;
            logger.end();
        }
    }
}

func();

// 20713468 is the height of the start block of the round
// 20743532 is the height of the end block of round