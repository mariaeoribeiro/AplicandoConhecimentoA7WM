import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransacaoDocument = HydratedDocument<Transacao>;

@Schema({ timestamps: true })
export class Transacao {
  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true, min: 0 })
  valor: number;

  @Prop({
    required: true,
    enum: ['receita', 'despesa'],
  })
  tipo: string;

  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true, default: false })
  consumoConsciente: boolean;

  @Prop({
    enum: ['dinheiro', 'pix', 'cartao_credito', 'cartao_debito'],
    default: 'pix',
  })
  formaPagamento: string;

  @Prop({ default: 1, min: 1 })
  parcelas: number;

  @Prop({ default: 0, min: 0 })
  juros: number;

  @Prop()
  dataVencimento?: Date;

  @Prop()
  dataPagamento?: Date;

  @Prop()
  faturaPagaIntegralmente?: boolean;

  @Prop({ default: false })
  pesquisouPrecos: boolean;
}

export const TransacaoSchema = SchemaFactory.createForClass(Transacao);