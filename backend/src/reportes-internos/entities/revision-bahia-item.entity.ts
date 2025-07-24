import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bahia } from "./bahia.entity";


@Entity()
export class RevisionBahiaItem
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    lado: 'izquierdo' | 'derecho';

    @ManyToOne(() => Bahia, (bahia) => bahia.items)
    bahia: Bahia;
}