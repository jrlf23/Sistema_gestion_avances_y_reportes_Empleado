import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('Empleado')
export class Empleado
{
    @PrimaryGeneratedColumn()
    id_empleado: number;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({nullable: true})
    address: string;

    @Column({nullable: true})
    phoneNumber: string;

    @Column({ nullable: true })
    dui: string;
}