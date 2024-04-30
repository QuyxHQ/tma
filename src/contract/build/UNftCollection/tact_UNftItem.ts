//@ts-nocheck
import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from "ton-core";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: "Context";
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: "SendParameters";
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type RoyaltyParams = {
  $$type: "RoyaltyParams";
  numerator: bigint;
  denominator: bigint;
  destination: Address;
};

export function storeRoyaltyParams(src: RoyaltyParams) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.numerator, 257);
    b_0.storeInt(src.denominator, 257);
    b_0.storeAddress(src.destination);
  };
}

export function loadRoyaltyParams(slice: Slice) {
  let sc_0 = slice;
  let _numerator = sc_0.loadIntBig(257);
  let _denominator = sc_0.loadIntBig(257);
  let _destination = sc_0.loadAddress();
  return {
    $$type: "RoyaltyParams" as const,
    numerator: _numerator,
    denominator: _denominator,
    destination: _destination,
  };
}

function loadTupleRoyaltyParams(source: TupleReader) {
  let _numerator = source.readBigNumber();
  let _denominator = source.readBigNumber();
  let _destination = source.readAddress();
  return {
    $$type: "RoyaltyParams" as const,
    numerator: _numerator,
    denominator: _denominator,
    destination: _destination,
  };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.numerator);
  builder.writeNumber(source.denominator);
  builder.writeAddress(source.destination);
  return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
    },
    parse: (src) => {
      return loadRoyaltyParams(src.loadRef().beginParse());
    },
  };
}

export type CollectionData = {
  $$type: "CollectionData";
  next_item_index: bigint;
  collection_content: Cell;
  owner_address: Address;
};

export function storeCollectionData(src: CollectionData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.next_item_index, 257);
    b_0.storeRef(src.collection_content);
    b_0.storeAddress(src.owner_address);
  };
}

export function loadCollectionData(slice: Slice) {
  let sc_0 = slice;
  let _next_item_index = sc_0.loadIntBig(257);
  let _collection_content = sc_0.loadRef();
  let _owner_address = sc_0.loadAddress();
  return {
    $$type: "CollectionData" as const,
    next_item_index: _next_item_index,
    collection_content: _collection_content,
    owner_address: _owner_address,
  };
}

function loadTupleCollectionData(source: TupleReader) {
  let _next_item_index = source.readBigNumber();
  let _collection_content = source.readCell();
  let _owner_address = source.readAddress();
  return {
    $$type: "CollectionData" as const,
    next_item_index: _next_item_index,
    collection_content: _collection_content,
    owner_address: _owner_address,
  };
}

function storeTupleCollectionData(source: CollectionData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.next_item_index);
  builder.writeCell(source.collection_content);
  builder.writeAddress(source.owner_address);
  return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeCollectionData(src)).endCell());
    },
    parse: (src) => {
      return loadCollectionData(src.loadRef().beginParse());
    },
  };
}

export type ItemData = {
  $$type: "ItemData";
  is_initialized: boolean;
  index: bigint;
  collection_address: Address;
  owner_address: Address;
  individual_content: Cell;
};

export function storeItemData(src: ItemData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.is_initialized);
    b_0.storeInt(src.index, 257);
    b_0.storeAddress(src.collection_address);
    b_0.storeAddress(src.owner_address);
    b_0.storeRef(src.individual_content);
  };
}

export function loadItemData(slice: Slice) {
  let sc_0 = slice;
  let _is_initialized = sc_0.loadBit();
  let _index = sc_0.loadIntBig(257);
  let _collection_address = sc_0.loadAddress();
  let _owner_address = sc_0.loadAddress();
  let _individual_content = sc_0.loadRef();
  return {
    $$type: "ItemData" as const,
    is_initialized: _is_initialized,
    index: _index,
    collection_address: _collection_address,
    owner_address: _owner_address,
    individual_content: _individual_content,
  };
}

function loadTupleItemData(source: TupleReader) {
  let _is_initialized = source.readBoolean();
  let _index = source.readBigNumber();
  let _collection_address = source.readAddress();
  let _owner_address = source.readAddress();
  let _individual_content = source.readCell();
  return {
    $$type: "ItemData" as const,
    is_initialized: _is_initialized,
    index: _index,
    collection_address: _collection_address,
    owner_address: _owner_address,
    individual_content: _individual_content,
  };
}

function storeTupleItemData(source: ItemData) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.is_initialized);
  builder.writeNumber(source.index);
  builder.writeAddress(source.collection_address);
  builder.writeAddress(source.owner_address);
  builder.writeCell(source.individual_content);
  return builder.build();
}

function dictValueParserItemData(): DictionaryValue<ItemData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeItemData(src)).endCell());
    },
    parse: (src) => {
      return loadItemData(src.loadRef().beginParse());
    },
  };
}

export type PriceRangeConfig = {
  $$type: "PriceRangeConfig";
  start: bigint;
  end: bigint;
};

export function storePriceRangeConfig(src: PriceRangeConfig) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.start, 257);
    b_0.storeInt(src.end, 257);
  };
}

export function loadPriceRangeConfig(slice: Slice) {
  let sc_0 = slice;
  let _start = sc_0.loadIntBig(257);
  let _end = sc_0.loadIntBig(257);
  return { $$type: "PriceRangeConfig" as const, start: _start, end: _end };
}

function loadTuplePriceRangeConfig(source: TupleReader) {
  let _start = source.readBigNumber();
  let _end = source.readBigNumber();
  return { $$type: "PriceRangeConfig" as const, start: _start, end: _end };
}

function storeTuplePriceRangeConfig(source: PriceRangeConfig) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.start);
  builder.writeNumber(source.end);
  return builder.build();
}

function dictValueParserPriceRangeConfig(): DictionaryValue<PriceRangeConfig> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storePriceRangeConfig(src)).endCell());
    },
    parse: (src) => {
      return loadPriceRangeConfig(src.loadRef().beginParse());
    },
  };
}

export type GetCardLinkStatus = {
  $$type: "GetCardLinkStatus";
  query_id: bigint;
  item_index: bigint;
  initiator: Address;
  payload: Cell;
};

export function storeGetCardLinkStatus(src: GetCardLinkStatus) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3028164059, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeInt(src.item_index, 257);
    b_0.storeAddress(src.initiator);
    b_0.storeRef(src.payload);
  };
}

export function loadGetCardLinkStatus(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3028164059) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _item_index = sc_0.loadIntBig(257);
  let _initiator = sc_0.loadAddress();
  let _payload = sc_0.loadRef();
  return {
    $$type: "GetCardLinkStatus" as const,
    query_id: _query_id,
    item_index: _item_index,
    initiator: _initiator,
    payload: _payload,
  };
}

function loadTupleGetCardLinkStatus(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _item_index = source.readBigNumber();
  let _initiator = source.readAddress();
  let _payload = source.readCell();
  return {
    $$type: "GetCardLinkStatus" as const,
    query_id: _query_id,
    item_index: _item_index,
    initiator: _initiator,
    payload: _payload,
  };
}

function storeTupleGetCardLinkStatus(source: GetCardLinkStatus) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.item_index);
  builder.writeAddress(source.initiator);
  builder.writeCell(source.payload);
  return builder.build();
}

function dictValueParserGetCardLinkStatus(): DictionaryValue<GetCardLinkStatus> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeGetCardLinkStatus(src)).endCell()
      );
    },
    parse: (src) => {
      return loadGetCardLinkStatus(src.loadRef().beginParse());
    },
  };
}

export type ReportCardLinkStatus = {
  $$type: "ReportCardLinkStatus";
  query_id: bigint;
  item_index: bigint;
  is_linked_to_card: boolean | null;
  initiator: Address;
  payload: Cell;
};

export function storeReportCardLinkStatus(src: ReportCardLinkStatus) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1646771514, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeInt(src.item_index, 257);
    if (src.is_linked_to_card !== null && src.is_linked_to_card !== undefined) {
      b_0.storeBit(true).storeBit(src.is_linked_to_card);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeAddress(src.initiator);
    b_0.storeRef(src.payload);
  };
}

export function loadReportCardLinkStatus(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1646771514) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _item_index = sc_0.loadIntBig(257);
  let _is_linked_to_card = sc_0.loadBit() ? sc_0.loadBit() : null;
  let _initiator = sc_0.loadAddress();
  let _payload = sc_0.loadRef();
  return {
    $$type: "ReportCardLinkStatus" as const,
    query_id: _query_id,
    item_index: _item_index,
    is_linked_to_card: _is_linked_to_card,
    initiator: _initiator,
    payload: _payload,
  };
}

function loadTupleReportCardLinkStatus(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _item_index = source.readBigNumber();
  let _is_linked_to_card = source.readBooleanOpt();
  let _initiator = source.readAddress();
  let _payload = source.readCell();
  return {
    $$type: "ReportCardLinkStatus" as const,
    query_id: _query_id,
    item_index: _item_index,
    is_linked_to_card: _is_linked_to_card,
    initiator: _initiator,
    payload: _payload,
  };
}

function storeTupleReportCardLinkStatus(source: ReportCardLinkStatus) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.item_index);
  builder.writeBoolean(source.is_linked_to_card);
  builder.writeAddress(source.initiator);
  builder.writeCell(source.payload);
  return builder.build();
}

function dictValueParserReportCardLinkStatus(): DictionaryValue<ReportCardLinkStatus> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeReportCardLinkStatus(src)).endCell()
      );
    },
    parse: (src) => {
      return loadReportCardLinkStatus(src.loadRef().beginParse());
    },
  };
}

export type Transfer = {
  $$type: "Transfer";
  query_id: bigint;
  new_owner: Address;
  response_destination: Address;
  custom_payload: Cell | null;
  forward_amount: bigint;
  forward_payload: Cell;
};

export function storeTransfer(src: Transfer) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1312029976, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.new_owner);
    b_0.storeAddress(src.response_destination);
    if (src.custom_payload !== null && src.custom_payload !== undefined) {
      b_0.storeBit(true).storeRef(src.custom_payload);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeCoins(src.forward_amount);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1312029976) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _new_owner = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: "Transfer" as const,
    query_id: _query_id,
    new_owner: _new_owner,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_amount: _forward_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _new_owner = source.readAddress();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: "Transfer" as const,
    query_id: _query_id,
    new_owner: _new_owner,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_amount: _forward_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleTransfer(source: Transfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.new_owner);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTransfer(src)).endCell());
    },
    parse: (src) => {
      return loadTransfer(src.loadRef().beginParse());
    },
  };
}

export type Excesses = {
  $$type: "Excesses";
  query_id: bigint;
};

