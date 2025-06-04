import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './createuser.dto';
import { UpdateUserDto } from './updateuser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUser();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
  }

  @Get('find-by-email-comunication')
  async findByEmailAndComunicationDir(
    @Query('email') email: string,
    @Query('comunication_dir') comunication_dir: string,
  ) {
    return this.usersService.findByEmailAndComunicationDir(email, comunication_dir);
  }

  @Get('find-all-by-comunication')
  async findAllByComunicationDir(
    @Query('comunication_dir') comunication_dir: string,
  ) {
    return this.usersService.findAllByComunicationDir(comunication_dir);
  }
}
