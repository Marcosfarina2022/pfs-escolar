import { EstudianteClase } from "src/estudiante/entities/estudiante_clase.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'asistencia'})
export class Asistencia {
@PrimaryColumn()
claseId:number;
@PrimaryColumn()
estudianteId:number;
@Column()
fecha:Date;
constructor(claseId:number,estudianteId:number){
    this.claseId = claseId;
    this.estudianteId = estudianteId;
  
}
@ManyToOne(()=>EstudianteClase,estudianteclase=>estudianteclase.asistencia)
    @JoinColumn()
    estudianteclase:EstudianteClase;
}
