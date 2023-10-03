import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { CiudadEstudiante } from 'src/ciudad/entities/ciudad_estudiante.entity';
import { Clase } from 'src/clases/entities/clase.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
import { EstudianteClase } from './entities/estudiante_clase.entity';

@Injectable()
export class EstudianteService {

  private estudiantes:Estudiante[] = []
  
constructor(@InjectRepository(Estudiante)
            private estudianteRepository:Repository<Estudiante>,
            @InjectRepository(Clase)
            private claseRepository:Repository<Clase>,
            @InjectRepository(Ciudad)
            private ciudadRepository:Repository<Ciudad>,
            @InjectRepository(EstudianteClase)
            private estudianteClaseRepository:Repository<EstudianteClase>,
            @InjectRepository(CiudadEstudiante)
            private readonly ciudadEstudianteRepository:Repository<CiudadEstudiante>)
            {}

  async create(estudianteDto: EstudianteDto):Promise<String> {
  try{
   const fecha = new Date(); 
   const estudiante :Estudiante = await this.estudianteRepository.save(new Estudiante(estudianteDto.nombre,estudianteDto.apellido,fecha))
   if(estudiante)
   return `Se creo estudiante ${estudiante.nombre}`;
   else 
   throw new Error('No se pudo crear el estudiante');
  }
    catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en estudiante - ' + error
      },HttpStatus.NOT_FOUND)
    }
  }

  async addClase(body):Promise<any>{
    const {claseId,estudianteId} = body;
    const estudiante = await this.estudianteRepository.findOne({where:{id:estudianteId}})
    if(!estudiante)
    return `no se encontro el estudiante con id ${estudianteId}`
    const clase = await this.claseRepository.findOne({where:{id:claseId}})
    if(!clase)
    return 'error - no se encontro clase'
    const clase_estudiante = await this.estudianteClaseRepository.findOne({where:{claseId:claseId,estudianteId:estudianteId}})
    if(clase_estudiante)
    return 'error -el estudiante ya tiene asignada esa clase';
    return await this.estudianteClaseRepository.save(new EstudianteClase(estudianteId,claseId))
  }
    
  async findAllRaw():Promise<EstudianteDto[]>{
    this.estudiantes = [];
    let datos = await this.estudianteRepository.query("select * from estudiante");
    datos.forEach(element => {
        
        let estudiante : Estudiante = new Estudiante(element['nombre'],element['apellido'],element['fecha_nacimiento']);
        this.estudiantes.push(estudiante)
    });

    return this.estudiantes;
}

async findAllOrm():Promise<EstudianteDto[]>{
    return await this.estudianteRepository.find();
}

async findById(id :number):Promise<EstudianteDto> {
    try{
        const criterio : FindOneOptions = { where: {id:id} };
        const estudiante : EstudianteDto = await this.estudianteRepository.findOne(criterio);
        if(estudiante)
            return estudiante
        else  
            throw new Error('No se encuentra el estudiante');
    }
    catch(error){
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'Error en profesor - ' + error
        },HttpStatus.NOT_FOUND)
    }
    
}
async createDomicilio(body){
  const { ciudadId, estudianteId,domicilio} = body;

  const estudiante = await this.estudianteRepository.findOne({where:{id:estudianteId}})
  if(!estudiante)
    return 'error - no existe este estudiante'
  
  const ciudad = await this.ciudadRepository.findOne({where:{id:ciudadId}})
  if(!ciudad)
      return 'error - no existe la ciudad para este estudiante'

  const nuevo_domicilio = await this.ciudadEstudianteRepository.findOne({where:{ciudadId:ciudadId,estudianteId:estudianteId}})
  if(nuevo_domicilio)
  return 'el estudiante ya tiene domicilio'
return await this.ciudadEstudianteRepository.save(new CiudadEstudiante(ciudadId,estudianteId,domicilio))
}

async update(estudianteDto : EstudianteDto, id:number) : Promise<String>{
    try{
        const criterio : FindOneOptions = { where : {id:id} }
        let estudiante : Estudiante= await this.estudianteRepository.findOne(criterio);
        if(!estudiante)
            throw new Error('no se pudo encontrar el estudiante a modificar ');
        else{
            let estudianteAntiguo = estudiante.getNombre() + ' ' + estudiante.getApellido();
            if((estudianteDto.nombre != null && estudianteDto.nombre != undefined && estudianteDto.nombre != "") && (estudianteDto.apellido != null && estudianteDto.apellido != undefined && estudianteDto.apellido != "")){
                estudiante.setNombre(estudianteDto.nombre);
                estudiante.setApellido(estudianteDto.apellido);
                estudiante = await this.estudianteRepository.save(estudiante);
            return `OK - ${estudianteAntiguo} --> ${estudianteDto.nombre} --> ${estudianteDto.apellido}`
        }else{
            
            return `No se pueden actualizar los datos --> ${estudianteDto.nombre} --> ${estudianteDto.apellido}`
        }}
    }
    catch(error){
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Error en estudiante - ' + error
        },HttpStatus.NOT_FOUND)
    }

}

async delete(id:number): Promise<any>{
    try{
        const criterio : FindOneOptions = { where : {id:id} }
        let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
        if(!estudiante)
            throw new Error('no puede se eliminar el estudiante ');
        else{
            await this.estudianteRepository.remove(estudiante);
            return { id:id,
                    message:'se elimino exitosamente'
                }
            }
    }
    catch(error){
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Error en estudiante - ' + error
        },HttpStatus.NOT_FOUND)
    }
    
}

}

