import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/env.config';
import { validationSchema } from './config/validation.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { UsersModule } from './modules/users/users.module';
import { ShippingAddressesModule } from './modules/shipping-addresses/shipping-addresses.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductAttributesModule } from './modules/product-attributes/product-attributes.module';
import { AttributeValuesModule } from './modules/attribute-values/attribute-values.module';
import { ProductVariantsModule } from './modules/product-variants/product-variants.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    RolesModule,
    PermissionsModule,
    UsersModule,
    ShippingAddressesModule,
    CategoriesModule,
    ProductsModule,
    ProductAttributesModule,
    AttributeValuesModule,
    ProductVariantsModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    ReviewsModule,
    WishlistModule,
    InventoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
