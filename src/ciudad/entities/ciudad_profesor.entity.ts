import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, ManyToOne, PrimaryColumn,} from "typeorm";
import { Ciudad } from "./ciudad.entity";

@Entity({name:'ciudad_profesor'})
export class CiudadProfesor{
    @PrimaryColumn()
    ciudadId:number;
    @PrimaryColumn()
    profesorId:number;

    @Column()
    direccion:string;

    @ManyToOne(()=>Profesor,profesor=>profesor.domicilios)
    profesor:Profesor;

    @ManyToOne(()=>Ciudad,ciudad=>ciudad.domicilios)
    ciudad:Ciudad;

    constructor(ciudadId:number,profesorId:number,direccion:string){
        this.ciudadId=ciudadId;
        this.profesorId=profesorId;
        this.direccion = direccion;
    }



}