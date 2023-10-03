import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { CreateClaseDto } from './dto/create-clase.dto';
import { Clase } from './entities/clase.entity';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  /////CRUD/////


  //CREATE
  @Post('crear')
  async crearClase(@Body() createClaseDto: CreateClaseDto): Promise<boolean> {
    return await this.clasesService.create(createClaseDto);
  }

  //READ
  @Get('obtenerAll')
  async buscarTodos():Promise<Clase[]> {
    return await this.clasesService.findAll();
  }

  @Get('obtener/:id')
  async buscarId(@Param('id') id: number):Promise<Clase> {
    return await this.clasesService.findOne(id);
  }

  //UPDATE
  @Put('actualizar/:id')
  async actualizarClase(@Param('id') id: number, @Body() createClaseDTO: CreateClaseDto):Promise<String> {
    return await this.clasesService.update(id, createClaseDTO);
  }

  //DELETE
  @Delete('eliminar/:id')
  async eliminarClase(@Param('id') id: number):Promise<boolean> {
    return await this.clasesService.remove(id);
  }
}