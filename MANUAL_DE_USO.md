# Manual de Uso – FUNDEB Simulador

## 📖 Guia Completo para Usuários

Bem-vindo ao **FUNDEB - Explicação do Cálculo**, uma plataforma educativa interativa que explica e simula o funcionamento do Fundo de Manutenção e Desenvolvimento da Educação Básica.

---

## 🎯 Visão Geral

Este aplicativo oferece:
- 📚 **Conteúdo educativo** sobre FUNDEB (Lei nº 14.113/2020)
- 🧮 **Três calculadoras** especializadas (VAAF, VAAT, VAAR)
- 🗺️ **Simulador municipal** com dados reais 2024
- 📊 **Gráficos interativos** e visualizações
- 📱 **Interface responsiva** para desktop e móvel

---

## 🚀 Como Começar

### 1. Acessar o Aplicativo
- Abra seu navegador (Chrome, Firefox, Safari, Edge)
- Acesse: **http://localhost:8000** (ou URL fornecida)
- Aguarde o carregamento da página (~3 segundos)

### 2. Interface Principal
Você verá:
- **Header** (logo FUNDEB + título)
- **Menu navegável** no topo (abas coloridas)
- **Conteúdo principal** (seções com informações e simuladores)
- **Footer** (referências legais)

---

## 📑 Seções do Aplicativo

### 1️⃣ Introdução
**O que é o FUNDEB?**
- Explicação do mecanismo de financiamento
- 27 fundos (um por estado + DF)
- Objetivo de garantir equidade educacional

**Clique em:** "Introdução" na navegação

---

### 2️⃣ Composição do FUNDEB
**Visualize a distribuição de recursos**

- **Gráfico de pizza** mostra:
  - 77% de contribuição (estados/municípios)
  - 10% de complementação VAAF
  - 10,5% de complementação VAAT
  - 2,5% de complementação VAAR

**Interação:** Passe o mouse sobre as fatias para ver valores exatos

---

### 3️⃣ Modalidades de Complementação
**Entenda as três modalidades**

#### 🔵 **VAAF** (10%)
- Garantir valor mínimo nacional por aluno
- Complementa quando estado está abaixo do mínimo

#### 🟢 **VAAT** (10,5%)
- Reduz desigualdades entre entes federados
- Considera toda receita educacional

#### 🟡 **VAAR** (2,5%)
- Premia melhoria de indicadores educacionais
- Baseado em SAEB e condicionalidades

---

### 4️⃣ Implementação Progressiva (2021-2026)
**Veja a evolução temporal**

| Ano | VAAF | VAAT | VAAR | Total |
|-----|------|------|------|-------|
| 2021 | 10% | 2% | 0% | 12% |
| 2024 | 10% | 7,5% | 1,5% | 19% |
| 2026+ | 10% | 10,5% | 2,5% | **23%** |

**Gráfico interativo** mostra a evolução visualmente

---

### 5️⃣ Metodologia de Matrículas
**Como são contadas as matrículas**

**Processo:**
1. Censo Escolar (INEP) apura matrículas presenciais
2. Filtragem conforme metodologia do MEC
3. Aplicação de ponderações (pesos por etapa)
4. Fator socioeconômico

**Fatores de Ponderação:**
- Educação Infantil: **1,0**
- Fundamental I (1º-5º): **1,0**
- Fundamental II (6º-9º): **1,15**
- Médio Integral: **1,30**
- Médio Parcial: **1,25**
- EJA: **0,80**
- Educação Especial: **1,20**
- Profissional: **1,20**

---

### 6️⃣ Simuladores FUNDEB

#### 📊 **Simulador VAAF**

**Para calcular:** Valor mínimo garantido por aluno

**Preencha:**
1. **Matrículas Ponderadas**: Ex. 245.368
2. **Receita FUNDEB (20%)**: Ex. R$ 1.334.314.355
3. **VAAF Mínimo Nacional**: Ex. R$ 5.447,98

**Clique:** "Calcular VAAF"

**Resultado:** 
- VAAF por aluno
- Precisa de complementação? SIM/NÃO
- Valor da complementação (se necessário)
- Total do fundo

---

#### ⚖️ **Simulador VAAT**

**Para calcular:** Valor total educacional por aluno

**Preencha:**
1. **Matrículas Ponderadas**: Ex. 180.000
2. **25% Impostos e Transferências**: Ex. R$ 15.000.000
3. **Receita FUNDEB**: Ex. R$ 8.000.000
4. **Salário-Educação e Outros**: Ex. R$ 500.000
5. **VAAT Mínimo Nacional**: Ex. R$ 7.000

**Clique:** "Calcular VAAT"

**Resultado:**
- VAAT calculado
- Necessidade de complementação
- Valor total por aluno

---

#### 🏆 **Simulador VAAR**

**Para calcular:** Complementação por resultado educacional

