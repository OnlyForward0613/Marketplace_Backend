// nft.service.ts

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import {
  ActivityType,
  ListingStatus,
  NFT,
  OfferStatus,
  Prisma,
} from '@prisma/client';

import { GeneratorService, Web3Service } from '@common/providers';
import { CreateNftDto } from '../dto/create-nft.dto';
import { PaginationParams } from '@common/dto/pagenation-params.dto';
import { ListingController } from '@modules/listing/controllers/listing.controller';
import { SearchParams, SortByOption } from '@common/dto/search-params.dto';

@Injectable()
export class NftService {
  private logger = new Logger(NftService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly web3Service: Web3Service,
    private generatorService: GeneratorService,
  ) {}

  async getNft(args: Prisma.NFTFindUniqueOrThrowArgs): Promise<NFT> {
    return this.prismaService.nFT.findUnique({
      ...args,
      include: {
        collection: true,
        owner: true,
      },
    });
  }

  async getNfts(args: Prisma.NFTFindManyArgs): Promise<NFT[]> {
    return this.prismaService.nFT.findMany({
      ...args,
      include: {
        collection: true,
        owner: true,
      },
    });
  }

  async getNftsBySearch(
    collectionId: string,
    { sortAscending, sortBy }: SearchParams,
    { offset, limit, startId }: PaginationParams,
  ) {
    const nfts = await this.prismaService.nFT.findMany({
      where: {
        collectionId,
      },
      include: {
        owner: true,
      },
      orderBy: {
        createdAt: sortAscending ? 'asc' : 'desc',
      },
    });

    let nftResults = [];

    if (sortBy) {
      switch (sortBy) {
        case SortByOption.LISTING_DATE:
          nftResults = await Promise.all(
            nfts.map(async (nft) => {
              const listing = await this.prismaService.listing.findFirst({
                where: {
                  nftId: nft.id,
                  status: ListingStatus.ACTIVE,
                },
              });
              return {
                tokenId: nft.tokenId,
                name: nft.name,
                img: nft.image,
                price: listing ? listing.price : '',
                createdAt: listing ? listing.createdAt : nft.createdAt,
              };
            }),
          );

          nftResults.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
              return -1; // a comes before b
            } else if (a.createdAt > b.createdAt) {
              return 1; // a comes after b
            }
            return 0; // a and b are equal in terms of sort order
          });

          return nftResults.slice(startId * offset, startId * offset + limit);

        case SortByOption.BEST_OFFER:
          nftResults = await Promise.all(
            nfts.map(async (nft) => {
              const offer = await this.prismaService.offer.findFirst({
                where: {
                  nftId: nft.id,
                  status: OfferStatus.CREATED,
                },
              });
              return {
                tokenId: nft.tokenId,
                name: nft.name,
                img: nft.image,
                price: offer ? offer.offerPrice : '',
              };
            }),
          );

          nftResults.sort((a, b) => {
            if (a.price < b.price) {
              return -1; // a comes before b
            } else if (a.createdAt > b.createdAt) {
              return 1; // a comes after b
            }
            return 0; // a and b are equal in terms of sort order
          });

          return nftResults.slice(startId * offset, startId * offset + limit);

        case SortByOption.LAST_SALE_PRICE:
          nftResults = await Promise.all(
            nfts.map(async (nft) => {
              const listing = await this.prismaService.listing.findFirst({
                where: {
                  nftId: nft.id,
                  status: ListingStatus.SOLD,
                },
              });
              return {
                tokenId: nft.tokenId,
                name: nft.name,
                img: nft.image,
                price: listing ? listing.price : '',
              };
            }),
          );

          nftResults.sort((a, b) => {
            if (a.price < b.price) {
              return -1; // a comes before b
            } else if (a.price > b.price) {
              return 1; // a comes after b
            }
            return 0; // a and b are equal in terms of sort order
          });

          return nftResults.slice(startId * offset, startId * offset + limit);

