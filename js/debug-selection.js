// Debug municipal selection process step by step
function debugMunicipalSelection() {
    console.log('🔍 === DEBUGGING MUNICIPAL SELECTION PROCESS ===');
    
    // Step 1: Check if data is loaded
    console.log('📊 Step 1: Checking data availability');
    console.log('window.municipalData exists:', !!window.municipalData);
    console.log('window.municipalData.PB exists:', !!(window.municipalData && window.municipalData.PB));
    
    if (!window.municipalData || !window.municipalData.PB) {
        console.error('❌ Municipal data not loaded properly');
        return;
    }
    
    // Step 2: Check PB municipalities
    console.log('📊 Step 2: PB Municipalities');
    const pbMunicipios = Object.keys(window.municipalData.PB);
    console.log('Total PB municipalities:', pbMunicipios.length);
    console.log('Campina Grande in list?', pbMunicipios.includes('CAMPINA GRANDE'));
    
    // Step 3: Check Campina Grande data
    console.log('📊 Step 3: Campina Grande Data');
    const campinaData = window.municipalData.PB['CAMPINA GRANDE'];
    if (campinaData) {
        console.log('✅ Campina Grande data found:', {
            codigoIBGE: campinaData.codigoIBGE,
            receitaContribuicao: campinaData.receitaContribuicao,
            complementacaoVAAF: campinaData.complementacaoVAAF
        });
    } else {
        console.error('❌ Campina Grande data not found');
        // Look for similar names
        const similar = pbMunicipios.filter(name => name.toLowerCase().includes('campina'));
        console.log('Similar names:', similar);
    }
    
    // Step 4: Test selectors
    console.log('📊 Step 4: Testing Selectors');
    const selectUF = document.getElementById('selectUF');
    const selectMunicipio = document.getElementById('selectMunicipio');
    
    if (!selectUF || !selectMunicipio) {
        console.error('❌ Selectors not found in DOM');
        return;
    }
    
    console.log('✅ Selectors found');
    
    // Step 5: Simulate UF selection
    console.log('📊 Step 5: Simulating UF Selection');
    selectUF.value = 'PB';
    
    // Manually trigger the onchange function
    if (selectUF.onchange) {
        console.log('Triggering UF change...');
        selectUF.onchange();
        
        setTimeout(() => {
            console.log('📊 Step 6: After UF Change');
            console.log('Municipality selector options:', selectMunicipio.options.length);
            
            // Look for Campina Grande in options
            let foundCampina = false;
            for (let i = 0; i < selectMunicipio.options.length; i++) {
                const option = selectMunicipio.options[i];
                if (option.value === 'CAMPINA GRANDE') {
                    foundCampina = true;
                    console.log('✅ Found Campina Grande in selector at index', i);
                    break;
                }
            }
            
            if (!foundCampina) {
                console.error('❌ Campina Grande not found in selector options');
                console.log('Available options:');
                for (let i = 0; i < selectMunicipio.options.length; i++) {
                    console.log(`  ${i}: "${selectMunicipio.options[i].value}"`);
                }
            }
            
            // Step 7: Simulate municipality selection
            console.log('📊 Step 7: Simulating Municipality Selection');
            selectMunicipio.value = 'CAMPINA GRANDE';
            
            if (selectMunicipio.onchange) {
                console.log('Triggering municipality change...');
                selectMunicipio.onchange();
            }
            
        }, 500);
    }
}

// Quick test function
function quickTestCampina() {
    console.log('⚡ Quick Test: Direct showMunicipalData call');
    
    if (window.municipalData && window.municipalData.PB && window.municipalData.PB['CAMPINA GRANDE']) {
        console.log('✅ Data exists, calling showMunicipalData directly...');
        
        if (typeof showMunicipalData === 'function') {
            showMunicipalData('PB', 'CAMPINA GRANDE');
        } else {
            console.error('❌ showMunicipalData function not found');
        }
    } else {
        console.error('❌ Data not available for direct test');
    }
}

// Add to window for console access
window.debugMunicipalSelection = debugMunicipalSelection;
window.quickTestCampina = quickTestCampina;

console.log('🔍 Debug functions loaded:');
console.log('  - debugMunicipalSelection() - Full step-by-step debug');  
console.log('  - quickTestCampina() - Quick direct test');