**Preencha:**
1. **Matrículas Elegíveis**: Ex. 150.000
2. **Indicador de Atendimento**: 0 a 1 (Ex. 0,85)
3. **Indicador de Aprendizagem (SAEB)**: 0 a 1 (Ex. 0,75)
4. **Indicador de Redução de Desigualdades**: 0 a 1 (Ex. 0,70)

**Selecione condicionalidades cumpridas:**
- ☑️ Aplicação do CAQi
- ☑️ Transparência
- ☑️ Prestação SIOPE

**Clique:** "Calcular VAAR"

**Resultado:**
- Elegibilidade (SIM/NÃO)
- Indicador combinado
- Coeficiente VAAR
- Valor total VAAR

---

#### 🗺️ **Simulador por Município** (Recurso Avançado)

**Simule cenários financeiros municipais**

**Passo 1: Selecionar Município**
1. Abra a aba "Por Município"
2. Escolha um **Estado** (UF)
3. Escolha um **Município**
4. Clique em "Carregar Dados"

**Passo 2: Visualizar Dados Atuais**
Você verá:
- Receitas FUNDEB 2024 (real)
- Matrículas por modalidade
- Valores por aluno

**Passo 3: Simular Alterações**
- Clique "Copiar Dados Atuais" (preenche formulário com valores reais)
- **OU** insira manualmente novos valores de matrículas
- Altere quantidades em cada modalidade

**Passo 4: Calcular Impacto**
Clique "Simular Impacto"

**Resultados Comparativos:**
| Métrica | Atual | Simulado | Variação |
|---------|-------|----------|----------|
| Total Matrículas | 37.000 | 40.000 | +8,1% |
| Matrículas Ponderadas | 39.550 | 43.200 | +9,2% |
| Receita Base | R$ 89M | R$ 97M | +8,9% |
| VAAF por Aluno | R$ 2.250 | R$ 2.245 | -0,2% |
| Total FUNDEB | R$ 92M | R$ 101M | +9,8% |
| Diferença por Aluno | – | – | +R$ 243 |

**Análise de Matrículas:**
Breakdown visual mostrando:
- Valores atuais vs. simulados
- Diferenças por modalidade
- Pesos aplicados

---

### 7️⃣ Glossário
**Referência rápida de termos**

- **VAAF**: Valor Anual por Aluno do Fundeb
- **VAAT**: Valor Anual por Aluno Total
- **VAAR**: Valor por Aluno-Resultado
- **SAEB**: Sistema de Avaliação da Educação Básica
- **CAQi**: Custo Aluno Qualidade inicial
- **FNDE**: Fundo Nacional de Desenvolvimento da Educação
- **SIOPE**: Sistema de Informações sobre Orçamentos Públicos em Educação

---

## 🎮 Recursos Interativos

### Gráficos
- **Clique nas legendas** para mostrar/ocultar séries
- **Passe o mouse** para ver valores exatos
- **Gráficos responsivos** (ajustam ao tamanho da tela)

### Navegação
- **Menu superior** leva a cada seção
- **Rolagem suave** (sem "pulo" abrupto)
- **Indicador de seção ativa** (barra colorida)

### Notificações
- **Sucesso** (verde): Cálculo concluído com êxito
- **Erro** (vermelho): Verifique os dados inseridos
- **Aviso** (amarelo): Informação importante
- **Info** (azul): Dica geral

---

## 💡 Dicas de Uso

### ✅ Como Tirar Melhor Proveito
1. **Comece pela Introdução** para entender o contexto
2. **Estude a Composição** para visualizar proporções
3. **Leia sobre Modalidades** antes de usar calculadoras
4. **Experimente os Simuladores** com valores educacionais reais
5. **Consulte o Glossário** sempre que tiver dúvida

### 🔍 Calculando Cenários
**Exemplo: Aumento de Educação Infantil**
- Situação atual: 5.000 alunos em Ed. Infantil
- Cenário: adicionar 1.000 novos alunos
- Impacto: receita adicional, novo VAAF por aluno
- Decisão: aumentar atendimento é viável?

### 🎯 Análise de Política Educacional
**Exemplo: Implementar Ensino Médio Integral**
- Pesquisar: qual o peso do Médio Integral (1,30)
- Simular: mudar X alunos de Parcial para Integral
- Visualizar: impacto financeiro (maior receita)
- Conclusão: é prioritário?

---

## ⚙️ Configurações

### Ponderações Personalizadas (Avançado)
No simulador municipal:
1. Clique "Editar" em "Configurar Fatores de Ponderação"
2. Altere os pesos (entre 0,1 e 3,0)
3. Clique "Aplicar Alterações"
4. Simule novamente com novos pesos

**Restaurar Oficiais:** Botão "Valores Oficiais" (volta aos padrões legais)

---

## 📱 Acessibilidade

### Suporte Integrado
- ✅ Alto contraste em resultados
- ✅ Fontes legíveis (Inter)
- ✅ Cores significativas (não apenas diferenciação por cor)
- ✅ Modo escuro (detecta preferência do sistema)

