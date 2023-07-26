require("dotenv/config");
const express=require("express");
const app=express();
const {PORT}=process.env;
const pool=require("./db");
const moviesRouter=require("./routes/movies");

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Welcome to the application!');
// });

app.use('/movies',moviesRouter);

app.listen(PORT,()=>{
    console.log(`server is now running on ${PORT}`);
})