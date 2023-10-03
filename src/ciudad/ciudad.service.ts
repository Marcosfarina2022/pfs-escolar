import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './dto/ciudad.dto';

@Injectable()
export class CiudadService {

    private ciudades:Ciudad[] = [];

    constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository:Repository<Ciudad>
    ){}
    // consulta la base de datos ciudad.
    async findAllRaw():Promise<Ciudad[]>{
        this.ciudades = [];
        let datos = await this.ciudadRepository.query("select * from ciudad");
        //Recorre la variable datos y guarda la nueva ciudad en un arreglo.
        datos.forEach(element => {
            let ciudad : Ciudad = new Ciudad(element['nombre']);
            this.ciudades.push(ciudad)
        });

        return this.ciudades;
    }
    // nos devuelve cada fila del objeto completo
    async findAllOrm():Promise<Ciudad[]>{
        return await this.ciudadRepository.find();
    }
    // nos trae el objeto a través del ID
    async findById(id :number) : Promise<CiudadDTO> {
        try{
            const criterio : FindOneOptions = { where: { id:id} };
            const ciudad : CiudadDTO = await this.ciudadRepository.findOne( criterio );
            if(ciudad)
                return ciudad
            else  
                throw new Error('No se encuentra la ciudad');
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Error en ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }
        
    }

    async create(ciudadDTO : CiudadDTO) : Promise<boolean>{
        try{
            let ciudad : Ciudad = await this.ciudadRepository.save(new Ciudad(ciudadDTO.nombre));
            if(ciudad)
               return true;
           else
               throw new Error('No se pudo crear la cuidad');
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }

    }

    async update(ciudadDTO : CiudadDTO, id:number) : Promise<String>{
        try{
            const criterio : FindOneOptions = { where : {id:id} }
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
            if(!ciudad)
                throw new Error('no se pudo encontrar la ciudad a modificar ');
            else{
                let ciudadVieja = ciudad.getNombre();
                if(ciudadDTO.nombre != null && ciudadDTO.nombre != undefined)
                ciudad.setNombre(ciudadDTO.nombre);
                ciudad = await this.ciudadRepository.save(ciudad);
                return `OK - ${ciudadVieja} --> ${ciudadDTO.nombre}`
            }
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }

    }

    async delete(id:number): Promise<any>{
        try{
            const criterio : FindOneOptions = { where : {id:id} }
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
            if(!ciudad)
                throw new Error('no se puede eliminar ciudad ');
            else{
                await this.ciudadRepository.remove(ciudad);
                return { id:id,
                        message:'se elimino exitosamente'
                    }
                }
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }
        
    }


}