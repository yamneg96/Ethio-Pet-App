import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('rooms/:orderId')
  getRoom(@Param('orderId') orderId: string, @CurrentUser() user: { id: string }) {
    return this.chatService.getOrCreateRoom(orderId, user.id);
  }

  @Get('rooms/:roomId/messages')
  listMessages(@Param('roomId') roomId: string) {
    return this.chatService.listMessages(roomId);
  }
}
