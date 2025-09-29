// Debug column positions for Campina Grande
const line = "PB;CAMPINA GRANDE;2504009;4427;237;0;0;0;0;0;0;0;95;0;0;0;0;0;0;22;0;0;0;0;0;0;0;3867;573;0;0;0;0;0;0;1508;87;0;0;11462;1554;0;0;5774;711;0;0;0;0;0;0;0;0;0;0;1050;63;0;0;0;14;0;0;839;54;0;0;2674;141;0;0;2393;0;37545;2504009;235685817;22019976,19;41401744,8;0;63421720,99;299107538;10128;13016;6485;0;0;1113;6115;0";

const parts = line.split(';');
console.log('Total columns:', parts.length);

// Let's identify the correct positions:
parts.forEach((value, index) => {
    if (index < 10 || index > parts.length - 15) {
        console.log(`Column ${index}: ${value}`);
    }
});

// The financial data appears to be:
// Position 78: 235685817 (receita contribuição)
// Position 79: 22019976,19 (VAAF)
// Position 80: 41401744,8 (VAAT)  
// Position 81: 0 (VAAR)
// Position 82: 63421720,99 (Total complementação União)
// Position 83: 299107538 (Total receitas)

// Enrollment data:
// Position 84: 10128 (infantil)
// Position 85: 13016 (fund I)
// Position 86: 6485 (fund II)
// Position 87: 0 (médio integral)
// Position 88: 0 (médio parcial)  
// Position 89: 1113 (EJA)
// Position 90: 6115 (especial)
// Position 91: 0 (profissional)

console.log('Financial data positions:');
console.log('78 - Receita Contribuição:', parts[78]);
console.log('79 - VAAF:', parts[79]);
console.log('80 - VAAT:', parts[80]);
console.log('81 - VAAR:', parts[81]);
console.log('82 - Total União:', parts[82]);
console.log('83 - Total Receitas:', parts[83]);

console.log('Enrollment data positions:');
console.log('84 - Infantil:', parts[84]);
console.log('85 - Fund I:', parts[85]);
console.log('86 - Fund II:', parts[86]);
console.log('87 - Médio Int:', parts[87]);
console.log('88 - Médio Par:', parts[88]);
console.log('89 - EJA:', parts[89]);
console.log('90 - Especial:', parts[90]);
console.log('91 - Profissional:', parts[91]);