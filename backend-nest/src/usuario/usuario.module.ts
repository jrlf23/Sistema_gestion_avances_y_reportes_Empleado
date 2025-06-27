import { Module } from '@nestjs/common';
import { UsuariosService } from './usuario.service';
import { UsuarioController } from './usuario.controller';

@Module({
  providers: [UsuariosService],
  controllers: [UsuarioController]
})
export class UsuarioModule {}
