import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'placas',
  timestamps: true,
  underscored: true
})
export default class Placa extends Model {
  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    unique: true
  })
  placa!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  modelo_carro!: string;
}