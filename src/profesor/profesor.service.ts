import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { CiudadProfesor } from 'src/ciudad/entities/ciudad_profesor.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Injectable()
export class ProfesorService {

  private profesores:Profesor[] = []

constructor(@InjectRepository(Profesor)
          private readonly profesorRepository:Repository<Profesor>,
          @InjectRepository(Ciudad)
          private readonly ciudadRepository:Repository<Ciudad>,
          @InjectRepository(CiudadProfesor)
          private readonly ciudadProfesorRepository:Repository<CiudadProfesor>)
          {}

          async findAllRaw():Promise<CreateProfesorDto[]>{
            this.profesores = [];
            let datos = await this.profesorRepository.query("select * from profesor");
            datos.forEach(element => {
                let profesor : Profesor = new Profesor(element['nombre'],element['apellido']);
                this.profesores.push(profesor)
            });
        
            return this.profesores;
        }
        
        async findAllOrm():Promise<CreateProfesorDto[]>{
            return await this.profesorRepository.find();
        }
        
        async findById(id :number):Promise<CreateProfesorDto> {
            try{
                const criterio : FindOneOptions = { where: {id:id} };
                const profesor : CreateProfesorDto = await this.profesorRepository.findOne(criterio);
                if(profesor)
                    return profesor
                else  
                    throw new Error('No se encuentra el profesor');
            }
            catch(error){
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    error: 'Error en profesor - ' + error
                },HttpStatus.NOT_FOUND)
            }
            
        }
        
        async create(profesorDto:CreateProfesorDto):Promise<boolean>{
            try{
                let profesor:Profesor = await this.profesorRepository.save(new Profesor(profesorDto.nombre,profesorDto.apellido));
                if(profesor)
                   return true;
               else
                   throw new Error('No se pudo crear el profesor');
            }
            catch(error){
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: 'Error en profesor - ' + error
                },HttpStatus.NOT_FOUND)
            }
        
        }
        
        async createDomicilio(body){
          const { ciudadId, profesorId,domicilio} = body;
        
          const profesor = await this.profesorRepository.findOne({where:{id:profesorId}})
          if(!profesor)
            return 'error - no existe este profesor'
          
          const ciudad = await this.ciudadRepository.findOne({where:{id:ciudadId}})
          if(!ciudad)
              return 'error - no existe la ciudad para este profesor'
        
          const nuevo_domicilio = await this.ciudadProfesorRepository.findOne({where:{ciudadId:ciudadId,profesorId:profesorId}})
          if(nuevo_domicilio)
          return 'profesor ya tiene domicilio'
        return await this.ciudadProfesorRepository.save(new CiudadProfesor(ciudadId,profesorId,domicilio))
        }
        
        async update(profesorDto : CreateProfesorDto, id:number) : Promise<String>{
            try{
                const criterio : FindOneOptions = { where : {id:id} }
                let profesor : Profesor = await this.profesorRepository.findOne(criterio);
                if(!profesor)
                    throw new Error('no se pudo encontrar el profesor a modificar ');
                else{
                    let profesorAntiguo = profesor.getNombre() + ' ' + profesor.getApellido();
                    if((profesorDto.nombre != null && profesorDto.nombre != undefined && profesorDto.nombre != "") && (profesorDto.apellido != null && profesorDto.apellido != undefined && profesorDto.apellido != "")){
                        profesor.setNombre(profesorDto.nombre);
                        profesor.setApellido(profesorDto.apellido);
                    profesor = await this.profesorRepository.save(profesor);
                    return `OK - ${profesorAntiguo} --> ${profesorDto.nombre} --> ${profesorDto.apellido}`
                }else{
                    
                    return `No se pueden actualizar los datos --> ${profesorDto.nombre} --> ${profesorDto.apellido}`
                }}
            }
            catch(error){
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: 'Error en profesor - ' + error
                },HttpStatus.NOT_FOUND)
            }
        
        }
        
        async delete(id:number): Promise<any>{
            try{
                const criterio : FindOneOptions = { where : {id:id} }
                let profesor : Profesor = await this.profesorRepository.findOne(criterio);
                if(!profesor)
                    throw new Error('no puede se eliminar profesor ');
                else{
                    await this.profesorRepository.remove(profesor);
                    return { id:id,
                            message:'se elimino exitosamente'
                        }
                    }
            }
            catch(error){
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: 'Error en Profesor - ' + error
                },HttpStatus.NOT_FOUND)
            }
            
        }

}
