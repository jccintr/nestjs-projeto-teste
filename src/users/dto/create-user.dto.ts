
import {IsEmail, IsNotEmpty, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {

   
   
    @IsNotEmpty({message:'O nome não pode ser vazio'})
    @IsString({message:'O nome deve ser uma string'})
    name: string;

    @IsEmail(undefined,{message: 'Email inválido'})
    email: string;

    @IsEnum(['ROLE_ADMIN','ROLE_CLIENT'],{message:'Role inválida'})
    role: 'ROLE_ADMIN' | 'ROLE_CLIENT'
  }
  