// Find correct positions for financial data
const line = "PB;CAMPINA GRANDE;2504009;4427;237;0;0;0;0;0;0;0;95;0;0;0;0;0;0;22;0;0;0;0;0;0;0;3867;573;0;0;0;0;0;0;1508;87;0;0;11462;1554;0;0;5774;711;0;0;0;0;0;0;0;0;0;0;1050;63;0;0;0;14;0;0;839;54;0;0;2674;141;0;0;2393;0;37545;2504009;235685817;22019976,19;41401744,8;0;63421720,99;299107538;10128;13016;6485;0;0;1113;6115;0";

const parts = line.split(';');

// Looking for the key financial values:
// 235685817 (receita contribuição)
// 22019976,19 (VAAF)
// 41401744,8 (VAAT)  
// 0 (VAAR)
// 63421720,99 (complementação total)
// 299107538 (total receitas)

parts.forEach((value, index) => {
    if (value === '235685817') console.log(`Receita Contribuição found at position ${index}: ${value}`);
    if (value === '22019976,19') console.log(`VAAF found at position ${index}: ${value}`);
    if (value === '41401744,8') console.log(`VAAT found at position ${index}: ${value}`);
    if (value === '63421720,99') console.log(`Complementação Total found at position ${index}: ${value}`);
    if (value === '299107538') console.log(`Total Receitas found at position ${index}: ${value}`);
    if (value === '10128') console.log(`Infantil found at position ${index}: ${value}`);
    if (value === '13016') console.log(`Fund I found at position ${index}: ${value}`);
    if (value === '6485') console.log(`Fund II found at position ${index}: ${value}`);
    if (value === '1113') console.log(`EJA found at position ${index}: ${value}`);
    if (value === '6115') console.log(`Especial found at position ${index}: ${value}`);
});

console.log('Correct positions should be:');
console.log('Position 77: Receita Contribuição');
console.log('Position 78: VAAF');
console.log('Position 79: VAAT');
console.log('Position 80: VAAR');
console.log('Position 81: Complementação Total');
console.log('Position 82: Total Receitas');
console.log('Position 83: Infantil');
console.log('Position 84: Fund I');
console.log('Position 85: Fund II');