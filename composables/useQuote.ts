// composables/useQuote.ts
// Gerenciador de estado reativo e cálculos de orçamento para o sistema Taurun.
// Permite atualização em tempo real dos totais, pré-preenchimento por produto e sincronização com URL/LocalStorage.

export interface ProductOption {
  id: string
  name: string
  defaultPriceM2: number
  description: string
}

export interface SellerOption {
  id: string
  name: string
  role: string
  avatar: string
}

export interface SavedQuote {
  id: string
  clientName: string
  clientPhone: string
  selectedProductId: string
  productName: string
  pricePerM2: number
  quantityM2: number
  totalTatamePrice: number
  hasVinilClick: boolean
  vinilQuantity: number
  vinilUnitPrice: number
  totalVinilPrice: number
  grandTotal: number
  selectedSellerId: string
  sellerName: string
  createdAt: string
}

// Lista oficial dos 3 produtos principais Taurun com valores de referência sugeridos
export const PRODUCTS: ProductOption[] = [
  { id: 'revestimento-taurun', name: 'Revestimento Taurun', defaultPriceM2: 180, description: 'Superfície sem divisões feita em hexafibra de altíssima resistência.' },
  { id: 't50-pro', name: 'T50-Pro', defaultPriceM2: 220, description: 'Tatame profissional unificado com máxima absorção de impacto.' },
  { id: 't50-gold', name: 'T50-GOLD', defaultPriceM2: 280, description: 'Linha premium Taurun para academias de alto padrão e alta exigência.' }
]

