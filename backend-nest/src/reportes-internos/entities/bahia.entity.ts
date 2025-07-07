import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reporte } from "./reporte.entity";
import { RevisionBahiaItem } from "./revision-bahia-item.entity";


@Entity()
export class Bahia
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numero: number;

    @ManyToOne(() => Reporte, (reporte) => reporte.bahias)
    reporte: Reporte;

    @OneToMany(() => RevisionBahiaItem, (item) => item.bahia, {cascade: true})
    items: RevisionBahiaItem [];
}