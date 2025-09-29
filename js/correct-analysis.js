// Analyze ACRELANDIA line to understand structure
const acLine = "AC;ACRELANDIA;1200013;71;0;0;0;0;0;0;0;161;0;0;0;0;0;0;0;25;0;0;0;0;0;0;0;258;170;0;0;0;0;0;0;87;0;0;0;699;280;0;0;0;127;0;0;0;0;0;0;0;0;0;0;0;6;0;0;12;0;0;0;26;2;0;0;60;27;0;0;90;0;2101;1200013;17734911,24;0;2627864,62;0;2627864,62;20362775,86;725;979;127;0;0;6;217;0";

const parts = acLine.split(';');
console.log('AC line total columns:', parts.length);

// Let's find the financial data pattern
for (let i = 70; i < parts.length; i++) {
    console.log(`Position ${i}: "${parts[i]}"`);
}

// Financial pattern appears to be:
// Position 74: 17734911,24 (receita contribuição) 
// Position 75: 0 (VAAF)
// Position 76: 2627864,62 (VAAT)
// Position 77: 0 (VAAR) 
// Position 78: 2627864,62 (total complementação)
// Position 79: 20362775,86 (total receitas)

// Enrollment aggregated data:
// Position 80: 725 (infantil)
// Position 81: 979 (fund I)
// Position 82: 127 (fund II)
// Position 83: 0 (médio integral)
// Position 84: 0 (médio parcial)
// Position 85: 6 (EJA)
// Position 86: 217 (especial)
// Position 87: 0 (profissional)

// Now let's verify with Campina Grande
const cgLine = "PB;CAMPINA GRANDE;2504009;4427;237;0;0;0;0;0;0;0;95;0;0;0;0;0;0;22;0;0;0;0;0;0;0;3867;573;0;0;0;0;0;0;1508;87;0;0;11462;1554;0;0;5774;711;0;0;0;0;0;0;0;0;0;0;1050;63;0;0;0;14;0;0;839;54;0;0;2674;141;0;0;2393;0;37545;2504009;235685817;22019976,19;41401744,8;0;63421720,99;299107538;10128;13016;6485;0;0;1113;6115;0";

const cgParts = cgLine.split(';');
console.log('\nCampina Grande analysis:');
console.log('Position 74:', cgParts[74]); // Should be receita: 235685817
console.log('Position 75:', cgParts[75]); // Should be VAAF: 22019976,19
console.log('Position 76:', cgParts[76]); // Should be VAAT: 41401744,8
console.log('Position 77:', cgParts[77]); // Should be VAAR: 0
console.log('Position 78:', cgParts[78]); // Should be total complementação: 63421720,99
console.log('Position 79:', cgParts[79]); // Should be total receitas: 299107538

console.log('Position 80:', cgParts[80]); // Should be infantil: 10128
console.log('Position 81:', cgParts[81]); // Should be fund I: 13016
console.log('Position 82:', cgParts[82]); // Should be fund II: 6485
console.log('Position 85:', cgParts[85]); // Should be EJA: 1113
console.log('Position 86:', cgParts[86]); // Should be especial: 6115