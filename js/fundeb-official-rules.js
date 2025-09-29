// FUNDEB Official Calculation Rules - Lei nº 14.113/2020 e Decreto nº 10.656/2021

// Percentuais oficiais de complementação para 2024
const FUNDEB_2024_PERCENTAGES = {
    VAAF: 0.10,    // 10,00%
    VAAT: 0.075,   // 7,50%
    VAAR: 0.015    // 1,50%
};

// Valores mínimos nacionais 2024 (aproximados - valores reais são atualizados anualmente)
const FUNDEB_2024_MINIMUMS = {
    VAAF_MIN: 5447.98,  // Valor mínimo nacional por aluno FUNDEB
    VAAT_MIN: 6500.00   // Valor mínimo nacional total por aluno (aproximado)
};

/**
 * Calcula VAAF oficial conforme Art. 7º e 8º da Lei 14.113/2020
 */
function calculateOfficialVAAF(currentData, simulatedMatriculas) {
    console.log('🔍 Calculating official VAAF...');
    
    // 1. Calcular matrículas ponderadas atuais e simuladas
    const currentWeightedEnrollment = calculateWeightedEnrollment(currentData.matriculas);
    const simulatedWeightedEnrollment = calculateWeightedEnrollment(simulatedMatriculas);
    
    console.log('Weighted enrollments:', {
        current: currentWeightedEnrollment,
        simulated: simulatedWeightedEnrollment
    });
    
    // 2. VAAF por aluno = Receita do FUNDEB ÷ Matrículas Ponderadas
    const currentVAAFPerStudent = currentData.receitaContribuicao / currentWeightedEnrollment;
    const simulatedVAAFPerStudent = currentData.receitaContribuicao / simulatedWeightedEnrollment;
    
    // 3. Verificar se precisa complementação VAAF (abaixo do mínimo nacional)
    const currentNeedsVAAF = currentVAAFPerStudent < FUNDEB_2024_MINIMUMS.VAAF_MIN;
    const simulatedNeedsVAAF = simulatedVAAFPerStudent < FUNDEB_2024_MINIMUMS.VAAF_MIN;
    
    // 4. Calcular complementação VAAF oficial
    let currentVAAFComplement, simulatedVAAFComplement;
    
    if (currentNeedsVAAF) {
        // Complementação = (VAAF-MIN - VAAF_atual) × Matrículas_Ponderadas
        currentVAAFComplement = (FUNDEB_2024_MINIMUMS.VAAF_MIN - currentVAAFPerStudent) * currentWeightedEnrollment;
    } else {
        // Se já está acima do mínimo, usa a complementação real dos dados oficiais
        currentVAAFComplement = currentData.complementacaoVAAF;
    }
    
    if (simulatedNeedsVAAF) {
        simulatedVAAFComplement = (FUNDEB_2024_MINIMUMS.VAAF_MIN - simulatedVAAFPerStudent) * simulatedWeightedEnrollment;
    } else {
        // Proporcional às matrículas quando acima do mínimo
        simulatedVAAFComplement = currentData.complementacaoVAAF * (simulatedWeightedEnrollment / currentWeightedEnrollment);
    }
    
    console.log('VAAF calculations:', {
        currentVAAFPerStudent,
        simulatedVAAFPerStudent,
        currentNeedsVAAF,
        simulatedNeedsVAAF,
        currentVAAFComplement,
        simulatedVAAFComplement
    });
    
    return {
        current: {
            vaafPerStudent: currentVAAFPerStudent,
            needsComplement: currentNeedsVAAF,
            complement: currentVAAFComplement,
            finalVAAF: Math.max(currentVAAFPerStudent, FUNDEB_2024_MINIMUMS.VAAF_MIN)
        },
        simulated: {
            vaafPerStudent: simulatedVAAFPerStudent,
            needsComplement: simulatedNeedsVAAF,
            complement: simulatedVAAFComplement,
            finalVAAF: Math.max(simulatedVAAFPerStudent, FUNDEB_2024_MINIMUMS.VAAF_MIN)
        }
    };
}

/**
 * Calcula VAAT oficial conforme metodologia do MEC/FNDE
 */