export function storeExcesses(src: Excesses) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(869633650, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadExcesses(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 869633650) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: "Excesses" as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "Excesses" as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeExcesses(src)).endCell());
    },
    parse: (src) => {
      return loadExcesses(src.loadRef().beginParse());
    },
  };
}

export type OwnershipAssigned = {
  $$type: "OwnershipAssigned";
  query_id: bigint;
  prev_owner: Address;
  forward_payload: Cell;
};

export function storeOwnershipAssigned(src: OwnershipAssigned) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3788238085, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.prev_owner);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadOwnershipAssigned(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3788238085) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _prev_owner = sc_0.loadAddress();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: "OwnershipAssigned" as const,
    query_id: _query_id,
    prev_owner: _prev_owner,
    forward_payload: _forward_payload,
  };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _prev_owner = source.readAddress();
  let _forward_payload = source.readCell();
  return {
    $$type: "OwnershipAssigned" as const,
    query_id: _query_id,
    prev_owner: _prev_owner,
    forward_payload: _forward_payload,
  };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.prev_owner);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeOwnershipAssigned(src)).endCell()
      );
    },
    parse: (src) => {
      return loadOwnershipAssigned(src.loadRef().beginParse());
    },
  };
}

export type GetStaticData = {
  $$type: "GetStaticData";
  query_id: bigint;
};

export function storeGetStaticData(src: GetStaticData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2365735669, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadGetStaticData(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2365735669) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: "GetStaticData" as const, query_id: _query_id };
}

function loadTupleGetStaticData(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "GetStaticData" as const, query_id: _query_id };
}

function storeTupleGetStaticData(source: GetStaticData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
    },
    parse: (src) => {
      return loadGetStaticData(src.loadRef().beginParse());
    },
  };
}

export type ReportStaticData = {
  $$type: "ReportStaticData";
  query_id: bigint;
  index: bigint;
  collection: Address;
};

export function storeReportStaticData(src: ReportStaticData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1100264081, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeUint(src.index, 256);
    b_0.storeAddress(src.collection);
  };
}

export function loadReportStaticData(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1100264081) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _index = sc_0.loadUintBig(256);
  let _collection = sc_0.loadAddress();
  return {
    $$type: "ReportStaticData" as const,
    query_id: _query_id,
    index: _index,
    collection: _collection,
  };
}

function loadTupleReportStaticData(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _index = source.readBigNumber();
  let _collection = source.readAddress();
  return {
    $$type: "ReportStaticData" as const,
    query_id: _query_id,
    index: _index,
    collection: _collection,
  };
}

function storeTupleReportStaticData(source: ReportStaticData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.index);
  builder.writeAddress(source.collection);
  return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
    },
    parse: (src) => {
      return loadReportStaticData(src.loadRef().beginParse());
    },
  };
}

export type GetUsernameData = {
  $$type: "GetUsernameData";
  query_id: bigint;
  initiator: Address;
  payload: Cell;
};

export function storeGetUsernameData(src: GetUsernameData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(808469150, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.initiator);
    b_0.storeRef(src.payload);
  };
}

export function loadGetUsernameData(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 808469150) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _initiator = sc_0.loadAddress();
  let _payload = sc_0.loadRef();
  return {
    $$type: "GetUsernameData" as const,
    query_id: _query_id,
    initiator: _initiator,
    payload: _payload,
  };
}

function loadTupleGetUsernameData(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _initiator = source.readAddress();
  let _payload = source.readCell();
  return {
    $$type: "GetUsernameData" as const,
    query_id: _query_id,
    initiator: _initiator,
    payload: _payload,
  };
}

function storeTupleGetUsernameData(source: GetUsernameData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.initiator);
  builder.writeCell(source.payload);
  return builder.build();
}

function dictValueParserGetUsernameData(): DictionaryValue<GetUsernameData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeGetUsernameData(src)).endCell());
    },
    parse: (src) => {
      return loadGetUsernameData(src.loadRef().beginParse());
    },
  };
}

export type ReportUsernameData = {
  $$type: "ReportUsernameData";
  query_id: bigint;
  item_index: bigint;
  token_name: Cell;
  initiator: Address;
  payload: Cell;
};

export function storeReportUsernameData(src: ReportUsernameData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1224717995, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeUint(src.item_index, 256);
    b_0.storeRef(src.token_name);
    b_0.storeAddress(src.initiator);
    b_0.storeRef(src.payload);
  };
}

export function loadReportUsernameData(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1224717995) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _item_index = sc_0.loadUintBig(256);
  let _token_name = sc_0.loadRef();
  let _initiator = sc_0.loadAddress();
  let _payload = sc_0.loadRef();
  return {
    $$type: "ReportUsernameData" as const,
    query_id: _query_id,
    item_index: _item_index,
    token_name: _token_name,
    initiator: _initiator,
    payload: _payload,
  };
}

function loadTupleReportUsernameData(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _item_index = source.readBigNumber();
  let _token_name = source.readCell();
  let _initiator = source.readAddress();
  let _payload = source.readCell();
  return {
    $$type: "ReportUsernameData" as const,
    query_id: _query_id,
    item_index: _item_index,
    token_name: _token_name,
    initiator: _initiator,
    payload: _payload,
  };
}

function storeTupleReportUsernameData(source: ReportUsernameData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.item_index);
  builder.writeCell(source.token_name);
  builder.writeAddress(source.initiator);
  builder.writeCell(source.payload);
  return builder.build();
}

function dictValueParserReportUsernameData(): DictionaryValue<ReportUsernameData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeReportUsernameData(src)).endCell()
      );
    },
    parse: (src) => {
      return loadReportUsernameData(src.loadRef().beginParse());
    },
  };
}

export type GetRoyaltyParams = {
  $$type: "GetRoyaltyParams";
  query_id: bigint;
};

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(435086716, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadGetRoyaltyParams(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 435086716) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: "GetRoyaltyParams" as const, query_id: _query_id };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "GetRoyaltyParams" as const, query_id: _query_id };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
    },
    parse: (src) => {
      return loadGetRoyaltyParams(src.loadRef().beginParse());
    },
  };
}

export type ReportRoyaltyParams = {
  $$type: "ReportRoyaltyParams";
  query_id: bigint;
  numerator: bigint;
  denominator: bigint;
  destination: Address;
};

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(634900346, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeUint(src.numerator, 16);
    b_0.storeUint(src.denominator, 16);
    b_0.storeAddress(src.destination);
  };
}

export function loadReportRoyaltyParams(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 634900346) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _numerator = sc_0.loadUintBig(16);
  let _denominator = sc_0.loadUintBig(16);
  let _destination = sc_0.loadAddress();
  return {
    $$type: "ReportRoyaltyParams" as const,
    query_id: _query_id,
    numerator: _numerator,
    denominator: _denominator,
    destination: _destination,
  };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _numerator = source.readBigNumber();
  let _denominator = source.readBigNumber();
  let _destination = source.readAddress();
  return {
    $$type: "ReportRoyaltyParams" as const,
    query_id: _query_id,
    numerator: _numerator,
    denominator: _denominator,
    destination: _destination,
  };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.numerator);
  builder.writeNumber(source.denominator);
  builder.writeAddress(source.destination);
  return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeReportRoyaltyParams(src)).endCell()
      );
    },
    parse: (src) => {
      return loadReportRoyaltyParams(src.loadRef().beginParse());
    },
  };
}

export type UnlinkCard = {
  $$type: "UnlinkCard";
  query_id: bigint;
  index: bigint;
  initiator: Address;
};

export function storeUnlinkCard(src: UnlinkCard) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1323911271, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeInt(src.index, 257);
    b_0.storeAddress(src.initiator);
  };
}

export function loadUnlinkCard(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1323911271) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _index = sc_0.loadIntBig(257);
  let _initiator = sc_0.loadAddress();
  return {
    $$type: "UnlinkCard" as const,
    query_id: _query_id,
    index: _index,
    initiator: _initiator,
  };
}

function loadTupleUnlinkCard(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _index = source.readBigNumber();
  let _initiator = source.readAddress();
  return {
    $$type: "UnlinkCard" as const,
    query_id: _query_id,
    index: _index,
    initiator: _initiator,
  };
}

function storeTupleUnlinkCard(source: UnlinkCard) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.index);
  builder.writeAddress(source.initiator);
  return builder.build();
}

function dictValueParserUnlinkCard(): DictionaryValue<UnlinkCard> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUnlinkCard(src)).endCell());
    },
    parse: (src) => {
      return loadUnlinkCard(src.loadRef().beginParse());
    },
  };
}

export type UpdateUsernameLinkedStatus = {
  $$type: "UpdateUsernameLinkedStatus";
  query_id: bigint;
  index: bigint;
  initiator: Address;
  status: boolean;
};

export function storeUpdateUsernameLinkedStatus(
  src: UpdateUsernameLinkedStatus
) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3479701466, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeInt(src.index, 257);
    b_0.storeAddress(src.initiator);
    b_0.storeBit(src.status);
  };
}

export function loadUpdateUsernameLinkedStatus(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3479701466) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _index = sc_0.loadIntBig(257);
  let _initiator = sc_0.loadAddress();
  let _status = sc_0.loadBit();
  return {
    $$type: "UpdateUsernameLinkedStatus" as const,
    query_id: _query_id,
    index: _index,
    initiator: _initiator,
    status: _status,
  };
}

function loadTupleUpdateUsernameLinkedStatus(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _index = source.readBigNumber();
  let _initiator = source.readAddress();
  let _status = source.readBoolean();
  return {
    $$type: "UpdateUsernameLinkedStatus" as const,
    query_id: _query_id,
    index: _index,
    initiator: _initiator,
    status: _status,
  };
}

function storeTupleUpdateUsernameLinkedStatus(
  source: UpdateUsernameLinkedStatus
) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.index);
  builder.writeAddress(source.initiator);
  builder.writeBoolean(source.status);
  return builder.build();
}

function dictValueParserUpdateUsernameLinkedStatus(): DictionaryValue<UpdateUsernameLinkedStatus> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeUpdateUsernameLinkedStatus(src)).endCell()
      );
    },
    parse: (src) => {
      return loadUpdateUsernameLinkedStatus(src.loadRef().beginParse());
    },
  };
}

export type UpdateAllowedContract = {
  $$type: "UpdateAllowedContract";
  allowed_contract: Address;
};

export function storeUpdateAllowedContract(src: UpdateAllowedContract) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3161124927, 32);
    b_0.storeAddress(src.allowed_contract);
  };
}

