// Test Campina Grande selection specifically
function testCampinaGrande() {
    console.log('🧪 Testing Campina Grande selection...');
    
    // Check if data exists
    if (!window.municipalData || !window.municipalData.PB) {
        console.error('❌ Municipal data not loaded yet');
        return;
    }
    
    console.log('✅ Municipal data exists');
    console.log('PB municipalities:', Object.keys(window.municipalData.PB).length);
    
    // Check for Campina Grande specifically
    const campinaData = window.municipalData.PB['CAMPINA GRANDE'];
    if (campinaData) {
        console.log('✅ Campina Grande found in data:', campinaData);
    } else {
        console.error('❌ Campina Grande not found in PB data');
        console.log('Available PB municipalities:', Object.keys(window.municipalData.PB));
        return;
    }
    
    // Test the showMunicipalData function directly
    console.log('🔄 Calling showMunicipalData directly...');
    try {
        if (typeof showMunicipalData === 'function') {
            showMunicipalData('PB', 'CAMPINA GRANDE');
        } else {
            console.error('❌ showMunicipalData function not available');
        }
    } catch (error) {
        console.error('❌ Error calling showMunicipalData:', error);
    }
}

// Test selector population
function testSelectorPopulation() {
    console.log('🧪 Testing selector population...');
    
    const selectUF = document.getElementById('selectUF');
    const selectMunicipio = document.getElementById('selectMunicipio');
    
    if (!selectUF || !selectMunicipio) {
        console.error('❌ Selectors not found in DOM');
        return;
    }
    
    console.log('✅ Selectors found');
    console.log('UF options:', selectUF.options.length);
    console.log('Municipality options:', selectMunicipio.options.length);
    
    // Set PB
    selectUF.value = 'PB';
    console.log('Set UF to PB');
    
    // Trigger change event manually
    if (selectUF.onchange) {
        console.log('Triggering UF change event...');
        selectUF.onchange();
    }
    
    setTimeout(() => {
        console.log('After UF change - Municipality options:', selectMunicipio.options.length);
        
        // Look for Campina Grande option
        let campinaOption = null;
        for (let i = 0; i < selectMunicipio.options.length; i++) {
            if (selectMunicipio.options[i].value === 'CAMPINA GRANDE') {
                campinaOption = selectMunicipio.options[i];
                break;
            }
        }
        
        if (campinaOption) {
            console.log('✅ Found Campina Grande option:', campinaOption.value);
            selectMunicipio.value = 'CAMPINA GRANDE';
            
            if (selectMunicipio.onchange) {
                console.log('Triggering municipality change event...');
                selectMunicipio.onchange();
            }
        } else {
            console.error('❌ Campina Grande option not found in selector');
            const allOptions = Array.from(selectMunicipio.options).map(opt => opt.value);
            console.log('Available options:', allOptions);
        }
    }, 1000);
}

// Add to window for console access
window.testCampinaGrande = testCampinaGrande;
window.testSelectorPopulation = testSelectorPopulation;

console.log('🧪 Test functions loaded: testCampinaGrande(), testSelectorPopulation()');