// FUNDEB 2024 Real Data Processor
// This script will process the real Excel data when converted to a usable format

// Function to convert CSV data to municipal data structure
function processRealFUNDEBData(csvData) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    console.log('Processing FUNDEB data with headers:', headers);
    
    const processedData = {};
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        
        if (values.length < headers.length) continue;
        
        const rowData = {};
        headers.forEach((header, index) => {
            rowData[header] = values[index]?.trim();
        });
        
        // Extract municipality data
        const uf = rowData['UF'] || rowData['Estado'];
        const municipio = rowData['Municipio'] || rowData['Município'];
        const codigoIBGE = rowData['Codigo_IBGE'] || rowData['IBGE'];
        
        if (!uf || !municipio) continue;
        
        // Initialize state if not exists
        if (!processedData[uf]) {
            processedData[uf] = {};
        }
        
        // Build municipality data structure
        processedData[uf][municipio] = {
            codigoIBGE: codigoIBGE,
            receitaContribuicao: parseFloat(rowData['Receita_Contribuicao'] || 0),
            complementacaoVAAF: parseFloat(rowData['VAAF'] || 0),
            complementacaoVAAT: parseFloat(rowData['VAAT'] || 0),
            complementacaoVAAR: parseFloat(rowData['VAAR'] || 0),
            matriculas: {
                infantil: parseInt(rowData['Infantil'] || 0),
                fundamentalI: parseInt(rowData['Fund_I'] || 0),
                fundamentalII: parseInt(rowData['Fund_II'] || 0),
                medioIntegral: parseInt(rowData['Medio_Integral'] || 0),
                medioParcial: parseInt(rowData['Medio_Parcial'] || 0),
                eja: parseInt(rowData['EJA'] || 0),
                especial: parseInt(rowData['Especial'] || 0),
                profissional: parseInt(rowData['Profissional'] || 0)
            }
        };
    }
    
    return processedData;
}

// Function to replace simulated data with real data
function replaceSimulatedData(realData) {
    // This will replace the municipalData object in fundeb.js
    window.municipalData = realData;
    console.log('Real FUNDEB data loaded successfully!');
    showNotification('Dados reais do FUNDEB 2024 carregados com sucesso!', 'success');
}

// Export function for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { processRealFUNDEBData, replaceSimulatedData };
}