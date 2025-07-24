import { Body, Controller, Get, Post } from "@nestjs/common";
import { ReporteExternoService } from "./reporte-externo.service";
import { CreateReporteExternoDto } from "./dto/create-reporte-externo.dto";


@Controller('reportes/externos')
export class ReporteExternoController
{
    constructor (private readonly service: ReporteExternoService) {}

    @Post()
    async crearReporte(@Body() dto: CreateReporteExternoDto)
    {
        return this.service.create(dto);
    }

    @Get()
    async obtenerTodos()
    {
        return this.service.findAll();
    }
}