export function loadUpdateAllowedContract(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3161124927) {
    throw Error("Invalid prefix");
  }
  let _allowed_contract = sc_0.loadAddress();
  return {
    $$type: "UpdateAllowedContract" as const,
    allowed_contract: _allowed_contract,
  };
}

function loadTupleUpdateAllowedContract(source: TupleReader) {
  let _allowed_contract = source.readAddress();
  return {
    $$type: "UpdateAllowedContract" as const,
    allowed_contract: _allowed_contract,
  };
}

function storeTupleUpdateAllowedContract(source: UpdateAllowedContract) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.allowed_contract);
  return builder.build();
}

function dictValueParserUpdateAllowedContract(): DictionaryValue<UpdateAllowedContract> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeUpdateAllowedContract(src)).endCell()
      );
    },
    parse: (src) => {
      return loadUpdateAllowedContract(src.loadRef().beginParse());
    },
  };
}

export type MintCard = {
  $$type: "MintCard";
  query_id: bigint;
  username_address: Address;
  bio: string;
  pfp: string;
};

export function storeMintCard(src: MintCard) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(425813829, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.username_address);
    b_0.storeStringRefTail(src.bio);
    b_0.storeStringRefTail(src.pfp);
  };
}

export function loadMintCard(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 425813829) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _username_address = sc_0.loadAddress();
  let _bio = sc_0.loadStringRefTail();
  let _pfp = sc_0.loadStringRefTail();
  return {
    $$type: "MintCard" as const,
    query_id: _query_id,
    username_address: _username_address,
    bio: _bio,
    pfp: _pfp,
  };
}

function loadTupleMintCard(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _username_address = source.readAddress();
  let _bio = source.readString();
  let _pfp = source.readString();
  return {
    $$type: "MintCard" as const,
    query_id: _query_id,
    username_address: _username_address,
    bio: _bio,
    pfp: _pfp,
  };
}

function storeTupleMintCard(source: MintCard) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.username_address);
  builder.writeString(source.bio);
  builder.writeString(source.pfp);
  return builder.build();
}

function dictValueParserMintCard(): DictionaryValue<MintCard> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeMintCard(src)).endCell());
    },
    parse: (src) => {
      return loadMintCard(src.loadRef().beginParse());
    },
  };
}

export type CardMetadata = {
  $$type: "CardMetadata";
  bio: Cell;
  pfp: Cell;
  username: Cell;
};

export function storeCardMetadata(src: CardMetadata) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.bio);
    b_0.storeRef(src.pfp);
    b_0.storeRef(src.username);
  };
}

export function loadCardMetadata(slice: Slice) {
  let sc_0 = slice;
  let _bio = sc_0.loadRef();
  let _pfp = sc_0.loadRef();
  let _username = sc_0.loadRef();
  return {
    $$type: "CardMetadata" as const,
    bio: _bio,
    pfp: _pfp,
    username: _username,
  };
}

function loadTupleCardMetadata(source: TupleReader) {
  let _bio = source.readCell();
  let _pfp = source.readCell();
  let _username = source.readCell();
  return {
    $$type: "CardMetadata" as const,
    bio: _bio,
    pfp: _pfp,
    username: _username,
  };
}

function storeTupleCardMetadata(source: CardMetadata) {
  let builder = new TupleBuilder();
  builder.writeCell(source.bio);
  builder.writeCell(source.pfp);
  builder.writeCell(source.username);
  return builder.build();
}

function dictValueParserCardMetadata(): DictionaryValue<CardMetadata> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeCardMetadata(src)).endCell());
    },
    parse: (src) => {
      return loadCardMetadata(src.loadRef().beginParse());
    },
  };
}

export type Initialize = {
  $$type: "Initialize";
  query_id: bigint;
  new_owner: Address;
  response_destination: Address;
  authority: Address;
  payload: Cell;
};

export function storeInitialize(src: Initialize) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3568268437, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.new_owner);
    b_0.storeAddress(src.response_destination);
    b_0.storeAddress(src.authority);
    b_0.storeRef(src.payload);
  };
}

export function loadInitialize(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3568268437) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _new_owner = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _authority = sc_0.loadAddress();
  let _payload = sc_0.loadRef();
  return {
    $$type: "Initialize" as const,
    query_id: _query_id,
    new_owner: _new_owner,
    response_destination: _response_destination,
    authority: _authority,
    payload: _payload,
  };
}

function loadTupleInitialize(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _new_owner = source.readAddress();
  let _response_destination = source.readAddress();
  let _authority = source.readAddress();
  let _payload = source.readCell();
  return {
    $$type: "Initialize" as const,
    query_id: _query_id,
    new_owner: _new_owner,
    response_destination: _response_destination,
    authority: _authority,
    payload: _payload,
  };
}

function storeTupleInitialize(source: Initialize) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.new_owner);
  builder.writeAddress(source.response_destination);
  builder.writeAddress(source.authority);
  builder.writeCell(source.payload);
  return builder.build();
}

function dictValueParserInitialize(): DictionaryValue<Initialize> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeInitialize(src)).endCell());
    },
    parse: (src) => {
      return loadInitialize(src.loadRef().beginParse());
    },
  };
}

export type ProveOwnership = {
  $$type: "ProveOwnership";
  query_id: bigint;
  dest: Address;
  forward_payload: Cell;
  with_content: boolean;
};

export function storeProveOwnership(src: ProveOwnership) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3956722467, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.dest);
    b_0.storeRef(src.forward_payload);
    b_0.storeBit(src.with_content);
  };
}

export function loadProveOwnership(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3956722467) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _dest = sc_0.loadAddress();
  let _forward_payload = sc_0.loadRef();
  let _with_content = sc_0.loadBit();
  return {
    $$type: "ProveOwnership" as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function loadTupleProveOwnership(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _dest = source.readAddress();
  let _forward_payload = source.readCell();
  let _with_content = source.readBoolean();
  return {
    $$type: "ProveOwnership" as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function storeTupleProveOwnership(source: ProveOwnership) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.dest);
  builder.writeCell(source.forward_payload);
  builder.writeBoolean(source.with_content);
  return builder.build();
}

function dictValueParserProveOwnership(): DictionaryValue<ProveOwnership> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeProveOwnership(src)).endCell());
    },
    parse: (src) => {
      return loadProveOwnership(src.loadRef().beginParse());
    },
  };
}

export type OwnershipProof = {
  $$type: "OwnershipProof";
  query_id: bigint;
  item_id: bigint;
  owner: Address;
  data: Cell;
  revoked_at: bigint;
  content: Cell | null;
};

export function storeOwnershipProof(src: OwnershipProof) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1882676056, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeInt(src.item_id, 257);
    b_0.storeAddress(src.owner);
    b_0.storeRef(src.data);
    b_0.storeInt(src.revoked_at, 257);
    if (src.content !== null && src.content !== undefined) {
      b_0.storeBit(true).storeRef(src.content);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadOwnershipProof(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1882676056) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _item_id = sc_0.loadIntBig(257);
  let _owner = sc_0.loadAddress();
  let _data = sc_0.loadRef();
  let _revoked_at = sc_0.loadIntBig(257);
  let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "OwnershipProof" as const,
    query_id: _query_id,
    item_id: _item_id,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function loadTupleOwnershipProof(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _item_id = source.readBigNumber();
  let _owner = source.readAddress();
  let _data = source.readCell();
  let _revoked_at = source.readBigNumber();
  let _content = source.readCellOpt();
  return {
    $$type: "OwnershipProof" as const,
    query_id: _query_id,
    item_id: _item_id,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function storeTupleOwnershipProof(source: OwnershipProof) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.item_id);
  builder.writeAddress(source.owner);
  builder.writeCell(source.data);
  builder.writeNumber(source.revoked_at);
  builder.writeCell(source.content);
  return builder.build();
}

function dictValueParserOwnershipProof(): DictionaryValue<OwnershipProof> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeOwnershipProof(src)).endCell());
    },
    parse: (src) => {
      return loadOwnershipProof(src.loadRef().beginParse());
    },
  };
}

export type RequestOwner = {
  $$type: "RequestOwner";
  query_id: bigint;
  dest: Address;
  forward_payload: Cell;
  with_content: boolean;
};

export function storeRequestOwner(src: RequestOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2177359512, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.dest);
    b_0.storeRef(src.forward_payload);
    b_0.storeBit(src.with_content);
  };
}

export function loadRequestOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2177359512) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _dest = sc_0.loadAddress();
  let _forward_payload = sc_0.loadRef();
  let _with_content = sc_0.loadBit();
  return {
    $$type: "RequestOwner" as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function loadTupleRequestOwner(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _dest = source.readAddress();
  let _forward_payload = source.readCell();
  let _with_content = source.readBoolean();
  return {
    $$type: "RequestOwner" as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function storeTupleRequestOwner(source: RequestOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.dest);
  builder.writeCell(source.forward_payload);
  builder.writeBoolean(source.with_content);
  return builder.build();
}

function dictValueParserRequestOwner(): DictionaryValue<RequestOwner> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeRequestOwner(src)).endCell());
    },
    parse: (src) => {
      return loadRequestOwner(src.loadRef().beginParse());
    },
  };
}

export type OwnerInfo = {
  $$type: "OwnerInfo";
  query_id: bigint;
  item_id: bigint;
  initiator: Address;
  owner: Address;
  data: Cell;
  revoked_at: bigint;
  content: Cell | null;
};

export function storeOwnerInfo(src: OwnerInfo) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3617594864, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeInt(src.item_id, 257);
    b_0.storeAddress(src.initiator);
    b_0.storeAddress(src.owner);
    b_0.storeRef(src.data);
    let b_1 = new Builder();
    b_1.storeInt(src.revoked_at, 257);
    if (src.content !== null && src.content !== undefined) {
      b_1.storeBit(true).storeRef(src.content);
    } else {
      b_1.storeBit(false);
    }
    b_0.storeRef(b_1.endCell());
  };
}

