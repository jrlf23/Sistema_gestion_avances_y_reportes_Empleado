import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
    constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
    ){}

    FindAll(): Promise<Usuario[]>
    {
        return this.usuarioRepo.find();
    }

    create(data: Partial<Usuario>): Promise<Usuario>
    {
        const usuario = this.usuarioRepo.create(data);
        return this.usuarioRepo.save(usuario);
    }
}
