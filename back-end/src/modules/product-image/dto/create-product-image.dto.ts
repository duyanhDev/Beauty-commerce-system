import { IsBoolean, IsString } from "class-validator";

export class CreateProductImageDto {

    @IsString()
    imageUrl:string;

    @IsString()
    publicId:string

    @IsBoolean()
    isMain:boolean
}