export function loadOwnerInfo(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3617594864) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _item_id = sc_0.loadIntBig(257);
  let _initiator = sc_0.loadAddress();
  let _owner = sc_0.loadAddress();
  let _data = sc_0.loadRef();
  let sc_1 = sc_0.loadRef().beginParse();
  let _revoked_at = sc_1.loadIntBig(257);
  let _content = sc_1.loadBit() ? sc_1.loadRef() : null;
  return {
    $$type: "OwnerInfo" as const,
    query_id: _query_id,
    item_id: _item_id,
    initiator: _initiator,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function loadTupleOwnerInfo(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _item_id = source.readBigNumber();
  let _initiator = source.readAddress();
  let _owner = source.readAddress();
  let _data = source.readCell();
  let _revoked_at = source.readBigNumber();
  let _content = source.readCellOpt();
  return {
    $$type: "OwnerInfo" as const,
    query_id: _query_id,
    item_id: _item_id,
    initiator: _initiator,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function storeTupleOwnerInfo(source: OwnerInfo) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.item_id);
  builder.writeAddress(source.initiator);
  builder.writeAddress(source.owner);
  builder.writeCell(source.data);
  builder.writeNumber(source.revoked_at);
  builder.writeCell(source.content);
  return builder.build();
}

function dictValueParserOwnerInfo(): DictionaryValue<OwnerInfo> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeOwnerInfo(src)).endCell());
    },
    parse: (src) => {
      return loadOwnerInfo(src.loadRef().beginParse());
    },
  };
}

export type Destroy = {
  $$type: "Destroy";
  query_id: bigint;
};

export function storeDestroy(src: Destroy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(473171199, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadDestroy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 473171199) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: "Destroy" as const, query_id: _query_id };
}

function loadTupleDestroy(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "Destroy" as const, query_id: _query_id };
}

function storeTupleDestroy(source: Destroy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserDestroy(): DictionaryValue<Destroy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDestroy(src)).endCell());
    },
    parse: (src) => {
      return loadDestroy(src.loadRef().beginParse());
    },
  };
}

export type Revoke = {
  $$type: "Revoke";
  query_id: bigint;
};

export function storeRevoke(src: Revoke) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2711683139, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadRevoke(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2711683139) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: "Revoke" as const, query_id: _query_id };
}

function loadTupleRevoke(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "Revoke" as const, query_id: _query_id };
}

function storeTupleRevoke(source: Revoke) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserRevoke(): DictionaryValue<Revoke> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeRevoke(src)).endCell());
    },
    parse: (src) => {
      return loadRevoke(src.loadRef().beginParse());
    },
  };
}

export type Fees = {
  $$type: "Fees";
  marketplace_fee_address: Address;
  marketplace_fee: bigint;
  royalty_address: Address;
  royalty_amount: bigint;
};

export function storeFees(src: Fees) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.marketplace_fee_address);
    b_0.storeInt(src.marketplace_fee, 257);
    b_0.storeAddress(src.royalty_address);
    let b_1 = new Builder();
    b_1.storeInt(src.royalty_amount, 257);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadFees(slice: Slice) {
  let sc_0 = slice;
  let _marketplace_fee_address = sc_0.loadAddress();
  let _marketplace_fee = sc_0.loadIntBig(257);
  let _royalty_address = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _royalty_amount = sc_1.loadIntBig(257);
  return {
    $$type: "Fees" as const,
    marketplace_fee_address: _marketplace_fee_address,
    marketplace_fee: _marketplace_fee,
    royalty_address: _royalty_address,
    royalty_amount: _royalty_amount,
  };
}

function loadTupleFees(source: TupleReader) {
  let _marketplace_fee_address = source.readAddress();
  let _marketplace_fee = source.readBigNumber();
  let _royalty_address = source.readAddress();
  let _royalty_amount = source.readBigNumber();
  return {
    $$type: "Fees" as const,
    marketplace_fee_address: _marketplace_fee_address,
    marketplace_fee: _marketplace_fee,
    royalty_address: _royalty_address,
    royalty_amount: _royalty_amount,
  };
}

function storeTupleFees(source: Fees) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.marketplace_fee_address);
  builder.writeNumber(source.marketplace_fee);
  builder.writeAddress(source.royalty_address);
  builder.writeNumber(source.royalty_amount);
  return builder.build();
}

function dictValueParserFees(): DictionaryValue<Fees> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeFees(src)).endCell());
    },
    parse: (src) => {
      return loadFees(src.loadRef().beginParse());
    },
  };
}

export type SaleData = {
  $$type: "SaleData";
  is_complete: boolean;
  created_at: bigint;
  marketplace_address: Address;
  nft_address: Address;
  nft_owner_address: Address;
  full_price: bigint;
  marketplace_fee_address: Address;
  marketplace_fee: bigint;
  royalty_address: Address;
  royalty_amount: bigint;
};

export function storeSaleData(src: SaleData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.is_complete);
    b_0.storeInt(src.created_at, 257);
    b_0.storeAddress(src.marketplace_address);
    b_0.storeAddress(src.nft_address);
    let b_1 = new Builder();
    b_1.storeAddress(src.nft_owner_address);
    b_1.storeInt(src.full_price, 257);
    b_1.storeAddress(src.marketplace_fee_address);
    let b_2 = new Builder();
    b_2.storeInt(src.marketplace_fee, 257);
    b_2.storeAddress(src.royalty_address);
    b_2.storeInt(src.royalty_amount, 257);
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

export function loadSaleData(slice: Slice) {
  let sc_0 = slice;
  let _is_complete = sc_0.loadBit();
  let _created_at = sc_0.loadIntBig(257);
  let _marketplace_address = sc_0.loadAddress();
  let _nft_address = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _nft_owner_address = sc_1.loadAddress();
  let _full_price = sc_1.loadIntBig(257);
  let _marketplace_fee_address = sc_1.loadAddress();
  let sc_2 = sc_1.loadRef().beginParse();
  let _marketplace_fee = sc_2.loadIntBig(257);
  let _royalty_address = sc_2.loadAddress();
  let _royalty_amount = sc_2.loadIntBig(257);
  return {
    $$type: "SaleData" as const,
    is_complete: _is_complete,
    created_at: _created_at,
    marketplace_address: _marketplace_address,
    nft_address: _nft_address,
    nft_owner_address: _nft_owner_address,
    full_price: _full_price,
    marketplace_fee_address: _marketplace_fee_address,
    marketplace_fee: _marketplace_fee,
    royalty_address: _royalty_address,
    royalty_amount: _royalty_amount,
  };
}

function loadTupleSaleData(source: TupleReader) {
  let _is_complete = source.readBoolean();
  let _created_at = source.readBigNumber();
  let _marketplace_address = source.readAddress();
  let _nft_address = source.readAddress();
  let _nft_owner_address = source.readAddress();
  let _full_price = source.readBigNumber();
  let _marketplace_fee_address = source.readAddress();
  let _marketplace_fee = source.readBigNumber();
  let _royalty_address = source.readAddress();
  let _royalty_amount = source.readBigNumber();
  return {
    $$type: "SaleData" as const,
    is_complete: _is_complete,
    created_at: _created_at,
    marketplace_address: _marketplace_address,
    nft_address: _nft_address,
    nft_owner_address: _nft_owner_address,
    full_price: _full_price,
    marketplace_fee_address: _marketplace_fee_address,
    marketplace_fee: _marketplace_fee,
    royalty_address: _royalty_address,
    royalty_amount: _royalty_amount,
  };
}

function storeTupleSaleData(source: SaleData) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.is_complete);
  builder.writeNumber(source.created_at);
  builder.writeAddress(source.marketplace_address);
  builder.writeAddress(source.nft_address);
  builder.writeAddress(source.nft_owner_address);
  builder.writeNumber(source.full_price);
  builder.writeAddress(source.marketplace_fee_address);
  builder.writeNumber(source.marketplace_fee);
  builder.writeAddress(source.royalty_address);
  builder.writeNumber(source.royalty_amount);
  return builder.build();
}

function dictValueParserSaleData(): DictionaryValue<SaleData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSaleData(src)).endCell());
    },
    parse: (src) => {
      return loadSaleData(src.loadRef().beginParse());
    },
  };
}

export type FixPriceData = {
  $$type: "FixPriceData";
  is_complete: boolean;
  created_at: bigint;
  marketplace_address: Address;
  nft_address: Address;
  nft_owner_address: Address;
  full_price: bigint;
  marketplace_fee_address: Address;
  marketplace_fee: bigint;
  royalty_address: Address;
  royalty_amount: bigint;
  sold_at: bigint;
  query_id: bigint;
};

export function storeFixPriceData(src: FixPriceData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.is_complete);
    b_0.storeInt(src.created_at, 257);
    b_0.storeAddress(src.marketplace_address);
    b_0.storeAddress(src.nft_address);
    let b_1 = new Builder();
    b_1.storeAddress(src.nft_owner_address);
    b_1.storeInt(src.full_price, 257);
    b_1.storeAddress(src.marketplace_fee_address);
    let b_2 = new Builder();
    b_2.storeInt(src.marketplace_fee, 257);
    b_2.storeAddress(src.royalty_address);
    b_2.storeInt(src.royalty_amount, 257);
    let b_3 = new Builder();
    b_3.storeInt(src.sold_at, 257);
    b_3.storeInt(src.query_id, 257);
    b_2.storeRef(b_3.endCell());
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

export function loadFixPriceData(slice: Slice) {
  let sc_0 = slice;
  let _is_complete = sc_0.loadBit();
  let _created_at = sc_0.loadIntBig(257);
  let _marketplace_address = sc_0.loadAddress();
  let _nft_address = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _nft_owner_address = sc_1.loadAddress();
  let _full_price = sc_1.loadIntBig(257);
  let _marketplace_fee_address = sc_1.loadAddress();
  let sc_2 = sc_1.loadRef().beginParse();
  let _marketplace_fee = sc_2.loadIntBig(257);
  let _royalty_address = sc_2.loadAddress();
  let _royalty_amount = sc_2.loadIntBig(257);
  let sc_3 = sc_2.loadRef().beginParse();
  let _sold_at = sc_3.loadIntBig(257);
  let _query_id = sc_3.loadIntBig(257);
  return {
    $$type: "FixPriceData" as const,
    is_complete: _is_complete,
    created_at: _created_at,
    marketplace_address: _marketplace_address,
    nft_address: _nft_address,
    nft_owner_address: _nft_owner_address,
    full_price: _full_price,
    marketplace_fee_address: _marketplace_fee_address,
    marketplace_fee: _marketplace_fee,
    royalty_address: _royalty_address,
    royalty_amount: _royalty_amount,
    sold_at: _sold_at,
    query_id: _query_id,
  };
}

function loadTupleFixPriceData(source: TupleReader) {
  let _is_complete = source.readBoolean();
  let _created_at = source.readBigNumber();
  let _marketplace_address = source.readAddress();
  let _nft_address = source.readAddress();
  let _nft_owner_address = source.readAddress();
  let _full_price = source.readBigNumber();
  let _marketplace_fee_address = source.readAddress();
  let _marketplace_fee = source.readBigNumber();
  let _royalty_address = source.readAddress();
  let _royalty_amount = source.readBigNumber();
  let _sold_at = source.readBigNumber();
  let _query_id = source.readBigNumber();
  return {
    $$type: "FixPriceData" as const,
    is_complete: _is_complete,
    created_at: _created_at,
    marketplace_address: _marketplace_address,
    nft_address: _nft_address,
    nft_owner_address: _nft_owner_address,
    full_price: _full_price,
    marketplace_fee_address: _marketplace_fee_address,
    marketplace_fee: _marketplace_fee,
    royalty_address: _royalty_address,
    royalty_amount: _royalty_amount,
    sold_at: _sold_at,
    query_id: _query_id,
  };
}

