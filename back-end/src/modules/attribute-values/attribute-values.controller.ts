import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttributeValuesService } from './attribute-values.service';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';

@Controller('attribute-values')
export class AttributeValuesController {
  constructor(
    private readonly attributeValuesService: AttributeValuesService,
  ) {}

  @Post()
  async create(@Body() createAttributeValueDto: CreateAttributeValueDto) {
    const data = await this.attributeValuesService.create(
      createAttributeValueDto,
    );

    return {
      EC: 0,
      message: 'Tạo thành công thuộc tính mới',
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.attributeValuesService.findAll();
    return {
      EC: 0,
      message: 'Lấy dữ liệu thành công',
      data: data,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeValuesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeValueDto: UpdateAttributeValueDto,
  ) {
    return this.attributeValuesService.update(+id, updateAttributeValueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributeValuesService.remove(+id);
  }
}
