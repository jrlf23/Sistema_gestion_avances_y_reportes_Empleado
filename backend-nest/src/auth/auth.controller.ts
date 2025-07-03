import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginEmployeeDto } from "./dto/login-employee.dto";


@Controller('login/employee')
export class AuthController
{
    constructor (private readonly authService: AuthService) {}

    @Post()
    async login(@Body() dto: LoginEmployeeDto) 
    {
        const authToken = await this.authService.validateLogin(dto.username, dto.password);
        return {authToken};
    }
}