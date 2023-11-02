// nft.service.ts

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ActivityType, ContractType, ListingStatus, NFT, Prisma } from '@prisma/client';

import { GeneratorService, Web3Service } from '@common/providers';
import { PaginationParams } from '@common/dto/pagenation-params.dto';
import { SearchParams } from '@common/dto/search-params.dto';
import {
  CollectionSortByOption,
  SortParams,
} from '@common/dto/sort-params.dto';
import {
  FilterParams,
  UserFilterByOption,
} from '@common/dto/filter-params.dto';
import { CreateNftDto } from '../dto/create-nft.dto';
import { GetNftDto } from '../dto/get-nft.dto';
import { maxUint256 } from 'viem';

@Injectable()
export class NftService {
  private logger = new Logger(NftService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly web3Service: Web3Service,
    private generatorService: GeneratorService,
  ) {}

  async getNft(data: GetNftDto) {
    const nft = await this.prismaService.nFT.findFirst({
      where: data,
      include: {
        collection: true,
        owner: true,
      },
    });

    let activites = [];

    if (nft)
      activites = await this.prismaService.activity.findMany({
        where: {
          nftId: nft.id,
        },
      });

    return {
      ...nft,
      activites: activites,
    };
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

  async getNftsByCollection(
    collectionId: string,
    { sortAscending, sortBy }: SortParams,
    { contains }: SearchParams,
    { offset = 1, limit, startId = 0 }: PaginationParams,
  ) {
    const order = sortAscending === 'asc' ? 1 : -1;
    const start = startId * offset;
    const end = limit ? startId * offset + limit : -1;
    let nfts = [];

    switch (sortBy) {
      case CollectionSortByOption.LISTING_DATE:
        nfts = await this.prismaService.nFT.findMany({
          where: {
            collectionId,
            name: {
              contains,
              mode: 'insensitive',
            },
          },
          include: {
            activities: {
              where: {
                actionType: ActivityType.LISTED,
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 1, // Limit to only retrieve the most recent activity
            },
            owner: true,
          },
        });

        return nfts
          .sort((a, b) => {
            const init = order === 1 ? new Date('2970-01-01') : new Date('1970-01-01');
            const first = a.activities[0]?.createdAt || init.getTime();
            const second = b.activities[0]?.createdAt || init.getTime();

            if (first > second) {
              return order;
            } else if (first < second) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);

      case CollectionSortByOption.BEST_OFFER:
        nfts = await this.prismaService.nFT.findMany({
          where: {
            collectionId,
            name: {
              contains,
              mode: 'insensitive',
            },
          },
          include: {
            activities: {
              where: {
                actionType: ActivityType.CREATED_OFFER,
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
            owner: true,
          },
        });

        return nfts
          .sort((a, b) => {
            const init = order === 1 ? maxUint256 : 0;
            const first = a.activities[0]?.price || BigInt(init);
            const second = b.activities[0]?.price || BigInt(init);

            if (first > second) {
              return order;
            } else if (first < second) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);

      case CollectionSortByOption.LAST_SALE_PRICE:
        nfts = await this.prismaService.nFT.findMany({
          where: {
            collectionId,
            name: {
              contains,
              mode: 'insensitive',
            },
          },
          include: {
            activities: {
              where: {
                actionType: ActivityType.SOLD,
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
            owner: true,
          },
        });

        return nfts
          .sort((a, b) => {
            const initPrice = order === 1 ? maxUint256 : 0;
            const firstPrice = a.activities[0]?.price || BigInt(initPrice);
            const secondPrice = b.activities[0]?.price || BigInt(initPrice);

            if (firstPrice > secondPrice) {
              return order;
            } else if (firstPrice < secondPrice) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);

      case CollectionSortByOption.LAST_SALE_DATE:
        nfts = await this.prismaService.nFT.findMany({
          where: {
            collectionId,
            name: {
              contains,
              mode: 'insensitive',
            },
          },
          include: {
            activities: {
              where: {
                actionType: ActivityType.SOLD,
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
            owner: true,
          },
        });

        return nfts
          .sort((a, b) => {
            const init = order === 1 ? new Date('2970-01-01') : new Date('1970-01-01');
            const first = a.activities[0]?.createdAt || init.getTime();
            const second = b.activities[0]?.createdAt || init.getTime();

            if (first > second) {
              return order;
            } else if (first < second) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);

      case CollectionSortByOption.CREATED_DATE:
        return await this.prismaService.nFT.findMany({
          where: {
            collectionId,
            name: { contains: contains ? contains.slice(0, 2) : undefined },
          },
          skip: offset * startId,
          take: limit,
          orderBy: {
            createdAt: sortAscending === 'asc' ? 'asc' : 'desc',
          },
          include: {
            owner: true,
          },
        });

      case CollectionSortByOption.FAVORITE_COUNT:
        return await this.prismaService.nFT.findMany({
          where: {
            collectionId,
            name: {
              contains,
              mode: 'insensitive',
            },
          },
          include: {
            _count: {
              select: {
                likes: true
              }
            },
            owner: true,
          },
          skip: offset * startId,
          take: limit,
          orderBy: {
            likes:{
              _count: 'desc'
            }
          }
        });

      case CollectionSortByOption.EXPIRATION_DATE:
        nfts = await this.prismaService.nFT.findMany({
          where: {
            collectionId,
            name: {
              contains,
              mode: 'insensitive',
            },
          },
          include: {
            listing:{
              where:{
                status: ListingStatus.ACTIVE
              }
            },
            activities: {
              where: {
                actionType: ActivityType.LISTED,
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 1, // Limit to only retrieve the most recent activity
            },
            owner: true,
          },
        });

        return nfts
          .sort((a, b) => {
            const init = order === 1 ? new Date('2970-01-01') : new Date('1970-01-01');
            const first = a.listing[0]?.endTime || init.getTime();
            const second = b.listing[0]?.endTime || init.getTime();

            if (first > second) {
              return order;
            } else if (first < second) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);

      default:
        nfts = await this.prismaService.nFT.findMany({
          where: {
            collectionId,
            name: {
              contains,
              mode: 'insensitive',
            },
          },
          include: {
            activities: {
              where: {
                actionType: ActivityType.LISTED,
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
            owner: true,
          },
        });

        return nfts
          .sort((a, b) => {
            const initPrice = order === 1 ? maxUint256 : 0;
            const firstPrice = a.activities[0]?.price || BigInt(initPrice);
            const secondPrice = b.activities[0]?.price || BigInt(initPrice);

            if (firstPrice > secondPrice) {
              return order;
            } else if (firstPrice < secondPrice) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);
    }
  }

  async getNftsByUser(
    userId: string,
    { sortAscending, sortBy }: SortParams,
    { contains }: SearchParams,
    { filterBy }: FilterParams,
    { offset = 1, limit = 20, startId = 0 }: PaginationParams,
  ) {
    const order = sortAscending === 'asc' ? 'asc' : 'desc';

    const commonWhere = {
      name: contains ? { contains: contains.slice(0, 2) } : undefined,
      hides: {
        none: {},
      },
    };

    let args = {};

    switch (sortBy) {
      case CollectionSortByOption.LISTING_DATE:
        args = {
          orderBy: undefined,
          include: {
            hides: {
              where: {
                userId,
              },
            },
            listing: {
              orderBy: {
                createAt: order,
              },
            },
            owner: true,
            collection: true,
          },
        };
      case CollectionSortByOption.BEST_OFFER:
        args = {
          orderBy: undefined,
          include: {
            hides: {
              where: {
                userId,
              },
            },
            offers: {
              orderBy: {
                offerPrice: order,
              },
            },
            owner: true,
            collection: true,
          },
        };
      case CollectionSortByOption.LAST_SALE_PRICE:
        args = {
          orderBy: undefined,
          include: {
            hides: {
              where: {
                userId,
              },
            },
            activities: {
              where: {
                actionType: ActivityType.SOLD,
              },
              orderBy: {
                price: order,
              },
            },
            owner: true,
            collection: true,
          },
        };
      case CollectionSortByOption.LAST_SALE_DATE:
        args = {
          orderBy: undefined,
          include: {
            hides: {
              where: {
                userId,
              },
            },
            activities: {
              where: {
                actionType: ActivityType.SOLD,
              },
              orderBy: {
                createAt: order,
              },
            },
            owner: true,
            collection: true,
          },
        };
      case CollectionSortByOption.CREATED_DATE:
        args = {
          orderBy: {
            createAt: order,
          },
          include: {
            hides: {
              where: {
                userId,
              },
            },
            owner: true,
            collection: true,
          },
        };
      case CollectionSortByOption.FAVORITE_COUNT:
        args = {
          orderBy: {
            likes: {
              _count: order,
            },
          },
          include: {
            hides: {
              where: {
                userId,
              },
            },
            owner: true,
            collection: true,
          },
        };
      case CollectionSortByOption.EXPIRATION_DATE:
        args = {
          orderBy: undefined,
          include: {
            hides: {
              where: {
                userId,
              },
            },
            listing: {
              orderBy: {
                endTime: order,
              },
            },
            owner: true,
            collection: true,
          },
        };
      default:
        args = {
          orderBy: undefined,
          include: {
            hides: {
              where: {
                userId,
              },
            },
            listing: {
              orderBy: {
                price: order,
              },
            },
            owner: true,
            collection: true,
          },
        };
    }

    switch (filterBy) {
      case UserFilterByOption.ERC721_NFTS:
        return await this.prismaService.nFT.findMany({
          where: {
            ...commonWhere,
            ownerId: userId,
            contractType: ContractType.ERC721,
          },
          skip: offset * startId,
          take: limit,
          ...args,
        });
      case UserFilterByOption.ERC1155_NFTS:
        return await this.prismaService.nFT.findMany({
          where: {
            ...commonWhere,
            ownerId: userId,
            contractType: ContractType.ERC1155,
          },
          skip: offset * startId,
          take: limit,
          ...args,
        });
      case UserFilterByOption.CREATED:
        return await this.prismaService.nFT.findMany({
          where: {
            ...commonWhere,
            minterId: userId,
          },
          skip: offset * startId,
          take: limit,
          ...args,
        });
      default:
        return [];
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
