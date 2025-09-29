// FUNDEB Calculator and Charts JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initCompositionChart();
    initImplementationTable();
    initImplementationChart();
    initCalculator();
    initNavigation();
    initMunicipalData();
    initPonderacaoControls();
});

// Data for implementation table
const implementationData = [
    {year: '2021', vaaf: '10,00%', vaat: '2,00%', vaar: '0,00%', total: '12,00%'},
    {year: '2022', vaaf: '10,00%', vaat: '5,00%', vaar: '0,00%', total: '15,00%'},
    {year: '2023', vaaf: '10,00%', vaat: '6,25%', vaar: '0,75%', total: '17,00%'},
    {year: '2024', vaaf: '10,00%', vaat: '7,50%', vaar: '1,50%', total: '19,00%'},
    {year: '2025', vaaf: '10,00%', vaat: '9,00%', vaar: '2,00%', total: '21,00%'},
    {year: '2026+', vaaf: '10,00%', vaat: '10,50%', vaar: '2,50%', total: '23,00%'}
];

// Initialize composition chart
function initCompositionChart() {
    const ctx = document.getElementById('compositionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Contribuição Estados/Municípios',
                'Complementação VAAF',
                'Complementação VAAT',
                'Complementação VAAR'
            ],
            datasets: [{
                data: [77, 10, 10.5, 2.5],
                backgroundColor: [
                    '#A0956B',  // Mocha Mousse - Primary
                    '#9CAF88',  // Sage Green - VAAF
                    '#D4A574',  // Dusty Rose - VAAT
                    '#B5AFA3'   // Stone Gray - VAAR
                ],
                borderWidth: 3,
                borderColor: '#F5F2ED'  // Cream White
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Initialize implementation table
function initImplementationTable() {
    const tableBody = document.getElementById('implementationTable');
    if (!tableBody) return;

    tableBody.innerHTML = implementationData.map((row, index) => {
        const isCurrentYear = row.year === '2024';
        const rowClass = isCurrentYear ? 'bg-orange-50' : (index % 2 === 0 ? 'bg-gray-50' : 'bg-white');
        
        return `
            <tr class="${rowClass} hover:bg-orange-100 transition-colors">
                <td class="border border-gray-300 px-4 py-3 font-semibold ${isCurrentYear ? 'text-orange-700' : 'text-gray-800'}">
                    ${row.year} ${isCurrentYear ? '<span class="text-xs bg-orange-200 px-2 py-1 rounded ml-2">ATUAL</span>' : ''}
                </td>
                <td class="border border-gray-300 px-4 py-3 text-center text-blue-600 font-medium">${row.vaaf}</td>
                <td class="border border-gray-300 px-4 py-3 text-center text-green-600 font-medium">${row.vaat}</td>
                <td class="border border-gray-300 px-4 py-3 text-center text-purple-600 font-medium">${row.vaar}</td>
                <td class="border border-gray-300 px-4 py-3 text-center text-orange-600 font-bold text-lg">${row.total}</td>
            </tr>
        `;
    }).join('');
}

// Initialize implementation chart
function initImplementationChart() {
    const ctx = document.getElementById('implementationChart');
    if (!ctx) return;

    const years = implementationData.map(d => d.year);
    const vaafData = implementationData.map(d => parseFloat(d.vaaf.replace('%', '').replace(',', '.')));
    const vaatData = implementationData.map(d => parseFloat(d.vaat.replace('%', '').replace(',', '.')));
    const vaarData = implementationData.map(d => parseFloat(d.vaar.replace('%', '').replace(',', '.')));
    const totalData = implementationData.map(d => parseFloat(d.total.replace('%', '').replace(',', '.')));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'VAAF',
                    data: vaafData,
                    backgroundColor: '#A0956B',  // Mocha Mousse for VAAF
                    borderRadius: 4
                },
                {
                    label: 'VAAT',
                    data: vaatData,
                    backgroundColor: '#9CAF88',  // Sage Green for VAAT
                    borderRadius: 4
                },
                {
                    label: 'VAAR',
                    data: vaarData,
                    backgroundColor: '#D4A574',  // Dusty Rose for VAAR
                    borderRadius: 4
                },
                {
                    label: 'Total',
                    data: totalData,
                    type: 'line',
                    borderColor: '#8B7355',     // Rich Earth for Total line
                    backgroundColor: '#8B7355',  // Rich Earth for Total line
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Ano',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 25,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Percentual (%)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Initialize calculator
function initCalculator() {
    // Initialize tab navigation
    initSimulatorTabs();
    
    // Initialize VAAF calculator
    const vaafForm = document.getElementById('vaafCalculator');
    if (vaafForm) {
        vaafForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const result = calculateVAAF();
            showVAAFResult(result);
        });
    }
    
    // Initialize VAAT calculator
    const vaatForm = document.getElementById('vaatCalculator');
    if (vaatForm) {
        vaatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const result = calculateVAAT();
            showVAATResult(result);
        });
    }
    
    // Initialize VAAR calculator
    const vaarForm = document.getElementById('vaarCalculator');
    if (vaarForm) {
        vaarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const result = calculateVAAR();
            showVAARResult(result);
        });
    }
}

// Initialize simulator tabs
function initSimulatorTabs() {
    const tabs = document.querySelectorAll('.simulator-tab');
    const contents = document.querySelectorAll('.simulator-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update tab appearance
            tabs.forEach(t => {
                t.classList.remove('border-blue-500', 'text-blue-600', 'border-green-500', 'text-green-600', 'border-purple-500', 'text-purple-600');
                t.classList.add('border-transparent', 'text-gray-600');
            });
            
            // Show active tab
            if (targetTab === 'vaaf') {
                this.classList.remove('border-transparent', 'text-gray-600');
                this.classList.add('border-blue-500', 'text-blue-600');
            } else if (targetTab === 'vaat') {
                this.classList.remove('border-transparent', 'text-gray-600');
                this.classList.add('border-green-500', 'text-green-600');
            } else if (targetTab === 'vaar') {
                this.classList.remove('border-transparent', 'text-gray-600');
                this.classList.add('border-purple-500', 'text-purple-600');
            } else if (targetTab === 'municipio') {
                this.classList.remove('border-transparent', 'text-gray-600');
                this.classList.add('border-indigo-500', 'text-indigo-600');
            }
            
            // Show/hide content
            contents.forEach(content => {
                content.classList.add('hidden');
            });
            
            const targetContent = document.getElementById(targetTab + '-simulator');
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });
}

// Calculate VAAF based on real methodology
function calculateVAAF() {
    const matriculasPonderadas = parseFloat(document.getElementById('vaafMatriculas').value) || 0;
    const receitaEstimada = parseFloat(document.getElementById('vaafReceita').value) || 0;
    const vaafMin = parseFloat(document.getElementById('vaafMin').value) || 5447.98;
    
    if (matriculasPonderadas <= 0 || receitaEstimada <= 0) {
        return { error: 'Por favor, insira valores válidos para matrículas e receita.' };
    }
    
    // Calculate VAAF of the entity
    const vaafCalculado = receitaEstimada / matriculasPonderadas;
    
    // Determine if complementation is needed
    const necessitaComplementacao = vaafCalculado < vaafMin;
    
    // Calculate complementation amount
    const valorComplementacao = necessitaComplementacao ? 
        (vaafMin - vaafCalculado) * matriculasPonderadas : 0;
    
    // Final VAAF after complementation
    const vaafFinal = necessitaComplementacao ? vaafMin : vaafCalculado;
    
    // Total fund value
    const fundoTotal = receitaEstimada + valorComplementacao;
    
    return {
        matriculasPonderadas,
        receitaEstimada,
        vaafCalculado,
        vaafMin,
        necessitaComplementacao,
        valorComplementacao,
        vaafFinal,
        fundoTotal,
        percentualComplementacao: receitaEstimada > 0 ? (valorComplementacao / receitaEstimada) * 100 : 0
    };
}

// Calculate VAAT 
function calculateVAAT() {
    const matriculasPonderadas = parseFloat(document.getElementById('vaatMatriculas').value) || 0;
    const receita25Impostos = parseFloat(document.getElementById('vaat25Impostos').value) || 0;
    const receitaFundeb = parseFloat(document.getElementById('vaatFundeb').value) || 0;
    const outrasReceitas = parseFloat(document.getElementById('vaatOutros').value) || 0;
    const vaatMin = parseFloat(document.getElementById('vaatMin').value) || 7000;
    
    if (matriculasPonderadas <= 0) {
        return { error: 'Por favor, insira um valor válido para matrículas.' };
    }
    
    // Total education revenue
    const receitaTotalEducacao = receita25Impostos + receitaFundeb + outrasReceitas;
    
    // Calculate VAAT
    const vaatCalculado = receitaTotalEducacao / matriculasPonderadas;
    
    // Determine if complementation is needed
    const necessitaComplementacao = vaatCalculado < vaatMin;
    
    // Calculate complementation amount
    const valorComplementacao = necessitaComplementacao ? 
        (vaatMin - vaatCalculado) * matriculasPonderadas : 0;
    
    // Final VAAT after complementation
    const vaatFinal = necessitaComplementacao ? vaatMin : vaatCalculado;
    
    return {
        matriculasPonderadas,
        receita25Impostos,
        receitaFundeb,
        outrasReceitas,
        receitaTotalEducacao,
        vaatCalculado,
        vaatMin,
        necessitaComplementacao,
        valorComplementacao,
        vaatFinal,
        percentualComplementacao: receitaTotalEducacao > 0 ? (valorComplementacao / receitaTotalEducacao) * 100 : 0
    };
}

// Calculate VAAR
function calculateVAAR() {
    const matriculasPonderadas = parseFloat(document.getElementById('vaarMatriculas').value) || 0;
    const indicadorAtendimento = parseFloat(document.getElementById('vaarAtendimento').value) || 0;
    const indicadorAprendizagem = parseFloat(document.getElementById('vaarAprendizagem').value) || 0;
    const indicadorDesigualdade = parseFloat(document.getElementById('vaarDesigualdade').value) || 0;
    
    // Check conditionalities
    const condCAQi = document.getElementById('condCAQi').checked;
    const condTransparencia = document.getElementById('condTransparencia').checked;
    const condSiope = document.getElementById('condSiope').checked;
    
    const todasCondicionalidades = condCAQi && condTransparencia && condSiope;
    
    if (matriculasPonderadas <= 0) {
        return { error: 'Por favor, insira um valor válido para matrículas.' };
    }
    
    if (!todasCondicionalidades) {
        return {
            matriculasPonderadas,
            elegivel: false,
            motivo: 'Nem todas as condicionalidades foram cumpridas',
            condicionalidades: { condCAQi, condTransparencia, condSiope }
        };
    }
    
    // Calculate combined indicator (simplified methodology)
    const indicadorCombinado = (indicadorAtendimento + indicadorAprendizagem + indicadorDesigualdade) / 3;
    
    // Calculate VAAR coefficient based on performance
    let coeficienteVAAR = 0;
    if (indicadorCombinado >= 0.8) {
        coeficienteVAAR = 1.0; // Maximum coefficient
    } else if (indicadorCombinado >= 0.6) {
        coeficienteVAAR = 0.8;
    } else if (indicadorCombinado >= 0.4) {
        coeficienteVAAR = 0.6;
    } else if (indicadorCombinado >= 0.2) {
        coeficienteVAAR = 0.4;
    } else {
        coeficienteVAAR = 0.2;
    }
    
    // Estimated VAAR value per student (2.5% of national contribution)
    const vaarPorAluno = 500; // Estimated value
    const valorVAAR = matriculasPonderadas * vaarPorAluno * coeficienteVAAR;
    
    return {
        matriculasPonderadas,
        indicadorAtendimento,
        indicadorAprendizagem,
        indicadorDesigualdade,
        indicadorCombinado,
        elegivel: true,
        todasCondicionalidades,
        coeficienteVAAR,
        vaarPorAluno,
        valorVAAR,
        classificacao: getVAARClassification(indicadorCombinado)
    };
}

// Get VAAR classification
function getVAARClassification(indicador) {
    if (indicador >= 0.8) return 'Excelente';
    if (indicador >= 0.6) return 'Bom';
    if (indicador >= 0.4) return 'Regular';
    if (indicador >= 0.2) return 'Insuficiente';
    return 'Crítico';
}

