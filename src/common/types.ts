export enum ActivityType {
  Listing = 'Listing',
  Bid = 'Bid',
  Cancel = 'Cancel',
  Sale = 'Sale',

  // all purchases are recorded as sales in DB
  // so for the purpose of the filter, Purchase types
  // are sales and we'll handle the filtering in the actual endpoint logic
  Purchase = 'Purchase',
  Transfer = 'Transfer',
  Swap = 'Swap',
}

export enum ActivityStatus {
  Valid = 'Valid',
  Cancelled = 'Cancelled',
  Executed = 'Executed',
}

export enum OpenseaQueryParamType {
  TOKEN_IDS = 'token_ids',
  ASSET_CONTRACT_ADDRESSES = 'asset_contract_addresses',
  ASSET_CONTRACT_ADDRESS = 'asset_contract_address',
}

interface MakerOrTaker {
  address: string;
}
interface OpenseaBaseOrder {
  created_date: string;
  closing_date: string;
  closing_extendable?: boolean;
  expiration_time: number;
  listing_time: number;
  order_hash: string;
  current_price: string;
  maker: MakerOrTaker;
  taker: MakerOrTaker;
  cancelled: boolean;
  finalized: boolean;
  marked_invalid: boolean;
  approved_on_chain?: boolean;
}

export interface WyvernOrder extends OpenseaBaseOrder {
  payment_token_contract: {
    symbol: string;
    address: string;
    image_url: string;
    name: string;
    decimals: number;
    eth_price: string;
    usd_price: string;
  };
  metadata: any;
  exchange: string;
  current_bounty: string;
  bounty_multiple: string;
  maker_relayer_fee: string;
  taker_relayer_fee: string;
  maker_protocol_fee: string;
  taker_protocol_fee: string;
  maker_referrer_fee: string;
  fee_recipient: any;
  fee_method: number;
  side: number;
  sale_kind: number;
  target: string;
  how_to_call: number;
  calldata: string;
  replacement_pattern: string;
  static_target: string;
  static_extradata: string;
  payment_token: string;
  base_price: string;
  extra: string;
  quantity: string;
  salt: string;
  v: number;
  r: string;
  s: string;
  prefixed_hash: string;
}

interface MakerOrTakerFees {
  account: {
    address: string;
  };
  basis_points: string;
}

export interface SeaportOffer {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
}

export interface SeaportConsideration extends SeaportOffer {
  recipient: string;
}

type PrimaryType =
  | 'EIP712Domain'
  | 'OrderComponents'
  | 'OfferItem'
  | 'ConsiderationItem';

export enum OrderType {
  FULL_OPEN = 0, // No partial fills, anyone can execute
  PARTIAL_OPEN = 1, // Partial fills supported, anyone can execute
  FULL_RESTRICTED = 2, // No partial fills, only offerer or zone can execute
  PARTIAL_RESTRICTED = 3, // Partial fills supported, only offerer or zone can execute
}

export type OfferItem = {
  itemType: number;
  token: string;
  identifierOrCriteria: string; // BigNumber / uint256
  startAmount: string; // BigNumber / uint256
  endAmount: string; // BigNumber / uint256
};

export type ConsiderationItem = {
  itemType: number;
  token: string;
  identifierOrCriteria: string; // BigNumber / uint256
  startAmount: string; // BigNumber / uint256
  endAmount: string; // BigNumber / uint256
  recipient: string;
};

export type OrderComponent = {
  offerer: string;
  offer: OfferItem[];
  consideration: Consideration[];
  startTime: string;
  endTime: string;
  orderType: number;
  zone: string;
  zoneHash: string;
  salt: string;
  conduitKey: string;
  totalOriginalConsiderationItems: number;
  counter: number;
};

export interface Domain {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
}

export type Types = {
  EIP712Domain: { name: string; type: string }[];
  OrderComponents: { name: string; type: string }[];
  OfferItem: { name: string; type: string }[];
  ConsiderationItem: { name: string; type: string }[];
};

// type TEIP712Domain = { name: string; type: string }

export interface Parameters {
  types: Types;
  primaryType: PrimaryType;
  domain: Domain;
  message: OrderComponent;
}

export interface SeaportOrder extends OpenseaBaseOrder {
  protocol_data: {
    parameters: {
      offerer: string;
      offer: SeaportOffer[];
      consideration: SeaportConsideration[];
      startTime: string;
      endTime: string;
      orderType: number;
      zone: string;
      zoneHash: string;
      salt: string;
      conduitKey: string;
      totalOriginalConsiderationItems: number;
      counter: number | string; // part of seaport 1.4 upgrade -> new counters will be strings and old counters will be numbers
    };
    signature: string;
  };
  protocol_address: string;
  maker_fees: MakerOrTakerFees[];
  taker_fees: MakerOrTakerFees[] | null;
  side: string;
  order_type: string;
  client_signature: string;
  relay_id: string;
  criteria_proof: any;
}

export interface ListingPayload {
  listing: {
    hash: string;
    chain: string;
    protocol_address: string;
  };
  fulfiller: {
    address: string;
  };
}

interface AdditionalRecipient {
  amount: number;
  recipient: string;
}

interface Asset {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
}

interface Consideration {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
  recipient: string;
}

export interface OrderParameters {
  offerer: string;
  offer: Asset[];
  consideration: Consideration[];
  startTime: string;
  endTime: string;
  orderType: number;
  zone: string;
  zoneHash: string;
  salt: string;
  conduitKey: string;
  totalOriginalConsiderationItems: number;
  counter: number;
}

interface Order {
  parameters: OrderParameters;
  signature: string;
}

export interface FulfillmentData {
  fulfillment_data: {
    transaction: {
      function: string;
      chain: number;
      to: string;
      value: number;
      input_data: {
        parameters: {
          considerationToken: string;
          considerationIdentifier: number;
          considerationAmount: number;
          offerer: string;
          zone: string;
          offerToken: string;
          offerIdentifier: number;
          offerAmount: number;
          basicOrderType: number;
          startTime: number;
          endTime: number;
          zoneHash: string;
          salt: number;
          offererConduitKey: string;
          fulfillerConduitKey: string;
          totalOriginalAdditionalRecipients: number;
          additionalRecipients: AdditionalRecipient[];
          signature: string;
        };
      };
    };
    orders: Order[];
  };
}

export interface OpenseaOrderRequest {
  contract: string;
  tokenId: string;
  chainId: string;
}
