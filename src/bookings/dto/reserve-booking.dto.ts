import { IsInt, IsNotEmpty } from "class-validator";

export class ReserveBookingDto {
  @IsInt()
  @IsNotEmpty()
  event_id: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