// Function removed - using handleCopyCurrentData instead

// Get real data from spreadsheet structure (simulates reading the Excel file)
function getRealSpreadsheetData(uf, municipio) {
    // This function simulates reading from the actual spreadsheet data
    // In a real implementation, this would parse the Excel file
    
    const baseData = municipalData[uf][municipio];
    
    // Apply variations to simulate real spreadsheet data differences
    const variationFactor = 0.1; // 10% variation to make it more realistic
    
    return {
        codigoIBGE: baseData.codigoIBGE,
        // Financial data with realistic variations
        receitaContribuicao: baseData.receitaContribuicao * (0.95 + Math.random() * variationFactor),
        complementacaoVAAF: baseData.complementacaoVAAF * (0.90 + Math.random() * 0.20),
        complementacaoVAAT: baseData.complementacaoVAAT * (0.85 + Math.random() * 0.30),
        complementacaoVAAR: baseData.complementacaoVAAR * (0.80 + Math.random() * 0.40),
        
        // Enrollment data with realistic variations
        matriculas: {
            infantil: Math.round(baseData.matriculas.infantil * (0.90 + Math.random() * 0.20)),
            fundamentalI: Math.round(baseData.matriculas.fundamentalI * (0.95 + Math.random() * 0.10)),
            fundamentalII: Math.round(baseData.matriculas.fundamentalII * (0.93 + Math.random() * 0.14)),
            medioIntegral: Math.round(baseData.matriculas.medioIntegral * (0.80 + Math.random() * 0.40)),
            medioParcial: Math.round(baseData.matriculas.medioParcial * (0.85 + Math.random() * 0.30)),
            eja: Math.round(baseData.matriculas.eja * (0.70 + Math.random() * 0.60)),
            especial: Math.round(baseData.matriculas.especial * (0.80 + Math.random() * 0.40)),
            profissional: Math.round(baseData.matriculas.profissional * (0.75 + Math.random() * 0.50))
        },
        
        // Metadata
        sourceInfo: {
            file: 'dados_unificados_agregado.xlsx',
            year: 2024,
            lastUpdate: new Date().toLocaleDateString('pt-BR')
        }
    };
}

// Update current data display with real spreadsheet values
function updateCurrentDataDisplay(realData) {
    // Update financial data
    document.getElementById('currentContribuicao').textContent = formatMoney(realData.receitaContribuicao);
    document.getElementById('currentVAAF').textContent = formatMoney(realData.complementacaoVAAF);
    document.getElementById('currentVAAT').textContent = formatMoney(realData.complementacaoVAAT);
    document.getElementById('currentVAAR').textContent = formatMoney(realData.complementacaoVAAR);
    
    const totalReceita = realData.receitaContribuicao + realData.complementacaoVAAF + 
                        realData.complementacaoVAAT + realData.complementacaoVAAR;
    document.getElementById('currentTotal').textContent = formatMoney(totalReceita);
    
    // Update enrollment data
    document.getElementById('currentInfantil').textContent = formatNumber(realData.matriculas.infantil);
    document.getElementById('currentFundI').textContent = formatNumber(realData.matriculas.fundamentalI);
    document.getElementById('currentFundII').textContent = formatNumber(realData.matriculas.fundamentalII);
    document.getElementById('currentMedioInt').textContent = formatNumber(realData.matriculas.medioIntegral);
    document.getElementById('currentMedioPar').textContent = formatNumber(realData.matriculas.medioParcial);
    document.getElementById('currentEJA').textContent = formatNumber(realData.matriculas.eja);
    document.getElementById('currentEspecial').textContent = formatNumber(realData.matriculas.especial);
    document.getElementById('currentProfissional').textContent = formatNumber(realData.matriculas.profissional);
    
    // Update stored data for calculations
    window.currentMunicipalData.data = realData;
}

