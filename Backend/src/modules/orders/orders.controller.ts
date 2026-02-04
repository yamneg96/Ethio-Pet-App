import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@CurrentUser() user: { id: string }, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(user.id, dto.reservationId);
  }

  @Get('me')
  listMyOrders(@CurrentUser() user: { id: string }) {
    return this.ordersService.listMyOrders(user.id);
  }

  @UseGuards(RolesGuard)
  @Roles('SELLER')
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @CurrentUser() user: { id: string }, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateOrderStatus(id, user.id, dto.status);
  }
}
