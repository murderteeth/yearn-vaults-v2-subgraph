import { Address, log } from '@graphprotocol/graph-ts';
import { Vault as VaultContract } from '../../generated/Registry/Vault';
import * as vaultLibrary from '../utils/vault/vault';
import {
  StrategyReported as StrategyReported_v0_3_0_v0_3_1_Event,
  StrategyMigrated,
  StrategyReported1 as StrategyReportedEvent,
  Deposit1Call as DepositCall,
  Transfer as TransferEvent,
  Withdraw1Call as WithdrawCall,
  Deposit2Call,
  Deposit1Call,
  Withdraw1Call,
  Withdraw2Call,
  Withdraw3Call,
  StrategyAdded1 as StrategyAddedV2Event,
  UpdatePerformanceFee as UpdatePerformanceFeeEvent,
  UpdateManagementFee as UpdateManagementFeeEvent,
  StrategyAddedToQueue as StrategyAddedToQueueEvent,
  StrategyRemovedFromQueue as StrategyRemovedFromQueueEvent,
  UpdateRewards as UpdateRewardsEvent,
} from '../../generated/YvWBTCVault/Vault';
import { Strategy, Transaction, Vault } from '../../generated/schema';
import {
  fromSharesToAmount,
  isEventBlockNumberLt,
  printCallInfo,
} from '../utils/commons';
import {
  BIGINT_ZERO,
  ZERO_ADDRESS,
  YV_LINK_VAULT_END_BLOCK_CUSTOM,
  DON_T_CREATE_VAULT_TEMPLATE,
  ETH_MAINNET_REGISTRY_ADDRESS_V2,
  EXPERIMENTAL,
  API_VERSION_0_4_3,
} from '../utils/constants';
import * as strategyLibrary from '../utils/strategy/strategy';
import {
  getOrCreateTransactionFromCall,
  getOrCreateTransactionFromEvent,
} from '../utils/transaction';
import {
  UpdateDepositLimit,
  UpdateGovernance,
  UpdateGuardian,
  UpdateManagement,
  UpdateWithdrawalQueue,
} from '../../generated/YvLinkVault/Vault';

function createYvLinkVaultIfNeeded(
  vaultAddress: Address,
  transaction: Transaction
): Vault {
  return vaultLibrary.createCustomVaultIfNeeded(
    vaultAddress,
    // Note: This custom mapping is not used in Fantom. So, we can hardcoded the address.
    changetype<Address>(Address.fromHexString(ETH_MAINNET_REGISTRY_ADDRESS_V2)),
    EXPERIMENTAL,
    API_VERSION_0_4_3,
    transaction,
    DON_T_CREATE_VAULT_TEMPLATE
  );
}

