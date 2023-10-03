// nft.controller.ts

import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NftService } from '../services/nft.service';
import { CreateNftDto } from '../dto/create-nft.dto';
import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { IPayloadUserJwt } from '@common/interfaces';
import { GetNftDto } from '../dto/get-nft.dto';

const moduleName = 'nft';

@ApiTags(moduleName)
@Controller(moduleName)
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @ApiOperation({ summary: 'Find all nfts by collection id' })
  @Public()
  @Get(':collectionId')
  async getCollectionNfts(@Param('collectionId') collectionId: string) {
    return await this.nftService.getNfts({ where: { collectionId } });
  }

  @ApiOperation({ summary: 'Find all nfts user owned' })
  @Public()
  @Get('owner/:userId')
  async getOwnedNfts(@Param('userId') userId: string) {
    return await this.nftService.getNfts({ where: { ownerId: userId } });
  }

  @ApiOperation({
    summary: 'Find all nfts user minted',
  })
  @Public()
  @Get('minter/:userId')
  async getCreatedNfts(@Param('userId') userId: string) {
    return await this.nftService.getNfts({ where: { minterId: userId } });
  }

  @ApiOperation({
    summary: 'Find nft',
  })
  @ApiBody({ type: GetNftDto })
  @Public()
  @Post('get')
  async getNft(@Body() { address, nftId }: GetNftDto) {
    const nfts = await this.nftService.getNfts({
      where: { address, nftId },
    });
    return nfts[0];
  }

  @ApiOperation({ summary: 'Create new nft', description: 'forbidden' })
  @ApiBody({ type: CreateNftDto })
  @UseGuards(AccessTokenGuard)
  @Post()
  async createNft(
    @CurrentUser() payload: IPayloadUserJwt,
    @Body() createNftDto: CreateNftDto,
  ) {
    return await this.nftService.createNft(payload.id, createNftDto);
  }
}
