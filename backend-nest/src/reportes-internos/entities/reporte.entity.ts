import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Repuesto } from "./repuesto.entity";
import { Accesorio } from "./accesorio.entity";
import { Punto } from './punto.entity';
import { Bahia } from './bahia.entity';

@Entity()
export class Reporte {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cliente: string;

    @Column({ nullable: true })
    direccion: string;

    @Column({ nullable: true })
    color: string;

    @Column({ nullable: true })
    logo: string;

    @Column()
    placa: string;

    @Column()
    marca: string;

    @Column()
    tipo: string;

    @Column()
    equipo: string;

    @Column({ type: 'date' })
    fechaIngreso: string;

    @Column({ type: 'date' })
    fechaSalida: string;

    @Column()
    kilInicial: number;

    @Column()
    kilFinal: number;

    @Column({ type: 'text' })
    falla: string;

    @Column({ type: 'text' })
    trabajoRealizado: string;

    @Column({ type: 'text', nullable: true })
    observacion: string;

    @Column({ type: 'text', nullable: true })
    enderezar: string;

    @CreateDateColumn()
    fechaCreacion: Date;

    @OneToMany(() => Repuesto, (repuesto) => repuesto.reporte, { cascade: true })
    repuestos: Repuesto[];

    @OneToMany(() => Accesorio, (accesorio) => accesorio.reporte, { cascade: true })
    accesorios: Accesorio[];

    @OneToMany(() => Punto, (punto) => punto.reporte, { cascade: true })
    puntos: Punto[];

    @OneToMany(() => Bahia, (bahia) => bahia.reporte, { cascade: true })
    bahias: Bahia[];
}