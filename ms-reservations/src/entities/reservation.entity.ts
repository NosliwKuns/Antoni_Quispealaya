import { IsValidSeatType } from 'src/dto/isValidSeatType.decorator';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  seatNumber: number;

  // @IsValidSeatType() // custom decorator
  @Column()
  seatType: string; // 'Turista', 'Ejecutivo', 'Premium'

  @Column({ type: 'text', nullable: true })
  amenities: string

  @Column()
  userId: string;

  @Column()
  itineraryId: string;

  @Column()
  busId: string;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }

}