import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { Escuela } from './entities/escuela.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class EscuelaService {

  constructor(@InjectRepository(Escuela)
    private escuelaRepository:Repository<Escuela>
    ){}

  async create(createEscuelaDto: CreateEscuelaDto):Promise<boolean> {
    try{
      let escuela : Escuela = await this.escuelaRepository.save(new Escuela(createEscuelaDto.nombre,createEscuelaDto.domicilio));    
      if(escuela)
                 return true;
             else
                 throw new Error('No se pudo crear la escuela');
          }
          catch(error){
              throw new HttpException({
                  status: HttpStatus.NOT_FOUND,
                  error: 'Error en escuela - ' + error
              },HttpStatus.NOT_FOUND)
          }
        }

  async findAll() {
    return await this.escuelaRepository.find();
  }

  async findOne(id: number) {
    const criterio :FindOneOptions = {where:{id:id}}
    let escuela:Escuela = await this.escuelaRepository.findOne(criterio);
    if(escuela)
      return escuela;
    else
      return null;
  }

  async update(id: number, createEscuelaDto: CreateEscuelaDto) {
    const criterio : FindOneOptions = {where:{id:id}};
    let escuela:Escuela = await this.escuelaRepository.findOne(criterio);
    let escuelaVieja = escuela.getNombre();
    if(escuela){
      escuela.setNombre(createEscuelaDto.nombre);
      escuela = await this.escuelaRepository.save(escuela);
      if(escuela)
        return `Se reemplaso ${escuelaVieja} ==> ${escuela.getNombre()}`
      else
        return 'No se pudo reemplazar'
    }
    else
      return `No se encontro la escuela`;
  }

  async remove(id: number) {
    try{
      const criterio : FindOneOptions = {where:{id:id}};
      const escuela:Escuela = await this.escuelaRepository.findOne(criterio);
      if(escuela){
        await this.escuelaRepository.remove(escuela)
        return true;
      }else
      throw new Error('No se encontro para eliminar')
    }catch(error){
      throw new HttpException({
        status:HttpStatus.NOT_FOUND,
        error:"Problemas en Escuela - "+ error
      },HttpStatus.NOT_FOUND
      )
    }
  }
}