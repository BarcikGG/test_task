import { IsOptional } from "class-validator";

export class GetTopParams {
    @IsOptional()
    date_type: 'day' | 'week' | 'month' = 'month';
}
  