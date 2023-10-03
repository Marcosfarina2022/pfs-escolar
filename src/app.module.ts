import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadController } from './ciudad/ciudad.controller';
import { CiudadService } from './ciudad/ciudad.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EscuelaModule } from './escuela/escuela.module';
import { ClasesModule } from './clases/clases.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { AsistenciaModule } from './asistencia/asistencia.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type":"mysql",
    "host": "localhost",
    "port": 3306,
    "username":"root",
    "password":"marcos_2326",
    "database":"db_colegio",
    "entities":[__dirname + "/**/**/**.entity{.ts,.js}"],
    "synchronize":true,//modo desarrollador.

  }), CiudadModule, ProfesorModule,EscuelaModule, ClasesModule, EstudianteModule, AsistenciaModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
