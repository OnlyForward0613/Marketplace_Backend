import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry';

import * as defs from '@common/types';
import { CoreService } from './core.service';
import Web3 from 'web3';
import { Network } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as ethUtils from 'ethereumjs-util';
import { Web3Service } from './web3.service';
import { utils } from 'ethers';
import * as sigUtils from 'eth-sig-util';

const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;
const OPENSEA_ORDERS_API_KEY = process.env.OPENSEA_ORDERS_API_KEY;
const V1_OPENSEA_API_TESTNET_BASE_URL =
  'https://testnets-api.opensea.io/api/v1';
const V1_OPENSEA_API_BASE_URL = 'https://api.opensea.io/api/v1';
const OPENSEA_API_TESTNET_BASE_URL = 'https://testnets-api.opensea.io/v2';
const OPENSEA_API_BASE_URL = 'https://api.opensea.io/v2';
// const OPENSEA_TESTNET_WYVERIN_API_BASE_URL = 'https://testnets-api.opensea.io/wyvern/v1'
// const OPENSEA_WYVERIN_API_BASE_URL = 'https://api.opensea.io/wyvern/v1'

const OPENSEA_POST_DELAY = 500;
const OPENSEA_LISTING_BATCH_SIZE = 30;
const DELAY_AFTER_BATCH_RUN = 4;
const MAX_QUERY_LENGTH = 4014; // 4094 - 80
const TESTNET_CHAIN_IDS = ['4', '5'];

@Injectable()
export class OpenseaService {
  private logger = new Logger(OpenseaService.name);
  private readonly web3: Record<Network, Web3>;
  constructor(
    private readonly coreService: CoreService,
    private readonly configService: ConfigService,
    private readonly web3Service: Web3Service,
  ) {
    this.web3 = {
      BNB: new Web3(configService.get('BNB')),
      MAIN: new Web3(
        `${this.configService.get('urls.INFURA_URL')}${this.configService.get(
          'urls.INFURA_API_KEY',
        )}`,
      ),
    };
  }

  // /**
  // * Retrieve listings in batches
  // * @param listingQueryParams
  // * @param chainId
  // * @param batchSize
  // */
  // retrieveListingsInBatches = async (
  //   listingQueryParams: string[],
  //   chainId: string,
  //   batchSize: number,
  // ): Promise<any[]> => {
  //   const listings: any[] = []
  //   let batch: string[], queryUrl: string
  //   const listingBaseUrl: string = TESTNET_CHAIN_IDS.includes(chainId)
  //     ? V1_OPENSEA_API_TESTNET_BASE_URL
  //     : V1_OPENSEA_API_BASE_URL
  //   const listingInterceptor = getOpenseaInterceptor(listingBaseUrl, chainId)

  //   let delayCounter = 0
  //   let size: number
  //   while (listingQueryParams.length) {
  //     size = batchSize
  //     batch = listingQueryParams.slice(0, size) // batches of 200

  //     queryUrl = `${batch.join('&')}`

  //     // only executed if query length more than accepted limit by opensea
  //     // runs once or twice at most
  //     while (queryUrl.length > MAX_QUERY_LENGTH) {
  //       size--
  //       batch = listingQueryParams.slice(0, size)
  //       queryUrl = `${batch.join('&')}`
  //     }

  //     const response: AxiosResponse = await listingInterceptor(
  //       `/assets?${queryUrl}&limit=${batchSize}&include_orders=true`,
  //     )
  //     if (response?.data?.assets?.length) {
  //       const assets = response?.data?.assets
  //       if (assets?.length) {
  //         for (const asset of assets) {
  //           const contract: string = asset?.asset_contract?.address
  //           const seaportOrders: defs.SeaportOrder[] | null = asset?.seaport_sell_orders
  //           // seaport orders - always returns cheapest order
  //           if (seaportOrders && Object.keys(seaportOrders?.[0]).length) {
  //             listings.push(
  //               orderEntityBuilder(
  //                 defs.ActivityType.Listing,
  //                 seaportOrders?.[0],
  //                 chainId,
  //                 contract,
  //               ),
  //             )
  //           }
  //         }
  //       }
  //     }
  //     listingQueryParams = [...listingQueryParams.slice(size)]
  //     delayCounter++
  //     if (delayCounter === DELAY_AFTER_BATCH_RUN) {
  //       await delay(1000)
  //       delayCounter = 0
  //     }
  //   }

  //   return await Promise.all(listings)
  // }

