import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EmpleadoService {
    constructor(
        @InjectRepository(Empleado)
        private empleadoRepo: Repository<Empleado>
    ) {}

    async create(data: CreateEmpleadoDto): Promise<Empleado>
    {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const empleado = this.empleadoRepo.create({...data, password: hashedPassword});
        return this.empleadoRepo.save(empleado);
    }
}
