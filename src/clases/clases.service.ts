import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClaseDto } from './dto/create-clase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { FindOneOptions, Repository } from 'typeorm';



@Injectable()
export class ClasesService {

  constructor(@InjectRepository(Clase)
    private claseRepository:Repository<Clase>
    ){}

  async create(createClaseDto: CreateClaseDto): Promise<boolean> {
    try{
    let clase : Clase = await this.claseRepository.save(new Clase(createClaseDto.nombre));    
    if(clase)
               return true;
           else
               throw new Error('No se pudo crear la clase');
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en clase - ' + error
            },HttpStatus.NOT_FOUND)
        }
      }

  async findAll():Promise<Clase[]> {
    return await this.claseRepository.find({relations:['estudiantes']});
  }

  async findOne(id: number) {
    const criterio :FindOneOptions = {where:{id:id}, relations:['estudiantes']}
    let clase:Clase = await this.claseRepository.findOne(criterio);
    if(clase)
      return clase;
    else
      return null;
  }

  async update(id: number, createClaseDto: CreateClaseDto):Promise<string> {
    const criterio : FindOneOptions = {where:{id:id}};
    let clase:Clase = await this.claseRepository.findOne(criterio);
    let nombreViejo = clase.getNombre();
    if(clase){
      clase.setNombre(createClaseDto.nombre);
      clase = await this.claseRepository.save(clase);
      if(clase)
        return `Se reemplaso ${nombreViejo} ==> ${clase.getNombre()}`
      else
        return 'No se pudo reemplazar'
    }
    else
      return `No se encontro la clase`;
  }

  async remove(id: number):Promise<boolean> {
    try{
    const criterio : FindOneOptions = {where:{id:id}};
    const clase:Clase = await this.claseRepository.findOne(criterio);
    if(clase){
      await this.claseRepository.remove(clase)
      return true;
    }else
    throw new Error('No se encontro para eliminar')
  }catch(error){
    throw new HttpException({
      status:HttpStatus.NOT_FOUND,
      error:"Problemas en Clase - "+ error
    },HttpStatus.NOT_FOUND
    )
  }
}
}