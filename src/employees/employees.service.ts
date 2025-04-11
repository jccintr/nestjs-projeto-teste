import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class EmployeesService {

 constructor(private readonly databaseService: DatabaseService) {

  }

  async create(createEmployeeDto: CreateEmployeeDto) {

    const existingEmployee = await this.databaseService.employee.findUnique({ where: { email: createEmployeeDto.email } });

  if (existingEmployee) {
    throw new BadRequestException('Email já está em uso.');
  }
    return this.databaseService.employee.create({data: createEmployeeDto});

  }

  async findAll(role?: 'ROLE_ADMIN' | 'ROLE_CLIENT') {

    if (role) return this.databaseService.employee.findMany({
      where:{
        role,
      }
    });

    return this.databaseService.employee.findMany();

  }

  async findAllPaginated(page: number = 1, size: number = 10) {
    const skip = (page - 1) * size;
  
    const [data, total] = await Promise.all([
      this.databaseService.employee.findMany({
        skip,
        take: size,
        orderBy: {
          name: 'asc', // ou 'desc' para ordem decrescente
        },
      }),
      this.databaseService.employee.count(),
    ]);
  
    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / size),
    };
  }

  async findOne(id: number) {

    return this.databaseService.employee.findUnique({where:{id}});
  
   
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {

    return this.databaseService.employee.update({where:{id},data:updateEmployeeDto});

  }

  async remove(id: number) {

    return this.databaseService.employee.delete({where:{id}});

  }
}
