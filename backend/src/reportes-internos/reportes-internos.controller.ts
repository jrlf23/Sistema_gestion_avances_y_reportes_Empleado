import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CrearReportDto } from "./dto/crear-reporte.dto";
import { reportesInternosService } from "./reportes-internos.service";


@Controller('reportes-internos')
export class reportesInternosController {
    constructor(private readonly service: reportesInternosService) { }

    @Post()
    async crear(@Body() dto: CrearReportDto) {
        const nuevoReporte = await this.service.crearReporte(dto);
        return { mensaje: 'Reporte creado correctamente', reporte: nuevoReporte };
    }

    @Get()
    async obtenerTodos() {
        return await this.service.obtenerTodos();
    }

    @Get('id')
    async obtenerUno(@Param('id', ParseIntPipe) id: number) {
        const reporte = await this.service.obtenerPorId(id);
        if (!reporte) {
            return { mensaje: 'Reporte no encontrado' };
        }

        return reporte;
    }

    @Post('full')
    async crearFull(@Body() dto: CrearReportDto) {
        const nuevoReporte = await this.service.crearReporte(dto);
        return { mensaje: 'Reporte completo creado correctamente', reporte: nuevoReporte };
    }

}