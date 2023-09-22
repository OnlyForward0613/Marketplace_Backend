import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { IPayloadUserJwt } from '@common/interfaces';
import { LaunchpadService } from '@modules/launchpad/services/launchpad.service';
import { CreateLaunchpadDto } from '@modules/launchpad/dto/create-launchpad.dto';
import { GetLaunchpadDto } from '@modules/launchpad/dto/get-launchpad.dto';

@ApiTags('launchpad')
@Controller('launchpad')
export class LaunchpadController {
  constructor(private launchpadService: LaunchpadService) {}

  @ApiOperation({ summary: 'Create new launchpad', description: 'forbidden' })
  @ApiBody({ type: CreateLaunchpadDto })
  @ApiResponse({ type: GetLaunchpadDto })
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @CurrentUser() payload: IPayloadUserJwt,
    @Body() launchpadDto: CreateLaunchpadDto,
  ): Promise<GetLaunchpadDto> {
    return await this.launchpadService.createLaunchpad(
      payload.id,
      launchpadDto,
    );
  }

  @ApiOperation({ summary: 'Find all launchpad' })
  @ApiResponse({ type: [GetLaunchpadDto] })
  @Get()
  async getAll() {
    return this.launchpadService.getLaunchpads({});
  }

  @ApiOperation({ summary: 'Find launchpad by id' })
  @ApiResponse({ type: GetLaunchpadDto })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.launchpadService.getLaunchpad({ where: { id: id } });
  }

  @ApiOperation({ summary: 'Update launchpad', description: 'forbidden' })
  @ApiBody({ type: CreateLaunchpadDto })
  @ApiResponse({ type: GetLaunchpadDto })
  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @CurrentUser() payload: IPayloadUserJwt,
    @Body() launchpadDto: CreateLaunchpadDto,
  ) {
    return this.launchpadService.updateLaunchpad(payload.id, {
      data: launchpadDto,
      where: { id: id },
    });
  }

  @ApiOperation({ summary: 'Delete launchpad', description: 'forbidden' })
  @ApiResponse({ type: GetLaunchpadDto })
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() payload: IPayloadUserJwt,
  ) {
    return this.launchpadService.deleteLaunchpad(payload.id, {
      where: { id: id },
    });
  }
}
