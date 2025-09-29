# Visão Técnica e Funcional do Projeto FUNDEB

> Documento gerado em 2025-09-29. Sintetiza o estado atual do projeto, arquitetura, pontos fortes, riscos e roadmap sugerido.

---
## 1. Resumo
Aplicação estática (HTML + CSS + JS vanilla) que apresenta conteúdo educativo e simuladores interativos do FUNDEB (VAAF, VAAT, VAAR e simulação por município com dados reais 2024). Estrutura centralizada em um arquivo HTML único e um grande script (`fundeb.js`) que mistura lógica de domínio, dados e camada de apresentação.

---
## 2. Arquitetura Atual
**Front-end:**
- `index.html` (página única com todas as seções)
- `css/styles.css` (variáveis de cor, acessibilidade e animações)
- Bibliotecas externas via CDN: Tailwind, Chart.js, Font Awesome

**JavaScript:**
- `fundeb.js`: monólito (~3k linhas) contendo:
  - Configuração de gráficos
  - Calculadoras VAAF / VAAT / VAAR
  - Simulador municipal e ponderações
  - Dados mock embutidos (`municipalData`)
  - Funções utilitárias de formatação
  - Manipulação de DOM e notificações
- `fundeb-official-rules.js`: encapsula regras “oficiais” (VAAF, VAAT, VAAR) com funções puras.
- `fundeb-real-data-processor.js`: faz fetch de `fundeb_2024_real.csv`, parse e substitui `window.municipalData`.
- `real-data-structure.js`: alternativa genérica para conversão de estrutura (sobreposição conceitual com o processor atual).
- Scripts de debug: `test-campina.js`, `force-refresh.js`, etc.

**Dados:**
- CSV real: `dados/fundeb_2024_real.csv` (parse por índices fixos de coluna)
- Planilhas originais (`.xlsx`) para referência.

---
## 3. Fluxo de Carregamento de Dados
1. Página inicia com dados mock embutidos.
2. Após atraso (setTimeout ~4s) carrega CSV real.
3. Parser substitui `window.municipalData`.
4. Seletores de estado/município são repovoados.
5. Simulação municipal passa a usar dados reais.

---
## 4. Domínio dos Cálculos
| Cálculo | Abordagem | Observações |
|---------|-----------|-------------|
| VAAF | Receita FUNDEB / matrículas ponderadas, compara com mínimo | Complementação calculada se abaixo do mínimo |
| VAAT | Receita total educação / matrículas ponderadas | Receita total aproximada (heurística multiplicativa) |
| VAAR | Indicadores (atendimento, aprendizagem, desigualdade) + condicionalidades | Valor base fixo (hardcoded 500) e coeficiente escalonado |
| Simulação Municipal | Recalcula impacto financeiro com ponderações e regras oficiais quando disponíveis | Trata caso de matrículas idênticas para evitar drift |

---
## 5. Pontos Fortes
- Conteúdo didático estruturado e abrangente.
- Interatividade rica (gráficos, abas, comparativos, notificações).
- Atenção explícita à legibilidade e contraste (override CSS agressivo).
- Regras oficiais parcialmente isoladas em arquivo próprio.
- Integração de dados reais (CSV) com fallback automático.
- Simulador municipal apresenta variações bem explicadas.

---
## 6. Fragilidades / Riscos Técnicos
| Categoria | Risco |
|-----------|-------|
| Estrutura | Monólito (`fundeb.js`) mistura dados, UI e lógica de negócio |
| Manutenção | Dificuldade de refactor incremental e testes |
| Dados | Duplicidade lógica de parsing (`real-data-structure` vs `fundeb-real-data-processor`) |
| Hardcodes | Mínimos e fatores espalhados; números mágicos (ex: `vaarPorAluno = 500`) |
| Assíncronismo | Uso de `setTimeout` em vez de eventos/promises |
| Acessibilidade | Falta ARIA e gestão de foco (apesar do contraste refinado) |
| Performance | Renderizações de grandes blocos via template string sem diff incremental |
| Escalabilidade | Objeto grande embutido aumenta payload inicial |
| Testabilidade | Ausência de testes unitários / e2e |
| Reuso | Repetição de funções de formatação em múltiplos blocos |

---
## 7. Oportunidades de Melhoria
### Curto Prazo (Baixo Risco)
1. Extrair utilitários (`formatMoney`, `formatNumber`) para `js/utils/format.js`.
2. Centralizar constantes (mínimos, percentuais, labels) em `js/constants.js`.
3. Criar função pura `computeMunicipalSimulation()` retornando JSON sem tocar DOM.
4. Substituir `setTimeout` por evento customizado: `document.dispatchEvent(new Event('fundeb:data:loaded'))`.
5. Isolar dados mock em `dados/municipal_mock.json` (carregamento dinâmico). 
6. Adicionar `aria-live="polite"` em contêiner de notificações.

### Médio Prazo
1. Modularização real (ESM) + bundler leve (Vite ou esbuild).
2. Dividir `fundeb.js` em camadas: `data/`, `domain/`, `ui/` e `simulators/`.
3. Testes com Jest (cálculos e parsing CSV).
4. Cache local (localStorage) última seleção de município.
5. Lazy load de gráficos (IntersectionObserver) e dados grandes.
6. Exportação de resultados (CSV / JSON / PDF simplificado).

