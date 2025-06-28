import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';

@Injectable()
export class EmpleadoService {
    constructor(
        @InjectRepository(Empleado)
        private empleadoRepo: Repository<Empleado>
    ) {}

    async create(data: CreateEmpleadoDto): Promise<Empleado>
    {
        const empleado = this.empleadoRepo.create(data);
        return this.empleadoRepo.save(empleado);
    }
}
