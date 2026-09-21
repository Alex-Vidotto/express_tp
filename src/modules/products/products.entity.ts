import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Carrito } from "../carrito/carrito.entity";

@Entity("productos")
export class Producto {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    name: string

    @Column({ type: "decimal" })
    precio: number

    @Column({ type: "int" })
    stock: number

    @CreateDateColumn()
    creadoEn: Date

    @ManyToOne(() => Carrito, (carrito) => carrito.id)
    carrito: Carrito;
}