// Lista dos vendedores cadastrados no sistema
export const SELLERS: SellerOption[] = [
  { id: 'fernando', name: 'Fernando', role: 'Consultor Comercial', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { id: 'roberto', name: 'Roberto', role: 'Especialista em Projetos', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: 'caio', name: 'Caio', role: 'Consultor de Vendas', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
]

const MOCK_SAVED_QUOTES: SavedQuote[] = [
  {
    id: 'quote-001',
    clientName: 'Checkmat HQ (Rodrigo Silva)',
    clientPhone: '(11) 98765-4321',
    selectedProductId: 't50-pro',
    productName: 'T50-Pro',
    pricePerM2: 220,
    quantityM2: 80,
    totalTatamePrice: 17600,
    hasVinilClick: true,
    vinilQuantity: 26,
    vinilUnitPrice: 80,
    totalVinilPrice: 2080,
    grandTotal: 19680,
    selectedSellerId: 'fernando',
    sellerName: 'Fernando',
    createdAt: 'Hoje às 14:20'
  },
  {
    id: 'quote-002',
    clientName: 'Gracie Barra Central',
    clientPhone: '(21) 99887-6655',
    selectedProductId: 'revestimento-taurun',
    productName: 'Revestimento Taurun',
    pricePerM2: 180,
    quantityM2: 100,
    totalTatamePrice: 18000,
    hasVinilClick: false,
    vinilQuantity: 0,
    vinilUnitPrice: 45,
    totalVinilPrice: 0,
    grandTotal: 18000,
    selectedSellerId: 'roberto',
    sellerName: 'Roberto',
    createdAt: 'Ontem às 10:15'
  },
  {
    id: 'quote-003',
    clientName: 'Atos Jiu-Jitsu',
    clientPhone: '(41) 99112-3344',
    selectedProductId: 't50-gold',
    productName: 'T50-GOLD',
    pricePerM2: 280,
    quantityM2: 150,
    totalTatamePrice: 42000,
    hasVinilClick: true,
    vinilQuantity: 40,
    vinilUnitPrice: 80,
    totalVinilPrice: 3200,
    grandTotal: 45200,
    selectedSellerId: 'caio',
    sellerName: 'Caio',
    createdAt: '02/08/2026'
  }
]

export const useQuote = () => {
  // Estado dos campos do cliente
  const clientName = ref('')
  const clientPhone = ref('')

  // Estado do produto selecionado e metragem
  const selectedProductId = ref('revestimento-taurun')
  const pricePerM2 = ref(180)
  const quantityM2 = ref(50)

  // Estado da opção Vinil Click
  const hasVinilClick = ref(false)
  const vinilQuantity = ref(10)
  const vinilUnitPrice = ref(45)

  // Estado do vendedor responsável
  const selectedSellerId = ref('fernando')

  // Lista de Orçamentos e Apresentações Salvas (carregadas do Neon DB)
  const savedQuotes = ref<SavedQuote[]>([])
  const isLoadingQuotes = ref(false)

  // Tema visual (dark por padrão para combinar com a identidade Taurun)
  const isDarkMode = ref(true)

  // Retorna o objeto do produto atualmente selecionado
  const selectedProduct = computed(() => {
    return PRODUCTS.find(p => p.id === selectedProductId.value) || PRODUCTS[0]
  })

  // Retorna o objeto do vendedor selecionado
  const selectedSeller = computed(() => {
    return SELLERS.find(s => s.id === selectedSellerId.value) || SELLERS[0]
  })

  // Cálculo reativo do valor total do Tatame (m² * valor/m²)
  const totalTatamePrice = computed(() => {
    const qty = Number(quantityM2.value) || 0
    const price = Number(pricePerM2.value) || 0
    return qty * price
  })

  // Cálculo reativo do valor total do Vinil Click (se ativado)
  const totalVinilPrice = computed(() => {
    if (!hasVinilClick.value) return 0
    const qty = Number(vinilQuantity.value) || 0
    const unitPrice = Number(vinilUnitPrice.value) || 0
    return qty * unitPrice
  })

  // Cálculo do valor total geral do orçamento (Tatame + Vinil Click)
  const grandTotal = computed(() => {
    return totalTatamePrice.value + totalVinilPrice.value
  })

  // Mudar de produto e atualizar sugestão de valor por m²
  const setProduct = (productId: string) => {
    selectedProductId.value = productId
    const prod = PRODUCTS.find(p => p.id === productId)
    if (prod) {
      pricePerM2.value = prod.defaultPriceM2
    }
  }

  // Formata números no padrão de moeda brasileira BRL (R$ 1.234,56)
  const formatCurrency = (val: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(val || 0)
  }

  // Formata o número de telefone do cliente no padrão brasileiro (XX) XXXXX-XXXX
  const applyPhoneMask = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) {
      clientPhone.value = digits.length ? `(${digits}` : ''
    } else if (digits.length <= 7) {
      clientPhone.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    } else {
      clientPhone.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
    }
  }

  // Reset do Vinil Click
  const resetVinilClick = () => {
    vinilQuantity.value = 10
    vinilUnitPrice.value = 45
  }

  // Mudar tema claro / escuro
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    if (process.client) {
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  // Salvar estado atual do formulário como rascunho local
  const saveQuoteState = () => {
    if (!process.client) return
    const stateData = {
      clientName: clientName.value,
      clientPhone: clientPhone.value,
      selectedProductId: selectedProductId.value,
      pricePerM2: pricePerM2.value,
      quantityM2: quantityM2.value,
      hasVinilClick: hasVinilClick.value,
      vinilQuantity: vinilQuantity.value,
      vinilUnitPrice: vinilUnitPrice.value,
      selectedSellerId: selectedSellerId.value
    }
    localStorage.setItem('taurun_quote_draft', JSON.stringify(stateData))
  }

  // Buscar a lista de orçamentos salvos diretamente do Neon DB
  const fetchSavedQuotes = async () => {
    if (!process.client) return
    isLoadingQuotes.value = true
    try {
      const data = await $fetch<any[]>('/api/quotes')
      if (Array.isArray(data) && data.length > 0) {
        const fetched = data.map(q => ({
          id: q.id,
          clientName: q.clientName,
          clientPhone: q.clientPhone,
          selectedProductId: q.selectedProductId,
          productName: q.productName,
          pricePerM2: Number(q.pricePerM2),
          quantityM2: Number(q.quantityM2),
          totalTatamePrice: Number(q.totalTatamePrice),
          hasVinilClick: Boolean(q.hasVinilClick),
          vinilQuantity: Number(q.vinilQuantity),
          vinilUnitPrice: Number(q.vinilUnitPrice),
          totalVinilPrice: Number(q.totalVinilPrice),
          grandTotal: Number(q.grandTotal),
          selectedSellerId: q.selectedSellerId,
          sellerName: q.sellerName,
          createdAt: q.createdAt ? new Date(q.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Agora mesmo'
        }))
        savedQuotes.value = fetched
        localStorage.setItem('taurun_saved_quotes_cache', JSON.stringify(fetched))
      }
    } catch (err) {
      console.error('Erro ao buscar orçamentos do Neon DB:', err)
    } finally {
      isLoadingQuotes.value = false
    }
  }

  // Salvar o orçamento atual no banco Neon
  const saveCurrentQuoteToList = () => {
    const payload = {
      id: `quote-${Date.now()}`,
      clientName: clientName.value || 'Cliente Especial',
      clientPhone: clientPhone.value || '-',
      selectedProductId: selectedProductId.value,
      productName: selectedProduct.value.name,
      pricePerM2: Number(pricePerM2.value) || 0,
      quantityM2: Number(quantityM2.value) || 0,
      totalTatamePrice: Number(totalTatamePrice.value) || 0,
      hasVinilClick: Boolean(hasVinilClick.value),
      vinilQuantity: Number(vinilQuantity.value) || 0,
      vinilUnitPrice: Number(vinilUnitPrice.value) || 0,
      totalVinilPrice: Number(totalVinilPrice.value) || 0,
      grandTotal: Number(grandTotal.value) || 0,
      selectedSellerId: selectedSellerId.value,
      sellerName: selectedSeller.value.name,
      createdAt: 'Agora mesmo'
    }

    // Adiciona imediatamente à lista local para resposta instantânea
    savedQuotes.value.unshift(payload)

    // Persiste no banco Neon em segundo plano
    if (process.client) {
      $fetch<any>('/api/quotes', {
        method: 'POST',
        body: payload
      }).then(newDbQuote => {
        if (newDbQuote?.id) {
          payload.id = newDbQuote.id
        }
      }).catch(err => {
        console.error('Erro ao salvar orçamento no banco Neon (salvo localmente):', err)
      })
    }

    return payload
  }

  // Carregar dados de um orçamento salvo no formulário ativo
  const loadSavedQuoteIntoActive = (quoteItem: SavedQuote) => {
    clientName.value = quoteItem.clientName
    clientPhone.value = quoteItem.clientPhone
    selectedProductId.value = quoteItem.selectedProductId
    pricePerM2.value = quoteItem.pricePerM2
    quantityM2.value = quoteItem.quantityM2
    hasVinilClick.value = quoteItem.hasVinilClick
    vinilQuantity.value = quoteItem.vinilQuantity
    vinilUnitPrice.value = quoteItem.vinilUnitPrice
    selectedSellerId.value = quoteItem.selectedSellerId
    saveQuoteState()
  }

  // Excluir um orçamento salvo no Neon DB
  const deleteSavedQuote = async (id: string) => {
    const previousQuotes = [...savedQuotes.value]
    savedQuotes.value = savedQuotes.value.filter(q => q.id !== id)

    try {
      await $fetch(`/api/quotes/${id}`, { method: 'DELETE' })
    } catch (err) {
      console.error('Erro ao excluir orçamento no banco Neon:', err)
      savedQuotes.value = previousQuotes
    }
  }

  // Carregar rascunho e buscar lista de orçamentos do Neon DB no startup
  const loadQuoteState = () => {
    if (!process.client) return
    try {
      const savedDraft = localStorage.getItem('taurun_quote_draft')
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft)
        if (parsed.clientName) clientName.value = parsed.clientName
        if (parsed.clientPhone) clientPhone.value = parsed.clientPhone
        if (parsed.selectedProductId) selectedProductId.value = parsed.selectedProductId
        if (parsed.pricePerM2 !== undefined) pricePerM2.value = parsed.pricePerM2
        if (parsed.quantityM2 !== undefined) quantityM2.value = parsed.quantityM2
        if (parsed.hasVinilClick !== undefined) hasVinilClick.value = parsed.hasVinilClick
        if (parsed.vinilQuantity !== undefined) vinilQuantity.value = parsed.vinilQuantity
        if (parsed.vinilUnitPrice !== undefined) vinilUnitPrice.value = parsed.vinilUnitPrice
        if (parsed.selectedSellerId) selectedSellerId.value = parsed.selectedSellerId
      }

      const cachedQuotes = localStorage.getItem('taurun_saved_quotes_cache')
      if (cachedQuotes) {
        const parsedCache = JSON.parse(cachedQuotes)
        if (Array.isArray(parsedCache) && parsedCache.length > 0) {
          savedQuotes.value = parsedCache
        }
      }
    } catch (err) {
      console.warn('Não foi possível carregar os dados salvos do rascunho.', err)
    }

    fetchSavedQuotes()
  }

  // Sync auto-save draft
  watch(
    [clientName, clientPhone, selectedProductId, pricePerM2, quantityM2, hasVinilClick, vinilQuantity, vinilUnitPrice, selectedSellerId],
    () => {
      saveQuoteState()
    }
  )

  onMounted(() => {
    loadQuoteState()
    if (process.client) {
      document.documentElement.classList.add('dark')
    }
  })

  return {
    clientName,
    clientPhone,
    selectedProductId,
    selectedProduct,
    pricePerM2,
    quantityM2,
    totalTatamePrice,
    hasVinilClick,
    vinilQuantity,
    vinilUnitPrice,
    totalVinilPrice,
    grandTotal,
    selectedSellerId,
    selectedSeller,
    savedQuotes,
    isLoadingQuotes,
    isDarkMode,
    setProduct,
    formatCurrency,
    applyPhoneMask,
    resetVinilClick,
    toggleTheme,
    saveCurrentQuoteToList,
    loadSavedQuoteIntoActive,
    deleteSavedQuote,
    fetchSavedQuotes,
    PRODUCTS,
    SELLERS
  }
}

