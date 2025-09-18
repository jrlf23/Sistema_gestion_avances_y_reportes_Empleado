import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReporteExterno } from "./reporte-externo.entity";
import { ReporteExternoController } from "./reporte-externo.controller";
import { ReporteExternoService } from "./reporte-externo.service";
import { AuthModule } from "src/auth/auth.module";
import { JwtAuthGuard } from "src/auth/jwt.guard";


@Module({
    imports: [TypeOrmModule.forFeature([ReporteExterno]), AuthModule],
    controllers: [ReporteExternoController],
    providers: [ReporteExternoService, JwtAuthGuard],
})

export class ReporteExternoModule {}