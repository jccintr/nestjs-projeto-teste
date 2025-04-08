import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {


    private users = [
        {
            "id": 1,
            "name": "Joyce Torres",
            "email": "joyce@gmail.com",
            "role": "ROLE_ADMIN"
        },
        {
            "id": 2,
            "name": "Ana Clara",
            "email": "ana@gmail.com",
            "role": "ROLE_CLIENT"
        },
        {
            "id": 3,
            "name": "Daniela Barbosa",
            "email": "dany@gmail.com",
            "role": "ROLE_CLIENT"
        },
        {
            "id": 4,
            "name": "Betina Silva",
            "email": "betina@gmail.com",
            "role": "ROLE_CLIENT"
        },
        {
            "id": 5,
            "name": "Julio Cesar",
            "email": "jc@gmail.com",
            "role": "ROLE_ADMIN"
        },
    ]

     findAll(role?: 'ROLE_ADMIN' | 'ROLE_CLIENT'){
         if(role){
            return this.users.filter(user => user.role === role)
         }
         return this.users
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id)

        if(!user) throw new NotFoundException('User not found')

        return user
    }

    create(createUserDto: CreateUserDto){
        const lastId = this.users.reduce((max, user) => user.id > max ? user.id : max, 0)
        const newUser = {
            id: lastId + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id:number,updateUserDto: UpdateUserDto){

        const foundUser = this.findOne(id)
       
        this.users = this.users.map(user => {
            if(user.id === id){
                return {...user,...updateUserDto}
            }
            return user
        })
       return {...foundUser,...updateUserDto}
    }

    delete(id:number){
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
