// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class VaultUpdate extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save VaultUpdate entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save VaultUpdate entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("VaultUpdate", id.toString(), this);
  }

  static load(id: string): VaultUpdate | null {
    return store.get("VaultUpdate", id) as VaultUpdate | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }

  get deposits(): BigInt {
    let value = this.get("deposits");
    return value.toBigInt();
  }

  set deposits(value: BigInt) {
    this.set("deposits", Value.fromBigInt(value));
  }

  get withdrawals(): BigInt {
    let value = this.get("withdrawals");
    return value.toBigInt();
  }

  set withdrawals(value: BigInt) {
    this.set("withdrawals", Value.fromBigInt(value));
  }

  get shareBalance(): BigInt {
    let value = this.get("shareBalance");
    return value.toBigInt();
  }

  set shareBalance(value: BigInt) {
    this.set("shareBalance", Value.fromBigInt(value));
  }

  get sharesMinted(): BigInt {
    let value = this.get("sharesMinted");
    return value.toBigInt();
  }

  set sharesMinted(value: BigInt) {
    this.set("sharesMinted", Value.fromBigInt(value));
  }

  get sharesBurnt(): BigInt {
    let value = this.get("sharesBurnt");
    return value.toBigInt();
  }

  set sharesBurnt(value: BigInt) {
    this.set("sharesBurnt", Value.fromBigInt(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get pricePerFullShare(): BigInt {
    let value = this.get("pricePerFullShare");
    return value.toBigInt();
  }

  set pricePerFullShare(value: BigInt) {
    this.set("pricePerFullShare", Value.fromBigInt(value));
  }

  get earnings(): BigInt {
    let value = this.get("earnings");
    return value.toBigInt();
  }

  set earnings(value: BigInt) {
    this.set("earnings", Value.fromBigInt(value));
  }

  get withdrawalFees(): BigInt {
    let value = this.get("withdrawalFees");
    return value.toBigInt();
  }

  set withdrawalFees(value: BigInt) {
    this.set("withdrawalFees", Value.fromBigInt(value));
  }

  get performanceFees(): BigInt {
    let value = this.get("performanceFees");
    return value.toBigInt();
  }

  set performanceFees(value: BigInt) {
    this.set("performanceFees", Value.fromBigInt(value));
  }
}

export class AccountUpdate extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save AccountUpdate entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save AccountUpdate entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("AccountUpdate", id.toString(), this);
  }

  static load(id: string): AccountUpdate | null {
    return store.get("AccountUpdate", id) as AccountUpdate | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }

  get deposits(): BigInt {
    let value = this.get("deposits");
    return value.toBigInt();
  }

  set deposits(value: BigInt) {
    this.set("deposits", Value.fromBigInt(value));
  }

  get withdrawals(): BigInt {
    let value = this.get("withdrawals");
    return value.toBigInt();
  }

  set withdrawals(value: BigInt) {
    this.set("withdrawals", Value.fromBigInt(value));
  }

  get shareBalance(): BigInt {
    let value = this.get("shareBalance");
    return value.toBigInt();
  }

  set shareBalance(value: BigInt) {
    this.set("shareBalance", Value.fromBigInt(value));
  }

  get sharesMinted(): BigInt {
    let value = this.get("sharesMinted");
    return value.toBigInt();
  }

  set sharesMinted(value: BigInt) {
    this.set("sharesMinted", Value.fromBigInt(value));
  }

  get sharesBurnt(): BigInt {
    let value = this.get("sharesBurnt");
    return value.toBigInt();
  }

  set sharesBurnt(value: BigInt) {
    this.set("sharesBurnt", Value.fromBigInt(value));
  }

  get account(): string {
    let value = this.get("account");
    return value.toString();
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get sent(): BigInt {
    let value = this.get("sent");
    return value.toBigInt();
  }

  set sent(value: BigInt) {
    this.set("sent", Value.fromBigInt(value));
  }

  get received(): BigInt {
    let value = this.get("received");
    return value.toBigInt();
  }

  set received(value: BigInt) {
    this.set("received", Value.fromBigInt(value));
  }

  get sharesSent(): BigInt {
    let value = this.get("sharesSent");
    return value.toBigInt();
  }

  set sharesSent(value: BigInt) {
    this.set("sharesSent", Value.fromBigInt(value));
  }

  get sharesReceived(): BigInt {
    let value = this.get("sharesReceived");
    return value.toBigInt();
  }

  set sharesReceived(value: BigInt) {
    this.set("sharesReceived", Value.fromBigInt(value));
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Account entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Account entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Account", id.toString(), this);
  }

  static load(id: string): Account | null {
    return store.get("Account", id) as Account | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class AccountVaultBalance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save AccountVaultBalance entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save AccountVaultBalance entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("AccountVaultBalance", id.toString(), this);
  }

  static load(id: string): AccountVaultBalance | null {
    return store.get("AccountVaultBalance", id) as AccountVaultBalance | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    return value.toString();
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get shareToken(): string {
    let value = this.get("shareToken");
    return value.toString();
  }

  set shareToken(value: string) {
    this.set("shareToken", Value.fromString(value));
  }

  get accountUpdates(): Array<string> {
    let value = this.get("accountUpdates");
    return value.toStringArray();
  }

  set accountUpdates(value: Array<string>) {
    this.set("accountUpdates", Value.fromStringArray(value));
  }
}

export class Transfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Transfer entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Transfer entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Transfer", id.toString(), this);
  }

  static load(id: string): Transfer | null {
    return store.get("Transfer", id) as Transfer | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from(): string {
    let value = this.get("from");
    return value.toString();
  }

  set from(value: string) {
    this.set("from", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }

  get shares(): BigInt {
    let value = this.get("shares");
    return value.toBigInt();
  }

  set shares(value: BigInt) {
    this.set("shares", Value.fromBigInt(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }
}

export class Operation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Operation entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Operation entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Operation", id.toString(), this);
  }

  static load(id: string): Operation | null {
    return store.get("Operation", id) as Operation | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    return value.toString();
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get shares(): BigInt {
    let value = this.get("shares");
    return value.toBigInt();
  }

  set shares(value: BigInt) {
    this.set("shares", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get type(): string {
    let value = this.get("type");
    return value.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }
}

export class EthTransaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save EthTransaction entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save EthTransaction entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("EthTransaction", id.toString(), this);
  }

  static load(id: string): EthTransaction | null {
    return store.get("EthTransaction", id) as EthTransaction | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get event(): string {
    let value = this.get("event");
    return value.toString();
  }

  set event(value: string) {
    this.set("event", Value.fromString(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value.toBytes();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get gasPrice(): BigInt {
    let value = this.get("gasPrice");
    return value.toBigInt();
  }

  set gasPrice(value: BigInt) {
    this.set("gasPrice", Value.fromBigInt(value));
  }

  get gasSent(): BigInt {
    let value = this.get("gasSent");
    return value.toBigInt();
  }

  set gasSent(value: BigInt) {
    this.set("gasSent", Value.fromBigInt(value));
  }

  get hash(): Bytes {
    let value = this.get("hash");
    return value.toBytes();
  }

  set hash(value: Bytes) {
    this.set("hash", Value.fromBytes(value));
  }

  get index(): BigInt {
    let value = this.get("index");
    return value.toBigInt();
  }

  set index(value: BigInt) {
    this.set("index", Value.fromBigInt(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get contract(): Bytes {
    let value = this.get("contract");
    return value.toBytes();
  }

  set contract(value: Bytes) {
    this.set("contract", Value.fromBytes(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get gasLimit(): BigInt {
    let value = this.get("gasLimit");
    return value.toBigInt();
  }

  set gasLimit(value: BigInt) {
    this.set("gasLimit", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Token entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Token entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Token", id.toString(), this);
  }

  static load(id: string): Token | null {
    return store.get("Token", id) as Token | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get decimals(): i32 {
    let value = this.get("decimals");
    return value.toI32();
  }

  set decimals(value: i32) {
    this.set("decimals", Value.fromI32(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }
}

export class Vault extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Vault entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Vault entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Vault", id.toString(), this);
  }

  static load(id: string): Vault | null {
    return store.get("Vault", id) as Vault | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get status(): string {
    let value = this.get("status");
    return value.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }

  get shareToken(): string {
    let value = this.get("shareToken");
    return value.toString();
  }

  set shareToken(value: string) {
    this.set("shareToken", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get apiVersion(): string {
    let value = this.get("apiVersion");
    return value.toString();
  }

  set apiVersion(value: string) {
    this.set("apiVersion", Value.fromString(value));
  }

  get deploymentId(): BigInt {
    let value = this.get("deploymentId");
    return value.toBigInt();
  }

  set deploymentId(value: BigInt) {
    this.set("deploymentId", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get activation(): BigInt {
    let value = this.get("activation");
    return value.toBigInt();
  }

  set activation(value: BigInt) {
    this.set("activation", Value.fromBigInt(value));
  }

  get strategies(): Array<string> {
    let value = this.get("strategies");
    return value.toStringArray();
  }

  set strategies(value: Array<string>) {
    this.set("strategies", Value.fromStringArray(value));
  }

  get vaultUpdates(): Array<string | null> {
    let value = this.get("vaultUpdates");
    return value.toStringArray();
  }

  set vaultUpdates(value: Array<string | null>) {
    this.set("vaultUpdates", Value.fromStringArray(value));
  }
}

export class Strategy extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Strategy entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Strategy entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Strategy", id.toString(), this);
  }

  static load(id: string): Strategy | null {
    return store.get("Strategy", id) as Strategy | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get debtLimit(): BigInt {
    let value = this.get("debtLimit");
    return value.toBigInt();
  }

  set debtLimit(value: BigInt) {
    this.set("debtLimit", Value.fromBigInt(value));
  }

  get rateLimit(): BigInt {
    let value = this.get("rateLimit");
    return value.toBigInt();
  }

  set rateLimit(value: BigInt) {
    this.set("rateLimit", Value.fromBigInt(value));
  }

  get performanceFee(): BigInt {
    let value = this.get("performanceFee");
    return value.toBigInt();
  }

  set performanceFee(value: BigInt) {
    this.set("performanceFee", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get reports(): Array<string> {
    let value = this.get("reports");
    return value.toStringArray();
  }

  set reports(value: Array<string>) {
    this.set("reports", Value.fromStringArray(value));
  }

  get harvests(): Array<string> {
    let value = this.get("harvests");
    return value.toStringArray();
  }

  set harvests(value: Array<string>) {
    this.set("harvests", Value.fromStringArray(value));
  }
}

export class StrategyReport extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save StrategyReport entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save StrategyReport entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("StrategyReport", id.toString(), this);
  }

  static load(id: string): StrategyReport | null {
    return store.get("StrategyReport", id) as StrategyReport | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get strategy(): string {
    let value = this.get("strategy");
    return value.toString();
  }

  set strategy(value: string) {
    this.set("strategy", Value.fromString(value));
  }

  get gain(): BigInt {
    let value = this.get("gain");
    return value.toBigInt();
  }

  set gain(value: BigInt) {
    this.set("gain", Value.fromBigInt(value));
  }

  get loss(): BigInt {
    let value = this.get("loss");
    return value.toBigInt();
  }

  set loss(value: BigInt) {
    this.set("loss", Value.fromBigInt(value));
  }

  get totalGain(): BigInt {
    let value = this.get("totalGain");
    return value.toBigInt();
  }

  set totalGain(value: BigInt) {
    this.set("totalGain", Value.fromBigInt(value));
  }

  get totalLoss(): BigInt {
    let value = this.get("totalLoss");
    return value.toBigInt();
  }

  set totalLoss(value: BigInt) {
    this.set("totalLoss", Value.fromBigInt(value));
  }

  get totalDebt(): BigInt {
    let value = this.get("totalDebt");
    return value.toBigInt();
  }

  set totalDebt(value: BigInt) {
    this.set("totalDebt", Value.fromBigInt(value));
  }

  get debtAdded(): BigInt {
    let value = this.get("debtAdded");
    return value.toBigInt();
  }

  set debtAdded(value: BigInt) {
    this.set("debtAdded", Value.fromBigInt(value));
  }

  get debtLimit(): BigInt {
    let value = this.get("debtLimit");
    return value.toBigInt();
  }

  set debtLimit(value: BigInt) {
    this.set("debtLimit", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get vaultUpdate(): string {
    let value = this.get("vaultUpdate");
    return value.toString();
  }

  set vaultUpdate(value: string) {
    this.set("vaultUpdate", Value.fromString(value));
  }
}

export class Harvest extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Harvest entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Harvest entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Harvest", id.toString(), this);
  }

  static load(id: string): Harvest | null {
    return store.get("Harvest", id) as Harvest | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get strategy(): string {
    let value = this.get("strategy");
    return value.toString();
  }

  set strategy(value: string) {
    this.set("strategy", Value.fromString(value));
  }

  get harvester(): Bytes {
    let value = this.get("harvester");
    return value.toBytes();
  }

  set harvester(value: Bytes) {
    this.set("harvester", Value.fromBytes(value));
  }

  get gain(): BigInt {
    let value = this.get("gain");
    return value.toBigInt();
  }

  set gain(value: BigInt) {
    this.set("gain", Value.fromBigInt(value));
  }

  get loss(): BigInt {
    let value = this.get("loss");
    return value.toBigInt();
  }

  set loss(value: BigInt) {
    this.set("loss", Value.fromBigInt(value));
  }

  get debtPayment(): BigInt {
    let value = this.get("debtPayment");
    return value.toBigInt();
  }

  set debtPayment(value: BigInt) {
    this.set("debtPayment", Value.fromBigInt(value));
  }

  get debtOutstanding(): BigInt {
    let value = this.get("debtOutstanding");
    return value.toBigInt();
  }

  set debtOutstanding(value: BigInt) {
    this.set("debtOutstanding", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }
}
