import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Empleado } from 'src/Empleado/empleado.entity';

@Entity({ name: 'ReporteInterno1' })
export class ReporteInterno1 {
  @PrimaryGeneratedColumn({ name: 'id_reporte_interno1' })
  id_reporte_interno1: number;

  @Column({ type: 'varchar', length: 50 })
  placa: string;

  @Column({ type: 'varchar', length: 100 })
  equipo: string;

  @Column({type: 'varchar', length: 100, nullable: true, name: 'CD'})
  cd: string | null;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'time' })
  hora_inicio: string;

  @Column({ type: 'time' })
  hora_fin: string;

  @Column({ type: 'varchar', length: 50 })
  horas_km: string;

  @Column({ type: 'varchar', length: 50 })
  sistema: string;

  @Column({ type: 'text', nullable: true })
  detalles_sistema: string | null;

  @Column({ type: 'text', nullable: true })
  detalles_falla: string | null;

  @Column({ type: 'text' })
  fuente_reporte: string;

  @Column({ type: 'varchar', length: 50, default: 'pendiente' })
  estado: string;

  @ManyToOne(() => Empleado, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_empleado', referencedColumnName: 'id_empleado' })
  empleado: Empleado | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}