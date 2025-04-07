import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly service: UsersService) {}

    @Get()   // /users or /users?role=ROLE_ADMIN
    findAll(@Query('role') role?: 'ROLE_ADMIN' | 'ROLE_CLIENT'){
        return this.service.findAll(role)
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.service.findOne(+id)
    }
    /*
    @Get('interns')  // /users/interns
    findAllInterns(){
        return []
    }
    */
    @Post()
    create(@Body() user: {name: string, email: string, role: 'ROLE_ADMIN'|'ROLE_CLIENT'}){
       return this.service.create(user)
    }

    @Patch(':id')
    update(@Param('id') id: string,@Body() updatedUser:{name?: string, email?: string, role?: 'ROLE_ADMIN'|'ROLE_CLIENT'}){
        return this.service.update(+id,updatedUser)
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.service.delete(+id)
    }
   
}
