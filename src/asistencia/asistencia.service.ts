import { Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { EstudianteClase } from 'src/estudiante/entities/estudiante_clase.entity';


@Injectable()
export class AsistenciaService {
  constructor(@InjectRepository(Asistencia)
  private readonly asistenciaRepository:Repository<Asistencia>,
  @InjectRepository(EstudianteClase)
  private readonly estudianteClaseRepository:Repository<EstudianteClase>){}

async create(createAsistenciaDto: CreateAsistenciaDto) {
const { estudianteId,claseId} = createAsistenciaDto;
const asistencia_estudiante = await this.estudianteClaseRepository.findOne({where:{estudianteId:estudianteId,claseId:claseId}});
if(!asistencia_estudiante)
return 'no existe estudiante/clase'
return await this.asistenciaRepository.save(new Asistencia(claseId,estudianteId));
}

async findAllOrm():Promise<CreateAsistenciaDto[]>{
  return await this.asistenciaRepository.find();
}
}

