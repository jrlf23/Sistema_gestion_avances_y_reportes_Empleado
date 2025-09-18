import { Body, Controller, Get, Post, UseGuards, Req } from "@nestjs/common";
import { ReporteExternoService } from "./reporte-externo.service";
import { CreateReporteExternoDto } from "./dto/create-reporte-externo.dto";
import { JwtAuthGuard } from "src/auth/jwt.guard";



@Controller('reportes/externos')
export class ReporteExternoController
{
    constructor (private readonly service: ReporteExternoService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async crearReporte(@Body() dto: CreateReporteExternoDto, @Req() req: any)
    {
        const empleadoId: number = req.user?.sub;
        return this.service.createForEmpleado(dto, empleadoId);
    }

    @Get()
    async obtenerTodos()
    {
        return this.service.findAll();
    }
}