import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reporte } from "./reporte.entity";


@Entity()
export class Punto
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    x: number;

    @Column('float')
    y: number;

    @Column()
    area: 'frontal' | 'trasera' | 'superior' | 'izquierdo' | 'derecho';

    @ManyToOne(() => Reporte, (reporte) => reporte.puntos)
    reporte: Reporte
}