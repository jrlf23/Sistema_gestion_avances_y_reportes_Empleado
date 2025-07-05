import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reporte } from "./reporte.entity";


@Entity()
export class Repuesto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    cantidad: string;

    @Column()
    precio: string;

    @ManyToOne(() => Reporte, (reporte) => reporte.repuestos)
    reporte: Reporte;
}