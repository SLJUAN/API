import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'servicios',
  timestamps: true,
  underscored: true
})
export default class Servicio extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  nombre!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0.01
    }
  })
  precio!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  disponibilidad!: boolean;
}
