import { db } from '~/server/db'
import { quotes } from '~/server/db/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const allQuotes = await db.select().from(quotes).orderBy(desc(quotes.createdAt))
    return allQuotes
  } catch (error) {
    console.error('Erro ao buscar orçamentos:', error)
    throw createError({
      statusCode: 500,
      message: 'Erro interno ao buscar orçamentos',
    })
  }
})
