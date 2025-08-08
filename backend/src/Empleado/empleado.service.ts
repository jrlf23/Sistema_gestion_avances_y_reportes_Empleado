import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmpleadoService {
    constructor(
        @InjectRepository(Empleado)
        private empleadoRepo: Repository<Empleado>,
        private jwtService: JwtService
    ) {}

    async create(data: CreateEmpleadoDto): Promise<Empleado>
    {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const empleado = this.empleadoRepo.create({...data, password: hashedPassword});
        return this.empleadoRepo.save(empleado);
    }

    async login(username: string, password: string)
    {
        const empleado= await this.empleadoRepo.findOne({where:{username}});
        if (!empleado)
        {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        const passwordOk= await bcrypt.compare(password, empleado.password);
        if (!passwordOk)
        {
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        const payload = { sub: empleado.id_empleado, username: empleado.username };
        const token = this.jwtService.sign(payload);

        return { authToken: token };
    }
}