### Longo Prazo
1. Migrar camada interativa para framework reativo (Svelte ou Vue 3) ou Web Components.
2. Backend simples (Node/Fastify) para servir dados atualizados por ano.
3. Histórico multi-ano e simulação temporal (2021–2026+).
4. PWA + Service Worker (modo offline parcial + caching seletivo).
5. Comparação multi-município e ranking regional.
6. Acessibilidade avançada (foco gestionado, navegação de teclado total, leituras auditivas).

---
## 8. Roadmap Técnico (Ordenado)
1. (Semana 1) Criar `constants.js`, `format.js`, extrair e substituir referências duplicadas.
2. (Semana 1) Função pura para simulação municipal + testes unitários básicos.
3. (Semana 2) Refatorar carregamento de dados para eventos, remover `setTimeout`.
4. (Semana 2) Mover dados mock para JSON externo + lazy load.
5. (Semana 3) Fatiar `fundeb.js` (gráficos, simuladores, ui/notificações, domínio de cálculo).
6. (Semana 4) Introduzir bundler (Vite) e ESM.
7. (Semana 5) Implementar export (CSV/JSON) + cache local.
8. (Semana 6) PWA básico + testes de acessibilidade.

---
## 9. Sugestão de Estrutura Futura (/modularizada)
```
js/
  constants.js
  utils/
    format.js
    events.js
  domain/
    vaaf.js
    vaat.js
    vaar.js
    ponderacoes.js
    simulation.js
  data/
    loader.js
    municipal_mock.json
  ui/
    charts.js
    notifications.js
    tabs.js
    municipal-panel.js
  main.js
```

---
## 10. Qualidade Atual (Diagnóstico)
| Aspecto | Status | Observação |
|---------|--------|------------|
| Funcionalidade | ✅ | Atende objetivos didáticos |
| Modularização | ⚠️ | Concentração excessiva em `fundeb.js` |
| Testabilidade | ❌ | Sem testes, alto risco em refactors |
| Acessibilidade | 🔄 | Contraste bom; faltam ARIA/foco |
| Performance | ✅ | Adequado para dataset atual |
| Escalabilidade | ⚠️ | Crescimento vai aumentar complexidade |
| Manutenibilidade | ⚠️ | Acoplamento forte UI + lógica |

---
## 11. Pequenas Melhorias Imediatas (Implementáveis já)
- Remover duplicidade de `formatMoney` / `formatNumber`.
- Encapsular geração de HTML de resultados em funções puras que retornam strings (facilita testes snapshot futuramente).
- Adicionar verificação única de dependências (ex: checar `window.Chart` antes de inicializar).
- Inserir guard rails: `if (!element) return;` padronizado.

---
## 12. Notas sobre Regras Oficiais
- `fundeb-official-rules.js` já aproxima uma separação de domínio; pode ser primeiro alvo de extração para `domain/`.
- Mínimos e percentuais devem ser versionados por ano (ex: `FUNDEB_MINIMOS[2024].VAAF`).
- VAAT usa heurística baseada em multiplicar contribuição; futuro: parametrizar via estrutura `receitaComponentes`.

---
## 13. Acessibilidade (Gap Analysis)
| Item | Situação Atual | Sugestão |
|------|----------------|----------|
| Navegação por teclado | Parcial | Adicionar foco visível nos elementos interativos |
| Leitura dinâmica | Ausente | Container notificações com `aria-live="polite"` |
| Descritivos | Ícones decorativos não marcados | Adicionar `aria-hidden="true"` ou `role="img"` + `aria-label` |
| Estrutura semântica | Boa base | Conferir uso de múltiplos `h2/h3` coerentes |

---
## 14. Performance Potencial
- Payload inicial pode ser reduzido adiando carregamento de dados mock e gráficos.
- CSV pode ser particionado por UF se crescer.
- Template de resultados poderia adotar diff minimal (futuro framework ou lib micro como lit-html).

---
## 15. Riscos se Nada For Refatorado
| Risco | Impacto |
|-------|---------|
| Aumento da complexidade | Dificuldade em adicionar novas regras oficiais |
| Regressões silenciosas | Cálculos alterados sem cobertura de testes |
| Crescimento de tempo de onboarding | Novo colaborador leva mais tempo para entender monólito |
| Duplicação de lógica | Inconsistências em formatação e cálculo |

---
## 16. Conclusão
O projeto entrega forte valor educativo e já incorpora boa parte da lógica conceitual do FUNDEB. O próximo salto é estrutural: modularizar, separar cálculo de apresentação e preparar terreno para expansão (multi-ano, comparação, exportações). Refactors incrementais e guiados por testes mínimos evitam paralisar a entrega de valor.

> Próximo passo sugerido: iniciar extração de `constants.js` + `utils/format.js` e criar função pura de simulação municipal para teste isolado.

---
## 17. Anexo – Principais Constantes Identificadas
```js
// Candidatas a centralização
const FUNDEB_2024_PERCENTAGES = { VAAF: 0.10, VAAT: 0.075, VAAR: 0.015 };
const FUNDEB_2024_MINIMUMS = { VAAF_MIN: 5447.98, VAAT_MIN: 6500.00 };
const VAAR_BASE_VALUE = 500; // usado no cálculo simplificado
const DEFAULT_PONDERACOES = {
  infantil: 1.0,
  fundamentalI: 1.0,
  fundamentalII: 1.15,
  medioIntegral: 1.30,
  medioParcial: 1.25,
  eja: 0.80,
  especial: 1.20,
  profissional: 1.20
};
```
