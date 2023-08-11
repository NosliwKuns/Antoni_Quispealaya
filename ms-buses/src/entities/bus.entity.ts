import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Bus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  plate: string;

  @Column()
  operator: string;

  @Column()
  numberSeats: number;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }

}