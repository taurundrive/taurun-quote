import { db } from '~/server/db'
import { quotes } from '~/server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({ statusCode: 400, message: 'ID do orçamento não fornecido' })
    }

    await db.delete(quotes).where(eq(quotes.id, id))
    
    return { success: true }
  } catch (error) {
    console.error('Erro ao excluir orçamento:', error)
    throw createError({
      statusCode: 500,
      message: 'Erro interno ao excluir orçamento',
    })
  }
})
