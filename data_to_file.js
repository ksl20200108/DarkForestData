var ethers = require('ethers');
const fs = require('fs');
var url = 'https://rpc-df.xdaichain.com';    // https://rpc.gnosischain.com is replaced
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);

const abiDecoder = require('abi-decoder');

const uportAbi = [{"constant":true,"inputs":[{"name":"identity","type":"address"},{"name":"recoveryKey","type":"address"}],"name":"isRecovery","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"},{"name":"newOwner","type":"address"}],"name":"addOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"identity","type":"address"},{"name":"owner","type":"address"}],"name":"isOlderOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"},{"name":"newIdManager","type":"address"}],"name":"initiateMigration","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"migrationNewAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"},{"name":"newOwner","type":"address"}],"name":"addOwnerFromRecovery","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"},{"name":"recoveryKey","type":"address"}],"name":"changeRecovery","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"}],"name":"finalizeMigration","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"}],"name":"cancelMigration","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"},{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"forwardTo","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"recoveryKey","type":"address"}],"name":"registerIdentity","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"identity","type":"address"},{"name":"owner","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"migrationInitiated","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"recoveryKey","type":"address"}],"name":"createIdentity","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"},{"name":"owner","type":"address"}],"name":"removeOwner","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_userTimeLock","type":"uint256"},{"name":"_adminTimeLock","type":"uint256"},{"name":"_adminRate","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"creator","type":"address"},{"indexed":false,"name":"owner","type":"address"},{"indexed":true,"name":"recoveryKey","type":"address"}],"name":"IdentityCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"instigator","type":"address"}],"name":"OwnerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"instigator","type":"address"}],"name":"OwnerRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"recoveryKey","type":"address"},{"indexed":false,"name":"instigator","type":"address"}],"name":"RecoveryChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"newIdManager","type":"address"},{"indexed":false,"name":"instigator","type":"address"}],"name":"MigrationInitiated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"newIdManager","type":"address"},{"indexed":false,"name":"instigator","type":"address"}],"name":"MigrationCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"identity","type":"address"},{"indexed":true,"name":"newIdManager","type":"address"},{"indexed":false,"name":"instigator","type":"address"}],"name":"MigrationFinalized","type":"event"}]

