import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { Escuela } from './entities/escuela.entity';

@Controller('escuela')
export class EscuelaController {
  constructor(private readonly escuelaService: EscuelaService) {}

  @Post('crear')
  async create(@Body() createEscuelaDto: CreateEscuelaDto): Promise<boolean> {
    return await this.escuelaService.create(createEscuelaDto);
  }

  @Get('obtenerAll')
  async findAll():Promise<Escuela[]> {
    return await this.escuelaService.findAll();
  }

  @Get('obtener/:id')
  async findOne(@Param('id') id: number):Promise<Escuela> {
    return await this.escuelaService.findOne(id);
  }

  @Put('actualizar/:id')
  async update(@Param('id') id: number, @Body() createEscuelaDto: CreateEscuelaDto):Promise<string> {
    return await this.escuelaService.update(id, createEscuelaDto);
  }

  @Delete('eliminar/:id')
  async remove(@Param('id') id: number):Promise<boolean> {
    return await this.escuelaService.remove(id);
  }
}