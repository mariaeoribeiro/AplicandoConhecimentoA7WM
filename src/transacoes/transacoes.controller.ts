import { Controller, Post, Get, Body } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  // Endpoint para cadastrar uma transação
  @Post()
  criar(@Body() dto: CriarTransacaoDto) {
    return this.transacoesService.criar(dto);
  }

  // Endpoint para consultar o histórico e as métricas
  @Get()
  listar() {
    return this.transacoesService.listar();
  }
}