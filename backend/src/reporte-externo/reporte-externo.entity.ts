import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('ReporteExterno')
export class ReporteExterno
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    placa: string;

    @Column()
    equipo: string;

    @Column({ type: 'date' })
    fecha: string;

    @Column()
    horaInicio: string;

    @Column()
    horaFin: string;

    @Column()
    horasKm: string;

    @Column()
    sistema: string;

    @Column({nullable: true, type: 'text'})
    detallesFalla: string;

    @Column('simple-array')
    fuenteReporte: string[];    
}