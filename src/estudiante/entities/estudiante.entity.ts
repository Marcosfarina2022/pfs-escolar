import { IsNotEmpty } from "class-validator";
import { CiudadEstudiante } from "src/ciudad/entities/ciudad_estudiante.entity";
import { Clase } from "src/clases/entities/clase.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EstudianteClase } from "./estudiante_clase.entity";

@Entity({name:'estudiante'})
export class Estudiante {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    @IsNotEmpty()
    apellido: string;
    @Column()
    fecha_nacimiento:Date;

    @ManyToMany(()=>Clase,clases=>clases.estudiantes)
    clases:Clase[];

    @OneToMany(()=>EstudianteClase,estudianteclases=>estudianteclases.estudiante)
    estudianteClases:EstudianteClase[];
    
    @OneToMany(()=>CiudadEstudiante,domicilios=>domicilios.estudiante)
    domicilios:CiudadEstudiante[];

    constructor(nombre:string, apellido:string, fecha_nacimiento:Date){
        this.nombre= nombre;
        this.apellido = apellido;
        this.fecha_nacimiento = fecha_nacimiento;
    }
 public getId():number{
    return this.id;
 }
 public getNombre(){
    return this.nombre;
 }
 public setNombre(nombre:string){
    this.nombre = nombre;
 }
 public getApellido():string{
    return this.apellido;
 }
 public setApellido(apellido:string){
    return this.apellido = apellido;
 }
 public getFechaNac():Date{
    return this.fecha_nacimiento;
 }

}

