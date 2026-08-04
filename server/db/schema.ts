import { pgTable, uuid, varchar, numeric, boolean, integer, timestamp } from 'drizzle-orm/pg-core'

export const quotes = pgTable('quotes', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientPhone: varchar('client_phone', { length: 50 }).notNull(),
  selectedProductId: varchar('selected_product_id', { length: 100 }).notNull(),
  productName: varchar('product_name', { length: 255 }).notNull(),
  pricePerM2: numeric('price_per_m2', { precision: 10, scale: 2 }).notNull(),
  quantityM2: numeric('quantity_m2', { precision: 10, scale: 2 }).notNull(),
  totalTatamePrice: numeric('total_tatame_price', { precision: 10, scale: 2 }).notNull(),
  hasVinilClick: boolean('has_vinil_click').default(false).notNull(),
  vinilQuantity: integer('vinil_quantity').default(0).notNull(),
  vinilUnitPrice: numeric('vinil_unit_price', { precision: 10, scale: 2 }).default('0').notNull(),
  totalVinilPrice: numeric('total_vinil_price', { precision: 10, scale: 2 }).default('0').notNull(),
  grandTotal: numeric('grand_total', { precision: 10, scale: 2 }).notNull(),
  selectedSellerId: varchar('selected_seller_id', { length: 100 }).notNull(),
  sellerName: varchar('seller_name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})