function storeTupleFixPriceData(source: FixPriceData) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.is_complete);
  builder.writeNumber(source.created_at);
  builder.writeAddress(source.marketplace_address);
  builder.writeAddress(source.nft_address);
  builder.writeAddress(source.nft_owner_address);
  builder.writeNumber(source.full_price);
  builder.writeAddress(source.marketplace_fee_address);
  builder.writeNumber(source.marketplace_fee);
  builder.writeAddress(source.royalty_address);
  builder.writeNumber(source.royalty_amount);
  builder.writeNumber(source.sold_at);
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserFixPriceData(): DictionaryValue<FixPriceData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeFixPriceData(src)).endCell());
    },
    parse: (src) => {
      return loadFixPriceData(src.loadRef().beginParse());
    },
  };
}

export type Buy = {
  $$type: "Buy";
  query_id: bigint;
};

export function storeBuy(src: Buy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3883912433, 32);
    b_0.storeInt(src.query_id, 257);
  };
}

export function loadBuy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3883912433) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadIntBig(257);
  return { $$type: "Buy" as const, query_id: _query_id };
}

function loadTupleBuy(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "Buy" as const, query_id: _query_id };
}

function storeTupleBuy(source: Buy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserBuy(): DictionaryValue<Buy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeBuy(src)).endCell());
    },
    parse: (src) => {
      return loadBuy(src.loadRef().beginParse());
    },
  };
}

export type ChangeFees = {
  $$type: "ChangeFees";
  new_full_price: bigint;
  new_marketplace_fee: bigint;
  new_royalty_amount: bigint;
};

export function storeChangeFees(src: ChangeFees) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4270310251, 32);
    b_0.storeCoins(src.new_full_price);
    b_0.storeCoins(src.new_marketplace_fee);
    b_0.storeCoins(src.new_royalty_amount);
  };
}

export function loadChangeFees(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4270310251) {
    throw Error("Invalid prefix");
  }
  let _new_full_price = sc_0.loadCoins();
  let _new_marketplace_fee = sc_0.loadCoins();
  let _new_royalty_amount = sc_0.loadCoins();
  return {
    $$type: "ChangeFees" as const,
    new_full_price: _new_full_price,
    new_marketplace_fee: _new_marketplace_fee,
    new_royalty_amount: _new_royalty_amount,
  };
}

function loadTupleChangeFees(source: TupleReader) {
  let _new_full_price = source.readBigNumber();
  let _new_marketplace_fee = source.readBigNumber();
  let _new_royalty_amount = source.readBigNumber();
  return {
    $$type: "ChangeFees" as const,
    new_full_price: _new_full_price,
    new_marketplace_fee: _new_marketplace_fee,
    new_royalty_amount: _new_royalty_amount,
  };
}

function storeTupleChangeFees(source: ChangeFees) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.new_full_price);
  builder.writeNumber(source.new_marketplace_fee);
  builder.writeNumber(source.new_royalty_amount);
  return builder.build();
}

function dictValueParserChangeFees(): DictionaryValue<ChangeFees> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeFees(src)).endCell());
    },
    parse: (src) => {
      return loadChangeFees(src.loadRef().beginParse());
    },
  };
}

export type CancelSale = {
  $$type: "CancelSale";
  query_id: bigint;
};

export function storeCancelSale(src: CancelSale) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1383729328, 32);
    b_0.storeInt(src.query_id, 257);
  };
}

export function loadCancelSale(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1383729328) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadIntBig(257);
  return { $$type: "CancelSale" as const, query_id: _query_id };
}

function loadTupleCancelSale(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "CancelSale" as const, query_id: _query_id };
}

function storeTupleCancelSale(source: CancelSale) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserCancelSale(): DictionaryValue<CancelSale> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeCancelSale(src)).endCell());
    },
    parse: (src) => {
      return loadCancelSale(src.loadRef().beginParse());
    },
  };
}

export type FeesAddressStruct = {
  $$type: "FeesAddressStruct";
  mp_fee_addr: Address;
  royalty_fee_addr: Address;
};

export function storeFeesAddressStruct(src: FeesAddressStruct) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.mp_fee_addr);
    b_0.storeAddress(src.royalty_fee_addr);
  };
}

export function loadFeesAddressStruct(slice: Slice) {
  let sc_0 = slice;
  let _mp_fee_addr = sc_0.loadAddress();
  let _royalty_fee_addr = sc_0.loadAddress();
  return {
    $$type: "FeesAddressStruct" as const,
    mp_fee_addr: _mp_fee_addr,
    royalty_fee_addr: _royalty_fee_addr,
  };
}

function loadTupleFeesAddressStruct(source: TupleReader) {
  let _mp_fee_addr = source.readAddress();
  let _royalty_fee_addr = source.readAddress();
  return {
    $$type: "FeesAddressStruct" as const,
    mp_fee_addr: _mp_fee_addr,
    royalty_fee_addr: _royalty_fee_addr,
  };
}

function storeTupleFeesAddressStruct(source: FeesAddressStruct) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.mp_fee_addr);
  builder.writeAddress(source.royalty_fee_addr);
  return builder.build();
}

function dictValueParserFeesAddressStruct(): DictionaryValue<FeesAddressStruct> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeFeesAddressStruct(src)).endCell()
      );
    },
    parse: (src) => {
      return loadFeesAddressStruct(src.loadRef().beginParse());
    },
  };
}

export type AuctionSaleData = {
  $$type: "AuctionSaleData";
  end: boolean;
  end_time: bigint;
  mp_addr: Address;
  nft_addr: Address;
  nft_owner: Address;
  last_bid: bigint;
  last_member: Address;
  min_step: bigint;
  mp_fee_addr: Address;
  mp_fee_factor: bigint;
  mp_fee_base: bigint;
  royalty_fee_addr: Address;
  royalty_fee_factor: bigint;
  royalty_fee_base: bigint;
  max_bid: bigint;
  min_bid: bigint;
  created_at: bigint;
  last_bid_at: bigint;
  is_cancelled: boolean;
};

export function storeAuctionSaleData(src: AuctionSaleData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.end);
    b_0.storeInt(src.end_time, 257);
    b_0.storeAddress(src.mp_addr);
    b_0.storeAddress(src.nft_addr);
    let b_1 = new Builder();
    b_1.storeAddress(src.nft_owner);
    b_1.storeInt(src.last_bid, 257);
    b_1.storeAddress(src.last_member);
    let b_2 = new Builder();
    b_2.storeInt(src.min_step, 257);
    b_2.storeAddress(src.mp_fee_addr);
    b_2.storeInt(src.mp_fee_factor, 257);
    let b_3 = new Builder();
    b_3.storeInt(src.mp_fee_base, 257);
    b_3.storeAddress(src.royalty_fee_addr);
    b_3.storeInt(src.royalty_fee_factor, 257);
    let b_4 = new Builder();
    b_4.storeInt(src.royalty_fee_base, 257);
    b_4.storeInt(src.max_bid, 257);
    b_4.storeInt(src.min_bid, 257);
    let b_5 = new Builder();
    b_5.storeInt(src.created_at, 257);
    b_5.storeInt(src.last_bid_at, 257);
    b_5.storeBit(src.is_cancelled);
    b_4.storeRef(b_5.endCell());
    b_3.storeRef(b_4.endCell());
    b_2.storeRef(b_3.endCell());
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

export function loadAuctionSaleData(slice: Slice) {
  let sc_0 = slice;
  let _end = sc_0.loadBit();
  let _end_time = sc_0.loadIntBig(257);
  let _mp_addr = sc_0.loadAddress();
  let _nft_addr = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _nft_owner = sc_1.loadAddress();
  let _last_bid = sc_1.loadIntBig(257);
  let _last_member = sc_1.loadAddress();
  let sc_2 = sc_1.loadRef().beginParse();
  let _min_step = sc_2.loadIntBig(257);
  let _mp_fee_addr = sc_2.loadAddress();
  let _mp_fee_factor = sc_2.loadIntBig(257);
  let sc_3 = sc_2.loadRef().beginParse();
  let _mp_fee_base = sc_3.loadIntBig(257);
  let _royalty_fee_addr = sc_3.loadAddress();
  let _royalty_fee_factor = sc_3.loadIntBig(257);
  let sc_4 = sc_3.loadRef().beginParse();
  let _royalty_fee_base = sc_4.loadIntBig(257);
  let _max_bid = sc_4.loadIntBig(257);
  let _min_bid = sc_4.loadIntBig(257);
  let sc_5 = sc_4.loadRef().beginParse();
  let _created_at = sc_5.loadIntBig(257);
  let _last_bid_at = sc_5.loadIntBig(257);
  let _is_cancelled = sc_5.loadBit();
  return {
    $$type: "AuctionSaleData" as const,
    end: _end,
    end_time: _end_time,
    mp_addr: _mp_addr,
    nft_addr: _nft_addr,
    nft_owner: _nft_owner,
    last_bid: _last_bid,
    last_member: _last_member,
    min_step: _min_step,
    mp_fee_addr: _mp_fee_addr,
    mp_fee_factor: _mp_fee_factor,
    mp_fee_base: _mp_fee_base,
    royalty_fee_addr: _royalty_fee_addr,
    royalty_fee_factor: _royalty_fee_factor,
    royalty_fee_base: _royalty_fee_base,
    max_bid: _max_bid,
    min_bid: _min_bid,
    created_at: _created_at,
    last_bid_at: _last_bid_at,
    is_cancelled: _is_cancelled,
  };
}

