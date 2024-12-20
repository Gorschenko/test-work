const start = Date.UTC(2016, 0, 1, 0, 0, 0); // 13 знаков, ms
const now = Date.now(); // 13 знаков, ms
const dif = now - start;

console.log('START: ', start, 'START LENGTH: ', start.toString().length);
console.log('NOW: ', now, 'NOW LENGTH: ', now.toString().length);
console.log('DIF: ', dif, 'DIF LENGTH: ', dif.toString().length);

// 111977331 // 9 знаков

// 80852148 // 8 знаков

// 75792276 // 8 знаков

// 269112447; 2024-07-11 20:27:40 // 9 знаков
const test = new Date(start + 237610354 * 1000).toLocaleString();
// const test = new Date(start + dif).toLocaleString();
console.log('TEST: ', test);
