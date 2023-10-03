import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './dto/create-estudiante.dto';
@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Get('raw')
  async getAllRaw():Promise<EstudianteDto[]>{
      return await this.estudianteService.findAllRaw()
  }
  @Get('orm')
  async getAllOrm():Promise<EstudianteDto[]>{
      return await this.estudianteService.findAllOrm();
  }
  @Get(':id')
  async getId(@Param('id') id:number):Promise<EstudianteDto>{
      return await this.estudianteService.findById(id);
  }
  @Post('crear')
  async crearEstudiante(@Body() estudianteDTO:EstudianteDto):Promise<any>{
      return await this.estudianteService.create(estudianteDTO);
  }
  @Post('agregar-domicilio')
  async addDomicilio(@Body() body: any):Promise<any>{
    return this.estudianteService.createDomicilio(body);
  }
  @Post('agregar-clase')
  async addClase(@Body()body:any):Promise<any>{
    return await this.estudianteService.addClase(body);
  } 
  @Put('actualizar/:id')
  async actualizarEstudianteId(@Body() estudianteDTO:EstudianteDto, @Param('id') id:number): Promise<String>{
      return await this.estudianteService.update(estudianteDTO,id);
  }

  @Delete('eliminar/:id')
  async eliminarEstudiante(@Param('id') id:number) : Promise<EstudianteDto>{
      return await this.estudianteService.delete(id);
  }
}
