import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { Empleado } from './empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';

@Controller('usuario')
export class EmpleadoController {
    constructor (private readonly empleadoService: EmpleadoService){}

    @Post('register')
    async register(@Body() dto: CreateEmpleadoDto)
    {
        return this.empleadoService.create(dto)
    }

    @Post('login')
    async login (@Body() body: {username: string; password: string})
    {
        return this.empleadoService.login(body.username, body.password);
    }
}
