export const FULFILLADVANCEDORDER_ABI = {
  inputs: [
    {
      components: [
        {
          components: [
            { internalType: 'address', name: 'offerer', type: 'address' },
            { internalType: 'address', name: 'zone', type: 'address' },
            {
              components: [
                {
                  internalType: 'enum ItemType',
                  name: 'itemType',
                  type: 'uint8',
                },
                { internalType: 'address', name: 'token', type: 'address' },
                {
                  internalType: 'uint256',
                  name: 'identifierOrCriteria',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'startAmount',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'endAmount',
                  type: 'uint256',
                },
              ],
              internalType: 'struct OfferItem[]',
              name: 'offer',
              type: 'tuple[]',
            },
            {
              components: [
                {
                  internalType: 'enum ItemType',
                  name: 'itemType',
                  type: 'uint8',
                },
                { internalType: 'address', name: 'token', type: 'address' },
                {
                  internalType: 'uint256',
                  name: 'identifierOrCriteria',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'startAmount',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'endAmount',
                  type: 'uint256',
                },
                {
                  internalType: 'address payable',
                  name: 'recipient',
                  type: 'address',
                },
              ],
              internalType: 'struct ConsiderationItem[]',
              name: 'consideration',
              type: 'tuple[]',
            },
            {
              internalType: 'enum OrderType',
              name: 'orderType',
              type: 'uint8',
            },
            { internalType: 'uint256', name: 'startTime', type: 'uint256' },
            { internalType: 'uint256', name: 'endTime', type: 'uint256' },
            { internalType: 'bytes32', name: 'zoneHash', type: 'bytes32' },
            { internalType: 'uint256', name: 'salt', type: 'uint256' },
            {
              internalType: 'bytes32',
              name: 'conduitKey',
              type: 'bytes32',
            },
            {
              internalType: 'uint256',
              name: 'totalOriginalConsiderationItems',
              type: 'uint256',
            },
          ],
          internalType: 'struct OrderParameters',
          name: 'parameters',
          type: 'tuple',
        },
        { internalType: 'uint120', name: 'numerator', type: 'uint120' },
        { internalType: 'uint120', name: 'denominator', type: 'uint120' },
        { internalType: 'bytes', name: 'signature', type: 'bytes' },
        { internalType: 'bytes', name: 'extraData', type: 'bytes' },
      ],
      internalType: 'struct AdvancedOrder',
      name: '',
      type: 'tuple',
    },
    {
      components: [
        { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
        { internalType: 'enum Side', name: 'side', type: 'uint8' },
        { internalType: 'uint256', name: 'index', type: 'uint256' },
        { internalType: 'uint256', name: 'identifier', type: 'uint256' },
        {
          internalType: 'bytes32[]',
          name: 'criteriaProof',
          type: 'bytes32[]',
        },
      ],
      internalType: 'struct CriteriaResolver[]',
      name: '',
      type: 'tuple[]',
    },
    {
      internalType: 'bytes32',
      name: 'fulfillerConduitKey',
      type: 'bytes32',
    },
    { internalType: 'address', name: 'recipient', type: 'address' },
  ],
  name: 'fulfillAdvancedOrder',
  outputs: [{ internalType: 'bool', name: 'fulfilled', type: 'bool' }],
  stateMutability: 'payable',
  type: 'function',
};

export const INKUBATE_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'conduitController', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'BadContractSignature', type: 'error' },
  { inputs: [], name: 'BadFraction', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'BadReturnValueFromERC20OnTransfer',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'v', type: 'uint8' }],
    name: 'BadSignatureV',
    type: 'error',
  },
  { inputs: [], name: 'CannotCancelOrder', type: 'error' },
  {
    inputs: [],
    name: 'ConsiderationCriteriaResolverOutOfRange',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ConsiderationLengthNotEqualToTotalOriginal',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'considerationIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'shortfallAmount', type: 'uint256' },
    ],
    name: 'ConsiderationNotMet',
    type: 'error',
  },
  { inputs: [], name: 'CriteriaNotEnabledForItem', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256[]', name: 'identifiers', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
    ],
    name: 'ERC1155BatchTransferGenericFailure',
    type: 'error',
  },
  { inputs: [], name: 'InexactFraction', type: 'error' },
  { inputs: [], name: 'InsufficientNativeTokensSupplied', type: 'error' },
  { inputs: [], name: 'Invalid1155BatchTransferEncoding', type: 'error' },
  { inputs: [], name: 'InvalidBasicOrderParameterEncoding', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'conduit', type: 'address' }],
    name: 'InvalidCallToConduit',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
      { internalType: 'address', name: 'conduit', type: 'address' },
    ],
    name: 'InvalidConduit',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'orderHash', type: 'bytes32' }],
    name: 'InvalidContractOrder',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'InvalidERC721TransferAmount',
    type: 'error',
  },
  { inputs: [], name: 'InvalidFulfillmentComponentData', type: 'error' },
  {
    inputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
    name: 'InvalidMsgValue',
    type: 'error',
  },
  { inputs: [], name: 'InvalidNativeOfferItem', type: 'error' },
  { inputs: [], name: 'InvalidProof', type: 'error' },
  {
    inputs: [{ internalType: 'bytes32', name: 'orderHash', type: 'bytes32' }],
    name: 'InvalidRestrictedOrder',
    type: 'error',
  },
  { inputs: [], name: 'InvalidSignature', type: 'error' },
  { inputs: [], name: 'InvalidSigner', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'startTime', type: 'uint256' },
      { internalType: 'uint256', name: 'endTime', type: 'uint256' },
    ],
    name: 'InvalidTime',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'fulfillmentIndex', type: 'uint256' },
    ],
    name: 'MismatchedFulfillmentOfferAndConsiderationComponents',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'enum Side', name: 'side', type: 'uint8' }],
    name: 'MissingFulfillmentComponentOnAggregation',
    type: 'error',
  },
  { inputs: [], name: 'MissingItemAmount', type: 'error' },
  { inputs: [], name: 'MissingOriginalConsiderationItems', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'NativeTokenTransferGenericFailure',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'NoContract',
    type: 'error',
  },
  { inputs: [], name: 'NoReentrantCalls', type: 'error' },
  { inputs: [], name: 'NoSpecifiedOrdersAvailable', type: 'error' },
  {
    inputs: [],
    name: 'OfferAndConsiderationRequiredOnFulfillment',
    type: 'error',
  },
  { inputs: [], name: 'OfferCriteriaResolverOutOfRange', type: 'error' },
  {
    inputs: [{ internalType: 'bytes32', name: 'orderHash', type: 'bytes32' }],
    name: 'OrderAlreadyFilled',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'enum Side', name: 'side', type: 'uint8' }],
    name: 'OrderCriteriaResolverOutOfRange',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'orderHash', type: 'bytes32' }],
    name: 'OrderIsCancelled',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'orderHash', type: 'bytes32' }],
    name: 'OrderPartiallyFilled',
    type: 'error',
  },
  { inputs: [], name: 'PartialFillsNotEnabledForOrder', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'identifier', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'TokenTransferGenericFailure',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'considerationIndex', type: 'uint256' },
    ],
    name: 'UnresolvedConsiderationCriteria',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'offerIndex', type: 'uint256' },
    ],
    name: 'UnresolvedOfferCriteria',
    type: 'error',
  },
  { inputs: [], name: 'UnusedItemParameters', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newCounter',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'offerer',
        type: 'address',
      },
    ],
    name: 'CounterIncremented',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'offerer',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: 'zone', type: 'address' },
    ],
    name: 'OrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'offerer',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: 'zone', type: 'address' },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        components: [
          { internalType: 'enum ItemType', name: 'itemType', type: 'uint8' },
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'identifier', type: 'uint256' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        indexed: false,
        internalType: 'struct SpentItem[]',
        name: 'offer',
        type: 'tuple[]',
      },
      {
        components: [
          { internalType: 'enum ItemType', name: 'itemType', type: 'uint8' },
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'identifier', type: 'uint256' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          {
            internalType: 'address payable',
            name: 'recipient',
            type: 'address',
          },
        ],
        indexed: false,
        internalType: 'struct ReceivedItem[]',
        name: 'consideration',
        type: 'tuple[]',
      },
    ],
    name: 'OrderFulfilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        components: [
          { internalType: 'address', name: 'offerer', type: 'address' },
          { internalType: 'address', name: 'zone', type: 'address' },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              { internalType: 'address', name: 'token', type: 'address' },
              {
                internalType: 'uint256',
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              { internalType: 'uint256', name: 'startAmount', type: 'uint256' },
              { internalType: 'uint256', name: 'endAmount', type: 'uint256' },
            ],
            internalType: 'struct OfferItem[]',
            name: 'offer',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              { internalType: 'address', name: 'token', type: 'address' },
              {
                internalType: 'uint256',
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              { internalType: 'uint256', name: 'startAmount', type: 'uint256' },
              { internalType: 'uint256', name: 'endAmount', type: 'uint256' },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ConsiderationItem[]',
            name: 'consideration',
            type: 'tuple[]',
          },
          { internalType: 'enum OrderType', name: 'orderType', type: 'uint8' },
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'bytes32', name: 'zoneHash', type: 'bytes32' },
          { internalType: 'uint256', name: 'salt', type: 'uint256' },
          { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
          {
            internalType: 'uint256',
            name: 'totalOriginalConsiderationItems',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct OrderParameters',
        name: 'orderParameters',
        type: 'tuple',
      },
    ],
    name: 'OrderValidated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32[]',
        name: 'orderHashes',
        type: 'bytes32[]',
      },
    ],
    name: 'OrdersMatched',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'offerer', type: 'address' },
          { internalType: 'address', name: 'zone', type: 'address' },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              { internalType: 'address', name: 'token', type: 'address' },
              {
                internalType: 'uint256',
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              { internalType: 'uint256', name: 'startAmount', type: 'uint256' },
              { internalType: 'uint256', name: 'endAmount', type: 'uint256' },
            ],
            internalType: 'struct OfferItem[]',
            name: 'offer',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              { internalType: 'address', name: 'token', type: 'address' },
              {
                internalType: 'uint256',
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              { internalType: 'uint256', name: 'startAmount', type: 'uint256' },
              { internalType: 'uint256', name: 'endAmount', type: 'uint256' },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ConsiderationItem[]',
            name: 'consideration',
            type: 'tuple[]',
          },
          { internalType: 'enum OrderType', name: 'orderType', type: 'uint8' },
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'bytes32', name: 'zoneHash', type: 'bytes32' },
          { internalType: 'uint256', name: 'salt', type: 'uint256' },
          { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
          { internalType: 'uint256', name: 'counter', type: 'uint256' },
        ],
        internalType: 'struct OrderComponents[]',
        name: 'orders',
        type: 'tuple[]',
      },
    ],
    name: 'cancel',
    outputs: [{ internalType: 'bool', name: 'cancelled', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  FULFILLADVANCEDORDER_ABI,
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'address', name: 'offerer', type: 'address' },
              { internalType: 'address', name: 'zone', type: 'address' },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { internalType: 'address', name: 'token', type: 'address' },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { internalType: 'address', name: 'token', type: 'address' },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              { internalType: 'uint256', name: 'startTime', type: 'uint256' },
              { internalType: 'uint256', name: 'endTime', type: 'uint256' },
              { internalType: 'bytes32', name: 'zoneHash', type: 'bytes32' },
              { internalType: 'uint256', name: 'salt', type: 'uint256' },
              { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          { internalType: 'uint120', name: 'numerator', type: 'uint120' },
          { internalType: 'uint120', name: 'denominator', type: 'uint120' },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
          { internalType: 'bytes', name: 'extraData', type: 'bytes' },
        ],
        internalType: 'struct AdvancedOrder[]',
        name: '',
        type: 'tuple[]',
      },
      {
        components: [
          { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
          { internalType: 'enum Side', name: 'side', type: 'uint8' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
          { internalType: 'uint256', name: 'identifier', type: 'uint256' },
          {
            internalType: 'bytes32[]',
            name: 'criteriaProof',
            type: 'bytes32[]',
          },
        ],
        internalType: 'struct CriteriaResolver[]',
        name: '',
        type: 'tuple[]',
      },
      {
        components: [
          { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
          { internalType: 'uint256', name: 'itemIndex', type: 'uint256' },
        ],
        internalType: 'struct FulfillmentComponent[][]',
        name: '',
        type: 'tuple[][]',
      },
      {
        components: [
          { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
          { internalType: 'uint256', name: 'itemIndex', type: 'uint256' },
        ],
        internalType: 'struct FulfillmentComponent[][]',
        name: '',
        type: 'tuple[][]',
      },
      { internalType: 'bytes32', name: 'fulfillerConduitKey', type: 'bytes32' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'maximumFulfilled', type: 'uint256' },
    ],
    name: 'fulfillAvailableAdvancedOrders',
    outputs: [
      { internalType: 'bool[]', name: '', type: 'bool[]' },
      {
        components: [
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              { internalType: 'address', name: 'token', type: 'address' },
              { internalType: 'uint256', name: 'identifier', type: 'uint256' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ReceivedItem',
            name: 'item',
            type: 'tuple',
          },
          { internalType: 'address', name: 'offerer', type: 'address' },
          { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
        ],
        internalType: 'struct Execution[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'address', name: 'offerer', type: 'address' },
              { internalType: 'address', name: 'zone', type: 'address' },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { internalType: 'address', name: 'token', type: 'address' },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { internalType: 'address', name: 'token', type: 'address' },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              { internalType: 'uint256', name: 'startTime', type: 'uint256' },
              { internalType: 'uint256', name: 'endTime', type: 'uint256' },
              { internalType: 'bytes32', name: 'zoneHash', type: 'bytes32' },
              { internalType: 'uint256', name: 'salt', type: 'uint256' },
              { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
        ],
        internalType: 'struct Order[]',
        name: '',
        type: 'tuple[]',
      },
      {
        components: [
          { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
          { internalType: 'uint256', name: 'itemIndex', type: 'uint256' },
        ],
        internalType: 'struct FulfillmentComponent[][]',
        name: '',
        type: 'tuple[][]',
      },
      {
        components: [
          { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
          { internalType: 'uint256', name: 'itemIndex', type: 'uint256' },
        ],
        internalType: 'struct FulfillmentComponent[][]',
        name: '',
        type: 'tuple[][]',
      },
      { internalType: 'bytes32', name: 'fulfillerConduitKey', type: 'bytes32' },
      { internalType: 'uint256', name: 'maximumFulfilled', type: 'uint256' },
    ],
    name: 'fulfillAvailableOrders',
    outputs: [
      { internalType: 'bool[]', name: '', type: 'bool[]' },
      {
        components: [
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              { internalType: 'address', name: 'token', type: 'address' },
              { internalType: 'uint256', name: 'identifier', type: 'uint256' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ReceivedItem',
            name: 'item',
            type: 'tuple',
          },
          { internalType: 'address', name: 'offerer', type: 'address' },
          { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
        ],
        internalType: 'struct Execution[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'considerationToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'considerationIdentifier',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'considerationAmount',
            type: 'uint256',
          },
          { internalType: 'address payable', name: 'offerer', type: 'address' },
          { internalType: 'address', name: 'zone', type: 'address' },
          { internalType: 'address', name: 'offerToken', type: 'address' },
          { internalType: 'uint256', name: 'offerIdentifier', type: 'uint256' },
          { internalType: 'uint256', name: 'offerAmount', type: 'uint256' },
          {
            internalType: 'enum BasicOrderType',
            name: 'basicOrderType',
            type: 'uint8',
          },
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'bytes32', name: 'zoneHash', type: 'bytes32' },
          { internalType: 'uint256', name: 'salt', type: 'uint256' },
          {
            internalType: 'bytes32',
            name: 'offererConduitKey',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'fulfillerConduitKey',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'totalOriginalAdditionalRecipients',
            type: 'uint256',
          },
          {
            components: [
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct AdditionalRecipient[]',
            name: 'additionalRecipients',
            type: 'tuple[]',
          },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
        ],
        internalType: 'struct BasicOrderParameters',
        name: 'parameters',
        type: 'tuple',
      },
    ],
    name: 'fulfillBasicOrder',
    outputs: [{ internalType: 'bool', name: 'fulfilled', type: 'bool' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'considerationToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'considerationIdentifier',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'considerationAmount',
            type: 'uint256',
          },
          { internalType: 'address payable', name: 'offerer', type: 'address' },
          { internalType: 'address', name: 'zone', type: 'address' },
          { internalType: 'address', name: 'offerToken', type: 'address' },
          { internalType: 'uint256', name: 'offerIdentifier', type: 'uint256' },
          { internalType: 'uint256', name: 'offerAmount', type: 'uint256' },
          {
            internalType: 'enum BasicOrderType',
            name: 'basicOrderType',
            type: 'uint8',
          },
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'bytes32', name: 'zoneHash', type: 'bytes32' },
          { internalType: 'uint256', name: 'salt', type: 'uint256' },
          {
            internalType: 'bytes32',
            name: 'offererConduitKey',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'fulfillerConduitKey',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'totalOriginalAdditionalRecipients',
            type: 'uint256',
          },
          {
            components: [
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct AdditionalRecipient[]',
            name: 'additionalRecipients',
            type: 'tuple[]',
          },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
        ],
        internalType: 'struct BasicOrderParameters',
        name: 'parameters',
        type: 'tuple',
      },
    ],
    name: 'fulfillBasicOrder_efficient_6GL6yc',
    outputs: [{ internalType: 'bool', name: 'fulfilled', type: 'bool' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'address', name: 'offerer', type: 'address' },
              { internalType: 'address', name: 'zone', type: 'address' },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { internalType: 'address', name: 'token', type: 'address' },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { internalType: 'address', name: 'token', type: 'address' },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              { internalType: 'uint256', name: 'startTime', type: 'uint256' },
              { internalType: 'uint256', name: 'endTime', type: 'uint256' },
              { internalType: 'bytes32', name: 'zoneHash', type: 'bytes32' },
              { internalType: 'uint256', name: 'salt', type: 'uint256' },
              { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
        ],
        internalType: 'struct Order',
        name: '',
        type: 'tuple',
      },
      { internalType: 'bytes32', name: 'fulfillerConduitKey', type: 'bytes32' },
    ],
    name: 'fulfillOrder',
    outputs: [{ internalType: 'bool', name: 'fulfilled', type: 'bool' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'contractOfferer', type: 'address' },
    ],
    name: 'getContractOffererNonce',
    outputs: [{ internalType: 'uint256', name: 'nonce', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'offerer', type: 'address' }],
    name: 'getCounter',
    outputs: [{ internalType: 'uint256', name: 'counter', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'offerer', type: 'address' },
          { internalType: 'address', name: 'zone', type: 'address' },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              { internalType: 'address', name: 'token', type: 'address' },
              {
                internalType: 'uint256',
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              { internalType: 'uint256', name: 'startAmount', type: 'uint256' },
              { internalType: 'uint256', name: 'endAmount', type: 'uint256' },
            ],
            internalType: 'struct OfferItem[]',
            name: 'offer',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              { internalType: 'address', name: 'token', type: 'address' },
              {
                internalType: 'uint256',
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              { internalType: 'uint256', name: 'startAmount', type: 'uint256' },
              { internalType: 'uint256', name: 'endAmount', type: 'uint256' },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ConsiderationItem[]',
            name: 'consideration',
            type: 'tuple[]',
          },
          { internalType: 'enum OrderType', name: 'orderType', type: 'uint8' },
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'bytes32', name: 'zoneHash', type: 'bytes32' },
          { internalType: 'uint256', name: 'salt', type: 'uint256' },
          { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
          { internalType: 'uint256', name: 'counter', type: 'uint256' },
        ],
        internalType: 'struct OrderComponents',
        name: '',
        type: 'tuple',
      },
    ],
    name: 'getOrderHash',
    outputs: [{ internalType: 'bytes32', name: 'orderHash', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'orderHash', type: 'bytes32' }],
    name: 'getOrderStatus',
    outputs: [
      { internalType: 'bool', name: 'isValidated', type: 'bool' },
      { internalType: 'bool', name: 'isCancelled', type: 'bool' },
      { internalType: 'uint256', name: 'totalFilled', type: 'uint256' },
      { internalType: 'uint256', name: 'totalSize', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'incrementCounter',
    outputs: [{ internalType: 'uint256', name: 'newCounter', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'information',
    outputs: [
      { internalType: 'string', name: 'version', type: 'string' },
      { internalType: 'bytes32', name: 'domainSeparator', type: 'bytes32' },
      { internalType: 'address', name: 'conduitController', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'address', name: 'offerer', type: 'address' },
              { internalType: 'address', name: 'zone', type: 'address' },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { internalType: 'address', name: 'token', type: 'address' },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { internalType: 'address', name: 'token', type: 'address' },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              { internalType: 'uint256', name: 'startTime', type: 'uint256' },
              { internalType: 'uint256', name: 'endTime', type: 'uint256' },
              { internalType: 'bytes32', name: 'zoneHash', type: 'bytes32' },
              { internalType: 'uint256', name: 'salt', type: 'uint256' },
              { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          { internalType: 'uint120', name: 'numerator', type: 'uint120' },
          { internalType: 'uint120', name: 'denominator', type: 'uint120' },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
          { internalType: 'bytes', name: 'extraData', type: 'bytes' },
        ],
        internalType: 'struct AdvancedOrder[]',
        name: '',
        type: 'tuple[]',
      },
      {
        components: [
          { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
          { internalType: 'enum Side', name: 'side', type: 'uint8' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
          { internalType: 'uint256', name: 'identifier', type: 'uint256' },
          {
            internalType: 'bytes32[]',
            name: 'criteriaProof',
            type: 'bytes32[]',
          },
        ],
        internalType: 'struct CriteriaResolver[]',
        name: '',
        type: 'tuple[]',
      },
      {
        components: [
          {
            components: [
              { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
              { internalType: 'uint256', name: 'itemIndex', type: 'uint256' },
            ],
            internalType: 'struct FulfillmentComponent[]',
            name: 'offerComponents',
            type: 'tuple[]',
          },
          {
            components: [
              { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
              { internalType: 'uint256', name: 'itemIndex', type: 'uint256' },
            ],
            internalType: 'struct FulfillmentComponent[]',
            name: 'considerationComponents',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct Fulfillment[]',
        name: '',
        type: 'tuple[]',
      },
      { internalType: 'address', name: 'recipient', type: 'address' },
    ],
    name: 'matchAdvancedOrders',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              { internalType: 'address', name: 'token', type: 'address' },
              { internalType: 'uint256', name: 'identifier', type: 'uint256' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ReceivedItem',
            name: 'item',
            type: 'tuple',
          },
          { internalType: 'address', name: 'offerer', type: 'address' },
          { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
        ],
        internalType: 'struct Execution[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'address', name: 'offerer', type: 'address' },
              { internalType: 'address', name: 'zone', type: 'address' },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { internalType: 'address', name: 'token', type: 'address' },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { internalType: 'address', name: 'token', type: 'address' },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              { internalType: 'uint256', name: 'startTime', type: 'uint256' },
              { internalType: 'uint256', name: 'endTime', type: 'uint256' },
              { internalType: 'bytes32', name: 'zoneHash', type: 'bytes32' },
              { internalType: 'uint256', name: 'salt', type: 'uint256' },
              { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
        ],
        internalType: 'struct Order[]',
        name: '',
        type: 'tuple[]',
      },
      {
        components: [
          {
            components: [
              { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
              { internalType: 'uint256', name: 'itemIndex', type: 'uint256' },
            ],
            internalType: 'struct FulfillmentComponent[]',
            name: 'offerComponents',
            type: 'tuple[]',
          },
          {
            components: [
              { internalType: 'uint256', name: 'orderIndex', type: 'uint256' },
              { internalType: 'uint256', name: 'itemIndex', type: 'uint256' },
            ],
            internalType: 'struct FulfillmentComponent[]',
            name: 'considerationComponents',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct Fulfillment[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    name: 'matchOrders',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              { internalType: 'address', name: 'token', type: 'address' },
              { internalType: 'uint256', name: 'identifier', type: 'uint256' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ReceivedItem',
            name: 'item',
            type: 'tuple',
          },
          { internalType: 'address', name: 'offerer', type: 'address' },
          { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
        ],
        internalType: 'struct Execution[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'address', name: 'offerer', type: 'address' },
              { internalType: 'address', name: 'zone', type: 'address' },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { internalType: 'address', name: 'token', type: 'address' },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { internalType: 'address', name: 'token', type: 'address' },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              { internalType: 'uint256', name: 'startTime', type: 'uint256' },
              { internalType: 'uint256', name: 'endTime', type: 'uint256' },
              { internalType: 'bytes32', name: 'zoneHash', type: 'bytes32' },
              { internalType: 'uint256', name: 'salt', type: 'uint256' },
              { internalType: 'bytes32', name: 'conduitKey', type: 'bytes32' },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
        ],
        internalType: 'struct Order[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    name: 'validate',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];

export const LAUNCHPAD_ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address[]',
        name: 'users',
        type: 'address[]',
      },
      { indexed: false, internalType: 'bool', name: 'isAdd', type: 'bool' },
    ],
    name: 'BlacklistedUserSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'baseUri',
        type: 'string',
      },
    ],
    name: 'CollectionBaseUriSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxSupply',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'mintPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'platFormFee',
        type: 'uint16',
      },
      { indexed: false, internalType: 'string', name: 'name', type: 'string' },
      {
        indexed: false,
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'baseUri',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'merkleRoot',
        type: 'bytes32',
      },
    ],
    name: 'CollectionDeployed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'minter',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
    ],
    name: 'CollectionMinted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endtime',
        type: 'uint256',
      },
    ],
    name: 'EndTimeChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionAddress',
        type: 'address',
      },
    ],
    name: 'FinishMintingForced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxTotalSupply',
        type: 'uint256',
      },
    ],
    name: 'MaxTotalSupplyChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address[]',
        name: 'recipients',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint16[]',
        name: 'weights',
        type: 'uint16[]',
      },
    ],
    name: 'MultiRecipientsSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  { anonymous: false, inputs: [], name: 'Pause', type: 'event' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'platFormFee',
        type: 'uint16',
      },
    ],
    name: 'PlatformFeeRateSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'PriceForWhitelistSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
    ],
    name: 'StartTimeChanged',
    type: 'event',
  },
  { anonymous: false, inputs: [], name: 'Unpause', type: 'event' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionAddress',
        type: 'address',
      },
      { indexed: false, internalType: 'bool', name: 'enable', type: 'bool' },
    ],
    name: 'WhitelistModeEnabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'collectionAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'merkleRoot',
        type: 'bytes32',
      },
    ],
    name: 'WhitelistRootSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'withdrawnAmount',
        type: 'uint256',
      },
    ],
    name: 'Withdrawn',
    type: 'event',
  },
  {
    inputs: [],
    name: 'FIXED_POINT',
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'blacklistedUser',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_collection', type: 'address' },
      { internalType: 'uint256', name: '_endTime', type: 'uint256' },
    ],
    name: 'changeEndTime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_collection', type: 'address' },
      { internalType: 'uint256', name: '_maxTotalSupply', type: 'uint256' },
    ],
    name: 'changeMaxTotalSupply',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_collection', type: 'address' },
      { internalType: 'uint256', name: '_startTime', type: 'uint256' },
    ],
    name: 'changeStartTime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_maxSupply', type: 'uint256' },
      { internalType: 'uint256', name: '_mintPrice', type: 'uint256' },
      { internalType: 'uint256', name: '_startTime', type: 'uint256' },
      { internalType: 'uint256', name: '_endTime', type: 'uint256' },
      { internalType: 'uint256', name: '_maxMintAmount', type: 'uint256' },
      { internalType: 'uint256', name: '_maxWalletAmount', type: 'uint256' },
      { internalType: 'address', name: '_creator', type: 'address' },
      { internalType: 'string', name: '_name', type: 'string' },
      { internalType: 'string', name: '_symbol', type: 'string' },
      { internalType: 'string', name: '_baseURI', type: 'string' },
      { internalType: 'bytes32', name: '_merkleRoot', type: 'bytes32' },
    ],
    name: 'deployCollection',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_collection', type: 'address' },
      { internalType: 'bool', name: '_enable', type: 'bool' },
    ],
    name: 'enableWhitelistMode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_collection', type: 'address' }],
    name: 'forceFinishMinting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_owner', type: 'address' }],
    name: 'getDeployedCollections',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'collectionAddress',
            type: 'address',
          },
          { internalType: 'bool', name: 'availableMint', type: 'bool' },
        ],
        internalType: 'struct ILaunchPad.CollectionStatus[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint16', name: '_platFormFee', type: 'uint16' }],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_collection', type: 'address' },
      { internalType: 'uint256', name: '_quantity', type: 'uint256' },
      { internalType: 'bytes32[]', name: '_merkleProof', type: 'bytes32[]' },
    ],
    name: 'mintCollection',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'platFormFee',
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_users', type: 'address[]' },
      { internalType: 'bool', name: '_isAdd', type: 'bool' },
    ],
    name: 'setBlacklistedUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_collection', type: 'address' },
      { internalType: 'string', name: '_baseUri', type: 'string' },
    ],
    name: 'setCollectionBaseUri',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_collection', type: 'address' },
      { internalType: 'address[]', name: '_recipients', type: 'address[]' },
      { internalType: 'uint16[]', name: '_weights', type: 'uint16[]' },
    ],
    name: 'setMultiRecipients',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_collection', type: 'address' },
      { internalType: 'uint16', name: '_platFormFee', type: 'uint16' },
    ],
    name: 'setPlatformFeeRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_collection', type: 'address' },
      { internalType: 'uint256', name: '_price', type: 'uint256' },
    ],
    name: 'setPriceForWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_collection', type: 'address' },
      { internalType: 'bytes32', name: '_merkleRoot', type: 'bytes32' },
    ],
    name: 'setWhitelistRoot',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];
