import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao, TransacaoDocument } from './schemas/transacao.schema';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private transacaoModel: Model<TransacaoDocument>,
  ) {}

  // Cadastra uma nova transação
  async criar(dto: CriarTransacaoDto): Promise<Transacao> {
    const novaTransacao = new this.transacaoModel(dto);
    return novaTransacao.save();
  }

  // Consulta o histórico e calcula as métricas financeiras
  async listar() {
    const historico = await this.transacaoModel
      .find()
      .sort({ createdAt: -1 })
      .exec();

    let totalReceitas = 0;
    let totalDespesas = 0;
    let totalGastoImpulso = 0;

    historico.forEach((transacao) => {
      if (transacao.tipo === 'receita') {
        totalReceitas += transacao.valor;
      } else if (transacao.tipo === 'despesa') {
        totalDespesas += transacao.valor;

        if (transacao.consumoConsciente === false) {
          totalGastoImpulso += transacao.valor;
        }
      }
    });

    const arredondar = (valor: number) =>
      Number(valor.toFixed(2));

    return {
      historico,
      metricas: {
        saldoTotal: arredondar(totalReceitas - totalDespesas),
        totalDespesas: arredondar(totalDespesas),
        totalGastoImpulso: arredondar(totalGastoImpulso),
      },
    };
  }
}