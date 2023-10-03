import { Escuela } from "src/escuela/entities/escuela.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { EstudianteClase } from "src/estudiante/entities/estudiante_clase.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'clase'})
export class Clase {
@PrimaryGeneratedColumn()
id:number;

@Column()
nombre: string;
@ManyToOne(()=>Profesor,profesor=>profesor.clases)
@JoinColumn({name:"fk_id_profesor"})
profesor:Profesor[];

@ManyToOne(()=>Escuela,escuela=>escuela.clases)
@JoinColumn({name:"fk_id_escuela"})
escuela:Escuela;

@ManyToMany(()=>Estudiante,estudiantes=>estudiantes.clases)
@JoinTable()
estudiantes:Estudiante[];

@OneToMany(()=>EstudianteClase,estudianteclases=>estudianteclases.clase)
    estudianteClases:EstudianteClase[]

constructor(nombre:string){
    this.nombre = nombre;
}
    public getId():number{
    return this.id;
    }
    public getNombre():string{
        return this.nombre;

    }
    public setNombre(nombre:string){
        this.nombre = nombre;
    }

}
