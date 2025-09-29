// Final debug to find exact positions
// From actual CSV: PB;CAMPINA GRANDE;2504009;...;235685817;22019976,19;41401744,8;0;63421720,99;299107538;10128;13016;6485;0;0;1113;6115;0

// Expected values for Campina Grande:
// Receita Contribuição: 235685817 
// VAAF: 22019976,19
// VAAT: 41401744,8  
// VAAR: 0
// Total União: 63421720,99
// Total Receitas: 299107538
// Infantil: 10128
// Fund I: 13016
// Fund II: 6485
// EJA: 1113
// Especial: 6115

const fullLine = "PB;CAMPINA GRANDE;2504009;4427;237;0;0;0;0;0;0;0;95;0;0;0;0;0;0;22;0;0;0;0;0;0;0;3867;573;0;0;0;0;0;0;1508;87;0;0;11462;1554;0;0;5774;711;0;0;0;0;0;0;0;0;0;0;1050;63;0;0;0;14;0;0;839;54;0;0;2674;141;0;0;2393;0;37545;2504009;235685817;22019976,19;41401744,8;0;63421720,99;299107538;10128;13016;6485;0;0;1113;6115;0";

const parts = fullLine.split(';');
console.log('Total parts:', parts.length);

// Find exact positions
for (let i = 70; i < parts.length; i++) {
    const value = parts[i];
    console.log(`Position ${i}: "${value}"`);
    
    if (value === '235685817') console.log('  *** RECEITA CONTRIBUIÇÃO ***');
    if (value === '22019976,19') console.log('  *** VAAF ***');
    if (value === '41401744,8') console.log('  *** VAAT ***');  
    if (value === '63421720,99') console.log('  *** TOTAL COMPLEMENTAÇÃO ***');
    if (value === '299107538') console.log('  *** TOTAL RECEITAS ***');
    if (value === '10128') console.log('  *** INFANTIL ***');
    if (value === '13016') console.log('  *** FUND I ***');
    if (value === '6485') console.log('  *** FUND II ***');
    if (value === '1113') console.log('  *** EJA ***');
    if (value === '6115') console.log('  *** ESPECIAL ***');
}