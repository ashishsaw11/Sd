import express from 'express';
const app =express();
const port=process.env.PORT || 3000;
app.get('/',(req,res)=>
{
    res.send('server is ready')
});
//get a list of 5 jokes
app.get('/api/jokes',(req,res)=>{
    const jokes = [
  {
    id: 1,
    title: "Bug in the Code",
    content: "Why do programmers prefer dark mode? Because light attracts bugs!"
  },
  {
    id: 2,
    title: "Database Love",
    content: "I asked the SQL database out, but it said it had too many relationships."
  },
  {
    id: 3,
    title: "AI Confusion",
    content: "I told my AI to tell me a joke… now it’s teaching me stand-up comedy."
  },
  {
    id: 4,
    title: "Laptop Workout",
    content: "I tried to get my laptop to go jogging… but it just ran programs."
  },
  {
    id: 5,
    title: "404 Humor",
    content: "Why did the joke fail to load? Because it was a 404 — Not Found."
  },
  {
    id: 6,
    title: "Debugging Reality",
    content: "Debugging is like being the detective… in a crime where you are also the murderer."
  }
];

    res.send(jokes)
})
app.listen(port,()=>
{
    console.log(`serve at http://localhost:${port}`);
});
