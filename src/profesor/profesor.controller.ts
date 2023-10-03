import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}
 
  @Get('raw')
  async getAllRaw():Promise<CreateProfesorDto[]>{
      return await this.profesorService.findAllRaw()
  }
  @Get('orm')
  async getAllOrm():Promise<CreateProfesorDto[]>{
      return await this.profesorService.findAllOrm();
  }
  @Get(':id')
  async getId(@Param('id') id:number):Promise<CreateProfesorDto>{
      return await this.profesorService.findById(id);
  }
  @Post('crear')
  async crearProfesor(@Body() profesorDTO:CreateProfesorDto):Promise<boolean>{
      return await this.profesorService.create(profesorDTO);
  }
  @Post('agregar-domicilio')
  async addDomicilio(@Body() body: any):Promise<any>{
    return this.profesorService.createDomicilio(body);
  }
  @Put('actualizar/:id')
  async actualizarProfesorId(@Body() profesorDTO:CreateProfesorDto, @Param('id') id:number): Promise<String>{
      return await this.profesorService.update(profesorDTO,id);
  }

  @Delete('eliminar/:id')
  async eliminarProfesor(@Param('id') id:number) : Promise<CreateProfesorDto>{
      return await this.profesorService.delete(id);
  }

}