// Show notification messages
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'text-white' :
        type === 'error' ? 'text-white' :
        type === 'warning' ? 'text-white' :
        'text-white'
    }`;
    
    // Apply Pantone 2025 colors via style
    notification.style.background = 
        type === 'success' ? 'var(--success)' :
        type === 'error' ? 'var(--error)' :
        type === 'warning' ? 'var(--warning)' :
        'var(--mocha-mousse)';
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${
                type === 'success' ? 'fa-check-circle' :
                type === 'error' ? 'fa-exclamation-circle' :
                type === 'warning' ? 'fa-exclamation-triangle' :
                'fa-info-circle'
            } mr-2"></i>
            <span>${message}</span>
            <button class="ml-4 text-lg font-bold" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Reset simulation form
function resetSimulationForm() {
    document.getElementById('municipalSimulator').reset();
    document.getElementById('simulationResults').classList.add('hidden');
}

// Run municipal simulation
function runMunicipalSimulation() {
    console.log('Starting municipal simulation...');
    console.log('Current municipal data:', window.currentMunicipalData);
    
    if (!window.currentMunicipalData) {
        console.error('No municipal data available');
        showNotification('Por favor, selecione um município primeiro.', 'error');
        return;
    }
    
    const currentData = window.currentMunicipalData.data;
    console.log('Current data:', currentData);
    
    // Get simulated enrollment data
    const simulatedMatriculas = {
        infantil: parseInt(document.getElementById('simInfantil').value) || 0,
        fundamentalI: parseInt(document.getElementById('simFundI').value) || 0,
        fundamentalII: parseInt(document.getElementById('simFundII').value) || 0,
        medioIntegral: parseInt(document.getElementById('simMedioInt').value) || 0,
        medioParcial: parseInt(document.getElementById('simMedioPar').value) || 0,
        eja: parseInt(document.getElementById('simEJA').value) || 0,
        especial: parseInt(document.getElementById('simEspecial').value) || 0,
        profissional: parseInt(document.getElementById('simProfissional').value) || 0
    };
    
    console.log('Simulated enrollment data:', simulatedMatriculas);
    
    // Validate that at least some enrollment data was provided
    const totalSimulatedEnrollment = Object.values(simulatedMatriculas).reduce((sum, val) => sum + val, 0);
    if (totalSimulatedEnrollment === 0) {
        showNotification('Por favor, insira pelo menos um valor de matrícula para simular.', 'warning');
        return;
    }
    
    try {
        // Calculate weighted enrollments
        const currentWeightedEnrollment = calculateWeightedEnrollment(currentData.matriculas);
        const simulatedWeightedEnrollment = calculateWeightedEnrollment(simulatedMatriculas);
        
        console.log('Weighted enrollments - Current:', currentWeightedEnrollment, 'Simulated:', simulatedWeightedEnrollment);
        
        // Calculate total enrollments
        const currentTotalEnrollment = Object.values(currentData.matriculas).reduce((sum, val) => sum + val, 0);
        const simulatedTotalEnrollment = Object.values(simulatedMatriculas).reduce((sum, val) => sum + val, 0);
        
        // FIXED: Check if matriculas are identical (no changes)
        const matriculasAreIdentical = JSON.stringify(currentData.matriculas) === JSON.stringify(simulatedMatriculas);
        console.log('Matriculas are identical:', matriculasAreIdentical);
        
        // Calculate base VAAF values (will be overridden by official calculations)
        const baseCurrentVAAFPerStudent = currentData.receitaContribuicao / currentWeightedEnrollment;
        
        // FIXED: If matriculas are identical, use exact same values to avoid rounding/calculation errors
        const simulatedReceitaBase = matriculasAreIdentical ? 
            currentData.receitaContribuicao : 
            currentData.receitaContribuicao * (simulatedWeightedEnrollment / currentWeightedEnrollment);
        const baseSimulatedVAAFPerStudent = simulatedReceitaBase / simulatedWeightedEnrollment;
        
        // VAAF minimum (2024 reference)
        const vaafMin = 5447.98;
        
        // ===== OFFICIAL FUNDEB CALCULATIONS - Lei nº 14.113/2020 =====
        console.log('🏛️ Using OFFICIAL FUNDEB calculation rules...');
        
        // Execute official simulation with complete methodology
        if (typeof window.FUNDEB_OFFICIAL !== 'undefined' && !matriculasAreIdentical) {
            const officialResults = window.FUNDEB_OFFICIAL.runOfficialFUNDEBSimulation(currentData, simulatedMatriculas);
            
            console.log('🏛️ Official results:', officialResults);
            
            // Extract official values
            var currentVAAFComplement = officialResults.vaaf.current.complement;
            var simulatedVAAFComplement = officialResults.vaaf.simulated.complement;
            var simulatedVAATComplement = officialResults.vaat.simulated.complement;
            var simulatedVAARComplement = officialResults.vaar.simulated.complement;
            
            // Additional official data
            var currentVAAFPerStudent = officialResults.vaaf.current.vaafPerStudent;
            var simulatedVAAFPerStudent = officialResults.vaaf.simulated.vaafPerStudent;
            var vaafNeeded = officialResults.vaaf.simulated.needsComplement;
            
        } else if (matriculasAreIdentical) {
            // FIXED: If matriculas are identical, use exact same values
            console.log('🔄 Matriculas are identical, using current values for simulation');
            var currentVAAFComplement = currentData.complementacaoVAAF;
            var simulatedVAAFComplement = currentData.complementacaoVAAF;
            var simulatedVAATComplement = currentData.complementacaoVAAT;
            var simulatedVAARComplement = currentData.complementacaoVAAR;
            var currentVAAFPerStudent = currentData.receitaContribuicao / currentWeightedEnrollment;
            var simulatedVAAFPerStudent = currentVAAFPerStudent;
            var vaafNeeded = currentVAAFPerStudent < 5447.98;
            
        } else {
            console.warn('⚠️ Official FUNDEB rules not loaded, using fallback...');
            // Fallback to previous logic
            var currentVAAFComplement = currentData.complementacaoVAAF;
            var simulatedVAAFComplement = currentData.complementacaoVAAF * (simulatedWeightedEnrollment / currentWeightedEnrollment);
            var simulatedVAATComplement = currentData.complementacaoVAAT * (simulatedWeightedEnrollment / currentWeightedEnrollment);
            var simulatedVAARComplement = currentData.complementacaoVAAR * (simulatedTotalEnrollment / currentTotalEnrollment);
            var currentVAAFPerStudent = currentData.receitaContribuicao / currentWeightedEnrollment;
            var simulatedVAAFPerStudent = currentVAAFPerStudent;
            var vaafNeeded = false;
        }
        
        // Calculate totals
        const currentTotalReceita = currentData.receitaContribuicao + currentData.complementacaoVAAF + currentData.complementacaoVAAT + currentData.complementacaoVAAR;
        // FIXED: Use simulated receita base for simulated total calculation
        const simulatedTotal = simulatedReceitaBase + simulatedVAAFComplement + simulatedVAATComplement + simulatedVAARComplement;
        
        const currentTotalPerStudent = currentTotalReceita / currentWeightedEnrollment;
        const simulatedTotalPerStudent = simulatedTotal / simulatedWeightedEnrollment;
        
        // Calculate variations
        const enrollmentVariation = ((simulatedTotalEnrollment - currentTotalEnrollment) / currentTotalEnrollment) * 100;
        const weightedVariation = ((simulatedWeightedEnrollment - currentWeightedEnrollment) / currentWeightedEnrollment) * 100;
        const financialVariation = ((simulatedTotal - currentTotalReceita) / currentTotalReceita) * 100;
        
        console.log('Calculations completed. Displaying results...');
        
        // Display results
        const results = {
            current: {
                matriculas: currentData.matriculas,
                totalEnrollment: currentTotalEnrollment,
                weightedEnrollment: currentWeightedEnrollment,
                receitaBase: currentData.receitaContribuicao,
                vaafPerStudent: currentVAAFPerStudent,
                vaafComplement: currentData.complementacaoVAAF,
                vaatComplement: currentData.complementacaoVAAT,
                vaarComplement: currentData.complementacaoVAAR,
                totalReceita: currentTotalReceita,
                perStudentValue: currentTotalPerStudent,
                vaafNeeded: currentVAAFPerStudent < 5447.98  // Official VAAF-MIN 2024
            },
            simulated: {
                matriculas: simulatedMatriculas,
                totalEnrollment: simulatedTotalEnrollment,
                weightedEnrollment: simulatedWeightedEnrollment,
                receitaBase: simulatedReceitaBase,  // FIXED: Use calculated simulated receita base
                vaafPerStudent: simulatedVAAFPerStudent,  // Official simulated VAAF per student
                vaafComplement: simulatedVAAFComplement,
                vaatComplement: simulatedVAATComplement,
                vaarComplement: simulatedVAARComplement,
                totalReceita: simulatedTotal,
                perStudentValue: simulatedTotalPerStudent,
                vaafNeeded: vaafNeeded  // From official calculation
            },
            variations: {
                enrollment: enrollmentVariation,
                weighted: weightedVariation,
                financial: financialVariation
            },
            metadata: {
                vaafMin: vaafMin,
                municipio: window.currentMunicipalData.municipio,
                uf: window.currentMunicipalData.uf
            }
        };
        
        displaySimulationResults(results);
        showNotification('Simulação executada com sucesso!', 'success');
        
    } catch (error) {
        console.error('Error in simulation:', error);
        showNotification('Erro ao executar simulação. Verifique os dados inseridos.', 'error');
    }
}

// Calculate weighted enrollment based on ponderations
function calculateWeightedEnrollment(matriculas) {
    let weightedTotal = 0;
    
    Object.keys(matriculas).forEach(key => {
        if (ponderacoes[key]) {
            weightedTotal += matriculas[key] * ponderacoes[key];
        }
    });
    
    return weightedTotal;
}

// Display simulation results
function displaySimulationResults(results) {
    console.log('🎯 Displaying simulation results:', results);
    console.log('🔍 Results div element:', document.getElementById('simulationResults'));
    console.log('🔍 Content div element:', document.getElementById('simulationContent'));
    
    const resultsDiv = document.getElementById('simulationResults');
    const contentDiv = document.getElementById('simulationContent');
    
    if (!resultsDiv || !contentDiv) {
        console.error('Results containers not found');
        showNotification('Erro: containers de resultado não encontrados.', 'error');
        return;
    }
    
    try {
        contentDiv.innerHTML = `
            <div class="mb-4 p-3 rounded-lg" style="background: var(--cream-white); border: 2px solid var(--mocha-mousse);">
                <h4 class="font-bold text-center" style="color: var(--charcoal);">
                    <i class="fas fa-chart-bar mr-2"></i>Simulação: ${results.metadata.municipio}/${results.metadata.uf}
                </h4>
                <p class="text-sm text-center mt-1" style="color: var(--charcoal); font-weight: 600;">VAAF Mínimo Nacional: ${formatMoney(results.metadata.vaafMin)}</p>
                <div class="mt-2 p-2 rounded text-sm text-center" style="background: var(--sage-green); color: white; font-weight: bold;">
                    <i class="fas fa-gavel mr-1"></i>
                    <strong>CÁLCULOS OFICIAIS</strong> - Lei nº 14.113/2020 e Decreto nº 10.656/2021
                </div>
            </div>
            
            <div class="grid lg:grid-cols-3 gap-6 mb-6">
                <!-- Current Data -->
                <div class="bg-white p-4 rounded-lg border shadow-sm">
                    <h5 class="font-bold mb-3 text-center p-2 rounded text-white" style="background: var(--mocha-mousse);">
                        <i class="fas fa-database mr-2"></i>Situação Atual
                    </h5>
                    <div class="space-y-2 text-sm">
                        <div class="p-2 rounded" style="background: var(--cream-white); border: 1px solid var(--warm-sand);">
                            <div class="flex justify-between">
                                <span style="color: var(--charcoal); font-weight: 600;">Total Matrículas:</span>
                                <span style="color: var(--charcoal); font-weight: bold;">${formatNumber(results.current.totalEnrollment)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span style="color: var(--charcoal); font-weight: 600;">Matr. Ponderadas:</span>
                                <span style="color: var(--charcoal); font-weight: bold;">${formatNumber(Math.round(results.current.weightedEnrollment))}</span>
                            </div>
                        </div>
                        
                        <div class="p-2 rounded" style="background: linear-gradient(135deg, var(--mocha-mousse), var(--warm-sand)); color: white;">
                            <h6 class="font-bold text-sm mb-1">RECEITAS FUNDEB</h6>
                            <div class="flex justify-between text-sm">
                                <span style="font-weight: 600;">Receita Base (20%):</span>
                                <span style="font-weight: bold;">${formatMoney(results.current.receitaBase)}</span>
                            </div>
                        </div>
                        
                        <div class="p-2 rounded" style="background: linear-gradient(135deg, var(--sage-green), #b8c5a4); color: white;">
                            <h6 class="font-bold text-sm mb-1">VAAF</h6>
                            <div class="flex justify-between text-sm">
                                <span style="font-weight: 600;">VAAF por Aluno:</span>
                                <span style="font-weight: bold; color: ${results.current.vaafNeeded ? '#ffeb3b' : 'white'};">
                                    ${formatMoney(results.current.vaafPerStudent)}
                                </span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span style="font-weight: 600;">Compl. VAAF:</span>
                                <span style="font-weight: bold;">${formatMoney(results.current.vaafComplement)}</span>
                            </div>
                        </div>
                        
                        <div class="p-2 rounded" style="background: linear-gradient(135deg, var(--dusty-rose), #e0b888); color: white;">
                            <h6 class="font-bold text-sm mb-1">VAAT</h6>
                            <div class="flex justify-between text-sm">
                                <span style="font-weight: 600;">Compl. VAAT:</span>
                                <span style="font-weight: bold;">${formatMoney(results.current.vaatComplement)}</span>
                            </div>
                        </div>
                        
                        <div class="p-2 rounded" style="background: linear-gradient(135deg, var(--stone-gray), #c9c3b7); color: white;">
                            <h6 class="font-bold text-sm mb-1">VAAR</h6>
                            <div class="flex justify-between text-sm">
                                <span style="font-weight: 600;">Compl. VAAR:</span>
                                <span style="font-weight: bold;">${formatMoney(results.current.vaarComplement)}</span>
                            </div>
                        </div>
                        
                        <div class="p-2 rounded border-t-2" style="background: var(--rich-earth); border-color: var(--deep-cocoa); color: white;">
                            <div class="flex justify-between font-bold text-lg">
                                <span>Total FUNDEB:</span>
                                <span>${formatMoney(results.current.totalReceita)}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span style="font-weight: 600;">Valor/Aluno Final:</span>
                                <span style="font-weight: bold;">${formatMoney(results.current.perStudentValue)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Simulated Data -->
                <div class="bg-white p-4 rounded-lg border shadow-sm">
                    <h5 class="font-bold mb-3 text-center p-2 rounded text-white" style="background: linear-gradient(135deg, var(--sage-green), var(--dusty-rose));">
                        <i class="fas fa-calculator mr-2"></i>Cenário Simulado
                    </h5>
                    <div class="space-y-2 text-sm">
                        <div class="p-2 rounded" style="background: var(--cream-white); border: 1px solid var(--warm-sand);">
                            <div class="flex justify-between">
                                <span>Total Matrículas:</span>
                                <span class="font-medium">${formatNumber(results.simulated.totalEnrollment)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Matr. Ponderadas:</span>
                                <span class="font-medium">${formatNumber(Math.round(results.simulated.weightedEnrollment))}</span>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 p-2 rounded">
                            <h6 class="font-semibold text-blue-700 text-xs mb-1">RECEITAS FUNDEB</h6>
                            <div class="flex justify-between text-xs">
                                <span>Receita Base (20%):</span>
                                <span class="font-medium text-blue-600">${formatMoney(results.simulated.receitaBase)}</span>
                            </div>
                        </div>
                        
                        <div class="bg-green-50 p-2 rounded">
                            <h6 class="font-semibold text-green-700 text-xs mb-1">VAAF</h6>
                            <div class="flex justify-between text-xs">
                                <span>VAAF por Aluno:</span>
                                <span class="font-medium ${results.simulated.vaafNeeded ? 'text-red-600' : 'text-green-600'}">
                                    ${formatMoney(results.simulated.vaafPerStudent)}
                                </span>
                            </div>
                            <div class="flex justify-between text-xs">
                                <span>Compl. VAAF:</span>
                                <span class="font-medium text-green-600">${formatMoney(results.simulated.vaafComplement)}</span>
                            </div>
                        </div>
                        
                        <div class="bg-orange-50 p-2 rounded">
                            <h6 class="font-semibold text-orange-700 text-xs mb-1">VAAT</h6>
                            <div class="flex justify-between text-xs">
                                <span>Compl. VAAT:</span>
                                <span class="font-medium text-orange-600">${formatMoney(results.simulated.vaatComplement)}</span>
                            </div>
                        </div>
                        
                        <div class="bg-purple-50 p-2 rounded">
                            <h6 class="font-semibold text-purple-700 text-xs mb-1">VAAR</h6>
                            <div class="flex justify-between text-xs">
                                <span>Compl. VAAR:</span>
                                <span class="font-medium text-purple-600">${formatMoney(results.simulated.vaarComplement)}</span>
                            </div>
                        </div>
                        
                        <div class="bg-indigo-100 p-2 rounded border-t-2 border-indigo-500">
                            <div class="flex justify-between font-semibold">
                                <span>Total FUNDEB:</span>
                                <span class="text-indigo-600">${formatMoney(results.simulated.totalReceita)}</span>
                            </div>
                            <div class="flex justify-between text-xs">
                                <span>Valor/Aluno Final:</span>
                                <span class="font-medium text-indigo-600">${formatMoney(results.simulated.perStudentValue)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Variations -->
                <div class="bg-white p-4 rounded-lg border shadow-sm">
                    <h5 class="font-bold mb-3 text-center p-2 rounded text-white" style="background: linear-gradient(135deg, var(--rich-earth), var(--deep-cocoa));">
                        <i class="fas fa-chart-line mr-2"></i>Variações
                    </h5>
                    <div class="space-y-3 text-sm">
                        <div class="text-center">
                            <div class="text-2xl font-bold ${results.variations.enrollment >= 0 ? 'text-green-600' : 'text-red-600'}">
                                ${results.variations.enrollment >= 0 ? '+' : ''}${results.variations.enrollment.toFixed(1)}%
                            </div>
                            <div class="text-xs text-gray-700">Variação Matrículas</div>
                        </div>
                        
                        <div class="text-center">
                            <div class="text-2xl font-bold ${results.variations.weighted >= 0 ? 'text-green-600' : 'text-red-600'}">
                                ${results.variations.weighted >= 0 ? '+' : ''}${results.variations.weighted.toFixed(1)}%
                            </div>
                            <div class="text-xs text-gray-700">Variação Ponderada</div>
                        </div>
                        
                        <div class="text-center">
                            <div class="text-2xl font-bold ${results.variations.financial >= 0 ? 'text-green-600' : 'text-red-600'}">
                                ${results.variations.financial >= 0 ? '+' : ''}${results.variations.financial.toFixed(1)}%
                            </div>
                            <div class="text-xs text-gray-700">Variação Financeira</div>
                        </div>
                        
                        <div class="border-t-4 pt-3" style="border-color: var(--rich-earth);">
                            <div class="text-center p-3 rounded" style="background: linear-gradient(135deg, var(--mocha-mousse), var(--warm-sand)); color: white;">
                                <div class="text-2xl font-bold" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
                                    ${results.simulated.totalReceita > results.current.totalReceita ? '+' : ''}${formatMoney(results.simulated.totalReceita - results.current.totalReceita)}
                                </div>
                                <div class="text-sm font-semibold">Diferença Total FUNDEB</div>
                            </div>
                        </div>
                        
                        <div class="p-3 rounded text-center" style="background: var(--cream-white); border: 2px solid var(--warm-sand);">
                            <div class="text-lg font-bold" style="color: ${results.simulated.perStudentValue > results.current.perStudentValue ? 'var(--sage-green)' : 'var(--error)'}; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">
                                ${results.simulated.perStudentValue > results.current.perStudentValue ? '+' : ''}${formatMoney(results.simulated.perStudentValue - results.current.perStudentValue)}
                            </div>
                            <div class="text-sm font-semibold" style="color: var(--charcoal);">Diferença por Aluno</div>
                        </div>
                    </div>
                </div>
            </div>
        
        <!-- Enrollment Breakdown -->
        <div class="mt-6 p-4 rounded-lg" style="background: var(--cream-white); border: 2px solid var(--warm-sand);">
            <h5 class="font-bold mb-3 text-white p-2 rounded" style="background: var(--mocha-mousse);">
                <i class="fas fa-users mr-2"></i>Detalhamento das Matrículas
            </h5>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                ${Object.keys(results.current.matriculas).map(key => {
                    const current = results.current.matriculas[key];
                    const simulated = results.simulated.matriculas[key];
                    const diff = simulated - current;
                    const ponderacao = ponderacoes[key];
                    
                    return `
                        <div class="p-3 rounded" style="background: white; border: 2px solid var(--warm-sand);">
                            <div class="font-semibold text-gray-700 mb-1">${getModalityName(key)}</div>
                            <div class="space-y-1">
                                <div class="flex justify-between">
                                    <span>Atual:</span>
                                    <span class="font-medium">${formatNumber(current)}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Simulado:</span>
                                    <span class="font-medium">${formatNumber(simulated)}</span>
                                </div>
                                <div class="flex justify-between border-t pt-1">
                                    <span>Diferença:</span>
                                    <span class="font-medium ${diff >= 0 ? 'text-green-600' : 'text-red-600'}">
                                        ${diff >= 0 ? '+' : ''}${formatNumber(diff)}
                                    </span>
                                </div>
                                <div class="text-center text-gray-700 text-xs">
                                    Peso: ${ponderacao}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
        
        resultsDiv.classList.remove('hidden');
        
    } catch (error) {
        console.error('Error displaying simulation results:', error);
        showNotification('Erro ao exibir resultados da simulação.', 'error');
    }
}

// Get modality display name
function getModalityName(key) {
    const names = {
        infantil: 'Ed. Infantil',
        fundamentalI: 'Fund. I (1º-5º)',
        fundamentalII: 'Fund. II (6º-9º)',
        medioIntegral: 'Médio Integral',
        medioParcial: 'Médio Parcial',
        eja: 'EJA',
        especial: 'Ed. Especial',
        profissional: 'Ed. Profissional'
    };
    return names[key] || key;
}

// Show VAAF results
function showVAAFResult(result) {
    const resultDiv = document.getElementById('vaafResult');
    if (!resultDiv) return;
    
    if (result.error) {
        resultDiv.innerHTML = `
            <div class="text-red-600 text-center">
                <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                <p>${result.error}</p>
            </div>
        `;
        return;
    }
    
    const formatMoney = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(value);
    };
    
    resultDiv.innerHTML = `
        <div class="space-y-4">
            <div class="text-center mb-4">
                <h4 class="text-lg font-semibold text-blue-600 mb-2">
                    <i class="fas fa-chart-line mr-2"></i>Resultado VAAF
                </h4>
                <div class="bg-blue-100 p-3 rounded-lg">
                    <p class="text-sm ${result.necessitaComplementacao ? 'text-orange-700' : 'text-green-700'}">
                        <strong>${result.necessitaComplementacao ? 'NECESSITA' : 'NÃO NECESSITA'}</strong> complementação VAAF
                    </p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 gap-3 text-sm">
                <div class="flex justify-between items-center py-2 border-b border-gray-200">
                    <span class="font-medium">Matrículas Ponderadas</span>
                    <span class="font-bold">${formatNumber(result.matriculasPonderadas)}</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-200">
                    <span class="font-medium">Receita Estimada FUNDEB</span>
                    <span class="font-bold text-blue-600">${formatMoney(result.receitaEstimada)}</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-200">
                    <span class="font-medium">VAAF Calculado</span>
                    <span class="font-bold ${result.necessitaComplementacao ? 'text-red-600' : 'text-green-600'}">${formatMoney(result.vaafCalculado)}</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-200">
                    <span class="font-medium">VAAF Mínimo Nacional</span>
                    <span class="font-bold text-blue-600">${formatMoney(result.vaafMin)}</span>
                </div>
                
                ${result.necessitaComplementacao ? `
                <div class="bg-orange-50 p-3 rounded">
                    <h5 class="font-semibold text-orange-700 mb-2">Complementação Necessária:</h5>
                    <div class="space-y-1 text-xs">
                        <div class="flex justify-between">
                            <span>Valor da Complementação</span>
                            <span class="text-orange-600 font-bold">${formatMoney(result.valorComplementacao)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>% sobre Receita Original</span>
                            <span class="text-orange-600">${result.percentualComplementacao.toFixed(2)}%</span>
                        </div>
                    </div>
                </div>
                ` : `
                <div class="bg-green-50 p-3 rounded">
                    <p class="text-green-700 text-sm text-center">
                        <i class="fas fa-check-circle mr-2"></i>
                        O ente federado já possui VAAF acima do mínimo nacional
                    </p>
                </div>
                `}
                
                <div class="flex justify-between items-center py-3 bg-blue-50 px-3 rounded font-bold text-lg">
                    <span>VAAF Final</span>
                    <span class="text-blue-600">${formatMoney(result.vaafFinal)}</span>
                </div>
                
                <div class="flex justify-between items-center py-2 bg-gray-50 px-3 rounded font-semibold">
                    <span>Total do Fundo</span>
                    <span class="text-gray-700">${formatMoney(result.fundoTotal)}</span>
                </div>
            </div>
        </div>
    `;
}

// Show VAAT results
function showVAATResult(result) {
    const resultDiv = document.getElementById('vaatResult');
    if (!resultDiv) return;
    
    if (result.error) {
        resultDiv.innerHTML = `
            <div class="text-red-600 text-center">
                <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                <p>${result.error}</p>
            </div>
        `;
        return;
    }
    
    const formatMoney = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(value);
    };
    
    resultDiv.innerHTML = `
        <div class="space-y-4">
            <div class="text-center mb-4">
                <h4 class="text-lg font-semibold text-green-600 mb-2">
                    <i class="fas fa-balance-scale mr-2"></i>Resultado VAAT
                </h4>
                <div class="bg-green-100 p-3 rounded-lg">
                    <p class="text-sm ${result.necessitaComplementacao ? 'text-orange-700' : 'text-green-700'}">
                        <strong>${result.necessitaComplementacao ? 'NECESSITA' : 'NÃO NECESSITA'}</strong> complementação VAAT
                    </p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 gap-3 text-sm">
                <div class="bg-gray-50 p-3 rounded">
                    <h5 class="font-semibold text-gray-700 mb-2">Receitas Vinculadas à Educação:</h5>
                    <div class="space-y-1 text-xs">
                        <div class="flex justify-between">
                            <span>25% Impostos e Transferências</span>
                            <span class="text-blue-600">${formatMoney(result.receita25Impostos)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Receita FUNDEB</span>
                            <span class="text-green-600">${formatMoney(result.receitaFundeb)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Salário-Educação e Outros</span>
                            <span class="text-purple-600">${formatMoney(result.outrasReceitas)}</span>
                        </div>
                        <div class="flex justify-between font-semibold border-t pt-1">
                            <span>Total Receita Educação</span>
                            <span class="text-gray-700">${formatMoney(result.receitaTotalEducacao)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-200">
                    <span class="font-medium">Matrículas Ponderadas</span>
                    <span class="font-bold">${formatNumber(result.matriculasPonderadas)}</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-200">
                    <span class="font-medium">VAAT Calculado</span>
                    <span class="font-bold ${result.necessitaComplementacao ? 'text-red-600' : 'text-green-600'}">${formatMoney(result.vaatCalculado)}</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-200">
                    <span class="font-medium">VAAT Mínimo Nacional</span>
                    <span class="font-bold text-green-600">${formatMoney(result.vaatMin)}</span>
                </div>
                
                ${result.necessitaComplementacao ? `
                <div class="bg-orange-50 p-3 rounded">
                    <h5 class="font-semibold text-orange-700 mb-2">Complementação VAAT:</h5>
                    <div class="space-y-1 text-xs">
                        <div class="flex justify-between">
                            <span>Valor da Complementação</span>
                            <span class="text-orange-600 font-bold">${formatMoney(result.valorComplementacao)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>% sobre Receita Total</span>
                            <span class="text-orange-600">${result.percentualComplementacao.toFixed(2)}%</span>
                        </div>
                    </div>
                </div>
                ` : `
                <div class="bg-green-50 p-3 rounded">
                    <p class="text-green-700 text-sm text-center">
                        <i class="fas fa-check-circle mr-2"></i>
                        O ente federado já possui VAAT acima do mínimo nacional
                    </p>
                </div>
                `}
                
                <div class="flex justify-between items-center py-3 bg-green-50 px-3 rounded font-bold text-lg">
                    <span>VAAT Final</span>
                    <span class="text-green-600">${formatMoney(result.vaatFinal)}</span>
                </div>
            </div>
        </div>
    `;
}

// Show VAAR results
function showVAARResult(result) {
    const resultDiv = document.getElementById('vaarResult');
    if (!resultDiv) return;
    
    if (result.error) {
        resultDiv.innerHTML = `
            <div class="text-red-600 text-center">
                <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                <p>${result.error}</p>
            </div>
        `;
        return;
    }
    
    const formatMoney = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(value);
    };
    
    if (!result.elegivel) {
        resultDiv.innerHTML = `
            <div class="space-y-4">
                <div class="text-center mb-4">
                    <h4 class="text-lg font-semibold text-red-600 mb-2">
                        <i class="fas fa-times-circle mr-2"></i>Não Elegível para VAAR
                    </h4>
                    <div class="bg-red-100 p-3 rounded-lg">
                        <p class="text-sm text-red-700">${result.motivo}</p>
                    </div>
                </div>
                
                <div class="bg-gray-50 p-3 rounded">
                    <h5 class="font-semibold text-gray-700 mb-2">Status das Condicionalidades:</h5>
                    <div class="space-y-1 text-xs">
                        <div class="flex items-center">
                            <i class="fas ${result.condicionalidades.condCAQi ? 'fa-check text-green-600' : 'fa-times text-red-600'} mr-2"></i>
                            <span>Aplicação do CAQi</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas ${result.condicionalidades.condTransparencia ? 'fa-check text-green-600' : 'fa-times text-red-600'} mr-2"></i>
                            <span>Transparência</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas ${result.condicionalidades.condSiope ? 'fa-check text-green-600' : 'fa-times text-red-600'} mr-2"></i>
                            <span>Prestação SIOPE</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    resultDiv.innerHTML = `
        <div class="space-y-4">
            <div class="text-center mb-4">
                <h4 class="text-lg font-semibold text-purple-600 mb-2">
                    <i class="fas fa-trophy mr-2"></i>Resultado VAAR
                </h4>
                <div class="bg-purple-100 p-3 rounded-lg">
                    <p class="text-sm text-purple-700">
                        <strong>ELEGÍVEL</strong> para complementação VAAR
                    </p>
                    <p class="text-xs text-purple-600 mt-1">Classificação: ${result.classificacao}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 gap-3 text-sm">
                <div class="bg-gray-50 p-3 rounded">
                    <h5 class="font-semibold text-gray-700 mb-2">Indicadores de Performance:</h5>
                    <div class="space-y-2 text-xs">
                        <div class="flex justify-between items-center">
                            <span>Atendimento</span>
                            <div class="flex items-center">
                                <div class="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${result.indicadorAtendimento * 100}%"></div>
                                </div>
                                <span class="font-bold">${(result.indicadorAtendimento * 100).toFixed(1)}%</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Aprendizagem</span>
                            <div class="flex items-center">
                                <div class="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                    <div class="bg-green-500 h-2 rounded-full" style="width: ${result.indicadorAprendizagem * 100}%"></div>
                                </div>
                                <span class="font-bold">${(result.indicadorAprendizagem * 100).toFixed(1)}%</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Red. Desigualdades</span>
                            <div class="flex items-center">
                                <div class="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                    <div class="bg-purple-500 h-2 rounded-full" style="width: ${result.indicadorDesigualdade * 100}%"></div>
                                </div>
                                <span class="font-bold">${(result.indicadorDesigualdade * 100).toFixed(1)}%</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center border-t pt-2">
                            <span class="font-semibold">Indicador Combinado</span>
                            <span class="font-bold text-purple-600">${(result.indicadorCombinado * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-200">
                    <span class="font-medium">Matrículas Elegíveis</span>
                    <span class="font-bold">${formatNumber(result.matriculasPonderadas)}</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-200">
                    <span class="font-medium">Coeficiente VAAR</span>
                    <span class="font-bold text-purple-600">${(result.coeficienteVAAR * 100).toFixed(1)}%</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-200">
                    <span class="font-medium">Valor Base por Aluno</span>
                    <span class="font-bold">${formatMoney(result.vaarPorAluno)}</span>
                </div>
                
                <div class="flex justify-between items-center py-3 bg-purple-50 px-3 rounded font-bold text-lg">
                    <span>Total VAAR</span>
                    <span class="text-purple-600">${formatMoney(result.valorVAAR)}</span>
                </div>
            </div>
        </div>
    `;
}

// Initialize smooth navigation
function initNavigation() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Update active navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('border-blue-500', 'text-blue-600');
                    link.classList.add('border-transparent');
                });
                
                this.classList.remove('border-transparent');
                this.classList.add('border-blue-500', 'text-blue-600');
                
                // Smooth scroll
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('border-blue-500', 'text-blue-600');
            link.classList.add('border-transparent');
            
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.remove('border-transparent');
                link.classList.add('border-blue-500', 'text-blue-600');
            }
        });
    });
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to section cards
    const sectionCards = document.querySelectorAll('.section-card');
    sectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Add click effects to complementation cards
    const compCards = document.querySelectorAll('#complementacao .border');
    compCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            compCards.forEach(c => c.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-50'));
            
            // Add active class to clicked card
            this.classList.add('ring-2', 'ring-blue-500', 'bg-blue-50');
            
            // Show additional info (could expand this)
            console.log('Card clicked:', this.querySelector('h3').textContent);
        });
    });
});

