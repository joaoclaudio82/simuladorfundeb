// Analyze CSV structure to understand column positions
// Campina Grande data: PB;CAMPINA GRANDE;2504009;...;37545;2504009;235685817;22019976,19;41401744,8;0;63421720,99;299107538;10128;13016;6485;0;0;1113;6115;0

// From the pattern analysis:
// Position 0: UF (PB)
// Position 1: Ente Federado (CAMPINA GRANDE)  
// Position 2: Código IBGE (2504009)
// Positions 3-75: Various enrollment modalities
// Position 76: Total matriculas ponderadas (37545)
// Position 77: Código IBGE repetido (2504009)
// Position 78: Receita contribuição (235685817)
// Position 79: Complementação VAAF (22019976,19)
// Position 80: Complementação VAAT (41401744,8)
// Position 81: Complementação VAAR (0)
// Position 82: Complementação União Total (63421720,99)
// Position 83: Total receitas (299107538)
// Position 84-91: Aggregated enrollments by main categories

console.log('CSV Structure Analysis for FUNDEB Real Data');

function analyzeCampinaGrande() {
    const line = "PB;CAMPINA GRANDE;2504009;4427;237;0;0;0;0;0;0;0;95;0;0;0;0;0;0;22;0;0;0;0;0;0;0;3867;573;0;0;0;0;0;0;1508;87;0;0;11462;1554;0;0;5774;711;0;0;0;0;0;0;0;0;0;0;1050;63;0;0;0;14;0;0;839;54;0;0;2674;141;0;0;2393;0;37545;2504009;235685817;22019976,19;41401744,8;0;63421720,99;299107538;10128;13016;6485;0;0;1113;6115;0";
    
    const parts = line.split(';');
    
    console.log('Total columns:', parts.length);
    console.log('UF:', parts[0]);
    console.log('Municipality:', parts[1]);
    console.log('IBGE Code:', parts[2]);
    console.log('Total Weighted Enrollments:', parts[76]);
    console.log('Revenue Contribution:', parts[78]);
    console.log('VAAF Complement:', parts[79]);
    console.log('VAAT Complement:', parts[80]);
    console.log('VAAR Complement:', parts[81]);
    console.log('Total Union Complement:', parts[82]);
    console.log('Total Revenue:', parts[83]);
    
    // Analyze enrollment aggregations (last 8 columns)
    console.log('Aggregated Enrollments:');
    console.log('Infantil:', parts[84]);
    console.log('Fund I:', parts[85]);
    console.log('Fund II:', parts[86]);
    console.log('Médio Integral:', parts[87]);
    console.log('Médio Parcial:', parts[88]);
    console.log('EJA:', parts[89]);
    console.log('Ed. Especial:', parts[90]);
    console.log('Ed. Profissional:', parts[91]);
}

analyzeCampinaGrande();