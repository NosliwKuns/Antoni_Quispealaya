import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany  } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'itineraries' })
export class Itinerary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originCity: string

  @Column()
  destinationCity: string

  @Column()
  departureTime: string

  @Column()
  arrivalTime: string

  @Column()
  ticketPrice: number

  @Column()
  busId: string

  @Column({ default: () => "20" })
  availableSeats: number 

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}