import { Body, Controller, Post } from "@nestjs/common";
import { CrearReporteFullDto, CrearReportePaso1Dto, CrearReportePaso2Dto, CrearReportePaso3Dto } from "./dto/crear-reporte.dto";
import { reportesInternosService } from "./reportes-internos.service";

@Controller('reportes-internos')
export class reportesInternosController {
  constructor(private readonly service: reportesInternosService) {}

  @Post('step1')
  async crearPaso1(@Body() dto: CrearReportePaso1Dto) {
    const reporte = await this.service.crearPaso1(dto);
    return { mensaje: 'Paso 1 creado', reporte };
  }

  @Post('step2')
  async crearPaso2(@Body() dto: CrearReportePaso2Dto) {
    const reporte = await this.service.crearPaso2(dto);
    return { mensaje: 'Paso 2 creado', reporte };
  }

  @Post('step3')
  async crearPaso3(@Body() dto: CrearReportePaso3Dto) {
    const reporte = await this.service.crearPaso3(dto);
    return { mensaje: 'Paso 3 creado', reporte };
  }

  @Post('full')
  async crearFull(@Body() dto: CrearReporteFullDto) {
    const data = await this.service.crearFullCompat(dto);
    return { mensaje: 'Reporte completo creado', ...data };
  }
}
