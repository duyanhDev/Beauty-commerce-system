import { IsIn, IsString } from "class-validator";

export class CreateProductTranslationDto {
    @IsString()
    @IsIn(['vi', 'en', 'ja'])
    language: string;

    @IsString()
    name: string;

    @IsString()
    description: string;
}