function loadTupleAuctionSaleData(source: TupleReader) {
  let _end = source.readBoolean();
  let _end_time = source.readBigNumber();
  let _mp_addr = source.readAddress();
  let _nft_addr = source.readAddress();
  let _nft_owner = source.readAddress();
  let _last_bid = source.readBigNumber();
  let _last_member = source.readAddress();
  let _min_step = source.readBigNumber();
  let _mp_fee_addr = source.readAddress();
  let _mp_fee_factor = source.readBigNumber();
  let _mp_fee_base = source.readBigNumber();
  let _royalty_fee_addr = source.readAddress();
  let _royalty_fee_factor = source.readBigNumber();
  let _royalty_fee_base = source.readBigNumber();
  let _max_bid = source.readBigNumber();
  let _min_bid = source.readBigNumber();
  let _created_at = source.readBigNumber();
  let _last_bid_at = source.readBigNumber();
  let _is_cancelled = source.readBoolean();
  return {
    $$type: "AuctionSaleData" as const,
    end: _end,
    end_time: _end_time,
    mp_addr: _mp_addr,
    nft_addr: _nft_addr,
    nft_owner: _nft_owner,
    last_bid: _last_bid,
    last_member: _last_member,
    min_step: _min_step,
    mp_fee_addr: _mp_fee_addr,
    mp_fee_factor: _mp_fee_factor,
    mp_fee_base: _mp_fee_base,
    royalty_fee_addr: _royalty_fee_addr,
    royalty_fee_factor: _royalty_fee_factor,
    royalty_fee_base: _royalty_fee_base,
    max_bid: _max_bid,
    min_bid: _min_bid,
    created_at: _created_at,
    last_bid_at: _last_bid_at,
    is_cancelled: _is_cancelled,
  };
}

function storeTupleAuctionSaleData(source: AuctionSaleData) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.end);
  builder.writeNumber(source.end_time);
  builder.writeAddress(source.mp_addr);
  builder.writeAddress(source.nft_addr);
  builder.writeAddress(source.nft_owner);
  builder.writeNumber(source.last_bid);
  builder.writeAddress(source.last_member);
  builder.writeNumber(source.min_step);
  builder.writeAddress(source.mp_fee_addr);
  builder.writeNumber(source.mp_fee_factor);
  builder.writeNumber(source.mp_fee_base);
  builder.writeAddress(source.royalty_fee_addr);
  builder.writeNumber(source.royalty_fee_factor);
  builder.writeNumber(source.royalty_fee_base);
  builder.writeNumber(source.max_bid);
  builder.writeNumber(source.min_bid);
  builder.writeNumber(source.created_at);
  builder.writeNumber(source.last_bid_at);
  builder.writeBoolean(source.is_cancelled);
  return builder.build();
}

function dictValueParserAuctionSaleData(): DictionaryValue<AuctionSaleData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeAuctionSaleData(src)).endCell());
    },
    parse: (src) => {
      return loadAuctionSaleData(src.loadRef().beginParse());
    },
  };
}

export type AuctionData = {
  $$type: "AuctionData";
  activated: boolean;
  end: boolean;
  end_time: bigint;
  mp_addr: Address;
  nft_addr: Address;
  nft_owner: Address;
  last_bid: bigint;
  last_member: Address;
  min_step: bigint;
  mp_fee_addr: Address;
  mp_fee_factor: bigint;
  mp_fee_base: bigint;
  royalty_fee_addr: Address;
  royalty_fee_factor: bigint;
  royalty_fee_base: bigint;
  max_bid: bigint;
  min_bid: bigint;
  created_at: bigint;
  last_bid_at: bigint;
  is_cancelled: boolean;
  step_time: bigint;
  last_query_id: bigint;
};

export function storeAuctionData(src: AuctionData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.activated);
    b_0.storeBit(src.end);
    b_0.storeInt(src.end_time, 257);
    b_0.storeAddress(src.mp_addr);
    b_0.storeAddress(src.nft_addr);
    let b_1 = new Builder();
    b_1.storeAddress(src.nft_owner);
    b_1.storeInt(src.last_bid, 257);
    b_1.storeAddress(src.last_member);
    let b_2 = new Builder();
    b_2.storeInt(src.min_step, 257);
    b_2.storeAddress(src.mp_fee_addr);
    b_2.storeInt(src.mp_fee_factor, 257);
    let b_3 = new Builder();
    b_3.storeInt(src.mp_fee_base, 257);
    b_3.storeAddress(src.royalty_fee_addr);
    b_3.storeInt(src.royalty_fee_factor, 257);
    let b_4 = new Builder();
    b_4.storeInt(src.royalty_fee_base, 257);
    b_4.storeInt(src.max_bid, 257);
    b_4.storeInt(src.min_bid, 257);
    let b_5 = new Builder();
    b_5.storeInt(src.created_at, 257);
    b_5.storeInt(src.last_bid_at, 257);
    b_5.storeBit(src.is_cancelled);
    b_5.storeInt(src.step_time, 257);
    let b_6 = new Builder();
    b_6.storeInt(src.last_query_id, 257);
    b_5.storeRef(b_6.endCell());
    b_4.storeRef(b_5.endCell());
    b_3.storeRef(b_4.endCell());
    b_2.storeRef(b_3.endCell());
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

export function loadAuctionData(slice: Slice) {
  let sc_0 = slice;
  let _activated = sc_0.loadBit();
  let _end = sc_0.loadBit();
  let _end_time = sc_0.loadIntBig(257);
  let _mp_addr = sc_0.loadAddress();
  let _nft_addr = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _nft_owner = sc_1.loadAddress();
  let _last_bid = sc_1.loadIntBig(257);
  let _last_member = sc_1.loadAddress();
  let sc_2 = sc_1.loadRef().beginParse();
  let _min_step = sc_2.loadIntBig(257);
  let _mp_fee_addr = sc_2.loadAddress();
  let _mp_fee_factor = sc_2.loadIntBig(257);
  let sc_3 = sc_2.loadRef().beginParse();
  let _mp_fee_base = sc_3.loadIntBig(257);
  let _royalty_fee_addr = sc_3.loadAddress();
  let _royalty_fee_factor = sc_3.loadIntBig(257);
  let sc_4 = sc_3.loadRef().beginParse();
  let _royalty_fee_base = sc_4.loadIntBig(257);
  let _max_bid = sc_4.loadIntBig(257);
  let _min_bid = sc_4.loadIntBig(257);
  let sc_5 = sc_4.loadRef().beginParse();
  let _created_at = sc_5.loadIntBig(257);
  let _last_bid_at = sc_5.loadIntBig(257);
  let _is_cancelled = sc_5.loadBit();
  let _step_time = sc_5.loadIntBig(257);
  let sc_6 = sc_5.loadRef().beginParse();
  let _last_query_id = sc_6.loadIntBig(257);
  return {
    $$type: "AuctionData" as const,
    activated: _activated,
    end: _end,
    end_time: _end_time,
    mp_addr: _mp_addr,
    nft_addr: _nft_addr,
    nft_owner: _nft_owner,
    last_bid: _last_bid,
    last_member: _last_member,
    min_step: _min_step,
    mp_fee_addr: _mp_fee_addr,
    mp_fee_factor: _mp_fee_factor,
    mp_fee_base: _mp_fee_base,
    royalty_fee_addr: _royalty_fee_addr,
    royalty_fee_factor: _royalty_fee_factor,
    royalty_fee_base: _royalty_fee_base,
    max_bid: _max_bid,
    min_bid: _min_bid,
    created_at: _created_at,
    last_bid_at: _last_bid_at,
    is_cancelled: _is_cancelled,
    step_time: _step_time,
    last_query_id: _last_query_id,
  };
}

function loadTupleAuctionData(source: TupleReader) {
  let _activated = source.readBoolean();
  let _end = source.readBoolean();
  let _end_time = source.readBigNumber();
  let _mp_addr = source.readAddress();
  let _nft_addr = source.readAddress();
  let _nft_owner = source.readAddress();
  let _last_bid = source.readBigNumber();
  let _last_member = source.readAddress();
  let _min_step = source.readBigNumber();
  let _mp_fee_addr = source.readAddress();
  let _mp_fee_factor = source.readBigNumber();
  let _mp_fee_base = source.readBigNumber();
  let _royalty_fee_addr = source.readAddress();
  let _royalty_fee_factor = source.readBigNumber();
  let _royalty_fee_base = source.readBigNumber();
  let _max_bid = source.readBigNumber();
  let _min_bid = source.readBigNumber();
  let _created_at = source.readBigNumber();
  let _last_bid_at = source.readBigNumber();
  let _is_cancelled = source.readBoolean();
  let _step_time = source.readBigNumber();
  let _last_query_id = source.readBigNumber();
  return {
    $$type: "AuctionData" as const,
    activated: _activated,
    end: _end,
    end_time: _end_time,
    mp_addr: _mp_addr,
    nft_addr: _nft_addr,
    nft_owner: _nft_owner,
    last_bid: _last_bid,
    last_member: _last_member,
    min_step: _min_step,
    mp_fee_addr: _mp_fee_addr,
    mp_fee_factor: _mp_fee_factor,
    mp_fee_base: _mp_fee_base,
    royalty_fee_addr: _royalty_fee_addr,
    royalty_fee_factor: _royalty_fee_factor,
    royalty_fee_base: _royalty_fee_base,
    max_bid: _max_bid,
    min_bid: _min_bid,
    created_at: _created_at,
    last_bid_at: _last_bid_at,
    is_cancelled: _is_cancelled,
    step_time: _step_time,
    last_query_id: _last_query_id,
  };
}

function storeTupleAuctionData(source: AuctionData) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.activated);
  builder.writeBoolean(source.end);
  builder.writeNumber(source.end_time);
  builder.writeAddress(source.mp_addr);
  builder.writeAddress(source.nft_addr);
  builder.writeAddress(source.nft_owner);
  builder.writeNumber(source.last_bid);
  builder.writeAddress(source.last_member);
  builder.writeNumber(source.min_step);
  builder.writeAddress(source.mp_fee_addr);
  builder.writeNumber(source.mp_fee_factor);
  builder.writeNumber(source.mp_fee_base);
  builder.writeAddress(source.royalty_fee_addr);
  builder.writeNumber(source.royalty_fee_factor);
  builder.writeNumber(source.royalty_fee_base);
  builder.writeNumber(source.max_bid);
  builder.writeNumber(source.min_bid);
  builder.writeNumber(source.created_at);
  builder.writeNumber(source.last_bid_at);
  builder.writeBoolean(source.is_cancelled);
  builder.writeNumber(source.step_time);
  builder.writeNumber(source.last_query_id);
  return builder.build();
}

function dictValueParserAuctionData(): DictionaryValue<AuctionData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeAuctionData(src)).endCell());
    },
    parse: (src) => {
      return loadAuctionData(src.loadRef().beginParse());
    },
  };
}

export type Constants = {
  $$type: "Constants";
  marketplace_address: Address;
  min_bid: bigint;
  max_bid: bigint;
  min_step: bigint;
  step_time: bigint;
  nft_address: Address;
  created_at: bigint;
};