  // /**
  //  * Fulfill listings by sending POST requests to the OpenSea API.
  //  * @param payloads An array of payloads to be sent in the POST requests.
  //  * @param chainId The chainId to be used for selecting the appropriate API key and base URL.
  //  * @param apiKey Optional custom API key. If not provided, the default API key will be used.
  //  * @returns A Promise that resolves to an array of responses received from the OpenSea API.
  //  */
  // postListingFulfillments = async (
  //   payloads: defs.ListingPayload[],
  //   chainId: string,
  // ): Promise<defs.FulfillmentData[]> => {
  //   try {
  //     const fulfillmentResponses: defs.FulfillmentData[] = []

  //     // listingBaseUrl is V2
  //     const listingBaseUrl: string = TESTNET_CHAIN_IDS.includes(chainId)
  //       ? OPENSEA_API_TESTNET_BASE_URL
  //       : OPENSEA_API_BASE_URL
  //     const listingInterceptor = getOpenseaInterceptor(listingBaseUrl, chainId)

  //     for (let i = 0; i < payloads.length; i++) {
  //       const payload = payloads[i]
  //       console.info(`Posting listing fulfillment data ${i} of ${JSON.stringify(payload, null, 2)}`)
  //       const response: AxiosResponse = await listingInterceptor.post('/listings/fulfillment_data', payload, {
  //         headers: {
  //           'content-type': 'application/json',
  //         },
  //       })

  //       fulfillmentResponses.push(response.data)

  //       // Throttle requests to 2 per second by waiting 500ms between each request
  //       if (i < payloads.length - 1) {
  //         await delay(OPENSEA_POST_DELAY)
  //       }
  //     }

  //     return fulfillmentResponses
  //   } catch (err) {
  //     console.error(`Error posting listing fulfillment data ${JSON.stringify(err, null, 2)}`)
  //     throw err
  //   }
  // }

  // /**
  //  * Retrieve offers in batches
  //  * @param offerQueryParams
  //  * @param chainId
  //  * @param batchSize
  //  * @param createdInternally,
  //  */
  // retrieveOffersInBatches = async (
  //   offerQueryParams: Map<string, string[]>,
  //   chainId: string,
  //   batchSize: number,
  // ): Promise<any[]> => {
  //   let batch: string[], queryUrl: string
  //   const offers: any[] = []

  //   const offerBaseUrl: string = TESTNET_CHAIN_IDS.includes(chainId) ? OPENSEA_API_TESTNET_BASE_URL : OPENSEA_API_BASE_URL

  //   const offerInterceptor = getOpenseaInterceptor(offerBaseUrl, chainId)

  //   let delayCounter = 0
  //   let size: number
  //   let seaportOffers: defs.SeaportOrder[]

  //   // contracts exist
  //   if (offerQueryParams.size) {
  //     // iterate  on contract
  //     for (const contract of offerQueryParams.keys()) {
  //       // contract has tokens
  //       if (offerQueryParams.get(contract).length) {
  //         // batches of batchSize tokens
  //         let tokens: string[] = offerQueryParams.get(contract)
  //         while (tokens.length) {
  //           size = batchSize
  //           batch = tokens.slice(0, size)
  //           queryUrl = `asset_contract_address=${contract}&${batch.join('&')}`

  //           // only executed if query length more than accepted limit by opensea
  //           // runs once or twice at most
  //           while (queryUrl.length > MAX_QUERY_LENGTH) {
  //             size--
  //             batch = tokens.slice(0, size)
  //             queryUrl = `asset_contract_address=${contract}&${batch.join('&')}`
  //           }

  //           const response: AxiosResponse = await offerInterceptor(
  //             `/orders/${chainId === '1' ? 'ethereum' : chainId === '5' ? 'goerli' : 'goerli'
  //             }/seaport/offers?${queryUrl}&limit=${batchSize}&order_direction=desc&order_by=eth_price`,
  //           )

  //           if (response?.data?.orders?.length) {
  //             seaportOffers = response?.data?.orders
  //             offers.push(
  //               orderEntityBuilder(
  //                 defs.ActivityType.Bid,
  //                 seaportOffers?.[0],
  //                 chainId,
  //                 contract,
  //               ),
  //             )
  //           }

  //           tokens = [...tokens.slice(size)]
  //           delayCounter++
  //           // add delay
  //           if (delayCounter === DELAY_AFTER_BATCH_RUN) {
  //             await delay(1000)
  //             delayCounter = 0
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return await Promise.all(offers)
  // }

