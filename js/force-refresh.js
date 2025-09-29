// Force refresh municipal data with real values
function forceRefreshMunicipalData() {
    console.log('🔄 Forcing refresh of municipal data...');
    
    // Check if Campina Grande is available in real data
    if (window.municipalData && window.municipalData.PB && window.municipalData.PB['CAMPINA GRANDE']) {
        const data = window.municipalData.PB['CAMPINA GRANDE'];
        console.log('✅ Found Campina Grande real data:', data);
        
        // Force selection
        const selectUF = document.getElementById('selectUF');
        const selectMunicipio = document.getElementById('selectMunicipio');
        
        if (selectUF) selectUF.value = 'PB';
        
        // Populate municipalities for PB
        if (selectMunicipio && window.municipalData.PB) {
            const municipios = Object.keys(window.municipalData.PB).sort();
            selectMunicipio.innerHTML = '<option value="">Selecione o Município</option>';
            municipios.forEach(municipio => {
                const option = document.createElement('option');
                option.value = municipio;
                option.textContent = municipio;
                selectMunicipio.appendChild(option);
            });
            selectMunicipio.value = 'CAMPINA GRANDE';
            selectMunicipio.disabled = false;
        }
        
        // Force show data
        if (typeof showMunicipalData === 'function') {
            showMunicipalData('PB', 'CAMPINA GRANDE');
        }
        
        showNotification('Dados de Campina Grande atualizados com valores reais!', 'success');
    } else {
        console.error('❌ Real data not available yet');
        showNotification('Dados reais ainda não foram carregados. Aguarde alguns segundos.', 'warning');
    }
}

// Add to window for manual access
window.forceRefreshMunicipalData = forceRefreshMunicipalData;

console.log('🔧 Force refresh utility loaded. Use forceRefreshMunicipalData() in console if needed.');