export function storeConstants(src: Constants) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.marketplace_address);
    b_0.storeCoins(src.min_bid);
    b_0.storeCoins(src.max_bid);
    b_0.storeInt(src.min_step, 257);
    let b_1 = new Builder();
    b_1.storeInt(src.step_time, 257);
    b_1.storeAddress(src.nft_address);
    b_1.storeInt(src.created_at, 257);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadConstants(slice: Slice) {
  let sc_0 = slice;
  let _marketplace_address = sc_0.loadAddress();
  let _min_bid = sc_0.loadCoins();
  let _max_bid = sc_0.loadCoins();
  let _min_step = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _step_time = sc_1.loadIntBig(257);
  let _nft_address = sc_1.loadAddress();
  let _created_at = sc_1.loadIntBig(257);
  return {
    $$type: "Constants" as const,
    marketplace_address: _marketplace_address,
    min_bid: _min_bid,
    max_bid: _max_bid,
    min_step: _min_step,
    step_time: _step_time,
    nft_address: _nft_address,
    created_at: _created_at,
  };
}

function loadTupleConstants(source: TupleReader) {
  let _marketplace_address = source.readAddress();
  let _min_bid = source.readBigNumber();
  let _max_bid = source.readBigNumber();
  let _min_step = source.readBigNumber();
  let _step_time = source.readBigNumber();
  let _nft_address = source.readAddress();
  let _created_at = source.readBigNumber();
  return {
    $$type: "Constants" as const,
    marketplace_address: _marketplace_address,
    min_bid: _min_bid,
    max_bid: _max_bid,
    min_step: _min_step,
    step_time: _step_time,
    nft_address: _nft_address,
    created_at: _created_at,
  };
}

function storeTupleConstants(source: Constants) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.marketplace_address);
  builder.writeNumber(source.min_bid);
  builder.writeNumber(source.max_bid);
  builder.writeNumber(source.min_step);
  builder.writeNumber(source.step_time);
  builder.writeAddress(source.nft_address);
  builder.writeNumber(source.created_at);
  return builder.build();
}

function dictValueParserConstants(): DictionaryValue<Constants> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeConstants(src)).endCell());
    },
    parse: (src) => {
      return loadConstants(src.loadRef().beginParse());
    },
  };
}

export type Bid = {
  $$type: "Bid";
  query_id: bigint;
};

export function storeBid(src: Bid) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1648026668, 32);
    b_0.storeInt(src.query_id, 257);
  };
}

export function loadBid(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1648026668) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadIntBig(257);
  return { $$type: "Bid" as const, query_id: _query_id };
}

function loadTupleBid(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "Bid" as const, query_id: _query_id };
}

function storeTupleBid(source: Bid) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserBid(): DictionaryValue<Bid> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeBid(src)).endCell());
    },
    parse: (src) => {
      return loadBid(src.loadRef().beginParse());
    },
  };
}

type UNftItem_init_args = {
  $$type: "UNftItem_init_args";
  collection_address: Address;
  owner: Address;
  index: bigint;
  individual_content: Cell;
  royalty: RoyaltyParams;
};

function initUNftItem_init_args(src: UNftItem_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.collection_address);
    b_0.storeAddress(src.owner);
    b_0.storeInt(src.index, 257);
    b_0.storeRef(src.individual_content);
    let b_1 = new Builder();
    b_1.store(storeRoyaltyParams(src.royalty));
    b_0.storeRef(b_1.endCell());
  };
}