  // /**
  //  * Retrieve multiple sell or buy orders
  //  * TODO: Offer implementation in the offer ticket
  //  * @param openseaMultiOrderRequest
  //  * @param chainId
  //  * @param includeOffers
  //  */
  // retrieveMultipleOrdersOpensea = async (
  //   openseaMultiOrderRequest: Array<defs.OpenseaOrderRequest>,
  //   chainId: string,
  //   includeOffers: boolean,
  // ): Promise<defs.OpenseaExternalOrder> => {
  //   const responseAggregator: defs.OpenseaExternalOrder = {
  //     listings: [],
  //     offers: [],
  //   }

  //   try {
  //     if (openseaMultiOrderRequest?.length) {
  //       const listingQueryParams: Array<string> = []
  //       const offerQueryParams: Map<string, Array<string>> = new Map()
  //       for (const openseaReq of openseaMultiOrderRequest) {
  //         // listing query builder
  //         listingQueryParams.push(
  //           `${defs.OpenseaQueryParamType.ASSET_CONTRACT_ADDRESSES}=${openseaReq.contract}&${defs.OpenseaQueryParamType.TOKEN_IDS}=${openseaReq.tokenId}`,
  //         )

  //         if (includeOffers) {
  //           // offer query builder
  //           if (!offerQueryParams.has(openseaReq.contract)) {
  //             offerQueryParams.set(openseaReq.contract, [])
  //           }
  //           offerQueryParams.get(openseaReq.contract)?.push(`${defs.OpenseaQueryParamType.TOKEN_IDS}=${openseaReq.tokenId}`)
  //         }
  //       }

  //       // listings
  //       if (listingQueryParams.length) {
  //         responseAggregator.listings = await retrieveListingsInBatches(
  //           listingQueryParams,
  //           chainId,
  //           OPENSEA_LISTING_BATCH_SIZE,
  //         )
  //       }

  //       // offers
  //       if (includeOffers && offerQueryParams.size) {
  //         responseAggregator.offers = await retrieveOffersInBatches(offerQueryParams, chainId, OPENSEA_LISTING_BATCH_SIZE)
  //       }
  //     }
  //   } catch (err) {
  //     console.error(`Error in retrieveMultipleOrdersOpensea: ${err}`)
  //     // Sentry.captureMessage(`Error in retrieveOrdersOpensea: ${err}`)
  //   }
  //   return responseAggregator
  // }

  /**
   * Returns true if the listing succeeded, false otherwise.
   * @param signature  signature of the order for these parameters
   * @param parameters stringified JSON matching the 'parameters' field in the protocol data schema
   * @param chainId
   */
  createSeaportListing = async (
    signature: string,
    parameters: string,
  ): Promise<defs.Parameters> => {
    // data.types.EIP712Domain = [
    //   { name: 'name', type: 'string' },
    //   { name: 'version', type: 'string' },
    //   { name: 'chainId', type: 'uint256' },
    //   { name: 'verifyingContract', type: 'address' },
    // ];
    // const data: {
    //   types: Types;
    //   primaryType: PrimaryType;
    //   domain: Domain;
    //   message: OrderComponent;
    // } = {
    //   types: {
    //     EIP712Domain: [
    //       { name: 'name', type: 'string' },
    //       { name: 'version', type: 'string' },
    //       { name: 'chainId', type: 'uint256' },
    //       { name: 'verifyingContract', type: 'address' },
    //     ],
    //     OrderComponents: [
    //       { name: 'channel_adr', type: 'address' },
    //       { name: 'channel_seq', type: 'uint32' },
    //       { name: 'balance', type: 'uint256' },
    //     ],
    //   },
    //   primaryType: 'OrderComponents',
    //   domain: {
    //     name: 'XBR',
    //     version: '1',
    //     chainId: 1,
    //     verifyingContract: '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B',
    //   },
    //   message: {
    //     channel_adr: '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B',
    //     channel_seq: 39,
    //     balance: 2700,
    //   },
    // };

    // const a = sigUtils.extractPublicKey({ data: data, sig: signature });
    // console.info(a);

    try {
      const data: defs.Parameters = JSON.parse(parameters);
      return data;
    } catch (err) {
      this.logger.error(`Error in createSeaportListing: ${err}`);
      this.logger.log(`seaport signature ${signature}`);
      this.logger.log(`createSeaportListing payload ${parameters}`);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
}
