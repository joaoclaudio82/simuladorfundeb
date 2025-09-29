// Fatores de ponderação do FUNDEB
const fatoresPonderacao = {
    'ei-creche': 1.30,
    'ei-pre': 1.00,
    'ef-inicial': 1.00,
    'ef-final': 1.15,
    'em-regular': 1.25,
    'em-tecnico': 1.30,
    'ee-especial': 1.20,
    'eja-fundamental': 0.80,
    'eja-medio': 1.00
};

// Nomes das modalidades de ensino
const nomeModalidades = {
    'ei-creche': 'Creche (0-3 anos)',
    'ei-pre': 'Pré-escola (4-5 anos)',
    'ef-inicial': 'Ensino Fundamental - Anos iniciais',
    'ef-final': 'Ensino Fundamental - Anos finais',
    'em-regular': 'Ensino Médio Regular',
    'em-tecnico': 'Ensino Médio Técnico',
    'ee-especial': 'Educação Especial',
    'eja-fundamental': 'EJA - Fundamental',
    'eja-medio': 'EJA - Médio'
};

function calcularFUNDEB() {
    // Obter valores dos campos de entrada
    const valorAlunoAno = parseFloat(document.getElementById('valor-aluno-ano').value) || 0;
    
    let totalMatriculas = 0;
    let totalPonderado = 0;
    let resultadosDetalhados = [];

    // Calcular para cada modalidade
    Object.keys(fatoresPonderacao).forEach(modalidade => {
        const matriculas = parseInt(document.getElementById(modalidade).value) || 0;
        const fator = fatoresPonderacao[modalidade];
        const matriculasPonderadas = matriculas * fator;
        const valorTotal = matriculasPonderadas * valorAlunoAno;

        if (matriculas > 0) {
            resultadosDetalhados.push({
                nome: nomeModalidades[modalidade],
                matriculas: matriculas,
                fator: fator,
                matriculasPonderadas: matriculasPonderadas,
                valorTotal: valorTotal
            });
        }

        totalMatriculas += matriculas;
        totalPonderado += matriculasPonderadas;
    });

    const valorTotalFundeb = totalPonderado * valorAlunoAno;

    // Exibir resultados
    exibirResultados(resultadosDetalhados, totalMatriculas, totalPonderado, valorTotalFundeb, valorAlunoAno);
}

function exibirResultados(detalhados, totalMatriculas, totalPonderado, valorTotal, valorAlunoAno) {
    const resultsDiv = document.getElementById('results');
    const resultsContent = document.getElementById('results-content');

    if (totalMatriculas === 0) {
        resultsDiv.style.display = 'none';
        alert('Por favor, insira pelo menos uma matrícula para realizar o cálculo.');
        return;
    }

    let html = '';

    // Resumo geral
    html += `
        <div class="result-item total">
            <span class="result-label">Total de Matrículas:</span>
            <span class="result-value">${totalMatriculas.toLocaleString('pt-BR')}</span>
        </div>
        <div class="result-item total">
            <span class="result-label">Total de Matrículas Ponderadas:</span>
            <span class="result-value">${totalPonderado.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
        <div class="result-item total">
            <span class="result-label">Valor Total FUNDEB:</span>
            <span class="result-value">R$ ${valorTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
    `;

    // Detalhamento por modalidade
    if (detalhados.length > 0) {
        html += '<h3 style="margin: 25px 0 15px 0; color: #2c3e50;">Detalhamento por Modalidade:</h3>';
        
        detalhados.forEach(item => {
            html += `
                <div class="result-item">
                    <div class="result-label">
                        <strong>${item.nome}</strong><br>
                        <small>${item.matriculas.toLocaleString('pt-BR')} matrículas × fator ${item.fator}</small>
                    </div>
                    <div class="result-value">
                        ${item.matriculasPonderadas.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} matrículas ponderadas<br>
                        <strong>R$ ${item.valorTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
                    </div>
                </div>
            `;
        });
    }

    // Informações adicionais
    html += `
        <div style="margin-top: 25px; padding: 15px; background: #d5dbdb; border-radius: 8px;">
            <h4 style="color: #2c3e50; margin-bottom: 10px;">Informações do Cálculo:</h4>
            <p><strong>Valor por aluno/ano:</strong> R$ ${valorAlunoAno.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            <p><strong>Fórmula:</strong> Matrículas × Fator de Ponderação × Valor por Aluno/Ano</p>
            <p><strong>Data do cálculo:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
        </div>
    `;

    resultsContent.innerHTML = html;
    resultsDiv.style.display = 'block';
    
    // Scroll suave para os resultados
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Função para limpar todos os campos
function limparCampos() {
    Object.keys(fatoresPonderacao).forEach(modalidade => {
        document.getElementById(modalidade).value = '0';
    });
    document.getElementById('valor-aluno-ano').value = '4800.00';
    document.getElementById('results').style.display = 'none';
}

// Função para validar entrada numérica
function validarNumero(input) {
    const valor = parseInt(input.value);
    if (isNaN(valor) || valor < 0) {
        input.value = '0';
    }
}

// Adicionar validação aos campos de entrada quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Validação para campos de matrícula
    Object.keys(fatoresPonderacao).forEach(modalidade => {
        const input = document.getElementById(modalidade);
        input.addEventListener('blur', () => validarNumero(input));
        input.addEventListener('input', () => {
            if (input.value < 0) input.value = 0;
        });
    });

    // Validação para valor por aluno/ano
    const valorInput = document.getElementById('valor-aluno-ano');
    valorInput.addEventListener('blur', () => {
        const valor = parseFloat(valorInput.value);
        if (isNaN(valor) || valor < 0) {
            valorInput.value = '4800.00';
        }
    });

    // Adicionar botão de limpar
    const calcularBtn = document.getElementById('calcular-btn');
    const limparBtn = document.createElement('button');
    limparBtn.textContent = 'Limpar Campos';
    limparBtn.style.cssText = `
        width: 100%;
        padding: 10px;
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        margin-top: 10px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    `;
    
    limparBtn.addEventListener('mouseover', () => {
        limparBtn.style.transform = 'translateY(-2px)';
        limparBtn.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.3)';
    });
    
    limparBtn.addEventListener('mouseout', () => {
        limparBtn.style.transform = 'translateY(0)';
        limparBtn.style.boxShadow = 'none';
    });
    
    limparBtn.onclick = limparCampos;
    calcularBtn.parentNode.insertBefore(limparBtn, calcularBtn.nextSibling);
});

// Função para exportar resultados (funcionalidade adicional)
function exportarResultados() {
    const results = document.getElementById('results-content');
    if (results && results.innerHTML) {
        const dataStr = "data:text/html;charset=utf-8," + encodeURIComponent(`
            <html>
            <head>
                <title>Resultados FUNDEB</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .result-item { padding: 10px; margin: 5px 0; border: 1px solid #ddd; }
                    .total { background: #e8f5e8; font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>Resultados do Simulador FUNDEB</h1>
                ${results.innerHTML}
                <p><em>Gerado em ${new Date().toLocaleString('pt-BR')}</em></p>
            </body>
            </html>
        `);
        
        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = dataStr;
        downloadAnchor.download = `fundeb_resultados_${new Date().toISOString().split('T')[0]}.html`;
        downloadAnchor.click();
    }
}