import { Module } from '@nestjs/common';
import { UsuariosService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './usuario.entity';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Usuario])],
  providers: [UsuariosService],
  controllers: [UsuarioController],
  exports: [UsuariosService]
})
export class UsuarioModule {}
