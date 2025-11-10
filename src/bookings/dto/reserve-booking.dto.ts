import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class ReserveBookingDto {
  @IsInt()
  @IsNotEmpty()
  event_id: number;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}

