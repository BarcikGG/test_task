import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { User } from "../../users/entities/user.entity";

@Entity("bookings")
@Index(["eventId", "userId"], { unique: true })
@Index(["eventId"])
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", name: "event_id" })
  eventId: number;

  @Column({ type: "int", name: "user_id" })
  userId: number;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Event, (event) => event.bookings)
  @JoinColumn({ name: "event_id" })
  event: Event;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: "user_id" })
  user: User;
}

