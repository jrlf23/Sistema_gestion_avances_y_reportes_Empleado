import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { Empleado } from './empleado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Empleado]),
  JwtModule.register({
    secret: process.env.JWT_SECRET || 'secreto_muy_seguro',
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [EmpleadoController],
  providers: [EmpleadoService],
})
export class EmpleadoModule { }