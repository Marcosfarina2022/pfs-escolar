import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from 'src/clases/entities/clase.entity';
import { Estudiante } from './entities/estudiante.entity';
import { CiudadEstudiante } from 'src/ciudad/entities/ciudad_estudiante.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { EstudianteClase } from './entities/estudiante_clase.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Clase,Estudiante,Ciudad,CiudadEstudiante,EstudianteClase])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}
