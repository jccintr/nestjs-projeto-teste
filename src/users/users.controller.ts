import { Body, Controller, Delete, Get, Param, Patch, Post, Query,ParseIntPipe,ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly service: UsersService) {}

    @Get()   // /users or /users?role=ROLE_ADMIN
    findAll(@Query('role') role?: 'ROLE_ADMIN' | 'ROLE_CLIENT'){
        return this.service.findAll(role)
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id: number){
        return this.service.findOne(id)
    }
    /*
    @Get('interns')  // /users/interns
    findAllInterns(){
        return []
    }
    */
    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto ){
       return this.service.create(createUserDto)
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe) id: number,@Body(ValidationPipe) updateUserdto: UpdateUserDto){
        return this.service.update(id,updateUserdto)
    }

    @Delete(':id')
    delete(@Param('id',ParseIntPipe) id: number){
        return this.service.delete(id)
    }
   
}