        case SortByOption.LAST_SALE_DATE:
          nftResults = await Promise.all(
            nfts.map(async (nft) => {
              const listing = await this.prismaService.listing.findFirst({
                where: {
                  nftId: nft.id,
                  status: ListingStatus.SOLD,
                },
              });
              return {
                tokenId: nft.tokenId,
                name: nft.name,
                img: nft.image,
                createdAt: listing ? listing.createdAt : nft.createdAt,
              };
            }),
          );

          nftResults.sort((a, b) => {
            if (a.createAt < b.createAt) {
              return -1; // a comes before b
            } else if (a.createAt > b.createAt) {
              return 1; // a comes after b
            }
            return 0; // a and b are equal in terms of sort order
          });

          return nftResults.slice(startId * offset, startId * offset + limit);

        case SortByOption.CREATED_DATE:
          nftResults = await Promise.all(
            nfts.map(async (nft) => {
              return {
                tokenId: nft.tokenId,
                name: nft.name,
                img: nft.image,
                createdAt: nft.createdAt,
              };
            }),
          );

          nftResults.sort((a, b) => {
            if (a.createAt < b.createAt) {
              return -1; // a comes before b
            } else if (a.createAt > b.createAt) {
              return 1; // a comes after b
            }
            return 0; // a and b are equal in terms of sort order
          });

          return nftResults.slice(startId * offset, startId * offset + limit);
        case SortByOption.VIEWER_COUNT:
          break;

        case SortByOption.FAVORITE_COUNT:
          break;

        case SortByOption.EXPIRATION_DATE:
          nftResults = await Promise.all(
            nfts.map(async (nft) => {
              const listing = await this.prismaService.listing.findFirst({
                where: {
                  nftId: nft.id,
                  status: ListingStatus.ACTIVE,
                },
              });
              return {
                tokenId: nft.tokenId,
                name: nft.name,
                img: nft.image,
                endTime: listing ? listing.endTime : new Date('1970-01-01'),
              };
            }),
          );

          nftResults.sort((a, b) => {
            if (a.createAt < b.createAt) {
              return -1; // a comes before b
            } else if (a.createAt > b.createAt) {
              return 1; // a comes after b
            }
            return 0; // a and b are equal in terms of sort order
          });

          return nftResults.slice(startId * offset, startId * offset + limit);

        default:
          break;
      }
    }
  }

  async createNft(userId: string, data: CreateNftDto): Promise<NFT[]> {
    const result = await this.web3Service.mintNft(data);
    if (result.error !== '') {
      this.logger.error(result.error);
      throw new HttpException(result.error, HttpStatus.EXPECTATION_FAILED);
    }

    try {
      const newNfts = await Promise.all(
        result.tokenDatas.map(
          async (tokenData) =>
            await this.prismaService.nFT.create({
              data: {
                id: this.generatorService.uuid(),
                collectionId: undefined,
                creatorId: undefined,
                tokenAddress: tokenData.tokenAddress,
                tokenId: tokenData.tokenId,
                tokenUri: tokenData.tokenUri,
                name: tokenData.metadata.name,
                image: tokenData.metadata.image,
                attributes: tokenData.metadata
                  .attributes as Prisma.InputJsonValue,
                royalty: 0,
                contractType: data.contractType,
                collection: {
                  connect: {
                    id: data.collectionId,
                  },
                },
                minter: {
                  connect: {
                    id: userId,
                  },
                },
                owner: {
                  connect: {
                    id: userId,
                  },
                },
              } as Omit<Prisma.NFTCreateInput, 'collectionId'>,
            }),
        ),
      );

      newNfts.map(async (nft) => {
        await this.prismaService.activity.create({
          data: {
            id: this.generatorService.uuid(),
            price: data.price,
            actionType: ActivityType.MINTED,
            txHash: data.txHash,
            nft: {
              connect: {
                id: nft.id,
              },
            },
            seller: {
              connect: {
                id: userId,
              },
            },
          },
        });
        this.logger.log(`New nft ${nft.id} is created`);
      });

      return newNfts;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
