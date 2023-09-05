const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

// app.get ('/' , ( req , res ) => {
//     res.send('Hello World ') ;
// }); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get ('/ByeWorld' , ( req , res ) => {
    res.send('Bye Bye World ') ;
}); 

console.log(`wow`);