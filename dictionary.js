const readline = require('readline');

// Mapping
const letToNum = {
  A: 0,
  B: 1, C: 1, D: 1,
  E: 2,
  F: 3, G: 3, H: 3,
  I: 4,
  J: 5, K: 5, L: 5, M: 5, N: 5,
  O: 6,
  P: 7, Q: 7, R: 7, S: 7, T: 7,
  U: 8,
  V: 9, W: 9, X: 9, Y: 9, Z: 9,

  a: 9,
  b: 8, c: 8, d: 8,
  e: 7,
  f: 6, g: 6, h: 6,
  i: 5,
  j: 4, k: 4, l: 4, m: 4, n: 4,
  o: 3,
  p: 2, q: 2, r: 2, s: 2, t: 2,
  u: 1,
  v: 0, w: 0, x: 0, y: 0, z: 0,

  ' ': 0
};

const numToLet = {
  0: 'A', 1: 'B', 2: 'E', 3: 'F', 4: 'I',
  5: 'J', 6: 'O', 7: 'P', 8: 'U', 9: 'V'
};

// Helpers
const safeMap = (ch) => letToNum[ch] ?? 0;

// Step 1
const txtToNum = (text) => [...text].map(safeMap);

// Step 2
function altSum(nums) {
if (nums.length === 0) return { expression: "", result: 0 };

  let expression = nums[0].toString();
  let result = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (i % 2 === 1) {
      expression += " + " + nums[i];
      result += nums[i];
    } else {
      expression += " - " + nums[i];
      result -= nums[i];
    }
  }

  return { expression, result };
}

// Step 3
function buildSeq(target) {
  target = Math.abs(Math.trunc(target));
  if (!target) return [0];

  let seq = [], sum = 0, d = 0;
  while (sum < target) {
    if (sum + d <= target) {
      seq.push(d);
      sum += d;
    }
    d = (d + 1) % 10;
  }
  return seq;
}
const numToLetSeq = (num) => buildSeq(num).map((n) => numToLet[n]);

// Step 4
function refineSeq(seqLetters) {
  const nums = seqLetters.map(safeMap);
  const {result} = altSum(nums);
  const replacement = numToLetSeq(result).slice(1, 3);
  return [...seqLetters.slice(0, -2), ...replacement];
}

// Step 5
const letToNumFin = (seqLetters) =>
  seqLetters.map((ch) => {
    const n = safeMap(ch);
    return n % 2 === 0 ? (n + 1) % 10 : n;
  });

// Main process
function processText(input) {
  const s1 = txtToNum(input);
  console.log("step 1:", s1.join(" "));

  const { expression, result } = altSum(s1);
  console.log("step 2:", `${expression} = ${result}`);

  const s3 = numToLetSeq(result);
  console.log("step 3:", s3.join(" "));

  const s4 = refineSeq(s3);
  console.log("step 4:", s4.join(" "));

  const s5 = letToNumFin(s4);
  console.log("step 5:", s5.join(" "));
}

// CLI
// const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
// (function prompt() {
//   rl.question('\nMasukkan kalimat: ', (answer) => {
//     if (answer.toLowerCase() === 'exit') return rl.close();
//     processText(answer);
//     prompt();
//   });
// })();

if (require.main === module) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  (function prompt() {
    rl.question('\nMasukkan kalimat: ', (answer) => {
      if (answer.toLowerCase() === 'exit') return rl.close();
      processText(answer);
      prompt();
    });
  })();
}


module.exports = {
  txtToNum,
  altSum,
  numToLetSeq,
  refineSeq,
  letToNumFin
};