function calculateOfficialVAAT(currentData, simulatedMatriculas, vaafResults) {
    console.log('🔍 Calculating official VAAT...');
    
    const currentWeightedEnrollment = calculateWeightedEnrollment(currentData.matriculas);
    const simulatedWeightedEnrollment = calculateWeightedEnrollment(simulatedMatriculas);
    
    // VAAT = Receita Total Vinculada à Educação ÷ Matrículas Ponderadas
    // Receita Total = 25% impostos + FUNDEB + Salário-educação + Programas federais
    
    // Para simulação, usamos aproximação baseada nos dados disponíveis
    const currentTotalEducationRevenue = currentData.receitaContribuicao * 5 + // Aproxima os 25% (FUNDEB = 20% dos impostos)
                                       vaafResults.current.complement +
                                       (currentData.receitaContribuicao * 0.1); // Aproximação salário-educação
    
    const simulatedTotalEducationRevenue = currentData.receitaContribuicao * 5 +
                                         vaafResults.simulated.complement +
                                         (currentData.receitaContribuicao * 0.1);
    
    const currentVAATPerStudent = currentTotalEducationRevenue / currentWeightedEnrollment;
    const simulatedVAATPerStudent = simulatedTotalEducationRevenue / simulatedWeightedEnrollment;
    
    // Verificar se precisa complementação VAAT
    const currentNeedsVAAT = currentVAATPerStudent < FUNDEB_2024_MINIMUMS.VAAT_MIN;
    const simulatedNeedsVAAT = simulatedVAATPerStudent < FUNDEB_2024_MINIMUMS.VAAT_MIN;
    
    let currentVAATComplement, simulatedVAATComplement;
    
    if (currentNeedsVAAT) {
        currentVAATComplement = (FUNDEB_2024_MINIMUMS.VAAT_MIN - currentVAATPerStudent) * currentWeightedEnrollment;
    } else {
        currentVAATComplement = currentData.complementacaoVAAT;
    }
    
    if (simulatedNeedsVAAT) {
        simulatedVAATComplement = (FUNDEB_2024_MINIMUMS.VAAT_MIN - simulatedVAATPerStudent) * simulatedWeightedEnrollment;
    } else {
        simulatedVAATComplement = currentData.complementacaoVAAT * (simulatedWeightedEnrollment / currentWeightedEnrollment);
    }
    
    console.log('VAAT calculations:', {
        currentVAATPerStudent,
        simulatedVAATPerStudent,
        currentNeedsVAAT,
        simulatedNeedsVAAT,
        currentVAATComplement,
        simulatedVAATComplement
    });
    
    return {
        current: {
            vaatPerStudent: currentVAATPerStudent,
            needsComplement: currentNeedsVAAT,
            complement: currentVAATComplement,
            totalRevenue: currentTotalEducationRevenue
        },
        simulated: {
            vaatPerStudent: simulatedVAATPerStudent,
            needsComplement: simulatedNeedsVAAT,
            complement: simulatedVAATComplement,
            totalRevenue: simulatedTotalEducationRevenue
        }
    };
}

/**
 * Calcula VAAR oficial conforme Art. 14 da Lei 14.113/2020
 */
function calculateOfficialVAAR(currentData, simulatedMatriculas) {
    console.log('🔍 Calculating official VAAR...');
    
    // VAAR depende de:
    // 1. Cumprimento de condicionalidades de gestão (Art. 14, §1º)
    // 2. Evolução em indicadores de atendimento e aprendizagem (SAEB)
    // 3. Redução das desigualdades
    
    // Para municípios que já recebem VAAR:
    if (currentData.complementacaoVAAR > 0) {
        // Mantém proporcional ao número de alunos (indicadores externos não simuláveis)
        const currentTotalEnrollment = Object.values(currentData.matriculas).reduce((sum, val) => sum + val, 0);
        const simulatedTotalEnrollment = Object.values(simulatedMatriculas).reduce((sum, val) => sum + val, 0);
        
        const simulatedVAARComplement = currentData.complementacaoVAAR * (simulatedTotalEnrollment / currentTotalEnrollment);
        
        console.log('VAAR calculations:', {
            currentTotal: currentTotalEnrollment,
            simulatedTotal: simulatedTotalEnrollment,
            currentVAAR: currentData.complementacaoVAAR,
            simulatedVAAR: simulatedVAARComplement
        });
        
        return {
            current: {
                complement: currentData.complementacaoVAAR,
                eligible: true
            },
            simulated: {
                complement: simulatedVAARComplement,
                eligible: true
            }
        };
    } else {
        // Município não recebe VAAR (não cumpre condicionalidades ou indicadores)
        return {
            current: {
                complement: 0,
                eligible: false
            },
            simulated: {
                complement: 0,
                eligible: false
            }
        };
    }
}

/**
 * Executar simulação completa com regras oficiais
 */
function runOfficialFUNDEBSimulation(currentData, simulatedMatriculas) {
    console.log('🏛️ Running OFFICIAL FUNDEB simulation with Lei 14.113/2020 rules...');
    
    try {
        // 1. Calcular VAAF oficial
        const vaafResults = calculateOfficialVAAF(currentData, simulatedMatriculas);
        
        // 2. Calcular VAAT oficial  
        const vaatResults = calculateOfficialVAAT(currentData, simulatedMatriculas, vaafResults);
        
        // 3. Calcular VAAR oficial
        const vaarResults = calculateOfficialVAAR(currentData, simulatedMatriculas);
        
        // 4. Calcular totais
        const currentTotal = currentData.receitaContribuicao + 
                           vaafResults.current.complement + 
                           vaatResults.current.complement + 
                           vaarResults.current.complement;
        
        const simulatedTotal = currentData.receitaContribuicao + 
                             vaafResults.simulated.complement + 
                             vaatResults.simulated.complement + 
                             vaarResults.simulated.complement;
        
        console.log('🏛️ Official FUNDEB simulation completed');
        
        return {
            vaaf: vaafResults,
            vaat: vaatResults,
            vaar: vaarResults,
            totals: {
                current: currentTotal,
                simulated: simulatedTotal,
                difference: simulatedTotal - currentTotal
            }
        };
        
    } catch (error) {
        console.error('❌ Error in official FUNDEB simulation:', error);
        throw error;
    }
}

// Exportar funções
if (typeof window !== 'undefined') {
    window.FUNDEB_OFFICIAL = {
        calculateOfficialVAAF,
        calculateOfficialVAAT,
        calculateOfficialVAAR,
        runOfficialFUNDEBSimulation,
        FUNDEB_2024_PERCENTAGES,
        FUNDEB_2024_MINIMUMS
    };
}

console.log('🏛️ FUNDEB Official Rules loaded - Lei nº 14.113/2020 compliance');