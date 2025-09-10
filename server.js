const express = require('express');
const bodyParser = require('body-parser');
const {
  txtToNum,
  altSum,
  numToLetSeq,
  refineSeq,
  letToNumFin
} = require('./dictionary');

const app = express();
const port = 8888;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint POST /process
app.post('/process', (req, res) => {
  const input = req.body.text;
  if (!input) {
    return res.status(400).json({ error: "Field 'text' wajib ada" });
  }

  // Jalankan step-step dari dictionary.js
  const s1 = txtToNum(input);
  const { expression, result } = altSum(s1);
  const s3 = numToLetSeq(result);
  const s4 = refineSeq(s3);
  const s5 = letToNumFin(s4);

  res.json({
    input,
    step1: s1.join(" "),
    step2: `${expression} = ${result}`,
    step3: s3.join(" "),
    step4: s4.join(" "),
    step5: s5.join(" ")
  });
});

// Start server
app.listen(8888, ()=> console.log("Server running at http://localhost:8888"));