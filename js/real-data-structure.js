// FUNDEB 2024 Real Data Structure
// Based on dados_unificados_agregado.xlsx analysis

// Expected column structure from Excel file:
const expectedColumns = {
    // Identificação
    uf: 'UF',
    municipio: 'Município', 
    codigoIBGE: 'Código IBGE',
    
    // Receitas e Complementações FUNDEB
    receitaContribuicao: 'Receita da contribuição de estados e municípios ao Fundeb',
    complementacaoVAAF: 'Complementação VAAF',
    complementacaoVAAT: 'Complementação VAAT', 
    complementacaoVAAR: 'Complementação VAAR',
    complementacaoUniao: 'Complementação da União Total',
    totalReceitas: 'Total das receitas previstas',
    
    // Distribuição das Matrículas
    educacaoInfantil: 'Educação Infantil',
    anosIniciaisFund: 'Anos Iniciais do Ensino Fundamental (1º ao 5º ano)',
    anosFinaisFund: 'Anos Finais do Ensino Fundamental (6º ao 9º ano)',
    ensinoMedioIntegral: 'Ensino Médio Integral',
    ensinoMedioParcial: 'Ensino Médio Parcial',
    eja: 'EJA (Educação de Jovens e Adultos)',
    educacaoEspecial: 'Educação Especial',
    educacaoProfissional: 'Educação Profissional/Técnica'
};

// Function to convert real Excel data to our municipal data structure
function convertRealDataToStructure(csvContent) {
    console.log('🔄 Converting real FUNDEB data...');
    
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    console.log('📊 Detected columns:', headers);
    
    const realMunicipalData = {};
    let processedCount = 0;
    
    for (let i = 1; i < lines.length; i++) {
        const row = lines[i];
        if (!row.trim()) continue;
        
        // Parse CSV row (handling commas inside quotes)
        const values = parseCSVRow(row);
        
        if (values.length < headers.length) continue;
        
        // Create data object
        const rowData = {};
        headers.forEach((header, index) => {
            rowData[header] = values[index]?.trim().replace(/"/g, '') || '';
        });
        
        // Extract key fields (adjust column names based on actual Excel)
        const uf = rowData[findColumn(headers, ['UF', 'Estado'])];
        const municipio = rowData[findColumn(headers, ['Município', 'Municipio'])];
        const codigoIBGE = rowData[findColumn(headers, ['Código IBGE', 'IBGE'])];
        
        if (!uf || !municipio) continue;
        
        // Initialize state
        if (!realMunicipalData[uf]) {
            realMunicipalData[uf] = {};
        }
        
        // Convert to our structure
        realMunicipalData[uf][municipio] = {
            codigoIBGE: codigoIBGE || '',
            receitaContribuicao: parseFinancialValue(rowData[findColumn(headers, ['Receita', 'contribuição'])]),
            complementacaoVAAF: parseFinancialValue(rowData[findColumn(headers, ['VAAF'])]),
            complementacaoVAAT: parseFinancialValue(rowData[findColumn(headers, ['VAAT'])]),
            complementacaoVAAR: parseFinancialValue(rowData[findColumn(headers, ['VAAR'])]),
            totalReceitas: parseFinancialValue(rowData[findColumn(headers, ['Total', 'receitas'])]),
            matriculas: {
                infantil: parseEnrollmentValue(rowData[findColumn(headers, ['Infantil'])]),
                fundamentalI: parseEnrollmentValue(rowData[findColumn(headers, ['Iniciais', 'Fundamental'])]),
                fundamentalII: parseEnrollmentValue(rowData[findColumn(headers, ['Finais', 'Fundamental'])]),
                medioIntegral: parseEnrollmentValue(rowData[findColumn(headers, ['Médio', 'Integral'])]),
                medioParcial: parseEnrollmentValue(rowData[findColumn(headers, ['Médio', 'Parcial'])]),
                eja: parseEnrollmentValue(rowData[findColumn(headers, ['EJA'])]),
                especial: parseEnrollmentValue(rowData[findColumn(headers, ['Especial'])]),
                profissional: parseEnrollmentValue(rowData[findColumn(headers, ['Profissional', 'Técnica'])])
            }
        };
        
        processedCount++;
    }
    
    console.log(`✅ Processed ${processedCount} municipalities from real data`);
    return realMunicipalData;
}

// Helper functions
function parseCSVRow(row) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

function findColumn(headers, keywords) {
    return headers.find(header => 
        keywords.some(keyword => 
            header.toLowerCase().includes(keyword.toLowerCase())
        )
    ) || '';
}

function parseFinancialValue(value) {
    if (!value) return 0;
    return parseFloat(value.toString().replace(/[^\d.-]/g, '')) || 0;
}

function parseEnrollmentValue(value) {
    if (!value) return 0;
    return parseInt(value.toString().replace(/[^\d]/g, '')) || 0;
}

// Function to replace simulated data with real data
function loadRealFUNDEBData(csvContent) {
    try {
        const realData = convertRealDataToStructure(csvContent);
        
        // Replace global municipal data
        if (typeof window !== 'undefined') {
            window.municipalData = realData;
        }
        
        console.log('🎉 Real FUNDEB 2024 data loaded successfully!');
        
        if (typeof showNotification !== 'undefined') {
            showNotification('Dados reais do FUNDEB 2024 carregados com sucesso!', 'success');
        }
        
        return realData;
    } catch (error) {
        console.error('❌ Error loading real FUNDEB data:', error);
        if (typeof showNotification !== 'undefined') {
            showNotification('Erro ao carregar dados reais do FUNDEB.', 'error');
        }
        return null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        convertRealDataToStructure,
        loadRealFUNDEBData,
        expectedColumns
    };
}