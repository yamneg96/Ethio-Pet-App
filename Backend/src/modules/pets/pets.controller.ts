import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  listPets(@Query('breed') breed?: string, @Query('location') location?: string, @Query('featured') featured?: string, @Query('page') page?: string, @Query('limit') limit?: string) {
    return this.petsService.listPets({
      breed,
      location,
      featured: featured === undefined ? undefined : featured === 'true',
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get(':id')
  getPet(@Param('id') id: string) {
    return this.petsService.getPetById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER')
  @Post()
  createPet(@CurrentUser() user: { id: string }, @Body() dto: CreatePetDto) {
    return this.petsService.createPet(user.id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER')
  @Patch(':id')
  updatePet(@Param('id') id: string, @CurrentUser() user: { id: string }, @Body() dto: UpdatePetDto) {
    return this.petsService.updatePet(id, user.id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER')
  @Delete(':id')
  deletePet(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.petsService.deletePet(id, user.id);
  }
}