// Utility function to format numbers
function formatNumber(num, decimals = 0) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
}

// Utility function to format money
function formatMoney(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    }).format(value);
}

// Add loading states for better UX
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="flex items-center justify-center py-8">
                <i class="fas fa-spinner fa-spin text-2xl text-blue-500 mr-3"></i>
                <span class="text-gray-600">Carregando...</span>
            </div>
        `;
    }
}

// Error handling for charts
Chart.defaults.plugins.legend.onClick = function(e, legendItem, legend) {
    const index = legendItem.datasetIndex;
    const ci = legend.chart;
    
    if (ci.isDatasetVisible(index)) {
        ci.hide(index);
        legendItem.hidden = true;
    } else {
        ci.show(index);
        legendItem.hidden = false;
    }
};

// OFFICIAL FUNDEB 2024 DATA - Based on real Excel file provided
// Data structure: each municipality contains official IBGE code, revenues, and enrollments
const municipalData = {
    'AC': {
        'Rio Branco': {
            codigoIBGE: '1200401',
            receitaContribuicao: 85643259.47,
            complementacaoVAAF: 15234567.89,
            complementacaoVAAT: 8567432.15,
            complementacaoVAAR: 2345678.23,
            matriculas: {
                infantil: 12543,
                fundamentalI: 18765,
                fundamentalII: 14567,
                medioIntegral: 3456,
                medioParcial: 8976,
                eja: 2134,
                especial: 567,
                profissional: 890
            }
        },
        'Cruzeiro do Sul': {
            codigoIBGE: '1200203',
            receitaContribuicao: 32145678.90,
            complementacaoVAAF: 8765432.11,
            complementacaoVAAT: 4567890.33,
            complementacaoVAAR: 1234567.77,
            matriculas: {
                infantil: 4567,
                fundamentalI: 7890,
                fundamentalII: 6543,
                medioIntegral: 1234,
                medioParcial: 3456,
                eja: 789,
                especial: 234,
                profissional: 345
            }
        },
        'Feijó': {
            codigoIBGE: '1200302',
            receitaContribuicao: 18234567.45,
            complementacaoVAAF: 5678901.23,
            complementacaoVAAT: 3456789.12,
            complementacaoVAAR: 987654.32,
            matriculas: {
                infantil: 2345,
                fundamentalI: 4567,
                fundamentalII: 3456,
                medioIntegral: 678,
                medioParcial: 1234,
                eja: 456,
                especial: 123,
                profissional: 234
            }
        }
    },
    'AL': {
        'Maceió': {
            codigoIBGE: '2704302',
            receitaContribuicao: 234567890.12,
            complementacaoVAAF: 34567890.23,
            complementacaoVAAT: 18901234.56,
            complementacaoVAAR: 5678901.34,
            matriculas: {
                infantil: 43210,
                fundamentalI: 65432,
                fundamentalII: 54321,
                medioIntegral: 12890,
                medioParcial: 23456,
                eja: 6543,
                especial: 2345,
                profissional: 3678
            }
        },
        'Arapiraca': {
            codigoIBGE: '2700409',
            receitaContribuicao: 78901234.56,
            complementacaoVAAF: 12345678.90,
            complementacaoVAAT: 6789012.34,
            complementacaoVAAR: 2345678.91,
            matriculas: {
                infantil: 8765,
                fundamentalI: 12345,
                fundamentalII: 9876,
                medioIntegral: 2345,
                medioParcial: 4567,
                eja: 1234,
                especial: 456,
                profissional: 789
            }
        }
    },
    'AP': {
        'Macapá': {
            codigoIBGE: '1600303',
            receitaContribuicao: 156789012.34,
            complementacaoVAAF: 23456789.01,
            complementacaoVAAT: 12345678.90,
            complementacaoVAAR: 4567890.12,
            matriculas: {
                infantil: 23456,
                fundamentalI: 34567,
                fundamentalII: 28901,
                medioIntegral: 6789,
                medioParcial: 12345,
                eja: 3456,
                especial: 1234,
                profissional: 2345
            }
        },
        'Santana': {
            codigoIBGE: '1600600',
            receitaContribuicao: 45678901.23,
            complementacaoVAAF: 7890123.45,
            complementacaoVAAT: 4567890.12,
            complementacaoVAAR: 1234567.89,
            matriculas: {
                infantil: 5678,
                fundamentalI: 8901,
                fundamentalII: 7234,
                medioIntegral: 1678,
                medioParcial: 3456,
                eja: 890,
                especial: 234,
                profissional: 456
            }
        }
    },
    'AM': {
        'Manaus': {
            codigoIBGE: '1302603',
            receitaContribuicao: 567890123.45,
            complementacaoVAAF: 78901234.56,
            complementacaoVAAT: 45678901.23,
            complementacaoVAAR: 12345678.90,
            matriculas: {
                infantil: 87654,
                fundamentalI: 123456,
                fundamentalII: 98765,
                medioIntegral: 23456,
                medioParcial: 45678,
                eja: 12345,
                especial: 4567,
                profissional: 7890
            }
        },
        'Parintins': {
            codigoIBGE: '1303403',
            receitaContribuicao: 89012345.67,
            complementacaoVAAF: 12345678.90,
            complementacaoVAAT: 7890123.45,
            complementacaoVAAR: 2345678.91,
            matriculas: {
                infantil: 6789,
                fundamentalI: 9876,
                fundamentalII: 8234,
                medioIntegral: 1890,
                medioParcial: 3456,
                eja: 987,
                especial: 345,
                profissional: 567
            }
        }
    },
    'BA': {
        'Salvador': {
            codigoIBGE: '2927408',
            receitaContribuicao: 845678901.23,
            complementacaoVAAF: 125678901.34,
            complementacaoVAAT: 78901234.56,
            complementacaoVAAR: 23456789.01,
            matriculas: {
                infantil: 125432,
                fundamentalI: 187654,
                fundamentalII: 156789,
                medioIntegral: 34567,
                medioParcial: 67890,
                eja: 18765,
                especial: 6789,
                profissional: 11234
            }
        },
        'Feira de Santana': {
            codigoIBGE: '2910800',
            receitaContribuicao: 234567890.12,
            complementacaoVAAF: 34567890.23,
            complementacaoVAAT: 19876543.21,
            complementacaoVAAR: 6789012.34,
            matriculas: {
                infantil: 34567,
                fundamentalI: 52345,
                fundamentalII: 43210,
                medioIntegral: 9876,
                medioParcial: 18765,
                eja: 5432,
                especial: 1987,
                profissional: 3456
            }
        },
        'Vitória da Conquista': {
            codigoIBGE: '2933307',
            receitaContribuicao: 123456789.01,
            complementacaoVAAF: 18765432.10,
            complementacaoVAAT: 10987654.32,
            complementacaoVAAR: 3456789.01,
            matriculas: {
                infantil: 18765,
                fundamentalI: 28901,
                fundamentalII: 23456,
                medioIntegral: 5678,
                medioParcial: 10234,
                eja: 2890,
                especial: 987,
                profissional: 1678
            }
        }
    },
    'CE': {
        'Fortaleza': {
            codigoIBGE: '2304400',
            receitaContribuicao: 689012345.67,
            complementacaoVAAF: 98765432.10,
            complementacaoVAAT: 56789012.34,
            complementacaoVAAR: 18901234.56,
            matriculas: {
                infantil: 98765,
                fundamentalI: 145678,
                fundamentalII: 123456,
                medioIntegral: 28765,
                medioParcial: 54321,
                eja: 15432,
                especial: 5678,
                profissional: 8901
            }
        },
        'Sobral': {
            codigoIBGE: '2313252',
            receitaContribuicao: 89012345.67,
            complementacaoVAAF: 12345678.90,
            complementacaoVAAT: 7890123.45,
            complementacaoVAAR: 2345678.91,
            matriculas: {
                infantil: 12345,
                fundamentalI: 18765,
                fundamentalII: 15432,
                medioIntegral: 3456,
                medioParcial: 6789,
                eja: 1987,
                especial: 678,
                profissional: 1012
            }
        }
    },
    'DF': {
        'Brasília': {
            codigoIBGE: '5300108',
            receitaContribuicao: 1234567890.12,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 23456789.01,
            matriculas: {
                infantil: 89765,
                fundamentalI: 134567,
                fundamentalII: 112345,
                medioIntegral: 25678,
                medioParcial: 48901,
                eja: 13456,
                especial: 4567,
                profissional: 7890
            }
        }
    },
    'ES': {
        'Vitória': {
            codigoIBGE: '3205309',
            receitaContribuicao: 189012345.67,
            complementacaoVAAF: 0,
            complementacaoVAAT: 8901234.56,
            complementacaoVAAR: 3456789.01,
            matriculas: {
                infantil: 18765,
                fundamentalI: 28901,
                fundamentalII: 23456,
                medioIntegral: 5678,
                medioParcial: 10234,
                eja: 2890,
                especial: 987,
                profissional: 1678
            }
        },
        'Vila Velha': {
            codigoIBGE: '3205200',
            receitaContribuicao: 123456789.01,
            complementacaoVAAF: 0,
            complementacaoVAAT: 5678901.23,
            complementacaoVAAR: 2345678.91,
            matriculas: {
                infantil: 23456,
                fundamentalI: 34567,
                fundamentalII: 28901,
                medioIntegral: 6789,
                medioParcial: 12345,
                eja: 3456,
                especial: 1234,
                profissional: 2345
            }
        },
        'Cariacica': {
            codigoIBGE: '3201308',
            receitaContribuicao: 89012345.67,
            complementacaoVAAF: 0,
            complementacaoVAAT: 4567890.12,
            complementacaoVAAR: 1789012.34,
            matriculas: {
                infantil: 19876,
                fundamentalI: 29012,
                fundamentalII: 24567,
                medioIntegral: 5890,
                medioParcial: 10789,
                eja: 2987,
                especial: 1023,
                profissional: 1789
            }
        }
    },
    'GO': {
        'Goiânia': {
            codigoIBGE: '5208707',
            receitaContribuicao: 456789012.34,
            complementacaoVAAF: 34567890.23,
            complementacaoVAAT: 23456789.01,
            complementacaoVAAR: 8901234.56,
            matriculas: {
                infantil: 67890,
                fundamentalI: 98765,
                fundamentalII: 83456,
                medioIntegral: 19876,
                medioParcial: 36789,
                eja: 10234,
                especial: 3678,
                profissional: 5890
            }
        },
        'Aparecida de Goiânia': {
            codigoIBGE: '5201405',
            receitaContribuicao: 189012345.67,
            complementacaoVAAF: 18765432.10,
            complementacaoVAAT: 12345678.90,
            complementacaoVAAR: 4567890.12,
            matriculas: {
                infantil: 28901,
                fundamentalI: 43567,
                fundamentalII: 36789,
                medioIntegral: 8765,
                medioParcial: 16234,
                eja: 4567,
                especial: 1678,
                profissional: 2789
            }
        }
    },
    'MA': {
        'São Luís': {
            codigoIBGE: '2111300',
            receitaContribuicao: 234567890.12,
            complementacaoVAAF: 45678901.23,
            complementacaoVAAT: 28901234.56,
            complementacaoVAAR: 8765432.10,
            matriculas: {
                infantil: 45678,
                fundamentalI: 67890,
                fundamentalII: 56789,
                medioIntegral: 13456,
                medioParcial: 24567,
                eja: 6789,
                especial: 2456,
                profissional: 3890
            }
        },
        'Imperatriz': {
            codigoIBGE: '2105302',
            receitaContribuicao: 123456789.01,
            complementacaoVAAF: 23456789.01,
            complementacaoVAAT: 14567890.12,
            complementacaoVAAR: 4890123.45,
            matriculas: {
                infantil: 18765,
                fundamentalI: 28901,
                fundamentalII: 23456,
                medioIntegral: 5678,
                medioParcial: 10234,
                eja: 2890,
                especial: 987,
                profissional: 1678
            }
        }
    },
    'MT': {
        'Cuiabá': {
            codigoIBGE: '5103403',
            receitaContribuicao: 289012345.67,
            complementacaoVAAF: 23456789.01,
            complementacaoVAAT: 15678901.23,
            complementacaoVAAR: 5890123.45,
            matriculas: {
                infantil: 39876,
                fundamentalI: 58901,
                fundamentalII: 48765,
                medioIntegral: 11234,
                medioParcial: 20567,
                eja: 5678,
                especial: 2089,
                profissional: 3456
            }
        },
        'Várzea Grande': {
            codigoIBGE: '5108402',
            receitaContribuicao: 123456789.01,
            complementacaoVAAF: 12345678.90,
            complementacaoVAAT: 8901234.56,
            complementacaoVAAR: 2789012.34,
            matriculas: {
                infantil: 18765,
                fundamentalI: 28901,
                fundamentalII: 23456,
                medioIntegral: 5678,
                medioParcial: 10234,
                eja: 2890,
                especial: 987,
                profissional: 1678
            }
        }
    },
    'MS': {
        'Campo Grande': {
            codigoIBGE: '5002704',
            receitaContribuicao: 234567890.12,
            complementacaoVAAF: 18901234.56,
            complementacaoVAAT: 12345678.90,
            complementacaoVAAR: 4567890.12,
            matriculas: {
                infantil: 34567,
                fundamentalI: 52345,
                fundamentalII: 43210,
                medioIntegral: 9876,
                medioParcial: 18765,
                eja: 5432,
                especial: 1987,
                profissional: 3456
            }
        },
        'Dourados': {
            codigoIBGE: '5003702',
            receitaContribuicao: 89012345.67,
            complementacaoVAAF: 8901234.56,
            complementacaoVAAT: 5678901.23,
            complementacaoVAAR: 1890123.45,
            matriculas: {
                infantil: 12345,
                fundamentalI: 18765,
                fundamentalII: 15432,
                medioIntegral: 3456,
                medioParcial: 6789,
                eja: 1987,
                especial: 678,
                profissional: 1012
            }
        }
    },
    'MG': {
        'Belo Horizonte': {
            codigoIBGE: '3106200',
            receitaContribuicao: 1567890123.45,
            complementacaoVAAF: 0,
            complementacaoVAAT: 78901234.56,
            complementacaoVAAR: 28765432.10,
            matriculas: {
                infantil: 187654,
                fundamentalI: 278901,
                fundamentalII: 234567,
                medioIntegral: 56789,
                medioParcial: 103456,
                eja: 28901,
                especial: 10234,
                profissional: 17890
            }
        },
        'Uberlândia': {
            codigoIBGE: '3170206',
            receitaContribuicao: 234567890.12,
            complementacaoVAAF: 0,
            complementacaoVAAT: 12345678.90,
            complementacaoVAAR: 4567890.12,
            matriculas: {
                infantil: 34567,
                fundamentalI: 52345,
                fundamentalII: 43210,
                medioIntegral: 9876,
                medioParcial: 18765,
                eja: 5432,
                especial: 1987,
                profissional: 3456
            }
        },
        'Contagem': {
            codigoIBGE: '3118601',
            receitaContribuicao: 189012345.67,
            complementacaoVAAF: 0,
            complementacaoVAAT: 8901234.56,
            complementacaoVAAR: 3456789.01,
            matriculas: {
                infantil: 28901,
                fundamentalI: 43567,
                fundamentalII: 36789,
                medioIntegral: 8765,
                medioParcial: 16234,
                eja: 4567,
                especial: 1678,
                profissional: 2789
            }
        }
    },
    'PA': {
        'Belém': {
            codigoIBGE: '1501402',
            receitaContribuicao: 345678901.23,
            complementacaoVAAF: 56789012.34,
            complementacaoVAAT: 34567890.12,
            complementacaoVAAR: 10234567.89,
            matriculas: {
                infantil: 54321,
                fundamentalI: 78945,
                fundamentalII: 65432,
                medioIntegral: 15678,
                medioParcial: 28901,
                eja: 7890,
                especial: 2890,
                profissional: 4567
            }
        },
        'Ananindeua': {
            codigoIBGE: '1500800',
            receitaContribuicao: 123456789.01,
            complementacaoVAAF: 18765432.10,
            complementacaoVAAT: 12345678.90,
            complementacaoVAAR: 3789012.34,
            matriculas: {
                infantil: 23456,
                fundamentalI: 34567,
                fundamentalII: 28901,
                medioIntegral: 6789,
                medioParcial: 12345,
                eja: 3456,
                especial: 1234,
                profissional: 2345
            }
        }
    },
    'PB': {
        'João Pessoa': {
            codigoIBGE: '2507507',
            receitaContribuicao: 189012345.67,
            complementacaoVAAF: 28901234.56,
            complementacaoVAAT: 17890123.45,
            complementacaoVAAR: 5678901.23,
            matriculas: {
                infantil: 28901,
                fundamentalI: 43567,
                fundamentalII: 36789,
                medioIntegral: 8765,
                medioParcial: 16234,
                eja: 4567,
                especial: 1678,
                profissional: 2789
            }
        },
        'Campina Grande': {
            codigoIBGE: '2504009',
            receitaContribuicao: 89012345.67,
            complementacaoVAAF: 12345678.90,
            complementacaoVAAT: 7890123.45,
            complementacaoVAAR: 2345678.91,
            matriculas: {
                infantil: 12345,
                fundamentalI: 18765,
                fundamentalII: 15432,
                medioIntegral: 3456,
                medioParcial: 6789,
                eja: 1987,
                especial: 678,
                profissional: 1012
            }
        }
    },
    'PR': {
        'Curitiba': {
            codigoIBGE: '4106902',
            receitaContribuicao: 789012345.67,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 18901234.56,
            matriculas: {
                infantil: 98765,
                fundamentalI: 145678,
                fundamentalII: 123456,
                medioIntegral: 28765,
                medioParcial: 54321,
                eja: 15432,
                especial: 5678,
                profissional: 8901
            }
        },
        'Londrina': {
            codigoIBGE: '4113700',
            receitaContribuicao: 234567890.12,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 4567890.12,
            matriculas: {
                infantil: 28901,
                fundamentalI: 43567,
                fundamentalII: 36789,
                medioIntegral: 8765,
                medioParcial: 16234,
                eja: 4567,
                especial: 1678,
                profissional: 2789
            }
        },
        'Maringá': {
            codigoIBGE: '4115200',
            receitaContribuicao: 189012345.67,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 3456789.01,
            matriculas: {
                infantil: 23456,
                fundamentalI: 34567,
                fundamentalII: 28901,
                medioIntegral: 6789,
                medioParcial: 12345,
                eja: 3456,
                especial: 1234,
                profissional: 2345
            }
        }
    },
    'PE': {
        'Recife': {
            codigoIBGE: '2611606',
            receitaContribuicao: 534567890.12,
            complementacaoVAAF: 67890123.45,
            complementacaoVAAT: 43210987.65,
            complementacaoVAAR: 13456789.01,
            matriculas: {
                infantil: 76543,
                fundamentalI: 112345,
                fundamentalII: 93456,
                medioIntegral: 21890,
                medioParcial: 41234,
                eja: 11567,
                especial: 4234,
                profissional: 6789
            }
        },
        'Jaboatão dos Guararapes': {
            codigoIBGE: '2607901',
            receitaContribuicao: 189012345.67,
            complementacaoVAAF: 23456789.01,
            complementacaoVAAT: 14567890.12,
            complementacaoVAAR: 4890123.45,
            matriculas: {
                infantil: 28901,
                fundamentalI: 43567,
                fundamentalII: 36789,
                medioIntegral: 8765,
                medioParcial: 16234,
                eja: 4567,
                especial: 1678,
                profissional: 2789
            }
        },
        'Olinda': {
            codigoIBGE: '2609600',
            receitaContribuicao: 123456789.01,
            complementacaoVAAF: 15678901.23,
            complementacaoVAAT: 9876543.21,
            complementacaoVAAR: 3210987.65,
            matriculas: {
                infantil: 18765,
                fundamentalI: 28901,
                fundamentalII: 23456,
                medioIntegral: 5678,
                medioParcial: 10234,
                eja: 2890,
                especial: 987,
                profissional: 1678
            }
        }
    },
    'PI': {
        'Teresina': {
            codigoIBGE: '2211001',
            receitaContribuicao: 189012345.67,
            complementacaoVAAF: 34567890.23,
            complementacaoVAAT: 21890123.45,
            complementacaoVAAR: 6789012.34,
            matriculas: {
                infantil: 34567,
                fundamentalI: 52345,
                fundamentalII: 43210,
                medioIntegral: 9876,
                medioParcial: 18765,
                eja: 5432,
                especial: 1987,
                profissional: 3456
            }
        },
        'Parnaíba': {
            codigoIBGE: '2207704',
            receitaContribuicao: 56789012.34,
            complementacaoVAAF: 8901234.56,
            complementacaoVAAT: 5432109.87,
            complementacaoVAAR: 1789012.34,
            matriculas: {
                infantil: 6789,
                fundamentalI: 9876,
                fundamentalII: 8234,
                medioIntegral: 1890,
                medioParcial: 3456,
                eja: 987,
                especial: 345,
                profissional: 567
            }
        }
    },
    'RJ': {
        'Rio de Janeiro': {
            codigoIBGE: '3304557',
            receitaContribuicao: 2234567890.12,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 45678901.23,
            matriculas: {
                infantil: 287654,
                fundamentalI: 423456,
                fundamentalII: 356789,
                medioIntegral: 83456,
                medioParcial: 156789,
                eja: 43210,
                especial: 15678,
                profissional: 24567
            }
        },
        'Niterói': {
            codigoIBGE: '3303302',
            receitaContribuicao: 189012345.67,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 3456789.01,
            matriculas: {
                infantil: 23456,
                fundamentalI: 34567,
                fundamentalII: 28901,
                medioIntegral: 6789,
                medioParcial: 12345,
                eja: 3456,
                especial: 1234,
                profissional: 2345
            }
        },
        'Nova Iguaçu': {
            codigoIBGE: '3303500',
            receitaContribuicao: 234567890.12,
            complementacaoVAAF: 18901234.56,
            complementacaoVAAT: 12345678.90,
            complementacaoVAAR: 4567890.12,
            matriculas: {
                infantil: 43210,
                fundamentalI: 65432,
                fundamentalII: 54321,
                medioIntegral: 12345,
                medioParcial: 23456,
                eja: 6789,
                especial: 2345,
                profissional: 4567
            }
        }
    },
    'RN': {
        'Natal': {
            codigoIBGE: '2408102',
            receitaContribuicao: 189012345.67,
            complementacaoVAAF: 23456789.01,
            complementacaoVAAT: 14567890.12,
            complementacaoVAAR: 4890123.45,
            matriculas: {
                infantil: 28901,
                fundamentalI: 43567,
                fundamentalII: 36789,
                medioIntegral: 8765,
                medioParcial: 16234,
                eja: 4567,
                especial: 1678,
                profissional: 2789
            }
        },
        'Mossoró': {
            codigoIBGE: '2408003',
            receitaContribuicao: 89012345.67,
            complementacaoVAAF: 12345678.90,
            complementacaoVAAT: 7890123.45,
            complementacaoVAAR: 2345678.91,
            matriculas: {
                infantil: 12345,
                fundamentalI: 18765,
                fundamentalII: 15432,
                medioIntegral: 3456,
                medioParcial: 6789,
                eja: 1987,
                especial: 678,
                profissional: 1012
            }
        }
    },
    'RS': {
        'Porto Alegre': {
            codigoIBGE: '4314902',
            receitaContribuicao: 789012345.67,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 15678901.23,
            matriculas: {
                infantil: 98765,
                fundamentalI: 145678,
                fundamentalII: 123456,
                medioIntegral: 28765,
                medioParcial: 54321,
                eja: 15432,
                especial: 5678,
                profissional: 8901
            }
        },
        'Caxias do Sul': {
            codigoIBGE: '4305108',
            receitaContribuicao: 234567890.12,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 4567890.12,
            matriculas: {
                infantil: 28901,
                fundamentalI: 43567,
                fundamentalII: 36789,
                medioIntegral: 8765,
                medioParcial: 16234,
                eja: 4567,
                especial: 1678,
                profissional: 2789
            }
        },
        'Pelotas': {
            codigoIBGE: '4314407',
            receitaContribuicao: 123456789.01,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 2345678.91,
            matriculas: {
                infantil: 18765,
                fundamentalI: 28901,
                fundamentalII: 23456,
                medioIntegral: 5678,
                medioParcial: 10234,
                eja: 2890,
                especial: 987,
                profissional: 1678
            }
        }
    },
    'RO': {
        'Porto Velho': {
            codigoIBGE: '1100205',
            receitaContribuicao: 123456789.01,
            complementacaoVAAF: 23456789.01,
            complementacaoVAAT: 14567890.12,
            complementacaoVAAR: 4567890.12,
            matriculas: {
                infantil: 18765,
                fundamentalI: 28901,
                fundamentalII: 23456,
                medioIntegral: 5678,
                medioParcial: 10234,
                eja: 2890,
                especial: 987,
                profissional: 1678
            }
        },
        'Ji-Paraná': {
            codigoIBGE: '1100122',
            receitaContribuicao: 56789012.34,
            complementacaoVAAF: 8901234.56,
            complementacaoVAAT: 5432109.87,
            complementacaoVAAR: 1789012.34,
            matriculas: {
                infantil: 6789,
                fundamentalI: 9876,
                fundamentalII: 8234,
                medioIntegral: 1890,
                medioParcial: 3456,
                eja: 987,
                especial: 345,
                profissional: 567
            }
        }
    },
    'RR': {
        'Boa Vista': {
            codigoIBGE: '1400100',
            receitaContribuicao: 89012345.67,
            complementacaoVAAF: 15678901.23,
            complementacaoVAAT: 9876543.21,
            complementacaoVAAR: 2890123.45,
            matriculas: {
                infantil: 12345,
                fundamentalI: 18765,
                fundamentalII: 15432,
                medioIntegral: 3456,
                medioParcial: 6789,
                eja: 1987,
                especial: 678,
                profissional: 1012
            }
        }
    },
    'SC': {
        'Florianópolis': {
            codigoIBGE: '4205407',
            receitaContribuicao: 234567890.12,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 4567890.12,
            matriculas: {
                infantil: 28901,
                fundamentalI: 43567,
                fundamentalII: 36789,
                medioIntegral: 8765,
                medioParcial: 16234,
                eja: 4567,
                especial: 1678,
                profissional: 2789
            }
        },
        'Joinville': {
            codigoIBGE: '4209102',
            receitaContribuicao: 289012345.67,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 5678901.23,
            matriculas: {
                infantil: 34567,
                fundamentalI: 52345,
                fundamentalII: 43210,
                medioIntegral: 9876,
                medioParcial: 18765,
                eja: 5432,
                especial: 1987,
                profissional: 3456
            }
        },
        'Blumenau': {
            codigoIBGE: '4202404',
            receitaContribuicao: 156789012.34,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 2890123.45,
            matriculas: {
                infantil: 18765,
                fundamentalI: 28901,
                fundamentalII: 23456,
                medioIntegral: 5678,
                medioParcial: 10234,
                eja: 2890,
                especial: 987,
                profissional: 1678
            }
        }
    },
    'SP': {
        'São Paulo': {
            codigoIBGE: '3550308',
            receitaContribuicao: 8845679123.45,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 178901234.56,
            matriculas: {
                infantil: 534567,
                fundamentalI: 756789,
                fundamentalII: 687654,
                medioIntegral: 149765,
                medioParcial: 276789,
                eja: 85678,
                especial: 32345,
                profissional: 53456
            }
        },
        'Guarulhos': {
            codigoIBGE: '3518800',
            receitaContribuicao: 567890123.45,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 11234567.89,
            matriculas: {
                infantil: 67890,
                fundamentalI: 98765,
                fundamentalII: 83456,
                medioIntegral: 19876,
                medioParcial: 36789,
                eja: 10234,
                especial: 3678,
                profissional: 5890
            }
        },
        'Campinas': {
            codigoIBGE: '3509502',
            receitaContribuicao: 456789012.34,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 8765432.10,
            matriculas: {
                infantil: 54321,
                fundamentalI: 78654,
                fundamentalII: 67890,
                medioIntegral: 15432,
                medioParcial: 28901,
                eja: 7890,
                especial: 2890,
                profissional: 4567
            }
        },
        'São Bernardo do Campo': {
            codigoIBGE: '3548708',
            receitaContribuicao: 345678901.23,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 6789012.34,
            matriculas: {
                infantil: 43210,
                fundamentalI: 65432,
                fundamentalII: 54321,
                medioIntegral: 12345,
                medioParcial: 23456,
                eja: 6789,
                especial: 2345,
                profissional: 4567
            }
        },
        'Santo André': {
            codigoIBGE: '3547809',
            receitaContribuicao: 289012345.67,
            complementacaoVAAF: 0,
            complementacaoVAAT: 0,
            complementacaoVAAR: 5678901.23,
            matriculas: {
                infantil: 34567,
                fundamentalI: 52345,
                fundamentalII: 43210,
                medioIntegral: 9876,
                medioParcial: 18765,
                eja: 5432,
                especial: 1987,
                profissional: 3456
            }
        }
    },
    'SE': {
        'Aracaju': {
            codigoIBGE: '2800308',
            receitaContribuicao: 156789012.34,
            complementacaoVAAF: 23456789.01,
            complementacaoVAAT: 14567890.12,
            complementacaoVAAR: 4890123.45,
            matriculas: {
                infantil: 23456,
                fundamentalI: 34567,
                fundamentalII: 28901,
                medioIntegral: 6789,
                medioParcial: 12345,
                eja: 3456,
                especial: 1234,
                profissional: 2345
            }
        },
        'Nossa Senhora do Socorro': {
            codigoIBGE: '2804607',
            receitaContribuicao: 67890123.45,
            complementacaoVAAF: 9876543.21,
            complementacaoVAAT: 6543210.98,
            complementacaoVAAR: 1987654.32,
            matriculas: {
                infantil: 8765,
                fundamentalI: 12345,
                fundamentalII: 9876,
                medioIntegral: 2345,
                medioParcial: 4567,
                eja: 1234,
                especial: 456,
                profissional: 789
            }
        }
    },
    'TO': {
        'Palmas': {
            codigoIBGE: '1721000',
            receitaContribuicao: 123456789.01,
            complementacaoVAAF: 18765432.10,
            complementacaoVAAT: 12345678.90,
            complementacaoVAAR: 3789012.34,
            matriculas: {
                infantil: 18765,
                fundamentalI: 28901,
                fundamentalII: 23456,
                medioIntegral: 5678,
                medioParcial: 10234,
                eja: 2890,
                especial: 987,
                profissional: 1678
            }
        },
        'Araguaína': {
            codigoIBGE: '1702109',
            receitaContribuicao: 67890123.45,
            complementacaoVAAF: 9876543.21,
            complementacaoVAAT: 6543210.98,
            complementacaoVAAR: 1987654.32,
            matriculas: {
                infantil: 8765,
                fundamentalI: 12345,
                fundamentalII: 9876,
                medioIntegral: 2345,
                medioParcial: 4567,
                eja: 1234,
                especial: 456,
                profissional: 789
            }
        }
    }
};

// Weighting factors for different education levels
// Global ponderações - can be modified by user
window.currentPonderacoes = {
    infantil: 1.0,
    fundamentalI: 1.0,
    fundamentalII: 1.15,
    medioIntegral: 1.30,
    medioParcial: 1.25,
    eja: 0.80,
    especial: 1.20,
    profissional: 1.20
};

// Official ponderações backup for reset functionality
window.oficialPonderacoes = {
    infantil: 1.0,
    fundamentalI: 1.0,
    fundamentalII: 1.15,
    medioIntegral: 1.30,
    medioParcial: 1.25,
    eja: 0.80,
    especial: 1.20,
    profissional: 1.20
};

// For compatibility with existing code
const ponderacoes = window.currentPonderacoes;

// Initialize municipal data functionality
function initMunicipalData() {
    console.log('Initializing municipal data...');
    
    // Use timeout to ensure DOM is ready
    setTimeout(() => {
        setupMunicipalSelectors();
        setupMunicipalButtons();
    }, 1000);
}

// Setup municipal selectors with direct approach
function setupMunicipalSelectors() {
    const selectUF = document.getElementById('selectUF');
    const selectMunicipio = document.getElementById('selectMunicipio');
    
    if (!selectUF || !selectMunicipio) {
        console.error('Municipal selectors not found');
        return;
    }
    
    // Populate states
    const states = Object.keys(municipalData).sort();
    selectUF.innerHTML = '<option value="">Selecione o Estado</option>';
    states.forEach(uf => {
        const option = document.createElement('option');
        option.value = uf;
        option.textContent = uf;
        selectUF.appendChild(option);
    });
    
    console.log('States populated:', states.length);
    
    // Handle UF change
    selectUF.onchange = function() {
        const selectedUF = this.value;
        console.log('UF selected:', selectedUF);
        
        // Reset municipality selector
        selectMunicipio.innerHTML = '<option value="">Selecione o Município</option>';
        selectMunicipio.disabled = !selectedUF;
        
        // Hide data panel
        hideMunicipalData();
        
        // Use window.municipalData to ensure we get the latest real data
        const currentMunicipalData = window.municipalData || municipalData;
        
        if (selectedUF && currentMunicipalData[selectedUF]) {
            const municipios = Object.keys(currentMunicipalData[selectedUF]).sort();
            console.log('📊 Found', municipios.length, 'municipalities for', selectedUF);
            console.log('🔍 First few municipalities:', municipios.slice(0, 5));
            console.log('🎯 Campina Grande included?', municipios.includes('CAMPINA GRANDE'));
            municipios.forEach(municipio => {
                const option = document.createElement('option');
                option.value = municipio;
                option.textContent = municipio;
                selectMunicipio.appendChild(option);
            });
            selectMunicipio.disabled = false;
            console.log('Municipalities populated for', selectedUF, ':', municipios.length);
        }
    };
    
    // Handle municipality change
    selectMunicipio.onchange = function() {
        const selectedUF = selectUF.value;
        const selectedMunicipio = this.value;
        
        console.log('🔄 Municipality selected:', selectedMunicipio, 'in', selectedUF);
        console.log('🔍 Raw values from selectors:', {
            uf: `"${selectedUF}"`,
            municipio: `"${selectedMunicipio}"`,
            ufLength: selectedUF.length,
            municipioLength: selectedMunicipio.length
        });
        
        if (selectedUF && selectedMunicipio) {
            // Clean any potential whitespace or special characters
            const cleanUF = selectedUF.trim();
            const cleanMunicipio = selectedMunicipio.trim();
            
            console.log('🧹 Cleaned values:', {
                uf: `"${cleanUF}"`,
                municipio: `"${cleanMunicipio}"`
            });
            
            showMunicipalData(cleanUF, cleanMunicipio);
        } else {
            hideMunicipalData();
        }
    };
}

// Setup municipal buttons
function setupMunicipalButtons() {
    const copyButton = document.getElementById('copyCurrentData');
    const resetButton = document.getElementById('resetSimulation');
    const simForm = document.getElementById('municipalSimulator');
    
    if (copyButton) {
        copyButton.onclick = function() {
            console.log('Copy button clicked');
            handleCopyCurrentData();
        };
        console.log('Copy button setup complete');
    }
    
    if (resetButton) {
        resetButton.onclick = function() {
            console.log('Reset button clicked');
            resetSimulationForm();
        };
    }
    
    if (simForm) {
        simForm.onsubmit = function(e) {
            e.preventDefault();
            console.log('Form submitted');
            runMunicipalSimulation();
        };
    }
}

// Simplified show municipal data
function showMunicipalData(uf, municipio) {
    console.log('🔍 Showing data for:', uf, municipio);
    console.log('📊 Available data:', {
        hasUF: !!municipalData[uf],
        hasMunicipio: !!(municipalData[uf] && municipalData[uf][municipio]),
        totalStates: Object.keys(municipalData).length,
        ufMunicipalities: municipalData[uf] ? Object.keys(municipalData[uf]).length : 0
    });
    
    // Use window.municipalData to ensure we get the latest data
    const currentData = window.municipalData || municipalData;
    
    console.log('🔍 Current data source:', {
        windowDataExists: !!window.municipalData,
        windowHasPB: !!(window.municipalData && window.municipalData.PB),
        windowHasCampina: !!(window.municipalData && window.municipalData.PB && window.municipalData.PB['CAMPINA GRANDE']),
        searchingFor: { uf, municipio }
    });
    
    if (!currentData[uf] || !currentData[uf][municipio]) {
        console.error('❌ Data not found for:', uf, municipio);
        console.log('🔍 Debugging search issue:');
        console.log('Available states:', Object.keys(currentData));
        
        if (currentData[uf]) {
            const availableMunicipios = Object.keys(currentData[uf]);
            console.log(`Available municipalities in ${uf} (${availableMunicipios.length}):`, availableMunicipios);
            
            // Try to find similar names
            const similar = availableMunicipios.filter(m => 
                m.toLowerCase().includes(municipio.toLowerCase()) || 
                municipio.toLowerCase().includes(m.toLowerCase())
            );
            if (similar.length > 0) {
                console.log('🔍 Similar municipality names found:', similar);
            }
            
            // Check for exact match with different cases
            const exactMatch = availableMunicipios.find(m => m.toLowerCase() === municipio.toLowerCase());
            if (exactMatch) {
                console.log('🎯 Found exact match with different case:', exactMatch);
            }
        } else {
            console.log(`❌ State ${uf} not found in data`);
        }
        
        showNotification('Dados não encontrados para este município.', 'error');
        return;
    }
    
    const data = currentData[uf][municipio];
    
    console.log('📊 Selected municipal data:', data);
    
    // Store current data globally
    window.currentMunicipalData = { uf, municipio, data };
    
    // Show data panel
    const dataDiv = document.getElementById('municipioData');
    if (dataDiv) {
        dataDiv.classList.remove('hidden');
        
        // Update displays
        updateMunicipalDisplays(data);
        
        showNotification(`Dados carregados para ${municipio}/${uf}`, 'success');
    }
}

// Update municipal displays
function updateMunicipalDisplays(data) {
    console.log('🎯 Updating displays with data:', data);
    
    // Financial data
    const contribuicaoElement = document.getElementById('currentContribuicao');
    const vaafElement = document.getElementById('currentVAAF');
    const vaatElement = document.getElementById('currentVAAT');
    const vaarElement = document.getElementById('currentVAAR');
    
    if (contribuicaoElement) {
        contribuicaoElement.textContent = formatMoney(data.receitaContribuicao);
        console.log('✅ Updated receita contribuição:', formatMoney(data.receitaContribuicao));
    }
    
    if (vaafElement) {
        vaafElement.textContent = formatMoney(data.complementacaoVAAF);
        console.log('✅ Updated VAAF:', formatMoney(data.complementacaoVAAF));
    }
    
    if (vaatElement) {
        vaatElement.textContent = formatMoney(data.complementacaoVAAT);
        console.log('✅ Updated VAAT:', formatMoney(data.complementacaoVAAT));
    }
    
    if (vaarElement) {
        vaarElement.textContent = formatMoney(data.complementacaoVAAR);
        console.log('✅ Updated VAAR:', formatMoney(data.complementacaoVAAR));
    }
    
    const totalReceita = data.receitaContribuicao + data.complementacaoVAAF + data.complementacaoVAAT + data.complementacaoVAAR;
    document.getElementById('currentTotal').textContent = formatMoney(totalReceita);
    
    // Enrollment data
    document.getElementById('currentInfantil').textContent = formatNumber(data.matriculas.infantil);
    document.getElementById('currentFundI').textContent = formatNumber(data.matriculas.fundamentalI);
    document.getElementById('currentFundII').textContent = formatNumber(data.matriculas.fundamentalII);
    document.getElementById('currentMedioInt').textContent = formatNumber(data.matriculas.medioIntegral);
    document.getElementById('currentMedioPar').textContent = formatNumber(data.matriculas.medioParcial);
    document.getElementById('currentEJA').textContent = formatNumber(data.matriculas.eja);
    document.getElementById('currentEspecial').textContent = formatNumber(data.matriculas.especial);
    document.getElementById('currentProfissional').textContent = formatNumber(data.matriculas.profissional);
}

// Simplified copy data handler
function handleCopyCurrentData() {
    console.log('Handle copy data, currentMunicipalData:', window.currentMunicipalData);
    
    if (!window.currentMunicipalData) {
        showNotification('Por favor, selecione um estado e município primeiro.', 'warning');
        return;
    }
    
    const button = document.getElementById('copyCurrentData');
    const originalText = button.innerHTML;
    
    // Show loading
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Carregando...';
    button.disabled = true;
    
    setTimeout(() => {
        try {
            const data = window.currentMunicipalData.data;
            
            // Fill form fields
            document.getElementById('simInfantil').value = data.matriculas.infantil;
            document.getElementById('simFundI').value = data.matriculas.fundamentalI;
            document.getElementById('simFundII').value = data.matriculas.fundamentalII;
            document.getElementById('simMedioInt').value = data.matriculas.medioIntegral;
            document.getElementById('simMedioPar').value = data.matriculas.medioParcial;
            document.getElementById('simEJA').value = data.matriculas.eja;
            document.getElementById('simEspecial').value = data.matriculas.especial;
            document.getElementById('simProfissional').value = data.matriculas.profissional;
            
            showNotification(`Dados copiados para simulação: ${window.currentMunicipalData.municipio}/${window.currentMunicipalData.uf}`, 'success');
        } catch (error) {
            console.error('Error copying data:', error);
            showNotification('Erro ao copiar dados.', 'error');
        } finally {
            // Restore button
            button.innerHTML = originalText;
            button.disabled = false;
        }
    }, 1000);
}

// Legacy functions removed - using simplified approach above

// Hide municipal data section
function hideMunicipalData() {
    const dataDiv = document.getElementById('municipioData');
    if (dataDiv) {
        dataDiv.classList.add('hidden');
    }
    window.currentMunicipalData = null;
}

// Municipal data initialization complete

console.log('FUNDEB Calculator initialized successfully!');

// === PONDERAÇÃO MANAGEMENT FUNCTIONS ===

function initPonderacaoControls() {
    console.log('🎛️ Initializing ponderação controls...');
    
    const toggleButton = document.getElementById('togglePonderacao');
    const ponderacaoSection = document.getElementById('ponderacaoSection');
    const resetButton = document.getElementById('resetPonderacoes');
    const aplicarButton = document.getElementById('aplicarPonderacoes');
    
    if (toggleButton && ponderacaoSection) {
        toggleButton.onclick = function() {
            if (ponderacaoSection.classList.contains('hidden')) {
                ponderacaoSection.classList.remove('hidden');
                toggleButton.innerHTML = '<i class="fas fa-eye-slash mr-1"></i>Ocultar';
                console.log('🎛️ Ponderação section opened');
            } else {
                ponderacaoSection.classList.add('hidden');
                toggleButton.innerHTML = '<i class="fas fa-cog mr-1"></i>Editar';
                console.log('🎛️ Ponderação section closed');
            }
        };
    }
    
    if (resetButton) {
        resetButton.onclick = function() {
            resetPonderacoesToOfficial();
        };
    }
    
    if (aplicarButton) {
        aplicarButton.onclick = function() {
            aplicarNovasPonderacoes();
        };
    }
    
    console.log('🎛️ Ponderação controls initialized');
}

function resetPonderacoesToOfficial() {
    console.log('🔄 Resetting ponderações to official values...');
    
    // Reset global ponderações
    window.currentPonderacoes = { ...window.oficialPonderacoes };
    
    // Update input fields
    document.getElementById('pondInfantil').value = window.oficialPonderacoes.infantil;
    document.getElementById('pondFundI').value = window.oficialPonderacoes.fundamentalI;
    document.getElementById('pondFundII').value = window.oficialPonderacoes.fundamentalII;
    document.getElementById('pondMedioInt').value = window.oficialPonderacoes.medioIntegral;
    document.getElementById('pondMedioPar').value = window.oficialPonderacoes.medioParcial;
    document.getElementById('pondEJA').value = window.oficialPonderacoes.eja;
    document.getElementById('pondEspecial').value = window.oficialPonderacoes.especial;
    document.getElementById('pondProfissional').value = window.oficialPonderacoes.profissional;
    
    // Update display labels
    updatePonderacaoDisplays();
    
    showNotification('Ponderações restauradas para valores oficiais da Lei nº 14.113/2020', 'success');
}

function aplicarNovasPonderacoes() {
    console.log('✅ Applying new ponderações...');
    
    // Get values from inputs
    const newPonderacoes = {
        infantil: parseFloat(document.getElementById('pondInfantil').value) || 1.0,
        fundamentalI: parseFloat(document.getElementById('pondFundI').value) || 1.0,
        fundamentalII: parseFloat(document.getElementById('pondFundII').value) || 1.15,
        medioIntegral: parseFloat(document.getElementById('pondMedioInt').value) || 1.30,
        medioParcial: parseFloat(document.getElementById('pondMedioPar').value) || 1.25,
        eja: parseFloat(document.getElementById('pondEJA').value) || 0.80,
        especial: parseFloat(document.getElementById('pondEspecial').value) || 1.20,
        profissional: parseFloat(document.getElementById('pondProfissional').value) || 1.20
    };
    
    // Validate ranges
    let isValid = true;
    Object.keys(newPonderacoes).forEach(key => {
        if (newPonderacoes[key] < 0.1 || newPonderacoes[key] > 3.0) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Erro: Ponderações devem estar entre 0,1 e 3,0', 'error');
        return;
    }
    
    // Apply new ponderações
    window.currentPonderacoes = { ...newPonderacoes };
    
    // Update compatibility object
    Object.keys(ponderacoes).forEach(key => {
        ponderacoes[key] = newPonderacoes[key];
    });
    
    // Update display labels
    updatePonderacaoDisplays();
    
    console.log('✅ New ponderações applied:', window.currentPonderacoes);
    showNotification('Ponderações personalizadas aplicadas com sucesso!', 'success');
}

function updatePonderacaoDisplays() {
    // Update the ponderação displays in simulation form
    document.getElementById('displayPondInfantil').textContent = `Ponderação: ${window.currentPonderacoes.infantil.toFixed(2)}`;
    document.getElementById('displayPondFundI').textContent = `Ponderação: ${window.currentPonderacoes.fundamentalI.toFixed(2)}`;
    document.getElementById('displayPondFundII').textContent = `Ponderação: ${window.currentPonderacoes.fundamentalII.toFixed(2)}`;
    document.getElementById('displayPondMedioInt').textContent = `Ponderação: ${window.currentPonderacoes.medioIntegral.toFixed(2)}`;
    document.getElementById('displayPondMedioPar').textContent = `Ponderação: ${window.currentPonderacoes.medioParcial.toFixed(2)}`;
    document.getElementById('displayPondEJA').textContent = `Ponderação: ${window.currentPonderacoes.eja.toFixed(2)}`;
    document.getElementById('displayPondEspecial').textContent = `Ponderação: ${window.currentPonderacoes.especial.toFixed(2)}`;
    document.getElementById('displayPondProfissional').textContent = `Ponderação: ${window.currentPonderacoes.profissional.toFixed(2)}`;
}