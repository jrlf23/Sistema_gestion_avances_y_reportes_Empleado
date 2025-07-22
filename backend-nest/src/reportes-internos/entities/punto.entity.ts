import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reporte } from "./reporte.entity";

export enum AreaEnum {
  FRONTAL = 'frontal',
  TRASERA = 'trasera',
  SUPERIOR = 'superior',
  IZQUIERDO = 'izquierdo',
  DERECHO = 'derecho',
}

@Entity()
export class Punto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    x: number;

    @Column('float')
    y: number;

    @Column({
        type: 'enum',
        enum: AreaEnum,
    })
    area: AreaEnum;

    @ManyToOne(() => Reporte, (reporte) => reporte.puntos)
    reporte: Reporte
}