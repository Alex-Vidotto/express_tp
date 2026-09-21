import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Producto } from "../products/products.entity";
import { User } from "../user/user.entity";

@Entity("carrito")
export class Carrito {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "int" })
    userId: number

    @Column({ type: "decimal" })
    total: number

    @CreateDateColumn()
    creadoEn: Date

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(() => Producto, (producto) => producto.id)
    productos: Producto[];
}
