import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'clients',
  timestamps: true
})
export default class Client extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare nombre: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare apellido: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare telefono: string;
}