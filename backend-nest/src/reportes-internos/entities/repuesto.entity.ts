import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reporte } from "./reporte.entity";


@Entity()
export class Repuesto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column('int')
    cantidad: number;

    @Column('float')
    precio: number;

    @ManyToOne(() => Reporte, (reporte) => reporte.repuestos)
    reporte: Reporte;
}