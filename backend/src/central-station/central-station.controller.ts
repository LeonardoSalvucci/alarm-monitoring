import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { CentralStationService } from './central-station.service';
import { CreateCentralStationDto } from './dto/create-central-station.dto';
import { UpdateCentralStationDto } from './dto/update-central-station.dto';
import { CentralStationDto } from './dto/central-station.dto';
import { QueryFailedError } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from '@alarm-monitoring/schemas/user';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Roles(UserRole.ADMIN, UserRole.DATAENTRY)
@UseGuards(RolesGuard)
@ApiTags('Central Station')
@UseGuards(JwtAuthGuard)
@Controller('central-station')
export class CentralStationController {
  constructor(private readonly centralStationService: CentralStationService) {}

  @Post(':id')
  async create(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCentralStationDto: CreateCentralStationDto,
  ) {
    try {
      const centralStation = await this.centralStationService.create(
        id,
        createCentralStationDto,
      );
      return CentralStationDto.schema.parse(centralStation);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        if (
          err.message.includes('duplicate key value violates unique constraint')
        ) {
          throw new HttpException(
            'Central Station already exists for this subscriber',
            409,
          );
        }
      }
      throw new HttpException(
        'An error occurred while creating the Central Station',
        500,
      );
    }
  }

  @Get()
  findAll() {
    return this.centralStationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centralStationService.findOne(+id);
  }

  @Get('csid/:csid')
  async findByCSID(@Param('csid') csid: string) {
    const centralStation = await this.centralStationService.findByCSID(csid);
    if (!centralStation) {
      throw new HttpException(
        `Central Station with CSID ${csid} not found`,
        404,
      );
    }
    return centralStation;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCentralStationDto: UpdateCentralStationDto,
  ) {
    return this.centralStationService.update(+id, updateCentralStationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centralStationService.remove(+id);
  }
}
