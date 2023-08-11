import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Put,
  Delete,
  NotFoundException,
  InternalServerErrorException,
  UseGuards,
  Request
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private buses_transport: ClientProxy) {}

  @Get()
  getAllUsers() {
    return this.buses_transport.send('get_users', {});
  }

  @Post()
  createUser(@Body() data: any) {
    return this.buses_transport.send('create_user', data);
  }


  @Post('buy')
  buyTickets(@Request() req, @Query('tickets') quantity: number) {
    const userId = req.user.id;
    return this.buses_transport.send('buy_tickets', quantity)
  }

  @Put()
  updateUserById(@Param("userId") id : string,@Body() userDto){
    return this.buses_transport.send('update_user_info', userDto)
  }
}
