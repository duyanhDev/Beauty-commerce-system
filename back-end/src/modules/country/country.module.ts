import { Brand } from '@/entities/brand.entity';
import { Country } from '@/entities/country.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  exports: [],
  providers: [],
})
export class CountryModule {}
