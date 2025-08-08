import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmpleadoModule } from './Empleado/Empleado.module';
import { AuthModule } from './auth/auth.module';
import { ReporteExternoModule } from './reporte-externo/reporte-externo.module';
import { ReporteInternosModule } from './reportes-internos/reportes-internos.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmpleadoModule,
    AuthModule,
    ReporteExternoModule,
    ReporteInternosModule,
  ],
})
export class AppModule {}
