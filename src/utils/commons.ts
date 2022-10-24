import {
  BigInt,
  ethereum,
  Bytes,
  Address,
  log,
  dataSource,
} from '@graphprotocol/graph-ts';
import { Transaction } from '../../generated/schema';
import { BIGINT_ZERO } from './constants';

export function getTimeInMillis(time: BigInt): BigInt {
  return time.times(BigInt.fromI32(1000));
}

export function getTimestampInMillis(block: ethereum.Block): BigInt {
  return block.timestamp.times(BigInt.fromI32(1000));
}

export function buildIdFromVaultIdAndTransaction(
  id: string,
  tx: ethereum.Transaction
): string {
  return id
    .concat('-')
    .concat(tx.hash.toHexString())
    .concat('-')
    .concat(tx.index.toString());
}

// make a derived ID from transaction hash and big number
export function buildId(tx: Bytes, n: BigInt): string {
  return tx.toHexString().concat('-').concat(n.toString());
}

export function buildIdFromEvent(event: ethereum.Event): string {
  return buildId(event.transaction.hash, event.logIndex);
}

export function buildIdFromTransaction(transaction: Transaction): string {
  return buildId(transaction.hash, transaction.logIndex);
}

export function buildBlockId(block: ethereum.Block): string {
  return (
    block.hash.toHex() +
    '-' +
    block.number.toString() +
    '-' +
    block.timestamp.toString()
  );
}

export function buildUpdateId(address: Address, tx: Bytes, n: BigInt): string {
  return address
    .toHexString()
    .concat('-')
    .concat(tx.toHexString().concat('-').concat(n.toString()));
}

export function printCallInfo(label: string, call: ethereum.Call): void {
  let blockNumber = call.block.number.toString();
  let txHash = call.transaction.hash.toHexString();
  log.info('{} {} block {} call.to {}', [
    label,
    txHash,
    blockNumber,
    call.to.toHexString(),
  ]);
  log.info('{} {} block {} call.from {}', [
    label,
    txHash,
    blockNumber,
    call.from.toHexString(),
  ]);
  log.info('{} {} block {} call.transaction.from {}', [
    label,
    txHash,
    blockNumber,
    call.transaction.from.toHexString(),
  ]);
  log.info('{} {} block {} call.transaction.to {}', [
    label,
    txHash,
    blockNumber,
    call.transaction.to!.toHexString(),
  ]);
  log.info('{} {} block {} dataSource.address {}', [
    label,
    txHash,
    blockNumber,
    dataSource.address().toHexString(),
  ]);
}

export function isEventBlockNumberLt(
  label: string,
  block: ethereum.Block,
  maxBlock: BigInt
): boolean {
  log.info('{} - Checking max block. Current block {} <> Max block {}', [
    label,
    block.number.toString(),
    maxBlock.toString(),
  ]);
  let isEventBlockNumberLt = block.number.lt(maxBlock);
  if (!isEventBlockNumberLt) {
    log.debug('{} - Not processing tx on block {}. Max block {}', [
      label,
      block.number.toString(),
      maxBlock.toString(),
    ]);
  }
  return isEventBlockNumberLt;
}

export function booleanToString(value: boolean): string {
  return value ? 'true' : 'false';
}

//Normaly i would use Array.filter for this but since AS does not supports closures i implemented this function
//Returns the pointer to an new array without the specified element
export function removeElementFromArray<T>(arr: Array<T>, e: T): Array<T> {
  let newArr = new Array<T>();
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    if (current == e) {
      continue;
    }
    newArr.push(current);
  }
  return newArr;
}

// amount = (shares * totalAssets) / totalSupply
export function fromSharesToAmount(
  sharesAmount: BigInt,
  totalAssets: BigInt,
  totalSupply: BigInt
): BigInt {
  if (totalSupply.isZero()) {
    return BIGINT_ZERO;
  }
  return sharesAmount.times(totalAssets).div(totalSupply);
}

// share  = (amount * totalSupply) / totalAssets
export function fromAmountToShares(
  amount: BigInt,
  totalAssets: BigInt,
  totalSupply: BigInt
): BigInt {
  if (totalAssets.isZero()) {
    return BIGINT_ZERO;
  }
  return amount.times(totalSupply).div(totalAssets);
}
