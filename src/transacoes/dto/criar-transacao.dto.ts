import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsIn,
  IsBoolean,
  IsOptional,
  Min,
  IsInt,
  IsDateString,
} from 'class-validator';

export class CriarTransacaoDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  @Min(0.01)
  valor: number;

  @IsIn(['receita', 'despesa'])
  tipo: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsBoolean()
  consumoConsciente: boolean;

  @IsOptional()
  @IsIn(['dinheiro', 'pix', 'cartao_credito', 'cartao_debito'])
  formaPagamento?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  parcelas?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  juros?: number;

  @IsOptional()
  @IsDateString()
  dataVencimento?: string;

  @IsOptional()
  @IsDateString()
  dataPagamento?: string;

  @IsOptional()
  @IsBoolean()
  faturaPagaIntegralmente?: boolean;

  @IsOptional()
  @IsBoolean()
  pesquisouPrecos?: boolean;
}