/* This version of the AddStrategy event is used in vaults 0.3.2 and up */
export function handleStrategyAddedV2(event: StrategyAddedV2Event): void {
  if (
    isEventBlockNumberLt(
      'yvLinkVault_AddStrategyV2Event',
      event.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    let transaction = getOrCreateTransactionFromEvent(
      event,
      'yvLinkVault_AddStrategyV2Event'
    );
    strategyLibrary.createAndGet(
      transaction.id,
      event.params.strategy,
      event.address,
      event.params.debtRatio,
      BIGINT_ZERO,
      event.params.minDebtPerHarvest,
      event.params.maxDebtPerHarvest,
      event.params.performanceFee,
      null,
      transaction,
      BIGINT_ZERO
    );
  }
}

/**
 * We have two handlers to process the StrategyReported event due to incompatibility in both event structure.
 * This is for vault versions 0.3.0 and 0.3.1.
 * If you need 0.3.2 or superior, please see the 'handleStrategyReported' handler.
 */
export function handleStrategyReported_v0_3_0_v0_3_1(
  event: StrategyReported_v0_3_0_v0_3_1_Event
): void {
  if (
    isEventBlockNumberLt(
      'yvLinkVault_StrategyReportedEvent',
      event.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    log.info('[Vault mappings v0_3_0 and v0_3_1] Handle strategy reported', []);
    let ethTransaction = getOrCreateTransactionFromEvent(
      event,
      'yvLinkVault_StrategyReportedEvent'
    );
    let strategyReport = strategyLibrary.createReport(
      ethTransaction,
      event.params.strategy.toHexString(),
      event.params.gain,
      event.params.loss,
      event.params.totalGain,
      event.params.totalLoss,
      event.params.totalDebt,
      event.params.debtAdded,
      event.params.debtLimit,
      BIGINT_ZERO,
      event
    );

    log.info(
      '[Vault mappings] Updating price per share (strategy reported): {}',
      [event.transaction.hash.toHexString()]
    );
    let vaultContractAddress = event.address;
    let vaultContract = VaultContract.bind(vaultContractAddress);
    vaultLibrary.strategyReported(
      ethTransaction,
      strategyReport!,
      vaultContract,
      vaultContractAddress
    );
  }
}

/**
 * We have two handlers to process the StrategyReported event due to incompatibility in both event structure.
 * This is for vault versions 0.3.2 or superior.
 *
 * This version includes the new field `debtPaid` introduced in the Vault version 0.3.2.
 *
 * In case a new structure is implemented, please create a new handler.
 * If you need 0.3.0 or 0.3.1, please see the 'handleStrategyReported_v0_3_0_v0_3_1' handler.
 */
export function handleStrategyReported(event: StrategyReportedEvent): void {
  if (
    isEventBlockNumberLt(
      'yvLinkVault_StrategyReportedEvent',
      event.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    log.info('[Vault mappings] Handle strategy reported', []);
    let ethTransaction = getOrCreateTransactionFromEvent(
      event,
      'yvLinkVault_StrategyReportedEvent'
    );

    let strategyReport = strategyLibrary.createReport(
      ethTransaction,
      event.params.strategy.toHexString(),
      event.params.gain,
      event.params.loss,
      event.params.totalGain,
      event.params.totalLoss,
      event.params.totalDebt,
      event.params.debtAdded,
      event.params.debtRatio,
      event.params.debtPaid,
      event
    );

    log.info(
      '[Vault mappings] Updating price per share (strategy reported): {}',
      [event.transaction.hash.toHexString()]
    );
    let vaultContractAddress = event.address;
    let vaultContract = VaultContract.bind(vaultContractAddress);
    vaultLibrary.strategyReported(
      ethTransaction,
      strategyReport!,
      vaultContract,
      vaultContractAddress
    );
  }
}

export function handleStrategyMigrated(event: StrategyMigrated): void {
  if (
    isEventBlockNumberLt(
      'yvLinkVault_StrategyReportedEvent',
      event.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    log.info(
      '[Strategy Migrated] Handle strategy migrated event. Old strategy: {} New strategy: {}',
      [
        event.params.oldVersion.toHexString(),
        event.params.newVersion.toHexString(),
      ]
    );
    let ethTransaction = getOrCreateTransactionFromEvent(
      event,
      'yvLinkVault_StrategyMigratedEvent'
    );

    let oldStrategyAddress = event.params.oldVersion;
    let oldStrategy = Strategy.load(oldStrategyAddress.toHexString());

    if (oldStrategy !== null) {
      let newStrategyAddress = event.params.newVersion;

      if (Strategy.load(newStrategyAddress.toHexString()) !== null) {
        log.warning(
          '[yvWBTCVault Strategy Migrated] Migrating to strategy {} but it has already been created',
          [newStrategyAddress.toHexString()]
        );
      } else {
        strategyLibrary.createAndGet(
          ethTransaction.id,
          newStrategyAddress,
          event.address,
          oldStrategy.debtLimit,
          oldStrategy.rateLimit,
          oldStrategy.minDebtPerHarvest,
          oldStrategy.maxDebtPerHarvest,
          oldStrategy.performanceFeeBps,
          null,
          ethTransaction,
          oldStrategy.delegatedAssets
        );
      }
      //We can now remove the old strat from the queue
      log.info('[Strategy Migrated] Removing old strategy', [
        oldStrategyAddress.toHexString(),
      ]);

      vaultLibrary.strategyRemovedFromQueue(
        oldStrategyAddress,
        ethTransaction,
        event
      );
    }
  }
}

//  VAULT BALANCE UPDATES

export function handleDeposit(call: DepositCall): void {
  log.debug('[Vault mappings] Handle deposit', []);

  if (vaultLibrary.isVault(call.to) && vaultLibrary.isVault(call.from)) {
    log.warning(
      'yvLinkVault_Deposit () - TX {} - Call to {} and call from {} are vaults (minimal proxy). Not processing deposit tx.',
      [
        call.transaction.hash.toHexString(),
        call.to.toHexString(),
        call.from.toHexString(),
      ]
    );
    return;
  }
  if (
    isEventBlockNumberLt(
      'yvLinkVault_vault.deposit()',
      call.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    let transaction = getOrCreateTransactionFromCall(
      call,
      'yvLinkVault_vault.deposit()'
    );
    createYvLinkVaultIfNeeded(call.to, transaction);
    let vaultContract = VaultContract.bind(call.to);
    let totalAssets = vaultLibrary.getTotalAssets(call.to);
    let totalSupply = vaultContract.totalSupply();
    let sharesAmount = call.outputs.value0;
    log.info(
      '[Vault mappings] Handle deposit() shares {} - total assets {} - total supply {}',
      [sharesAmount.toString(), totalAssets.toString(), totalSupply.toString()]
    );
    let amount = fromSharesToAmount(sharesAmount, totalAssets, totalSupply);
    log.info('[Vault mappings] Handle deposit() shares {} - amount {}', [
      sharesAmount.toString(),
      amount.toString(),
    ]);
    vaultLibrary.deposit(
      call.to,
      transaction,
      call.from,
      amount,
      call.outputs.value0,
      call.block.timestamp
    );
  }
}

export function handleDepositWithAmount(call: Deposit1Call): void {
  log.debug('[Vault mappings] Handle deposit with amount', []);
  if (vaultLibrary.isVault(call.to) && vaultLibrary.isVault(call.from)) {
    log.warning(
      'yvLinkVault_Deposit (amount) - TX {} - Call to {} and call from {} are vaults (minimal proxy). Not processing deposit tx.',
      [
        call.transaction.hash.toHexString(),
        call.to.toHexString(),
        call.from.toHexString(),
      ]
    );
    return;
  }
  if (
    isEventBlockNumberLt(
      'yvLinkVault_vault.deposit(uint)',
      call.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    /*
      As this vault (yvWBTCVault -0xA696a63cc78DfFa1a63E9E50587C197387FF6C7E-) was added in the registry at block #12341475 https://etherscan.io/tx/0xb48353d6eb05fee387dff781ce113d65a78603b521e9a76cb3458024afd99eb7, this is a work around to don't get an error (registry null in the vault entity).
    */
    // Registry 0x50c1a2eA0a861A967D9d0FFE2AE4012c2E053804
    // registry.vaults(0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599, 1) => 0xA696a63cc78DfFa1a63E9E50587C197387FF6C7E
    let transaction = getOrCreateTransactionFromCall(
      call,
      'yvLinkVault_vault.deposit(uint)'
    );
    createYvLinkVaultIfNeeded(call.to, transaction);
    vaultLibrary.deposit(
      call.to, // Vault Address
      transaction,
      call.from,
      call.inputs._amount,
      call.outputs.value0,
      call.block.timestamp
    );
  }
}

export function handleDepositWithAmountAndRecipient(call: Deposit2Call): void {
  log.debug('[Vault mappings] Handle deposit with amount and recipient', []);
  if (vaultLibrary.isVault(call.to) && vaultLibrary.isVault(call.from)) {
    log.warning(
      'yvLinkVault_Deposit (amount,recipient) - TX {} - Call to {} and call from {} are vaults (minimal proxy). Not processing deposit tx.',
      [
        call.transaction.hash.toHexString(),
        call.to.toHexString(),
        call.from.toHexString(),
      ]
    );
    return;
  }

  if (
    isEventBlockNumberLt(
      'yvLinkVault_vault.deposit(uint,address)',
      call.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    let transaction = getOrCreateTransactionFromCall(
      call,
      'yvLinkVault_vault.deposit(uint,address)'
    );
    createYvLinkVaultIfNeeded(call.to, transaction);
    log.info(
      '[Vault mappings] Handle deposit(amount, recipient): TX: {} Vault address {} Amount: {} Recipient: {} From: {}',
      [
        call.transaction.hash.toHexString(),
        call.to.toHexString(),
        call.inputs._amount.toString(),
        call.inputs._recipient.toHexString(),
        call.from.toHexString(),
      ]
    );

    let blockNumber = call.block.number.toString();
    let txHash = call.transaction.hash.toHexString();
    log.info('TXDeposit {} block {} call.input.recipient {}', [
      txHash,
      blockNumber,
      call.inputs._recipient.toHexString(),
    ]);
    printCallInfo('TXDeposit', call);
    vaultLibrary.deposit(
      call.to, // Vault Address
      transaction,
      call.inputs._recipient, // Recipient
      call.inputs._amount,
      call.outputs.value0,
      call.block.timestamp
    );
  }
}

export function handleWithdraw(call: WithdrawCall): void {
  log.info('[Vault mappings] Handle withdraw. TX hash: {}', [
    call.transaction.hash.toHexString(),
  ]);
  if (vaultLibrary.isVault(call.to) && vaultLibrary.isVault(call.from)) {
    log.warning(
      'yvLinkVault_Withdraw (shares) - TX {} - Call to {} and call from {} are vaults (minimal proxy). Not processing withdraw tx.',
      [
        call.transaction.hash.toHexString(),
        call.to.toHexString(),
        call.from.toHexString(),
      ]
    );
    return;
  }
  if (
    isEventBlockNumberLt(
      'yvLinkVault_vault.withdraw()',
      call.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    let transaction = getOrCreateTransactionFromCall(
      call,
      'yvLinkVault_vault.withdraw()'
    );
    log.info('[Vault mappings] Handle withdraw(): Vault address {}', [
      call.to.toHexString(),
    ]);

    let vaultContract = VaultContract.bind(call.to);

    let withdrawnAmount = call.outputs.value0;
    let totalAssets = vaultLibrary.getTotalAssets(call.to);
    let totalSupply = vaultContract.totalSupply();
    let totalSharesBurnt = totalAssets.equals(BIGINT_ZERO)
      ? withdrawnAmount
      : withdrawnAmount.times(totalSupply).div(totalAssets);

    vaultLibrary.withdraw(
      call.to,
      call.from,
      withdrawnAmount,
      totalSharesBurnt,
      transaction,
      call.block.timestamp
    );
  }
}

export function handleWithdrawWithShares(call: Withdraw1Call): void {
  log.info('[Vault mappings] Handle withdraw with shares. TX hash: {}', [
    call.transaction.hash.toHexString(),
  ]);
  if (vaultLibrary.isVault(call.to) && vaultLibrary.isVault(call.from)) {
    log.warning(
      'yvLinkVault_Withdraw (shares) - TX {} - Call to {} and call from {} are vaults (minimal proxy). Not processing withdraw tx.',
      [
        call.transaction.hash.toHexString(),
        call.to.toHexString(),
        call.from.toHexString(),
      ]
    );
    return;
  }
  if (
    isEventBlockNumberLt(
      'yvLinkVault_vault.withdraw(uint256)',
      call.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    let transaction = getOrCreateTransactionFromCall(
      call,
      'yvLinkVault_vault.withdraw(uint256)'
    );
    log.info('[Vault mappings] Handle withdraw(shares): Vault address {}', [
      call.to.toHexString(),
    ]);

    vaultLibrary.withdraw(
      call.to,
      call.from,
      call.outputs.value0,
      call.inputs._shares,
      transaction,
      call.block.timestamp
    );
  }
}

export function handleWithdrawWithSharesAndRecipient(
  call: Withdraw2Call
): void {
  log.info(
    '[Vault mappings] Handle withdraw with shares and recipient. TX hash: {}',
    [call.transaction.hash.toHexString()]
  );
  if (vaultLibrary.isVault(call.to) && vaultLibrary.isVault(call.from)) {
    log.warning(
      'yvLinkVault_Withdraw (shares,recipient) - TX {} - Call to {} and call from {} are vaults (minimal proxy). Not processing withdraw tx.',
      [
        call.transaction.hash.toHexString(),
        call.to.toHexString(),
        call.from.toHexString(),
        call.inputs._recipient.toHexString(),
      ]
    );
    return;
  }
  if (
    isEventBlockNumberLt(
      'yvLinkVault_vault.withdraw(uint256,address)',
      call.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    let transaction = getOrCreateTransactionFromCall(
      call,
      'yvLinkVault_vault.withdraw(uint256,address)'
    );
    log.info(
      '[Vault mappings] Handle withdraw(shares, recipient): TX: {} Vault address {} Shares: {} Recipient: {} From: {}',
      [
        call.transaction.hash.toHexString(),
        call.to.toHexString(),
        call.inputs._shares.toString(),
        call.inputs._recipient.toHexString(),
        call.from.toHexString(),
      ]
    );

    let blockNumber = call.block.number.toString();
    let txHash = call.transaction.hash.toHexString();
    log.info('TXWithdraw {} block {} call.input.recipient {}', [
      txHash,
      blockNumber,
      call.inputs._recipient.toHexString(),
    ]);
    printCallInfo('TXWithdraw', call);
    vaultLibrary.withdraw(
      call.to, // Vault Address
      call.from, // From
      call.outputs.value0,
      call.inputs._shares,
      transaction,
      call.block.timestamp
    );
  }
}

export function handleWithdrawWithSharesAndRecipientAndMaxLoss(
  call: Withdraw3Call
): void {
  log.info(
    '[Vault mappings] Handle withdraw with shares, recipient and max loss. TX hash: {}',
    [call.transaction.hash.toHexString()]
  );
  if (vaultLibrary.isVault(call.to) && vaultLibrary.isVault(call.from)) {
    log.warning(
      'yvLinkVault_Withdraw (shares,recipient,maxLoss) - TX {} - Call to {} and call from {} are vaults (minimal proxy). Not processing withdraw tx.',
      [
        call.transaction.hash.toHexString(),
        call.to.toHexString(),
        call.from.toHexString(),
        call.inputs.recipient.toHexString(),
      ]
    );
    return;
  }
  if (
    isEventBlockNumberLt(
      'yvLinkVault_vault.withdraw(uint256,address,uint256)',
      call.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    let transaction = getOrCreateTransactionFromCall(
      call,
      'yvLinkVault_vault.withdraw(uint256,address,uint256)'
    );
    log.info(
      '[Vault mappings] Handle withdraw(shares, recipient, maxLoss): Vault address {}',
      [call.to.toHexString()]
    );
    log.info(
      'vault.withdraw(uint256,address,maxLoss) WITHDRAW TEST TX Hash {} From {} To {} recipient {}',
      [
        call.transaction.hash.toHexString(),
        call.from.toHexString(),
        call.to.toHexString(),
        call.inputs.recipient.toHexString(),
      ]
    );

    vaultLibrary.withdraw(
      call.to,
      call.from, // From
      call.outputs.value0,
      call.inputs.maxShares,
      transaction,
      call.block.timestamp
    );
  }
}

export function handleTransfer(event: TransferEvent): void {
  log.info('[Vault mappings] Handle transfer: From: {} - To: {}. TX hash: {}', [
    event.params.sender.toHexString(),
    event.params.receiver.toHexString(),
    event.transaction.hash.toHexString(),
  ]);

  if (
    isEventBlockNumberLt(
      'yvLinkVault_vault.transfer(address,uint256)',
      event.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    if (
      event.params.sender.toHexString() != ZERO_ADDRESS &&
      event.params.receiver.toHexString() != ZERO_ADDRESS
    ) {
      log.info(
        '[Vault mappings] Processing transfer: From: {} - To: {}. TX hash: {}',
        [
          event.params.sender.toHexString(),
          event.params.receiver.toHexString(),
          event.transaction.hash.toHexString(),
        ]
      );
      let transaction = getOrCreateTransactionFromEvent(
        event,
        'yvLinkVault_vault.transfer(address,uint256)'
      );
      createYvLinkVaultIfNeeded(event.address, transaction);
      let vaultContract = VaultContract.bind(event.address);
      let totalAssets = vaultLibrary.getTotalAssets(event.address);
      let totalSupply = vaultContract.totalSupply();
      let sharesAmount = event.params.value;
      let amount = fromSharesToAmount(sharesAmount, totalAssets, totalSupply);
      // share  = (amount * totalSupply) / totalAssets
      // amount = (shares * totalAssets) / totalSupply
      vaultLibrary.transfer(
        vaultContract,
        event.params.sender,
        event.params.receiver,
        amount,
        vaultContract.token(),
        sharesAmount,
        event.address,
        transaction
      );
    } else {
      log.info(
        '[Vault mappings] Not processing transfer: From: {} - To: {}. TX hash: {}',
        [
          event.params.sender.toHexString(),
          event.params.receiver.toHexString(),
          event.transaction.hash.toHexString(),
        ]
      );
    }
  }
}

export function handleUpdatePerformanceFee(
  event: UpdatePerformanceFeeEvent
): void {
  if (
    isEventBlockNumberLt(
      'yvLinkVault_UpdatePerformanceFee',
      event.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    let ethTransaction = getOrCreateTransactionFromEvent(
      event,
      'yvLinkVault_UpdatePerformanceFee'
    );
    createYvLinkVaultIfNeeded(event.address, ethTransaction);

    let vaultContract = VaultContract.bind(event.address);

    vaultLibrary.performanceFeeUpdated(
      event.address,
      ethTransaction,
      vaultContract,
      event.params.performanceFee
    );
  }
}

export function handleUpdateManagementFee(
  event: UpdateManagementFeeEvent
): void {
  if (
    isEventBlockNumberLt(
      'yvLinkVault_UpdateManagementFee',
      event.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    let ethTransaction = getOrCreateTransactionFromEvent(
      event,
      'yvLinkVault_UpdateManagementFee'
    );
    createYvLinkVaultIfNeeded(event.address, ethTransaction);

    let vaultContract = VaultContract.bind(event.address);

    vaultLibrary.managementFeeUpdated(
      event.address,
      ethTransaction,
      vaultContract,
      event.params.managementFee
    );
  }
}

export function handleStrategyAddedToQueue(
  event: StrategyAddedToQueueEvent
): void {
  if (
    isEventBlockNumberLt(
      'yvLinkVault_StrategyAddedToQueue',
      event.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    let ethTransaction = getOrCreateTransactionFromEvent(
      event,
      'yvLinkVault_StrategyAddedToQueue'
    );

    vaultLibrary.strategyAddedToQueue(
      event.params.strategy,
      ethTransaction,
      event
    );
  }
}

export function handleUpdateWithdrawalQueue(
  event: UpdateWithdrawalQueue
): void {
  if (
    isEventBlockNumberLt(
      'yvLinkVault_UpdateWithdrawalQueue',
      event.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    let ethTransaction = getOrCreateTransactionFromEvent(
      event,
      'yvLinkVault_UpdateWithdrawalQueue'
    );

    vaultLibrary.UpdateWithdrawalQueue(
      event.params.queue,
      ethTransaction,
      event
    );
  }
}

export function handleStrategyRemovedFromQueue(
  event: StrategyRemovedFromQueueEvent
): void {
  if (
    isEventBlockNumberLt(
      'yvLinkVault_StrategyRemovedFromQueue',
      event.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    let ethTransaction = getOrCreateTransactionFromEvent(
      event,
      'yvLinkVault_StrategyRemovedFromQueue'
    );
    vaultLibrary.strategyRemovedFromQueue(
      event.params.strategy,
      ethTransaction,
      event
    );
  }
}

export function handleUpdateRewards(event: UpdateRewardsEvent): void {
  if (
    isEventBlockNumberLt(
      'yvLinkVault_UpdateRewardsEvent',
      event.block,
      YV_LINK_VAULT_END_BLOCK_CUSTOM
    )
  ) {
    let ethTransaction = getOrCreateTransactionFromEvent(
      event,
      'yvLinkVault_UpdateRewardsEvent'
    );

    let vaultContract = VaultContract.bind(event.address);

    vaultLibrary.handleUpdateRewards(
      event.address,
      vaultContract,
      event.params.rewards,
      ethTransaction
    );
  }
}

export function handleUpdateGuardian(event: UpdateGuardian): void {
  let ethTransaction = getOrCreateTransactionFromEvent(event, 'UpdateGuardian');

  vaultLibrary.handleUpdateGuardian(
    event.address,
    event.params.guardian,
    ethTransaction
  );
}

export function handleUpdateManagement(event: UpdateManagement): void {
  let ethTransaction = getOrCreateTransactionFromEvent(
    event,
    'UpdateManagement'
  );

  vaultLibrary.handleUpdateManagement(
    event.address,
    event.params.management,
    ethTransaction
  );
}

export function handleUpdateGovernance(event: UpdateGovernance): void {
  let ethTransaction = getOrCreateTransactionFromEvent(
    event,
    'UpdateGovernance'
  );

  vaultLibrary.handleUpdateGovernance(
    event.address,
    event.params.governance,
    ethTransaction
  );
}

export function handleUpdateDepositLimit(event: UpdateDepositLimit): void {
  let ethTransaction = getOrCreateTransactionFromEvent(
    event,
    'UpdateDepositLimit'
  );

  vaultLibrary.handleUpdateDepositLimit(
    event.address,
    event.params.depositLimit,
    ethTransaction
  );
}
