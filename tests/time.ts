const start = Date.UTC(2016, 0, 1, 0, 0, 0); // 13 знаков, ms
const now = Date.now(); // 13 знаков, ms
const dif = now - start;

console.log('START: ', start);
console.log('NOW: ', now);
console.log('DIF: ', dif);

// 269112447; 2024-07-11 20:27:40 // 9 знаков
// const test = new Date(start + 269112447 * 1000).toLocaleString();
const test = new Date(start + dif).toLocaleString();
console.log('TEST: ', test);
