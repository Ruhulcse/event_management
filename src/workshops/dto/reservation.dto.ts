import { IsInt, IsString, MaxLength } from 'class-validator';

export class ReservationDto {
  @IsInt()
  workshop_id: number;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  email: string;
}
