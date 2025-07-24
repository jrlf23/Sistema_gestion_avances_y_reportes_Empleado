import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reporte } from "./reporte.entity";


@Entity()
export class Accesorio
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => Reporte, (reporte) => reporte.accesorios)
    reporte: Reporte;
}