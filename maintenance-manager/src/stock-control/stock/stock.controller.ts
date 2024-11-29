import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    Put,
    BadRequestException,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
  import { StockService } from './stock.service';
  import { Piece } from './schema/piece.schema';
  
  @ApiTags('stock')
  @Controller('stock')
  export class StockController {
    constructor(private readonly stockService: StockService) {}
  
    @Post()
    @ApiOperation({ summary: 'Criar uma nova peça' })
    @ApiResponse({ status: 201, description: 'Peça criada com sucesso.', type: Piece })
    @ApiBody({ description: 'Dados da peça', type: Piece })
    create(@Body() data: Partial<Piece>) {
      return this.stockService.create(data);
    }
  
    @Get()
    @ApiOperation({ summary: 'Listar todas as peças' })
    @ApiResponse({ status: 200, description: 'Lista de peças retornada com sucesso.', type: [Piece] })
    findAll() {
      return this.stockService.findAll();
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar os dados de uma peça' })
    @ApiParam({ name: 'id', description: 'ID da peça' })
    @ApiBody({ description: 'Novos dados da peça', type: Piece })
    @ApiResponse({ status: 200, description: 'Peça atualizada com sucesso.', type: Piece })
    @ApiResponse({ status: 404, description: 'Peça não encontrada.' })
    update(@Param('id') id: string, @Body() data: Partial<Piece>) {
      return this.stockService.update(id, data);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Remover uma peça' })
    @ApiParam({ name: 'id', description: 'ID da peça' })
    @ApiResponse({ status: 200, description: 'Peça removida com sucesso.' })
    @ApiResponse({ status: 404, description: 'Peça não encontrada.' })
    remove(@Param('id') id: string) {
      return this.stockService.remove(id);
    }
  
    @Put(':id/entry')
    @ApiOperation({ summary: 'Registrar entrada de peças' })
    @ApiParam({ name: 'id', description: 'ID da peça' })
    @ApiBody({ description: 'Quantidade de peças a ser adicionada', schema: { example: { quantity: 10 } } })
    @ApiResponse({ status: 200, description: 'Entrada registrada com sucesso.', type: Piece })
    @ApiResponse({ status: 400, description: 'Quantidade inválida.' })
    registerEntry(@Param('id') id: string, @Body('quantity') quantity: number) {
      if (quantity <= 0) {
        throw new BadRequestException('Quantity must be greater than zero');
      }
      return this.stockService.registerEntry(id, quantity);
    }
  
    @Put(':id/exit')
    @ApiOperation({ summary: 'Registrar saída de peças' })
    @ApiParam({ name: 'id', description: 'ID da peça' })
    @ApiBody({ description: 'Quantidade de peças a ser retirada', schema: { example: { quantity: 5 } } })
    @ApiResponse({ status: 200, description: 'Saída registrada com sucesso.', type: Piece })
    @ApiResponse({ status: 400, description: 'Estoque insuficiente ou quantidade inválida.' })
    registerExit(@Param('id') id: string, @Body('quantity') quantity: number) {
      if (quantity <= 0) {
        throw new BadRequestException('Quantity must be greater than zero');
      }
      return this.stockService.registerExit(id, quantity);
    }
  
    @Get('reports')
    @ApiOperation({ summary: 'Gerar relatório de estoque' })
    @ApiResponse({ status: 200, description: 'Relatório gerado com sucesso.', type: [Piece] })
    generateReport() {
      return this.stockService.findAll();
    }    

    @Get(':id')
    @ApiOperation({ summary: 'Buscar uma peça por ID' })
    @ApiParam({ name: 'id', description: 'ID da peça' })
    @ApiResponse({ status: 200, description: 'Peça encontrada.', type: Piece })
    @ApiResponse({ status: 404, description: 'Peça não encontrada.' })
    findOne(@Param('id') id: string) {
      return this.stockService.findOne(id);
    }
  }
  