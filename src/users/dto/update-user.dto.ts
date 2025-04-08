import { CreateUserDto } from "./create-user.dto";
import {PartialType} from '@nestjs/mapped-types'
//npm install @nestjs/mapped-types -D

export class UpdateUserDto extends PartialType(CreateUserDto) {
   
  }
  