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
import { cacheConfig } from './config/cache.config';
import { OrderStatusHistoryModule } from './modules/order-status-history/order-status-history.module';
import { PaymentTransactionModule } from './modules/payment-transaction/payment-transaction.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { VariantAttributeValueModule } from './modules/variant-attribute-value/variant-attribute-value.module';
import { ProductImageModule } from './modules/product-image/product-image.module';
import { VariantImagesModule } from './modules/variant_images/variant_images.module';
import { CartItemsModule } from './modules/cart_items/cart_items.module';
import { InventoryLogsModule } from './modules/inventory_logs/inventory_logs.module';
import { CategoryTranslationsModule } from './modules/category_translations/category_translations.module';
import { ReviewImagesModule } from './modules/review_images/review_images.module';
import { ProductTranslationsModule } from './modules/product_translations/product_translations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validationSchema,
    }),
    cacheConfig,
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
    OrderStatusHistoryModule,
    PaymentTransactionModule,
    OrderItemModule,
    VariantAttributeValueModule,
    ProductImageModule,
    VariantImagesModule,
    CartItemsModule,
    InventoryLogsModule,
    CategoryTranslationsModule,
    ReviewImagesModule,
    ProductTranslationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
