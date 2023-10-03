import { Asistencia } from "src/asistencia/entities/asistencia.entity";
import { Clase } from "src/clases/entities/clase.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Estudiante } from "./estudiante.entity";

@Entity({name:'clase_estudiante'})
export class EstudianteClase{
    @PrimaryColumn()
    estudianteId:number;

    @PrimaryColumn()
    claseId:number;

    @ManyToOne(()=>Estudiante,estudiante=>estudiante.estudianteClases)
    @JoinColumn()
    estudiante:Estudiante;

    @ManyToOne(()=>Clase,clase=>clase.estudianteClases)
    @JoinColumn()
    clase:Clase;
    @OneToMany(()=>Asistencia,asistencia=>asistencia.estudianteclase)
    asistencia:Asistencia[];


    constructor(estudianteId:number,claseId:number){
        this.estudianteId = estudianteId;
        this.claseId = claseId;

    }
}