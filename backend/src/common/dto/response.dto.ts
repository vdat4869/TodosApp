import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<T> {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message!: string;

  @ApiProperty()
  data?: T;
}

export class ErrorResponseDto {
  @ApiProperty({ example: false })
  success!: boolean;

  @ApiProperty({ example: 'Something went wrong' })
  message!: string;

  @ApiProperty({ example: 'INTERNAL_SERVER_ERROR' })
  errorCode!: string;

  @ApiProperty({ example: [] })
  details?: any[];
}
