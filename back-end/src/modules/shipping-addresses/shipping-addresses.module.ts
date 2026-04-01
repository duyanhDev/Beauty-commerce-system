import { Module } from '@nestjs/common';
import { ShippingAddressesService } from './shipping-addresses.service';
import { ShippingAddressesController } from './shipping-addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingAddress } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingAddress])],
  controllers: [ShippingAddressesController],
  providers: [ShippingAddressesService],
})
export class ShippingAddressesModule {}
