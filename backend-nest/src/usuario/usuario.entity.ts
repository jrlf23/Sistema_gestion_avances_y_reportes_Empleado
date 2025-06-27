import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    contrasena: string;

    @Column()
    telefono: string;
}