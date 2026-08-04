import { db } from '~/server/db'
import { quotes } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const [newQuote] = await db.insert(quotes).values({
      clientName: body.clientName,
      clientPhone: body.clientPhone,
      selectedProductId: body.selectedProductId,
      productName: body.productName,
      pricePerM2: body.pricePerM2.toString(),
      quantityM2: body.quantityM2.toString(),
      totalTatamePrice: body.totalTatamePrice.toString(),
      hasVinilClick: body.hasVinilClick,
      vinilQuantity: body.vinilQuantity,
      vinilUnitPrice: body.vinilUnitPrice.toString(),
      totalVinilPrice: body.totalVinilPrice.toString(),
      grandTotal: body.grandTotal.toString(),
      selectedSellerId: body.selectedSellerId,
      sellerName: body.sellerName,
    }).returning()

    return newQuote
  } catch (error) {
    console.error('Erro ao salvar orçamento:', error)
    throw createError({
      statusCode: 500,
      message: 'Erro interno ao salvar orçamento',
    })
  }
})
