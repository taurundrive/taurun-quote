import { defineComponent, mergeProps, unref, useSSRContext, ref, computed, watch, createVNode, resolveDynamicComponent } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderVNode, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { Sun, Moon, ChevronDown, Layers, FileText, User, Phone, Package, Info, DollarSign, Maximize2, Calculator, CheckCircle2, RotateCcw, Hash, Tag, UserCheck, FileCheck, Presentation, ArrowRight } from "lucide-vue-next";
const _imports_0 = publicAssetsURL("/logo-taurun.png");
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    isDark: { type: Boolean }
  },
  emits: ["toggleTheme"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "border-b border-border bg-card/90 backdrop-blur-md sticky top-0 z-40" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"><div class="flex items-center gap-3"><img${ssrRenderAttr("src", _imports_0)} alt="Taurun Tatames" class="h-8 sm:h-9 w-auto object-contain brightness-0 invert dark:brightness-100 dark:invert-0 transition-all"></div><div class="flex items-center gap-3"><button type="button" aria-label="Alternar tema visual" class="p-2 rounded-lg bg-secondary/60 border border-border text-muted-foreground hover:text-foreground transition-all duration-150 active:scale-95">`);
      if (__props.isDark) {
        _push(ssrRenderComponent(unref(Sun), { class: "w-4 h-4" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Moon), { class: "w-4 h-4" }, null, _parent));
      }
      _push(`</button></div></div></header>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const PRODUCTS = [
  { id: "revestimento-taurun", name: "Revestimento Taurun", defaultPriceM2: 180, description: "Superfície sem divisões feita em hexafibra de altíssima resistência." },
  { id: "t50-pro", name: "T50-Pro", defaultPriceM2: 220, description: "Tatame profissional unificado com máxima absorção de impacto." },
  { id: "t50-gold", name: "T50-GOLD", defaultPriceM2: 280, description: "Linha premium Taurun para academias de alto padrão e alta exigência." }
];
const SELLERS = [
  { id: "fernando", name: "Fernando", role: "Consultor Comercial", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
  { id: "roberto", name: "Roberto", role: "Especialista em Projetos", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
  { id: "caio", name: "Caio", role: "Consultor de Vendas", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" }
];
const useQuote = () => {
  const clientName = ref("");
  const clientPhone = ref("");
  const selectedProductId = ref("revestimento-taurun");
  const pricePerM2 = ref(180);
  const quantityM2 = ref(50);
  const hasVinilClick = ref(false);
  const vinilQuantity = ref(10);
  const vinilUnitPrice = ref(45);
  const selectedSellerId = ref("fernando");
  const isDarkMode = ref(true);
  const selectedProduct = computed(() => {
    return PRODUCTS.find((p) => p.id === selectedProductId.value) || PRODUCTS[0];
  });
  const selectedSeller = computed(() => {
    return SELLERS.find((s) => s.id === selectedSellerId.value) || SELLERS[0];
  });
  const totalTatamePrice = computed(() => {
    const qty = Number(quantityM2.value) || 0;
    const price = Number(pricePerM2.value) || 0;
    return qty * price;
  });
  const totalVinilPrice = computed(() => {
    if (!hasVinilClick.value) return 0;
    const qty = Number(vinilQuantity.value) || 0;
    const unitPrice = Number(vinilUnitPrice.value) || 0;
    return qty * unitPrice;
  });
  const grandTotal = computed(() => {
    return totalTatamePrice.value + totalVinilPrice.value;
  });
  const setProduct = (productId) => {
    selectedProductId.value = productId;
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      pricePerM2.value = prod.defaultPriceM2;
    }
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(val || 0);
  };
  const applyPhoneMask = (raw) => {
    const digits = raw.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) {
      clientPhone.value = digits.length ? `(${digits}` : "";
    } else if (digits.length <= 7) {
      clientPhone.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else {
      clientPhone.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
  };
  const resetVinilClick = () => {
    vinilQuantity.value = 10;
    vinilUnitPrice.value = 45;
  };
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
  };
  watch(
    [clientName, clientPhone, selectedProductId, pricePerM2, quantityM2, hasVinilClick, vinilQuantity, vinilUnitPrice, selectedSellerId],
    () => {
    }
  );
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
    isDarkMode,
    setProduct,
    formatCurrency,
    applyPhoneMask,
    resetVinilClick,
    toggleTheme,
    PRODUCTS,
    SELLERS
  };
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "FormInput",
  __ssrInlineRender: true,
  props: {
    id: {},
    label: {},
    modelValue: {},
    type: {},
    placeholder: {},
    icon: {},
    suffix: {},
    hint: {},
    readonly: { type: Boolean },
    disabled: { type: Boolean },
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "input"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1.5" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label${ssrRenderAttr("for", __props.id)} class="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">`);
        if (__props.icon) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon), { class: "w-3.5 h-3.5 text-muted-foreground" }, null), _parent);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(__props.label)} `);
        if (__props.required) {
          _push(`<span class="text-destructive">*</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative flex items-center">`);
      if (__props.icon) {
        _push(`<div class="absolute left-3.5 text-muted-foreground pointer-events-none">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon), { class: "w-4 h-4" }, null), _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("id", __props.id)}${ssrRenderAttr("type", __props.type || "text")}${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.readonly) ? " readonly" : ""}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} class="${ssrRenderClass([
        "w-full bg-secondary/40 text-foreground text-sm rounded-xl border border-border px-3.5 py-2.5 outline-none transition-colors duration-150 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 placeholder:text-muted-foreground/60",
        __props.icon ? "pl-10" : "",
        __props.readonly ? "opacity-90 cursor-not-allowed bg-secondary/70 font-bold text-foreground" : "",
        __props.disabled ? "opacity-50 cursor-not-allowed" : ""
      ])}">`);
      if (__props.suffix) {
        _push(`<div class="absolute right-3.5 text-xs font-medium text-muted-foreground pointer-events-none bg-card px-1.5 py-0.5 rounded border border-border/50">${ssrInterpolate(__props.suffix)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.hint) {
        _push(`<p class="text-[11px] text-muted-foreground/80 mt-1">${ssrInterpolate(__props.hint)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/FormInput.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "FormSelect",
  __ssrInlineRender: true,
  props: {
    id: {},
    label: {},
    modelValue: {},
    options: {},
    icon: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1.5" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label${ssrRenderAttr("for", __props.id)} class="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">`);
        if (__props.icon) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon), { class: "w-3.5 h-3.5 text-muted-foreground" }, null), _parent);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative flex items-center">`);
      if (__props.icon) {
        _push(`<div class="absolute left-3.5 text-muted-foreground pointer-events-none">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon), { class: "w-4 h-4" }, null), _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<select${ssrRenderAttr("id", __props.id)}${ssrRenderAttr("value", __props.modelValue)} class="${ssrRenderClass([[__props.icon ? "pl-10" : ""], "w-full bg-secondary/40 text-foreground text-sm rounded-xl border border-border px-3.5 py-2.5 outline-none transition-colors duration-150 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 appearance-none pr-10 cursor-pointer"])}"><!--[-->`);
      ssrRenderList(__props.options, (opt) => {
        _push(`<option${ssrRenderAttr("value", opt.id || opt.value)} class="bg-card text-foreground py-2">${ssrInterpolate(opt.name || opt.label)}</option>`);
      });
      _push(`<!--]--></select><div class="absolute right-3.5 text-muted-foreground pointer-events-none">`);
      _push(ssrRenderComponent(unref(ChevronDown), { class: "w-4 h-4" }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/FormSelect.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FormToggle",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    label: {},
    description: {},
    icon: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex items-center justify-between p-4 rounded-xl border transition-colors duration-150 cursor-pointer", [
          __props.modelValue ? "bg-secondary/80 border-foreground/30 shadow-sm" : "bg-secondary/30 border-border hover:border-border/80"
        ]]
      }, _attrs))}><div class="flex items-center gap-3"><div class="${ssrRenderClass([[__props.modelValue ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"], "w-9 h-9 rounded-lg flex items-center justify-center transition-colors"])}">`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon || unref(Layers)), { class: "w-5 h-5" }, null), _parent);
      _push(`</div><div><p class="text-sm font-semibold text-foreground flex items-center gap-2">${ssrInterpolate(__props.label)}</p>`);
      if (__props.description) {
        _push(`<p class="text-xs text-muted-foreground">${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="${ssrRenderClass([[__props.modelValue ? "bg-foreground" : "bg-secondary border border-border"], "w-11 h-6 rounded-full transition-colors relative p-0.5 flex items-center"])}"><div class="${ssrRenderClass([[
        __props.modelValue ? "translate-x-5 bg-background" : "translate-x-0 bg-muted-foreground/60"
      ], "w-5 h-5 rounded-full transition-transform duration-200"])}"></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/FormToggle.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "QuoteForm",
  __ssrInlineRender: true,
  setup(__props) {
    const quote = useQuote();
    const onPhoneInput = (e) => {
      const input = e.target;
      quote.applyPhoneMask(input.value);
    };
    const onProductChange = (productId) => {
      quote.setProduct(productId);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-panel rounded-2xl p-6 sm:p-8 space-y-8" }, _attrs))}><div class="flex items-center justify-between border-b border-border/60 pb-4"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-foreground">`);
      _push(ssrRenderComponent(unref(FileText), { class: "w-5 h-5" }, null, _parent));
      _push(`</div><div><h2 class="text-base font-bold text-foreground tracking-tight">Dados do Orçamento</h2><p class="text-xs text-muted-foreground">Preencha as informações do cliente e os detalhes do produto.</p></div></div></div><div class="space-y-4"><h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(User), { class: "w-3.5 h-3.5" }, null, _parent));
      _push(` 1. Informações do Cliente </h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        id: "clientName",
        label: "Nome do Cliente",
        modelValue: unref(quote).clientName.value,
        "onUpdate:modelValue": ($event) => unref(quote).clientName.value = $event,
        placeholder: "Ex: Rodrigo Silva",
        icon: unref(User),
        required: ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        id: "clientPhone",
        label: "Telefone do Cliente",
        "model-value": unref(quote).clientPhone.value,
        onInput: onPhoneInput,
        placeholder: "(11) 99999-9999",
        icon: unref(Phone),
        hint: "Formatação automática de DDD"
      }, null, _parent));
      _push(`</div></div><div class="space-y-4 pt-2"><h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Package), { class: "w-3.5 h-3.5" }, null, _parent));
      _push(` 2. Produto e Metragem </h3>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        id: "productSelect",
        label: "Tipo de Produto",
        "model-value": unref(quote).selectedProductId.value,
        "onUpdate:modelValue": onProductChange,
        options: unref(quote).PRODUCTS,
        icon: unref(Package)
      }, null, _parent));
      _push(`<div class="bg-secondary/40 border border-border rounded-xl p-3.5 flex items-start gap-3">`);
      _push(ssrRenderComponent(unref(Info), { class: "w-4 h-4 text-muted-foreground shrink-0 mt-0.5" }, null, _parent));
      _push(`<p class="text-xs text-muted-foreground leading-relaxed"><strong class="text-foreground font-semibold">${ssrInterpolate(unref(quote).selectedProduct.value.name)}:</strong> ${ssrInterpolate(unref(quote).selectedProduct.value.description)}</p></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        id: "pricePerM2",
        label: "Valor do m² (R$)",
        type: "number",
        modelValue: unref(quote).pricePerM2.value,
        "onUpdate:modelValue": ($event) => unref(quote).pricePerM2.value = $event,
        modelModifiers: { number: true },
        placeholder: "0.00",
        icon: unref(DollarSign),
        suffix: "R$/m²",
        hint: "Editável se houver negociação"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        id: "quantityM2",
        label: "Quantidade de m²",
        type: "number",
        modelValue: unref(quote).quantityM2.value,
        "onUpdate:modelValue": ($event) => unref(quote).quantityM2.value = $event,
        modelModifiers: { number: true },
        placeholder: "0",
        icon: unref(Maximize2),
        suffix: "m²"
      }, null, _parent));
      _push(`<div class="space-y-1.5"><label class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">`);
      _push(ssrRenderComponent(unref(Calculator), { class: "w-3.5 h-3.5 text-muted-foreground" }, null, _parent));
      _push(` Valor Total Tatame </label><div class="w-full bg-secondary/80 text-foreground font-extrabold text-base rounded-xl border border-border px-3.5 py-2.5 flex items-center justify-between"><span>${ssrInterpolate(unref(quote).formatCurrency(unref(quote).totalTatamePrice.value))}</span>`);
      _push(ssrRenderComponent(unref(CheckCircle2), { class: "w-4 h-4 text-muted-foreground shrink-0" }, null, _parent));
      _push(`</div><p class="text-[11px] text-muted-foreground">Calculado automaticamente</p></div></div></div><div class="space-y-4 pt-2 border-t border-border"><div class="flex items-center justify-between"><h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Layers), { class: "w-3.5 h-3.5" }, null, _parent));
      _push(` 3. Adicional de Vinil Click </h3>`);
      if (unref(quote).hasVinilClick.value) {
        _push(`<button type="button" class="text-[11px] font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">`);
        _push(ssrRenderComponent(unref(RotateCcw), { class: "w-3 h-3" }, null, _parent));
        _push(` Resetar </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        modelValue: unref(quote).hasVinilClick.value,
        "onUpdate:modelValue": ($event) => unref(quote).hasVinilClick.value = $event,
        label: "Vai ter Vinil Click?",
        description: "Ative para adicionar acabamento/proteção em vinil click ao orçamento.",
        icon: unref(Layers)
      }, null, _parent));
      if (unref(quote).hasVinilClick.value) {
        _push(`<div class="bg-secondary/30 border border-border rounded-xl p-4 space-y-4"><div class="grid grid-cols-1 sm:grid-cols-3 gap-4">`);
        _push(ssrRenderComponent(_sfc_main$5, {
          id: "vinilQuantity",
          label: "Quantidade Vinil",
          type: "number",
          modelValue: unref(quote).vinilQuantity.value,
          "onUpdate:modelValue": ($event) => unref(quote).vinilQuantity.value = $event,
          modelModifiers: { number: true },
          placeholder: "0",
          icon: unref(Hash),
          suffix: "unid"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$5, {
          id: "vinilUnitPrice",
          label: "Valor Unitário (R$)",
          type: "number",
          modelValue: unref(quote).vinilUnitPrice.value,
          "onUpdate:modelValue": ($event) => unref(quote).vinilUnitPrice.value = $event,
          modelModifiers: { number: true },
          placeholder: "0.00",
          icon: unref(Tag),
          suffix: "R$"
        }, null, _parent));
        _push(`<div class="space-y-1.5"><label class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">`);
        _push(ssrRenderComponent(unref(Calculator), { class: "w-3.5 h-3.5 text-muted-foreground" }, null, _parent));
        _push(` Valor Total Vinil </label><div class="w-full bg-card text-foreground font-bold text-sm rounded-xl border border-border px-3.5 py-2.5 flex items-center justify-between"><span class="font-extrabold">${ssrInterpolate(unref(quote).formatCurrency(unref(quote).totalVinilPrice.value))}</span></div><p class="text-[11px] text-muted-foreground">Qtd × Valor Unitário</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-4 pt-2 border-t border-border"><h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(UserCheck), { class: "w-3.5 h-3.5" }, null, _parent));
      _push(` 4. Vendedor Responsável </h3>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        id: "sellerSelect",
        label: "Nome do Vendedor",
        modelValue: unref(quote).selectedSellerId.value,
        "onUpdate:modelValue": ($event) => unref(quote).selectedSellerId.value = $event,
        options: unref(quote).SELLERS,
        icon: unref(UserCheck)
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuoteForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "QuoteSummary",
  __ssrInlineRender: true,
  emits: ["generate"],
  setup(__props, { emit: __emit }) {
    const quote = useQuote();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sticky top-24 space-y-6" }, _attrs))}><div class="glass-panel rounded-2xl p-6 sm:p-8 space-y-6"><div class="flex items-center justify-between border-b border-border pb-4"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(FileCheck), { class: "w-5 h-5 text-foreground" }, null, _parent));
      _push(`<h3 class="font-bold text-foreground text-base tracking-tight">Resumo do Orçamento</h3></div></div><div class="bg-secondary/40 rounded-xl p-4 border border-border space-y-1.5"><div class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">`);
      _push(ssrRenderComponent(unref(User), { class: "w-3.5 h-3.5 text-muted-foreground" }, null, _parent));
      _push(` Cliente </div><p class="text-base font-bold text-foreground truncate">${ssrInterpolate(unref(quote).clientName.value || "Nome do Cliente não informado")}</p>`);
      if (unref(quote).clientPhone.value) {
        _push(`<p class="text-xs text-muted-foreground flex items-center gap-1">`);
        _push(ssrRenderComponent(unref(Phone), { class: "w-3 h-3 text-muted-foreground" }, null, _parent));
        _push(` ${ssrInterpolate(unref(quote).clientPhone.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-3"><div class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"> Itens Selecionados </div><div class="bg-secondary/20 rounded-xl p-3.5 border border-border flex items-center justify-between transition-colors duration-150 hover:bg-secondary/30"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-foreground shrink-0 border border-border">`);
      _push(ssrRenderComponent(unref(Package), { class: "w-5 h-5" }, null, _parent));
      _push(`</div><div><p class="text-sm font-bold text-foreground leading-tight">${ssrInterpolate(unref(quote).selectedProduct.value.name)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(unref(quote).quantityM2.value)} m² × ${ssrInterpolate(unref(quote).formatCurrency(unref(quote).pricePerM2.value))}</p></div></div><div class="text-right font-bold text-foreground text-sm">${ssrInterpolate(unref(quote).formatCurrency(unref(quote).totalTatamePrice.value))}</div></div>`);
      if (unref(quote).hasVinilClick.value) {
        _push(`<div class="bg-secondary/20 rounded-xl p-3.5 border border-border flex items-center justify-between transition-colors duration-150 hover:bg-secondary/30"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-foreground shrink-0 border border-border">`);
        _push(ssrRenderComponent(unref(Layers), { class: "w-5 h-5" }, null, _parent));
        _push(`</div><div><p class="text-sm font-bold text-foreground leading-tight"> Proteção Vinil Click </p><p class="text-xs text-muted-foreground">${ssrInterpolate(unref(quote).vinilQuantity.value)} unid × ${ssrInterpolate(unref(quote).formatCurrency(unref(quote).vinilUnitPrice.value))}</p></div></div><div class="text-right font-bold text-foreground text-sm">${ssrInterpolate(unref(quote).formatCurrency(unref(quote).totalVinilPrice.value))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="pt-4 border-t border-border space-y-2"><div class="flex items-center justify-between"><span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Valor Total do Orçamento</span></div><div class="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">${ssrInterpolate(unref(quote).formatCurrency(unref(quote).grandTotal.value))}</div></div><button type="button" class="w-full bg-primary text-primary-foreground font-bold text-sm py-3.5 px-6 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 ease-out flex items-center justify-center gap-2 shadow">`);
      _push(ssrRenderComponent(unref(Presentation), { class: "w-4 h-4" }, null, _parent));
      _push(`<span>Gerar Apresentação Comercial</span>`);
      _push(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4" }, null, _parent));
      _push(`</button></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuoteSummary.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const quote = useQuote();
    const showModal = ref(false);
    const handleGenerateProposal = () => {
      showModal.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground flex flex-col" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$6, {
        "is-dark": unref(quote).isDarkMode.value,
        onToggleTheme: unref(quote).toggleTheme
      }, null, _parent));
      _push(`<main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"><div class="mb-8 space-y-1.5"><h1 class="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight"> Calculadora de Orçamento </h1><p class="text-xs sm:text-sm text-muted-foreground max-w-2xl"> Preencha os dados do cliente e configure a metragem do produto para gerar o orçamento em tempo real. </p></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-7">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div><div class="lg:col-span-5">`);
      _push(ssrRenderComponent(_sfc_main$1, { onGenerate: handleGenerateProposal }, null, _parent));
      _push(`</div></div></main>`);
      if (unref(showModal)) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"><div class="glass-panel max-w-md w-full rounded-2xl p-6 space-y-6 text-center shadow-2xl border border-border"><div class="w-14 h-14 rounded-full bg-secondary text-foreground border border-border mx-auto flex items-center justify-center">`);
        _push(ssrRenderComponent(unref(CheckCircle2), { class: "w-8 h-8" }, null, _parent));
        _push(`</div><div class="space-y-1.5"><h3 class="text-lg font-bold text-foreground">Orçamento Registrado com Sucesso</h3><p class="text-xs text-muted-foreground leading-relaxed"> Os dados de <strong>${ssrInterpolate(unref(quote).clientName.value || "Cliente")}</strong> foram salvos para a apresentação comercial. </p></div><div class="bg-secondary/40 rounded-xl p-3.5 text-left space-y-1.5 text-xs border border-border"><div class="flex justify-between"><span class="text-muted-foreground">Produto:</span><span class="font-bold text-foreground">${ssrInterpolate(unref(quote).selectedProduct.value.name)}</span></div><div class="flex justify-between"><span class="text-muted-foreground">Metragem:</span><span class="font-bold text-foreground">${ssrInterpolate(unref(quote).quantityM2.value)} m²</span></div>`);
        if (unref(quote).hasVinilClick.value) {
          _push(`<div class="flex justify-between"><span class="text-muted-foreground">Vinil Click:</span><span class="font-bold text-foreground">${ssrInterpolate(unref(quote).vinilQuantity.value)} unid</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex justify-between border-t border-border pt-1.5 font-bold text-sm text-foreground"><span>Total Geral:</span><span>${ssrInterpolate(unref(quote).formatCurrency(unref(quote).grandTotal.value))}</span></div></div><button type="button" class="w-full bg-primary text-primary-foreground font-bold text-sm py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 ease-out shadow"> Continuar Editando </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DBHll8Ad.js.map
