import { Body, Post } from "@nestjs/common";


@Post()
create(@Body() dto: CrearReportDto)
{
    return this.reportesInternosService.create(dto);
}