function init(rel, res, next){
    res.render('index', {nameFile: 'login.css'});
    res.end();
}
function register(rel, res, next){
    res.render('register', {nameFile: 'register.css'});
    res.end();
}

function validateRegister(rel,res,next){
    const newUser =new Player(rel.body.name, rel.body.username, rel.body.password);
    userRegisters.push(newUser);
    console.log(newUser)
    res.end()
}
function login(rel,res, next){
    var item = userRegisters.find(item => item.username === rel.body.username);
    console.log(item);
    console.log(userRegisters)
    console.log(rel.body.username)
    if(item !== undefined){
        if (item.username === rel.body.username && item.password === rel.body.password){
            res.writeHead(200, {"Content-Type": "text/html"});
        }
    }
}



