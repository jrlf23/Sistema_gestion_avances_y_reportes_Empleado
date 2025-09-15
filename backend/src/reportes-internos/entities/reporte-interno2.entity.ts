import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'ReporteInterno2' })
export class ReporteInterno2 {
  @PrimaryGeneratedColumn({ name: 'id_reporte_interno2' })
  id_reporte_interno2: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'varchar', length: 100 })
  equipo: string;

  @Column({ type: 'varchar', length: 50 })
  placa: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tipo: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marca: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  depto: string | null;

  @Column({ type: 'int', nullable: true })
  kilometraje: number | null;

  @Column({ type: 'enum', enum: ['E','1/4', '1/2', '3/4', 'F'], default: '1/4' })
  combustible: 'E' | '1/4' | '1/2' | '3/4' | 'F';

  @Column({ type: 'text' })
  trabajo_solicitado: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  supervisor_recibe: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mecanico_asignado: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  supervisor_entrega: string | null;

  @Column({ type: 'date', nullable: true })
  fecha_tentativa_entrega: string | null;

  @Column({ type: 'date', nullable: true })
  fecha_real_entrega: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  persona_entrega: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  persona_recibe: string | null;

  @Column({ type: 'json', nullable: true })
  inspeccion: any | null;

  @Column({ type: 'json', nullable: true })
  accesorios: any | null;

  @Column({ type: 'json', nullable: true })
  herramientas: any | null;

  @Column({ type: 'json', nullable: true })
  costos: any | null;

  @Column({ type: 'varchar', length: 50, default: 'pendiente' })
  estado: string;

  @Column({ type: 'int', nullable: true })
  id_empleado: number | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}