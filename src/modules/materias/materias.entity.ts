import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Alumnos } from "../alumnos/alumnos.entity";


@Entity('materias')
export class Materias {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    creditos: number;

    @CreateDateColumn()
    creadoEn: Date;

    @OneToMany(() => Alumnos, (alumno) => alumno.id)
    alumnos: Alumnos[];
}

//una materia puede tener muchos alumnos inscritos 