### Navegação por Teclado
- **Tab**: navega entre elementos
- **Enter**: ativa botões
- **Setas**: muda abas

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| Dados não carregam | Aguarde 3-4 segundos; recarregue a página |
| Calculadora diz erro | Verifique: valores positivos, sem letras, ponto como decimal |
| Gráfico não aparece | Desative bloqueador de scripts; tente outra aba |
| Seleção de município não funciona | Primeiro selecione um estado, depois município |
| Resultados iguais (mesmo alterando matrículas) | Se mantiver exatamente os mesmos valores, é comportamento esperado |

---

## 📞 Suporte

### Informações Legais
- **Baseado em**: Lei nº 14.113/2020 e Decreto nº 10.656/2021
- **Órgãos Responsáveis**: FNDE, MEC, INEP
- **Dados 2024**: Fornecidos pelo FNDE

### ⚠️ Aviso Importante
Esta é uma **calculadora educativa simplificada**. Os cálculos oficiais envolvem:
- Múltiplas variáveis não simuláveis aqui
- Documentação adicional requerida
- Processamento pelo FNDE

**Para valores oficiais**: Consulte www.fnde.gov.br ou acesse o SICONFI

---

## 🎓 Recursos Educacionais

### Para Gestores Municipais
- Use o simulador municipal para planejamento orçamentário
- Teste cenários de expansão de vagas
- Compare com municípios vizinhos (via gráficos)

### Para Pesquisadores
- Entenda a metodologia oficial do FUNDEB
- Visualize impactos de política educacional
- Processe dados reais do CSV

### Para Alunos e Professores
- Aprenda conceitos de financiamento educacional
- Veja aplicações práticas de cálculo e ponderação
- Explore o sistema brasileiro de equidade

---

## 🔄 Atualizar Dados

Se houver novos dados oficiais:
1. Substitua o arquivo `dados/fundeb_2024_real.csv`
2. Mantenha a mesma estrutura de colunas
3. Recarregue a página no navegador
4. Novos dados carregarão automaticamente

---

## 📊 Exportar Resultados

**Função em desenvolvimento:**
- Copiar resultados da simulação (Ctrl+C)
- Exportar para CSV (em breve)
- Gerar relatório PDF (em breve)

---

## 🎨 Paleta de Cores

Cada elemento tem significado:
- 🤎 **Mocha Mousse** (#A0956B): VAAF, elemento principal
- 🟢 **Sage Green** (#9CAF88): VAAT, crescimento
- 🟡 **Dusty Rose** (#D4A574): VAAR, destaque
- ⚪ **Cream White**: Backgrounds suaves
- ⚫ **Charcoal**: Texto principal

---

## 📚 Glossário Expandido

### Termos Técnicos
- **Matrículas Ponderadas**: Contagem de alunos com pesos diferentes por modalidade
- **VAAF-MIN**: Valor mínimo nacional garantido por aluno (2024: R$ 5.447,98)
- **Complementação**: Recursos adicionais da União quando estado está abaixo do mínimo
- **CAQi**: Custo Aluno Qualidade inicial (padrão de gasto mínimo)
- **SAEB**: Testes de aprendizagem (português, matemática)

### Estrutura Federativa
- **FNDE**: Agência responsável pela distribuição
- **SIOPE**: Sistema online de declaração de receitas/despesas
- **SICONFI**: Portal de informações contábeis públicas
- **INEP**: Instituto que coleta dados de matrículas (Censo Escolar)

---

## ✨ Dicas Avançadas

### 1. Comparar Dois Cenários
- Anote os resultados do primeiro cenário
- Altere parâmetros e simule novamente
- Compare manualmente na planilha/caderno

### 2. Testar Sensibilidade
- Aumente/diminua matrículas em 5%, 10%, 20%
- Observe como isso impacta VAAF por aluno
- Entenda elasticidade do sistema

### 3. Análise Multi-modal
- Simule crescimento só em Educação Infantil
- Compare com crescimento em Médio Integral
- Qual etapa traz mais receita?

---

## 🎯 Próximas Etapas

O aplicativo está em evolução. Funcionalidades futuras:
- 📈 Histórico multi-ano (2021–2026)
- 🗺️ Comparação entre municípios
- 📄 Exportação em PDF/Excel
- 🌙 Tema escuro aprimorado
- 📱 App mobile nativo

---

## 📞 Contato / Feedback

Encontrou um bug? Tem sugestão de melhoria?

- Contate: [seu email/repositório]
- GitHub: [link do repositório]
- Issues: [link para seção de issues]

---

## 📄 Versão do Manual
- **Versão**: 1.0
- **Data**: Dezembro 2025
- **Compatibilidade**: Navegadores modernos (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

---

**Aproveite a exploração do FUNDEB e bom uso do simulador! 🎓📚**
