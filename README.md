# Simulador FUNDEB

Um simulador web interativo para cálculo de recursos do FUNDEB (Fundo de Manutenção e Desenvolvimento da Educação Básica e de Valorização dos Profissionais da Educação).

## 📋 Sobre o FUNDEB

O FUNDEB é um fundo de natureza contábil que redistribui recursos destinados à educação básica, com base no número de matrículas em cada etapa e modalidade de ensino, aplicando fatores de ponderação diferenciados.

## 🚀 Funcionalidades

- **Cálculo automático**: Calcula o valor total de recursos com base nas matrículas informadas
- **Fatores de ponderação**: Aplica automaticamente os fatores corretos para cada modalidade
- **Interface intuitiva**: Design responsivo e fácil de usar
- **Resultados detalhados**: Mostra cálculos por modalidade e totais
- **Validação de dados**: Impede entrada de valores inválidos

## 🎯 Modalidades Contempladas

| Modalidade | Fator de Ponderação |
|------------|-------------------|
| Creche (0-3 anos) | 1.30 |
| Pré-escola (4-5 anos) | 1.00 |
| Ensino Fundamental - Anos iniciais | 1.00 |
| Ensino Fundamental - Anos finais | 1.15 |
| Ensino Médio Regular | 1.25 |
| Ensino Médio Técnico | 1.30 |
| Educação Especial | 1.20 |
| EJA - Fundamental | 0.80 |
| EJA - Médio | 1.00 |

## 🖥️ Como Usar

1. **Abra o arquivo `index.html`** em seu navegador web
2. **Informe o número de matrículas** para cada modalidade de ensino
3. **Ajuste o valor por aluno/ano** se necessário (valor padrão: R$ 4.800,00)
4. **Clique em "Calcular FUNDEB"** para ver os resultados
5. **Use "Limpar Campos"** para resetar todos os valores

## 📊 Cálculo

O valor para cada modalidade é calculado pela fórmula:

```
Valor = Número de Matrículas × Fator de Ponderação × Valor por Aluno/Ano
```

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da aplicação
- **CSS3**: Estilização moderna com gradientes e animações
- **JavaScript**: Lógica de cálculo e interatividade
- **Design Responsivo**: Adaptável a diferentes tamanhos de tela

## 📱 Responsividade

O simulador é totalmente responsivo e funciona bem em:
- 💻 Desktops
- 📱 Tablets
- 📱 Smartphones

## 🎨 Características Visuais

- Design moderno com gradientes
- Animações suaves
- Interface intuitiva
- Cores contrastantes para melhor acessibilidade
- Layout organizado por grupos de modalidades

## 📝 Exemplo de Uso

```
Entrada:
- Creche: 100 alunos
- Pré-escola: 150 alunos
- EF Anos iniciais: 300 alunos
- Valor por aluno/ano: R$ 4.800,00

Resultado:
- Creche: 100 × 1.30 × R$ 4.800,00 = R$ 624.000,00
- Pré-escola: 150 × 1.00 × R$ 4.800,00 = R$ 720.000,00
- EF Anos iniciais: 300 × 1.00 × R$ 4.800,00 = R$ 1.440.000,00

Total: R$ 2.784.000,00
```

## ⚠️ Importante

Este simulador tem propósito educativo e de planejamento. Para cálculos oficiais, consulte sempre a legislação vigente e os órgãos competentes.

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais.

---

**Desenvolvido com ❤️ para facilitar o entendimento do FUNDEB**
