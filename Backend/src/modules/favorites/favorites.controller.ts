import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { FavoriteDto } from './dto/favorite.dto';

@ApiTags('favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  addFavorite(@CurrentUser() user: { id: string }, @Body() dto: FavoriteDto) {
    return this.favoritesService.addFavorite(user.id, dto.petId);
  }

  @Delete()
  removeFavorite(@CurrentUser() user: { id: string }, @Body() dto: FavoriteDto) {
    return this.favoritesService.removeFavorite(user.id, dto.petId);
  }

  @Get()
  listFavorites(@CurrentUser() user: { id: string }) {
    return this.favoritesService.listFavorites(user.id);
  }
}
