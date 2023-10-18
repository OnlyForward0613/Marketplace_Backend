// nft.service.ts

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ActivityType, NFT, Prisma } from '@prisma/client';

import { GeneratorService, Web3Service } from '@common/providers';
import { CreateNftDto } from '../dto/create-nft.dto';

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
      include: {
        collection: true,
        owner: true,
      },
      ...args,
    });
  }

  async getNfts(args: Prisma.NFTFindManyArgs): Promise<NFT[]> {
    return this.prismaService.nFT.findMany({
      include: {
        collection: true,
        owner: true,
      },
      ...args,
    });
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
