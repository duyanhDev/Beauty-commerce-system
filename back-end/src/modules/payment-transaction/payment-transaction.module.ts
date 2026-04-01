import { Module } from '@nestjs/common';
import { PaymentTransactionService } from './payment-transaction.service';
import { PaymentTransactionController } from './payment-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTransaction } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentTransaction])],
  controllers: [PaymentTransactionController],
  providers: [PaymentTransactionService],
})
export class PaymentTransactionModule {}
