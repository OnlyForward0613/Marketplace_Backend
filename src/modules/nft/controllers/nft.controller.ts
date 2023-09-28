// nft.controller.ts

import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NftService } from '../services/nft.service';
import { CreateNftDto } from '../dto/nft.dto';
import { Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';

const moduleName = 'nft';

@ApiTags(moduleName)
@Controller(moduleName)
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @ApiOperation({ summary: 'Find all nfts by collection id' })
  @Public()
  @Get(':collectionId')
  async getCollectionNfts(@Param('collectionId') collectionId: string) {
    return this.nftService.getNfts({ where: { collectionId } });
  }

  @ApiOperation({ summary: 'Find all nfts user owned' })
  @Public()
  @Get('owner/:userId')
  async getOwnedNfts(@Param('userId') userId: string) {
    return this.nftService.getNfts({ where: { ownerId: userId } });
  }

  @ApiOperation({
    summary: 'Find all nfts user minted',
    description: 'forbidden',
  })
  @UseGuards(AccessTokenGuard)
  @Get('minter/:userId')
  async getCreatedNfts(@Param('userId') userId: string) {
    return this.nftService.getNfts({ where: { minterId: userId } });
  }

  @ApiOperation({ summary: 'Create new nft', description: 'forbidden' })
  @ApiBody({ type: CreateNftDto })
  @UseGuards(AccessTokenGuard)
  @Post()
  async createNft(@Body() createNftDto: CreateNftDto) {
    return this.nftService.createNft(createNftDto);
  }
}
