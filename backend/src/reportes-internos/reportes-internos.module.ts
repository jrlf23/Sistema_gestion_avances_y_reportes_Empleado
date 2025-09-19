import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReporteInterno1 } from "./entities/reporte-interno1.entity";
import { ReporteInterno2 } from "./entities/reporte-interno2.entity";
import { ReporteInterno3 } from "./entities/reporte-interno3.entity";
import { reportesInternosController } from "./reportes-internos.controller";
import { reportesInternosService } from "./reportes-internos.service";
import { AuthModule } from "../auth/auth.module";
import { JwtAuthGuard } from "../auth/jwt.guard";


@Module({
    imports:[
        TypeOrmModule.forFeature([
            ReporteInterno1, ReporteInterno2, ReporteInterno3,
        ]),
        AuthModule,
    ],

    controllers: [reportesInternosController],
    providers: [reportesInternosService, JwtAuthGuard]
})

export class ReporteInternosModule {}