import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'ReporteInterno3' })
export class ReporteInterno3 {
  @PrimaryGeneratedColumn({ name: 'id_reporte_interno3' })
  id_reporte_interno3: number;

  @Column({ type: 'varchar', length: 255 })
  cliente: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  direccion: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  color: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  logo: string | null;

  @Column({ type: 'varchar', length: 50 })
  placa: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marca: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tipo: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  equipo: string | null;

  @Column({ type: 'date', nullable: true, name: 'fecha_ingreso' })
  fecha_ingreso: string | null;

  @Column({ type: 'date', nullable: true, name: 'fecha_salida' })
  fecha_salida: string | null;

  @Column({ type: 'int', nullable: true, name: 'kil_inicial' })
  kil_inicial: number | null;

  @Column({ type: 'int', nullable: true, name: 'kil_final' })
  kil_final: number | null;

  @Column({ type: 'text' })
  falla: string;

  @Column({ type: 'text', name: 'trabajo_realizado' })
  trabajo_realizado: string;

  @Column({ type: 'json', nullable: true })
  accesorios: any | null;

  @Column({ type: 'json', nullable: true })
  repuestos: any | null;

  @Column({ type: 'json', nullable: true, name: 'revision_bahias' })
  revision_bahias: any | null;

  @Column({ type: 'text', nullable: true })
  observacion: string | null;

  @Column({ type: 'text', nullable: true })
  enderezar: string | null;

  @Column({ type: 'varchar', length: 50, default: 'pendiente' })
  estado: string;

  @Column({ type: 'int', nullable: true })
  id_empleado: number | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}