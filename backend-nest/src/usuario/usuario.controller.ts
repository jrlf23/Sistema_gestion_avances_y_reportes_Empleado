import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuariosService) {}

    @Get()
    FindAll(): Promise<Usuario[]> {
    return this.usuarioService.FindAll();
    }

    @Post()
    create(@Body() usuario: Partial<Usuario>): Promise<Usuario>
    {
        return this.usuarioService.create(usuario)
    }
}
