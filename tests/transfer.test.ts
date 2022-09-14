import {
  assert,
  clearStore,
  createMockedFunction,
  log,
  test,
} from 'matchstick-as/assembly/index';
import { CreateVaultTransition } from './transitionMocks/createVaultTransition';
import { defaults } from './default';
import { CreateStrategyTransition } from './transitionMocks/createStrategyTransition';
import {
  Account,
  Strategy,
  Token,
  Transaction,
  Vault,
} from '../generated/schema';
import {
  buildIdFromAccountToAccountAndTransaction,
  getOrCreate,
} from '../src/utils/transfer';
import {
  BurnERC20Transition,
  MintERC20Transition,
  TransferERC20Transition,
} from './transitionMocks/ERC20Transition';
import {
  recognizeStrategyFees,
  recognizeTreasuryFees,
} from '../src/utils/token-fees';
import { transfer } from '../src/utils/account/vault-position-update';
import { Strategy as StrategyContract } from '../generated/templates/Vault/Strategy';
import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { ZERO_ADDRESS } from '../src/utils/constants';
class FeeTestInfo {
  vaultAddress: string;
  transferId: string;
  paymentAmount: string;
}

function prepareFeeTest(
  feeReceiver: string,
  strategist: string,
  treasury: string
): FeeTestInfo {
  clearStore();
  let beneficiary = defaults.senderAddress; // not really used in test, we just need assets in the vault
  let vaultAssets = '1000000000000000000';
  let vault = CreateVaultTransition.DefaultVaultWithDepositedBalance(
    vaultAssets,
    beneficiary
  );
  // overwrite the treasury address
  vault.stub.rewardsAddress = treasury;

  let vaultAddress = vault.stub.shareToken.address;

  let strategy = CreateStrategyTransition.DefaultStrategy(vault.stub);
  // overwrite the strategist address
  strategy.stub.strategist = strategist;
  let paymentAmount = '1000000000000000000';

  // mint fee shares
  let feeMint = new MintERC20Transition(
    vaultAddress,
    paymentAmount,
    vault.stub.shareToken,
    false // skipTransferHandler
  );

  //transfer the fees
  let feeTransfer = new TransferERC20Transition(
    vaultAddress,
    feeReceiver,
    paymentAmount,
    feeMint.postTransitionStub,
    false // skipTransferHandler
  );

  let paymentTxn = feeTransfer.mockEvent.transaction;
  let transferId = buildIdFromAccountToAccountAndTransaction(
    Account.load(vaultAddress)!,
    Account.load(feeReceiver)!,
    Transaction.load(
      paymentTxn.txnHash.concat('-').concat(paymentTxn.logIndex)
    )!
  );

  return {
    vaultAddress: vaultAddress,
    transferId: transferId,
    paymentAmount: paymentAmount,
  };
}

test('Test handleTransfer properly updates delegatedAssets', () => {
  let senderAddress = defaults.senderAddress;
  let vaultAssets = '1000000000000000000';
  let paymentAmount = '1000000000000000000';

  // create vault with shares for beneficiary
  let vault = CreateVaultTransition.DefaultVaultWithDepositedBalance(
    vaultAssets,
    senderAddress
  );

  // create strategy for vault
  let strategy = CreateStrategyTransition.DefaultStrategy(vault.stub);
  strategy.stub.delegatedAssets = BigInt.fromString('20');

  // simulate burn fee shares during withdraw
  new TransferERC20Transition(
    senderAddress,
    defaults.anotherAddress,
    paymentAmount,
    vault.stub.shareToken,
    false // skipTransferHandler
  );

  assert.fieldEquals(
    'Strategy',
    strategy.stub.address,
    'delegatedAssets',
    '20'
  );
});

/* We need to disable TokenFee tests until the strategy.strategist field is implemented and kept up to date. See TokenFee.ts */
/*
test('Test handleTransfer properly identifies Strategist fees', () => {
  let treasuryAddress = defaults.treasuryAddress;
  let strategistAddress = defaults.strategistAddress;
  let testInfo = prepareFeeTest(
    strategistAddress,
    strategistAddress,
    treasuryAddress
  );

  assert.fieldEquals(
    'Transfer',
    testInfo.transferId,
    'id',
    testInfo.transferId
  );
  assert.fieldEquals(
    'Transfer',
    testInfo.transferId,
    'shareAmount',
    testInfo.paymentAmount
  );
  assert.fieldEquals(
    'Transfer',
    testInfo.transferId,
    'isFeeToTreasury',
    'false'
  );
  assert.fieldEquals(
    'Transfer',
    testInfo.transferId,
    'isFeeToStrategy',
    'true'
  );

  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'unrecognizedStrategyFees',
    testInfo.paymentAmount
  );
  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'totalTreasuryFees',
    '0'
  );
  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'totalStrategyFees',
    '0'
  );
  assert.fieldEquals('TokenFee', testInfo.vaultAddress, 'totalFees', '0');
  let v = Vault.load(testInfo.vaultAddress);
  recognizeStrategyFees(v!);

  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'unrecognizedStrategyFees',
    '0'
  );
  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'totalTreasuryFees',
    '0'
  );
  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'totalStrategyFees',
    testInfo.paymentAmount
  );
  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'totalFees',
    testInfo.paymentAmount
  );
});
*/

test('Test handleTransfer properly identifies Treasury fees', () => {
  let treasuryAddress = defaults.treasuryAddress;
  let strategistAddress = defaults.strategistAddress;
  let testInfo = prepareFeeTest(
    treasuryAddress,
    strategistAddress,
    treasuryAddress
  );

  assert.fieldEquals(
    'Transfer',
    testInfo.transferId,
    'id',
    testInfo.transferId
  );
  assert.fieldEquals(
    'Transfer',
    testInfo.transferId,
    'shareAmount',
    testInfo.paymentAmount
  );
  assert.fieldEquals(
    'Transfer',
    testInfo.transferId,
    'isFeeToTreasury',
    'true'
  );
  assert.fieldEquals(
    'Transfer',
    testInfo.transferId,
    'isFeeToStrategy',
    'false'
  );

  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'unrecognizedStrategyFees',
    '0'
  );
  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'unrecognizedTreasuryFees',
    testInfo.paymentAmount
  );
  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'totalTreasuryFees',
    '0'
  );
  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'totalStrategyFees',
    '0'
  );
  assert.fieldEquals('TokenFee', testInfo.vaultAddress, 'totalFees', '0');
  let v = Vault.load(testInfo.vaultAddress);
  recognizeTreasuryFees(v!);

  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'unrecognizedStrategyFees',
    '0'
  );
  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'unrecognizedTreasuryFees',
    '0'
  );
  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'totalTreasuryFees',
    testInfo.paymentAmount
  );
  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'totalStrategyFees',
    '0'
  );
  assert.fieldEquals(
    'TokenFee',
    testInfo.vaultAddress,
    'totalFees',
    testInfo.paymentAmount
  );
});
