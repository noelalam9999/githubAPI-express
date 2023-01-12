const express = require('express');
const app = express();

const port = 3000;
const db = {
    repos: [],
    skills : []    
};

app.use(express.json());

app.get('/repos', (req,res)=>{
    fetch('https://api.github.com/users/noelalam9999/repos')
  .then((response) => response.json())
  .then((data) => Skills(data))
 
    
});


function Skills(data){
    let repoNames = RepoNames(data);
    console.log(repoNames)
}
function RepoNames(data){
    return data.map(repo => {
        return repo.name;
    })
}

async function languages(repoNames){
    let languages = []
    languages = await repoNames.map(repoName => {
        return fetch(`https://api.github.com/repos/noelalam9999/${repoName}/languages`)
        .then((response) => response);      
    });
    console.log(languages);
    //console.log(languages);
}

app.post('/messages', (req,res)=>{
    db.msgs.push(req.body);
    res.send(req.body);
})

app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`);
})