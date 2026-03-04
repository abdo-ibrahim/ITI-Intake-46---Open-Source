import {
  IsString,
  IsUrl,
  IsOptional,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty({ message: 'URL is required' })
  @IsUrl({}, { message: 'URL must be a valid format' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