const gnosisABIs = [

    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/Campaign.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/CampaignFactory.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/DifficultyOracle.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/DifficultyOracleFactory.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/Event.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/FutarchyOracle.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/FutarchyOracleFactory.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/HumanFriendlyToken.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/MajorityOracle.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/MajorityOracleFactory.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/Market.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/MarketMaker.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/Migrations.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/Oracle.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/OutcomeToken.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/SignedMessageOracle.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/SignedMessageOracleFactory.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/StandardMarket.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/StandardMarketFactory.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/StandardMarketWithPriceLogger.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/StandardMarketWithPriceLoggerFactory.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/StandardToken.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/Token.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/UltimateOracle.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/UltimateOracleFactory.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/OutcomeToken.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/EtherToken.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/CentralizedOracle.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/CentralizedOracleFactory.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/CategoricalEvent.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/ScalarEvent.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/EventFactory.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/LMSRMarketMaker.json'),
    // require('@gnosis.pm/gnosis-core-contracts/build/contracts/Math.json'),
    //
    // require('./safe-contracts/build/contracts/CreateAndAddModules.json'),
    // require('./safe-contracts/build/contracts/DailyLimitModule.json'),
    // require('./safe-contracts/build/contracts/DelegateConstructorProxy.json'),
    // require('./safe-contracts/build/contracts/ERC20Token.json'),
    // require('./safe-contracts/build/contracts/Enum.json'),
    // require('./safe-contracts/build/contracts/GnosisSafe.json'),
    // require('./safe-contracts/build/contracts/GnosisSafePersonalEdition.json'),
    // require('./safe-contracts/build/contracts/GnosisSafeTeamEdition.json'),
    // require('./safe-contracts/build/contracts/MasterCopy.json'),
    // require('./safe-contracts/build/contracts/Migrations.json'),
    // require('./safe-contracts/build/contracts/Module.json'),
    // require('./safe-contracts/build/contracts/ModuleManager.json'),
    // require('./safe-contracts/build/contracts/MultiSend.json'),
    // require('./safe-contracts/build/contracts/OwnerManager.json'),
    // require('./safe-contracts/build/contracts/PayingProxy.json'),
    // require('./safe-contracts/build/contracts/Proxy.json'),
    // require('./safe-contracts/build/contracts/ProxyFactory.json'),
    // require('./safe-contracts/build/contracts/SelfAuthorized.json'),
    // require('./safe-contracts/build/contracts/SocialRecoveryModule.json'),
    // require('./safe-contracts/build/contracts/StateChannelModule.json'),
    // require('./safe-contracts/build/contracts/WhitelistModule.json'),

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
    // require('./dark-forest/ABDKMath64x64.json'),
    require('./dark-forest/LibDiamond.json'),
    require('./dark-forest/LibTrig.json'),
    require('./dark-forest/DFInitialize.json'),
    require('./dark-forest/Pairing.json'),
    require('./dark-forest/Verifier.json'),
    require('./dark-forest/DarkForest.json'),
    require('./dark-forest/DarkForest_stripped.json'),

    // require('./gnosis-safe/ISignatureValidator.json'),
    // require('./gnosis-safe/ERC721TokenReceiver.json'),
    // require('./gnosis-safe/IERC165.json'),
    // require('./gnosis-safe/Guard.json'),
    // require('./gnosis-safe/SignatureDecoder.json'),
    // require('./gnosis-safe/SecuredTokenTransfer.json'),
    // require('./gnosis-safe/ViewStorageAccessible.json'),
    // require('./gnosis-safe/CompatibilityFallbackHandler.json'),
    // require('./gnosis-safe/Executor.json'),
    // require('./gnosis-safe/ReentrancyTransactionGuard.json'),
    // require('./gnosis-safe/Token.json'),
    // require('./gnosis-safe/ModuleManager.json'),
    // require('./gnosis-safe/IProxy.json'),
    // require('./gnosis-safe/SelfAuthorized.json'),
    // require('./gnosis-safe/GnosisSafeStorage.json'),
    // require('./gnosis-safe/SignMessageLib.json'),
    // require('./gnosis-safe/GnosisSafeProxyFactory.json'),
    // require('./gnosis-safe/Migration.json'),
    // require('./gnosis-safe/Enum.json'),
    // require('./gnosis-safe/FallbackManager.json'),
    // require('./gnosis-safe/HandlerContext.json'),
    // require('./gnosis-safe/CreateCall.json'),
    // require('./gnosis-safe/DelegateCallTransactionGuard.json'),
    // require('./gnosis-safe/MultiSendCallOnly.json'),
    // require('./gnosis-safe/GnosisSafeProxy.json'),
    // require('./gnosis-safe/DefaultCallbackHandler.json'),
    // require('./gnosis-safe/GnosisSafe.json'),
    // require('./gnosis-safe/SimulateTxAccessor.json'),
    // require('./gnosis-safe/IProxyCreationCallback.json'),
    // require('./gnosis-safe/DebugTransactionGuard.json'),
    // require('./gnosis-safe/Singleton.json'),
    // require('./gnosis-safe/GuardManager.json'),
    // require('./gnosis-safe/TestHandler.json'),
    // require('./gnosis-safe/EtherPaymentFallback.json'),
    // require('./gnosis-safe/GnosisSafeL2.json'),
    // require('./gnosis-safe/GnosisSafeMath.json'),
    // require('./gnosis-safe/BaseGuard.json'),
    // require('./gnosis-safe/ISignatureValidatorConstants.json'),
    // require('./gnosis-safe/MultiSend.json'),
    // require('./gnosis-safe/OwnerManager.json'),
    // require('./gnosis-safe/StorageAccessible.json'),
    // require('./gnosis-safe/ERC20Token.json'),
    // require('./gnosis-safe/ERC1155TokenReceiver.json'),
    // require('./gnosis-safe/ERC1155Token.json'),
    // require('./gnosis-safe/ERC777TokensRecipient.json')

].map(({ abi }) => abi)

abiDecoder.addABI(uportAbi)
gnosisABIs.forEach(abi => { abiDecoder.addABI(abi) })

const func = async () => {
    var data_range = await customHttpProvider.getBlockNumber();
    // console.log(JSON.stringify(data_range));
    // data_range = 100
    let tx_list = [];
    var n = 1;
    var m = 0;
    for (var i = 21524155; i >= 20713468; i --) {
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
                })
                var writeLine = (line) => logger.write(`\n${line}`);
                writeLine(
                    JSON.stringify({
                        to: t.to,
                        from: t.from,
                        time: block.timestamp,

                        // data: JSON.stringify(decodedInst),
                        name: decodedInst.name,
                        params: decodedInst.params,

                        blockNumber: t.blockNumber,
                        type: t.type,
                        value: t.value,
                        gasPrice: t.gasPrice
                    }));
                // console.log(block.timestamp);
            }
        }
        if (m >= 10000 || i == 20713468) {
            if (m >= 100) {
                n += 1;
                m = 0;
            }
            logger.end()
        }
    }

    // get to know whether it succeeded or not

    var logger = fs.createWriteStream(n.toString() + '.txt', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })
    var writeLine = (line) => logger.write(`\n${line}`);
    writeLine("done");
}

func();

// 21524155 2022.04.08 09:34
// 20713468 the start block of Dark Forest
