import { Body, Controller, Post, Req, UseGuards, } from "@nestjs/common";
import { CrearReporteFullDto, CrearReportePaso1Dto, CrearReportePaso2Dto, CrearReportePaso3Dto } from "./dto/crear-reporte.dto";
import { reportesInternosService } from "./reportes-internos.service";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@Controller('reportes-internos')
export class reportesInternosController {
  constructor(private readonly service: reportesInternosService) {}

 @Post('step1')
  @UseGuards(JwtAuthGuard)
  async crearPaso1(@Body() dto: CrearReportePaso1Dto, @Req() req: any) {
    const reporte = await this.service.crearPaso1ForEmpleado(dto, req.user?.sub);
    return { mensaje: 'Paso 1 creado', reporte };
  }

  @Post('step2')
  @UseGuards(JwtAuthGuard)
  async crearPaso2(@Body() dto: CrearReportePaso2Dto, @Req() req: any) {
    const reporte = await this.service.crearPaso2ForEmpleado(dto, req.user?.sub);
    return { mensaje: 'Paso 2 creado', reporte };
  }

  @Post('step3')
  @UseGuards(JwtAuthGuard)
  async crearPaso3(@Body() dto: CrearReportePaso3Dto, @Req() req: any) {
    const reporte = await this.service.crearPaso3ForEmpleado(dto, req.user?.sub);
    return { mensaje: 'Paso 3 creado', reporte };
  }

   @Post('full')
  @UseGuards(JwtAuthGuard)
  async crearFull(@Body() payload: any, @Req() req: any) {
    const data = await this.service.crearFullCompatForEmpleado(payload, req.user?.sub);
    return { mensaje: 'Reporte completo creado', ...data };
  }
}
