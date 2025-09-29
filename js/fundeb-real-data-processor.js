// FUNDEB 2024 Real Data Processor
// Processes the real CSV data from dados_unificados_agregado.CSV

function processRealFUNDEBCSV() {
    console.log('🔄 Processing real FUNDEB 2024 data...');
    
    // Read the CSV file content
    fetch('dados/fundeb_2024_real.csv')
        .then(response => response.text())
        .then(csvContent => {
            const realMunicipalData = parseRealCSVData(csvContent);
            
            // Replace the simulated data
            console.log('🔄 Replacing municipal data...');
            console.log('Before replacement - PB municipalities:', Object.keys(window.municipalData?.PB || {}));
            
            window.municipalData = realMunicipalData;
            
            console.log('After replacement - PB municipalities:', Object.keys(window.municipalData?.PB || {}));
            console.log('Campina Grande after replacement:', window.municipalData?.PB?.['CAMPINA GRANDE']);
            
            // Debug: Show sample of loaded data
            console.log('🔍 Sample data loaded for PB:', realMunicipalData['PB'] ? Object.keys(realMunicipalData['PB']).slice(0, 3) : 'No PB data');
            if (realMunicipalData['PB'] && realMunicipalData['PB']['CAMPINA GRANDE']) {
                console.log('📊 Campina Grande data:', realMunicipalData['PB']['CAMPINA GRANDE']);
            }
            
            // Clear any existing municipal data display
            const dataDiv = document.getElementById('municipioData');
            if (dataDiv) {
                dataDiv.classList.add('hidden');
            }
            
            // Reset selectors
            const selectUF = document.getElementById('selectUF');
            const selectMunicipio = document.getElementById('selectMunicipio');
            if (selectUF) selectUF.value = '';
            if (selectMunicipio) {
                selectMunicipio.innerHTML = '<option value="">Selecione o Município</option>';
                selectMunicipio.disabled = true;
            }
            
            // Reinitialize municipal selectors with real data
            if (typeof setupMunicipalSelectors === 'function') {
                console.log('🔄 Reinitializing selectors with real data...');
                setupMunicipalSelectors();
            } else {
                console.warn('⚠️ setupMunicipalSelectors function not available');
            }
            
            console.log('✅ Real FUNDEB data loaded successfully!');
            console.log('📊 Total states:', Object.keys(realMunicipalData).length);
            
            let totalMunicipalities = 0;
            Object.values(realMunicipalData).forEach(state => {
                totalMunicipalities += Object.keys(state).length;
            });
            console.log('🏢 Total municipalities:', totalMunicipalities);
            
            // If user has already selected a municipality, refresh the display with real data
            if (window.currentMunicipalData) {
                const { uf, municipio } = window.currentMunicipalData;
                console.log('🔄 Refreshing display for previously selected municipality:', municipio, uf);
                
                setTimeout(() => {
                    if (typeof showMunicipalData === 'function') {
                        showMunicipalData(uf, municipio);
                    }
                }, 500);
            }
            
            showNotification('Dados reais do FUNDEB 2024 carregados com sucesso! Se você já selecionou um município, os dados foram atualizados automaticamente.', 'success');
        })
        .catch(error => {
            console.error('❌ Error loading real FUNDEB data:', error);
            showNotification('Erro ao carregar dados reais do FUNDEB.', 'error');
        });
}

function parseRealCSVData(csvContent) {
    const lines = csvContent.split('\n');
    const realData = {};
    
    console.log('📋 Processing', lines.length, 'lines...');
    
    let processedCount = 0;
    let skippedCount = 0;
    
    // Skip header (line 0) and process data lines
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        try {
            const parts = line.split(';');
            
            // Validate minimum columns
            if (parts.length < 85) {
                skippedCount++;
                continue;
            }
            
            const uf = parts[0]?.trim();
            const municipio = parts[1]?.trim();
            const codigoIBGE = parts[2]?.trim();
            
            if (!uf || !municipio || !codigoIBGE) {
                skippedCount++;
                continue;
            }
            
            // Initialize state if not exists
            if (!realData[uf]) {
                realData[uf] = {};
            }
            
            // Parse financial data (converting comma decimal to dot decimal)
            // VERIFIED CORRECT positions:
            const receitaContribuicao = parseFloat((parts[75] || '0').replace(',', '.')) || 0;  // 235685817
            const complementacaoVAAF = parseFloat((parts[76] || '0').replace(',', '.')) || 0;    // 22019976,19
            const complementacaoVAAT = parseFloat((parts[77] || '0').replace(',', '.')) || 0;    // 41401744,8
            const complementacaoVAAR = parseFloat((parts[78] || '0').replace(',', '.')) || 0;    // 0
            const totalReceitas = parseFloat((parts[80] || '0').replace(',', '.')) || 0;         // 299107538
            
            // Parse enrollment data (VERIFIED CORRECT positions)
            const infantil = parseInt(parts[81] || '0') || 0;      // 10128
            const fundamentalI = parseInt(parts[82] || '0') || 0;   // 13016
            const fundamentalII = parseInt(parts[83] || '0') || 0;  // 6485
            const medioIntegral = parseInt(parts[84] || '0') || 0;  // 0
            const medioParcial = parseInt(parts[85] || '0') || 0;   // 0
            const eja = parseInt(parts[86] || '0') || 0;            // 1113
            const especial = parseInt(parts[87] || '0') || 0;       // 6115
            const profissional = parseInt(parts[88] || '0') || 0;   // 0
            
            // Validation log for Campina Grande
            if (municipio === 'CAMPINA GRANDE') {
                console.log('✅ Campina Grande data verified:', {
                    receitaContribuicao, complementacaoVAAF, complementacaoVAAT, 
                    complementacaoVAAR, totalReceitas, infantil, fundamentalI, 
                    fundamentalII, eja, especial
                });
            }
            
            // Create municipality data structure
            realData[uf][municipio] = {
                codigoIBGE: codigoIBGE,
                receitaContribuicao: receitaContribuicao,
                complementacaoVAAF: complementacaoVAAF,
                complementacaoVAAT: complementacaoVAAT,
                complementacaoVAAR: complementacaoVAAR,
                totalReceitas: totalReceitas,
                matriculas: {
                    infantil: infantil,
                    fundamentalI: fundamentalI,
                    fundamentalII: fundamentalII,
                    medioIntegral: medioIntegral,
                    medioParcial: medioParcial,
                    eja: eja,
                    especial: especial,
                    profissional: profissional
                }
            };
            
            processedCount++;
            
        } catch (error) {
            console.warn('⚠️ Error processing line', i, ':', error.message);
            skippedCount++;
        }
    }
    
    console.log('✅ Processing complete:');
    console.log('📊 Processed:', processedCount, 'municipalities');
    console.log('⚠️ Skipped:', skippedCount, 'lines');
    
    return realData;
}

// Initialize real data loading when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait longer to ensure all scripts are loaded
    setTimeout(() => {
        console.log('⏰ Starting real data loading process...');
        processRealFUNDEBCSV();
    }, 4000);
});

// Also provide a manual trigger
window.loadRealFUNDEBData = processRealFUNDEBCSV;

// Manual trigger function
function loadRealData() {
    processRealFUNDEBCSV();
}

console.log('🚀 FUNDEB Real Data Processor loaded');