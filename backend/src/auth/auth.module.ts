import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Empleado } from "src/Empleado/empleado.entity";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";


@Module(
    {
        imports: [TypeOrmModule.forFeature([Empleado]), JwtModule.register({secret: process.env.JWT_SECRET || 'supersecreto', signOptions: {expiresIn: '1h'},}),],
        providers: [AuthService],
        controllers: [AuthController],
        exports: [JwtModule],
    }
)

export class AuthModule {}