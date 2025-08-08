import express from 'express';
const app =express();
const port=process.env.PORT || 3000;
app.get('/',(req,res)=>
{
    res.send('server is ready')
});
//get a list of 5 jokes
app.get('/api/jokes',(req,res)=>{
    const jokes=[
        {
            id:1,
            title:'A joke',
            content:'This is a joke'
        },
        {
            id:2,
            title:'A joke',
            content:'3rd Joke'

        }
    ];
    res.send(jokes)
})
app.listen(port,()=>
{
    console.log(`serve at http://localhost:${port}`);
});
