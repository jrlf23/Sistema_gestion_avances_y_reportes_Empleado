import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Empleado } from "src/Empleado/empleado.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService
{
    constructor(
        @InjectRepository(Empleado)
        private empleadoRepo: Repository<Empleado>,
        private jwtService: JwtService,
    ) {}

    async validateLogin(username: string, password: string): Promise<string>
    {
        const empleado = await this.empleadoRepo.findOne({where: {username}});

        if(!empleado)
        {
            throw new UnauthorizedException('Usuario no encontrado')
        }

        const passwordMatch = await bcrypt.compare(password, empleado.password);
        if (!passwordMatch)
        {
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        const payload =
        {
            sub:empleado.id_empleado,
            username: empleado.username,
        }

        return this.jwtService.sign(payload)
    }
}