async function UNftItem_init(
  collection_address: Address,
  owner: Address,
  index: bigint,
  individual_content: Cell,
  royalty: RoyaltyParams
) {
  const __code = Cell.fromBase64(
    "te6ccgECLQEACd0AART/APSkE/S88sgLAQIBYgIDA5rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVGNs88uCCyPhDAcx/AcoAVYDbPMntVCYEBQIBIBYXBPYBkjB/4HAh10nCH5UwINcLH94gwAAi10nBIbCUW/IAf+AgghCNAkL1uuMCIIIQMDBCnrqOtTDTHwGCEDAwQp668uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdRVIGwT4CCCEE4z/Ri64wKCEGInvToGBwgJAfZQmCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhaBAQHPAFAEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEszKAMzIUENQI4EBAc8AgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQEVAb4w0x8BghCNAkL1uvLggdM/ATH4QW8kVQM0W3CAQHBUNM3IVSCCEEGUspFQBMsfEss/y/8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRA0QTAUQzBtbds8fxMBslORxwXy4GT4QW8kECNfA3AEgEJwLlRLNhfIVUCCEEj/tqtQBssfFMs/Esv/zAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbMyRRDMBRDMG1t2zx/EwOqMNs8bBb4QW8kVhAjxwWRf5VWEiPHBeLy4Mgus460VVNbNDQ1ODg5UqDHBfLhkH8GIG7y0IBwgEIHyAGCEDPVjnJYyx/LP8kQOkFwf1UwbW3bPOMOfwoTCwGSuo7D0x8BghBiJ706uvLggdM/gQEB1wDSAAGS0gCSbQHi+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUVUBsFeAwcA0AwNMfAYIQTjP9GLry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAAGR1JJtAeL6AFFVFRRDMAL+VHMhIwwRFgwLERULChEUCgkREwkIERIIBxERBwYREAYQXxBO2zwwyAEREyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgERESDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFi9ukz/IyZYPIG7y0IDiUA/MUA36Ag4MAujIUAzPFslQC8zJVBkEVEmYEGwQW15UEH0QbhBfBBEQBNs8CnJwKgIBERABDshVMIIQtH4d21AFyx8Tyz+BAQHPAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbMyRBMEDpL0BRDMG1t2zwQSFUzEg4TAsAxMvhBbyRT8scF8uEsJG6z8uEtJW6z8uEuBCBu8tCAs/LhL1RyECYMERIMCxERCwoREAoQnxCOEH0GERIGBRERBQQREATbPBCfEI4QfRBsEFsQShA5SHAQNkVAQzDbPH8ODwAyE18D+CdvECGhggr68IBmtgihggr68ICgoQO0PdD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1DH6ANQw0FMxwgCSNDDjDVUz2zwboXAgEBESAYpyU2lwBchVIIIQ4cvtBVAEyx8Syz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAc8WySQQRwNQdxRDMG1t2zwTAGRsMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igw+gAxcdch+gAx+gAwpwOrAAG4yHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgixwWzk1MKvJFw4o6eUAqhcQPIAYIQM9WOcljLH8s/yRA6QaB/VTBtbds8k1s4MOITAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ABQAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAAswCEb52vtnm2eNknCYYAgEgGRoABlRyEAIBIBscAgFIIiMCEbX5+2ebZ42SsCYdAJW3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJABPlR4dlR4dlR4dggREQgHERAHEG8QXhBNEDxLqds8bJUeBDLIbwABb4xtb4wm0Ns8i1aXRlbS+Ns8KNs8ISEfIADeyCHBAJiALQHLBwGjAd4hgjgyfLJzQRnTt6mqHbmOIHAgcY4UBHqpDKYwJagSoASqBwKkIcAARTDmMDOqAs8BjitvAHCOESN6qQgSb4wBpAN6qQQgwAAU5jMipQOcUwJvgaYwWMsHAqVZ5DAx4snQATLbPG8iAcmTIW6zlgFvIlnMyegxVGWQVGugIQC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DABGwr7tRNDSAAGACAnQkJQIPoBts82zxskYmJwBzou40NWlwZnM6Ly9RbVNjS3N2aVpYY2tNZEZ3MkxiZFREdTF6a3VYUkNlNndra010SDFpcjZZdlV2ggNI7UTQ1AH4Y9IAAY6E2zxsGeD4KNcLCoMJuvLgids8B9FVBds8KCkqAAIjAfT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHU0gDU1AHQgQEB1wCBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMDMQOSsB9vpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANTUAdCBAQHXAIEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwMxA3EDYQNSwADnDIyRBnVSEAFhA4EDcQNhA1EDRYAAYQNFg="
  );
  const __system = Cell.fromBase64(
    "te6cckECLwEACecAAQHAAQEFofRhAgEU/wD0pBP0vPLICwMCAWIWBAIBIBQFAgEgDAYCAUgLBwICdAkIAHOi7jQ1aXBmczovL1FtU2NLc3ZpWlhja01kRncyTGJkVER1MXprdVhSQ2U2d2trTXRIMWlyNll2VXaCAg+gG2zzbPGyRikKAAIjABGwr7tRNDSAAGACASAODQCVt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwThOy6ctWadluZ0HSzbKM3RSQAhG1+ftnm2eNkrApDwE+VHh2VHh2VHh2CBERCAcREAcQbxBeEE0QPEup2zxslRAEMshvAAFvjG1vjCbQ2zyLVpdGVtL42zwo2zwTExIRATLbPG8iAcmTIW6zlgFvIlnMyegxVGWQVGugEwDeyCHBAJiALQHLBwGjAd4hgjgyfLJzQRnTt6mqHbmOIHAgcY4UBHqpDKYwJagSoASqBwKkIcAARTDmMDOqAs8BjitvAHCOESN6qQgSb4wBpAN6qQQgwAAU5jMipQOcUwJvgaYwWMsHAqVZ5DAx4snQALog10oh10mXIMIAIsIAsY5KA28igH8izzGrAqEFqwJRVbYIIMIAnCCqAhXXGFAzzxZAFN5ZbwJTQaHCAJnIAW8CUEShqgKOEjEzwgCZ1DDQINdKIddJknAg4uLoXwMCEb52vtnm2eNknCkVAAZUchADmtAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFUY2zzy4ILI+EMBzH8BygBVgNs8ye1UKRkXAfZQmCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhaBAQHPAFAEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEszKAMzIUENQI4EBAc8AgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQEYAALMBPYBkjB/4HAh10nCH5UwINcLH94gwAAi10nBIbCUW/IAf+AgghCNAkL1uuMCIIIQMDBCnrqOtTDTHwGCEDAwQp668uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdRVIGwT4CCCEE4z/Ri64wKCEGInvTomJSAaAZK6jsPTHwGCEGInvTq68uCB0z+BAQHXANIAAZLSAJJtAeL6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdRVQGwV4DBwGwLAMTL4QW8kU/LHBfLhLCRus/LhLSVus/LhLgQgbvLQgLPy4S9UchAmDBESDAsREQsKERAKEJ8QjhB9BhESBgUREQUEERAE2zwQnxCOEH0QbBBbEEoQOUhwEDZFQEMw2zx/IxwDtD3Q+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQx+gDUMNBTMcIAkjQw4w1VM9s8G6FwIB8eHQG4yHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgixwWzk1MKvJFw4o6eUAqhcQPIAYIQM9WOcljLH8s/yRA6QaB/VTBtbds8k1s4MOInAGRsMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igw+gAxcdch+gAx+gAwpwOrAAGKclNpcAXIVSCCEOHL7QVQBMsfEss/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHPFskkEEcDUHcUQzBtbds8JwOqMNs8bBb4QW8kVhAjxwWRf5VWEiPHBeLy4Mgus460VVNbNDQ1ODg5UqDHBfLhkH8GIG7y0IBwgEIHyAGCEDPVjnJYyx/LP8kQOkFwf1UwbW3bPOMOfyQnIQL+VHMhIwwRFgwLERULChEUCgkREwkIERIIBxERBwYREAYQXxBO2zwwyAEREyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgERESDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFi9ukz/IyZYPIG7y0IDiUA/MUA36AiMiAujIUAzPFslQC8zJVBkEVEmYEGwQW15UEH0QbhBfBBEQBNs8CnJwKgIBERABDshVMIIQtH4d21AFyx8Tyz+BAQHPAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbMyRBMEDpL0BRDMG1t2zwQSFUzEiMnADITXwP4J28QIaGCCvrwgGa2CKGCCvrwgKChAMDTHwGCEE4z/Ri68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gABkdSSbQHi+gBRVRUUQzABslORxwXy4GT4QW8kECNfA3AEgEJwLlRLNhfIVUCCEEj/tqtQBssfFMs/Esv/zAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbMyRRDMBRDMG1t2zx/JwG+MNMfAYIQjQJC9bry4IHTPwEx+EFvJFUDNFtwgEBwVDTNyFUgghBBlLKRUATLHxLLP8v/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskQNEEwFEMwbW3bPH8nAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ACgAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwDSO1E0NQB+GPSAAGOhNs8bBng+CjXCwqDCbry4InbPAfRVQXbPC0rKgAOcMjJEGdVIQH2+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA1NQB0IEBAdcAgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzAzEDcQNhA1LAAGEDRYAfT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHU0gDU1AHQgQEB1wCBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMDMQOS4AFhA4EDcQNhA1EDRY2tNjUA=="
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initUNftItem_init_args({
    $$type: "UNftItem_init_args",
    collection_address,
    owner,
    index,
    individual_content,
    royalty,
  })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const UNftItem_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack undeflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
};

const UNftItem_types: ABIType[] = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
    ],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "RoyaltyParams",
    header: null,
    fields: [
      {
        name: "numerator",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "denominator",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "destination",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "CollectionData",
    header: null,
    fields: [
      {
        name: "next_item_index",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "collection_content",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "owner_address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ItemData",
    header: null,
    fields: [
      {
        name: "is_initialized",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "index",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "collection_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "owner_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "individual_content",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "PriceRangeConfig",
    header: null,
    fields: [
      {
        name: "start",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "end",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "GetCardLinkStatus",
    header: 3028164059,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "item_index",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "initiator",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "payload",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "ReportCardLinkStatus",
    header: 1646771514,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "item_index",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "is_linked_to_card",
        type: { kind: "simple", type: "bool", optional: true },
      },
      {
        name: "initiator",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "payload",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "Transfer",
    header: 1312029976,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "new_owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "response_destination",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "custom_payload",
        type: { kind: "simple", type: "cell", optional: true },
      },
      {
        name: "forward_amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "forward_payload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "Excesses",
    header: 869633650,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "OwnershipAssigned",
    header: 3788238085,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "prev_owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "forward_payload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "GetStaticData",
    header: 2365735669,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "ReportStaticData",
    header: 1100264081,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "index",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "collection",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "GetUsernameData",
    header: 808469150,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "initiator",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "payload",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "ReportUsernameData",
    header: 1224717995,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "item_index",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "token_name",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "initiator",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "payload",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "GetRoyaltyParams",
    header: 435086716,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "ReportRoyaltyParams",
    header: 634900346,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "numerator",
        type: { kind: "simple", type: "uint", optional: false, format: 16 },
      },
      {
        name: "denominator",
        type: { kind: "simple", type: "uint", optional: false, format: 16 },
      },
      {
        name: "destination",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "UnlinkCard",
    header: 1323911271,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "index",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "initiator",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "UpdateUsernameLinkedStatus",
    header: 3479701466,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "index",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "initiator",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "status",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
  {
    name: "UpdateAllowedContract",
    header: 3161124927,
    fields: [
      {
        name: "allowed_contract",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "MintCard",
    header: 425813829,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "username_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "bio",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "pfp",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "CardMetadata",
    header: null,
    fields: [
      { name: "bio", type: { kind: "simple", type: "cell", optional: false } },
      { name: "pfp", type: { kind: "simple", type: "cell", optional: false } },
      {
        name: "username",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "Initialize",
    header: 3568268437,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "new_owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "response_destination",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "authority",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "payload",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "ProveOwnership",
    header: 3956722467,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "dest",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "forward_payload",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "with_content",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
  {
    name: "OwnershipProof",
    header: 1882676056,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "item_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
      {
        name: "revoked_at",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "content",
        type: { kind: "simple", type: "cell", optional: true },
      },
    ],
  },
  {
    name: "RequestOwner",
    header: 2177359512,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "dest",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "forward_payload",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "with_content",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
  {
    name: "OwnerInfo",
    header: 3617594864,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "item_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "initiator",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
      {
        name: "revoked_at",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "content",
        type: { kind: "simple", type: "cell", optional: true },
      },
    ],
  },
  {
    name: "Destroy",
    header: 473171199,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "Revoke",
    header: 2711683139,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "Fees",
    header: null,
    fields: [
      {
        name: "marketplace_fee_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "marketplace_fee",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "royalty_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "royalty_amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "SaleData",
    header: null,
    fields: [
      {
        name: "is_complete",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "created_at",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "marketplace_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "nft_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "nft_owner_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "full_price",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "marketplace_fee_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "marketplace_fee",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "royalty_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "royalty_amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "FixPriceData",
    header: null,
    fields: [
      {
        name: "is_complete",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "created_at",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "marketplace_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "nft_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "nft_owner_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "full_price",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "marketplace_fee_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "marketplace_fee",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "royalty_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "royalty_amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "sold_at",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "query_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Buy",
    header: 3883912433,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "ChangeFees",
    header: 4270310251,
    fields: [
      {
        name: "new_full_price",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "new_marketplace_fee",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "new_royalty_amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
    ],
  },
  {
    name: "CancelSale",
    header: 1383729328,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "FeesAddressStruct",
    header: null,
    fields: [
      {
        name: "mp_fee_addr",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "royalty_fee_addr",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "AuctionSaleData",
    header: null,
    fields: [
      { name: "end", type: { kind: "simple", type: "bool", optional: false } },
      {
        name: "end_time",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mp_addr",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "nft_addr",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "nft_owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "last_bid",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "last_member",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "min_step",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mp_fee_addr",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "mp_fee_factor",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mp_fee_base",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "royalty_fee_addr",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "royalty_fee_factor",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "royalty_fee_base",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "max_bid",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "min_bid",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "created_at",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "last_bid_at",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "is_cancelled",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
  {
    name: "AuctionData",
    header: null,
    fields: [
      {
        name: "activated",
        type: { kind: "simple", type: "bool", optional: false },
      },
      { name: "end", type: { kind: "simple", type: "bool", optional: false } },
      {
        name: "end_time",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mp_addr",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "nft_addr",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "nft_owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "last_bid",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "last_member",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "min_step",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mp_fee_addr",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "mp_fee_factor",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mp_fee_base",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "royalty_fee_addr",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "royalty_fee_factor",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "royalty_fee_base",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "max_bid",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "min_bid",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "created_at",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "last_bid_at",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "is_cancelled",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "step_time",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "last_query_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Constants",
    header: null,
    fields: [
      {
        name: "marketplace_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "min_bid",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "max_bid",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "min_step",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "step_time",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "nft_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "created_at",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Bid",
    header: 1648026668,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
];

const UNftItem_getters: ABIGetter[] = [
  {
    name: "get_nft_data",
    arguments: [],
    returnType: { kind: "simple", type: "ItemData", optional: false },
  },
  {
    name: "get_token_name",
    arguments: [],
    returnType: { kind: "simple", type: "cell", optional: false },
  },
  {
    name: "royalty_params",
    arguments: [],
    returnType: { kind: "simple", type: "RoyaltyParams", optional: false },
  },
];

const UNftItem_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "empty" } },
  { receiver: "internal", message: { kind: "typed", type: "GetStaticData" } },
  { receiver: "internal", message: { kind: "typed", type: "GetUsernameData" } },
  { receiver: "internal", message: { kind: "typed", type: "Transfer" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "ReportCardLinkStatus" },
  },
];

export class UNftItem implements Contract {
  static async init(
    collection_address: Address,
    owner: Address,
    index: bigint,
    individual_content: Cell,
    royalty: RoyaltyParams
  ) {
    return await UNftItem_init(
      collection_address,
      owner,
      index,
      individual_content,
      royalty
    );
  }

  static async fromInit(
    collection_address: Address,
    owner: Address,
    index: bigint,
    individual_content: Cell,
    royalty: RoyaltyParams
  ) {
    const init = await UNftItem_init(
      collection_address,
      owner,
      index,
      individual_content,
      royalty
    );
    const address = contractAddress(0, init);
    return new UNftItem(address, init);
  }

  static fromAddress(address: Address) {
    return new UNftItem(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: UNftItem_types,
    getters: UNftItem_getters,
    receivers: UNftItem_receivers,
    errors: UNftItem_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | null
      | GetStaticData
      | GetUsernameData
      | Transfer
      | ReportCardLinkStatus
  ) {
    let body: Cell | null = null;
    if (message === null) {
      body = new Cell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "GetStaticData"
    ) {
      body = beginCell().store(storeGetStaticData(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "GetUsernameData"
    ) {
      body = beginCell().store(storeGetUsernameData(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Transfer"
    ) {
      body = beginCell().store(storeTransfer(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "ReportCardLinkStatus"
    ) {
      body = beginCell().store(storeReportCardLinkStatus(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getGetNftData(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("get_nft_data", builder.build())).stack;
    const result = loadTupleItemData(source);
    return result;
  }

  async getGetTokenName(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("get_token_name", builder.build())).stack;
    let result = source.readCell();
    return result;
  }

  async getRoyaltyParams(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("royalty_params", builder.build())).stack;
    const result = loadTupleRoyaltyParams(source);
    return result;
  }
}
