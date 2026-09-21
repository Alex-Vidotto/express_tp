import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { User } from "../user/user.entity";

//decoradores
// @Entity es para indicar que esta clase es una entidad
// @PrimaryGeneratedColumn es para indicar que esta columna es la llave primaria
// @Column es para indicar que esta columna es una columna
// @CreateDateColumn es para indicar que esta columna es una columna de fecha de creación
// @OneToOne es para indicar que esta columna es una relación de uno a uno
// @ManyToOne es para indicar que esta columna es una relación de muchos a uno
// @OneToMany es para indicar que esta columna es una relación de uno a muchos
// @ManyToMany es para indicar que esta columna es una relación de muchos a muchos
@Entity('alumnos')
export class Alumnos {
    //  increment es para que el id se incremente automaticamente
    // uuid es para que el id sea un identificador universal
    // increment es mas rapido que uuid
    @PrimaryGeneratedColumn("increment")
    // si es uuid tiene que se de tipo string
    id: number;

    @Column()
    nombre: string;

    @Column({ nullable: false })
    //nullable es para que la columna pueda ser nula
    //nullable false es para que la columna no pueda ser nula
    apellido: string;

    @Column({ nullable: true }) // decimos que puede recibir datos nulo, esto es de typeorm
    //? es para que la columna pueda ser nula
    email?: string; //esto es de typescript

    @Column({ default: "s/n", select: true }) //si no se le da un valor, se le asigna este valor por defecto
    //select es para que la columna sea seleccionada por defecto
    telefono: string;

    @Column({ insert: true }) //singifica que esta columna puede participar en inserciones 
    matricula: string;

    @CreateDateColumn() //define una columna para fecha de creación y se ejecuta automaticamente en la fecha que se creo
    creadoEn: Date;

    @UpdateDateColumn() //define una columna para fecha de actualización y se ejecuta automaticamente en la fecha que se actualizo
    actualizadoEn: Date;

    @DeleteDateColumn() //define una columna para fecha de eliminación y se ejecuta automaticamente en la fecha que se elimino
    eliminadoEn: Date;


    @OneToOne(() => User)
    user: User;


}

//un alumno puede tener muchas inscripciones a muchas materias