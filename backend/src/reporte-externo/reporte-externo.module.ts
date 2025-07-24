import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReporteExterno } from "./reporte-externo.entity";
import { ReporteExternoController } from "./reporte-externo.controller";
import { ReporteExternoService } from "./reporte-externo.service";


@Module({
    imports: [TypeOrmModule.forFeature([ReporteExterno])],
    controllers: [ReporteExternoController],
    providers: [ReporteExternoService],
})

export class ReporteExternoModule {}