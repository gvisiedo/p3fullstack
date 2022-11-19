/*
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
*/
function init(response) {


    fs.readFile("public/views/home.html", function (err, data) {
        if (err) {
            throw err;
        }
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    })
}

function validatedRegister(response, postData) {

    var myJSON = JSON.parse(postData);
    if (postData) {
        if(myJSON.name === '' || myJSON.username === '' || myJSON.password === ''){
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end();
        }
       
        if(myJSON.name !== '' && myJSON.username !== '' && myJSON.password !== ''){
            var newUser = new Player(myJSON.name, myJSON.username, myJSON.password);
            var userRepited = userRegisters.find(user => user.username === newUser.username);
            if(userRepited === undefined){
                userRegisters.push(newUser);
                //clean post data avoid duplicate records
                postData = "";
                response.writeHead(200, { "Content-Type": "text/html" });
                response.end();
            }else{
                response.writeHead(404, { "Content-Type": "text/html" });
                response.end();
            }
           
        }

        
    }
}

function login(response, postData) {
    var myJson = JSON.parse(postData);
    var username = myJson.username;
    var password = myJson.password;
    var item = userRegisters.find(item => item.username === username);

    if (item !== undefined) {
        if (item.username === username && item.password === password) {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end();
        }


        if (item.username === username && item.password !== password) {
            //PASSWORD INCORRECT
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end();
        }
    }

    if (item === undefined) {
        //USER DOESN'T EXISTS
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end();
    }
}

function register(response) {
    fs.readFile("public/views/register.html", function (err, data) {
        if (err) {
            throw err;
        }
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    })

}
function gameApp(response) {
    fs.readFile("public/views/game-app.html", function (err, data) {
        if (err) {
            throw err;
        }

        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    })
}
function disconnect(response, postData, idpath) {
    var chosen_room = rooms.find(room => room.number === querystring.parse(idpath)["room"]);
    console.log(chosen_room);
    if(chosen_room !==undefined){
        if (chosen_room.player1 === querystring.parse(idpath)["user"]){
            console.log(chosen_room.player1);
            chosen_room.player1 =''; 
            response.writeHead(200, { "Content-Type": "text/html" });
        }
        else if (chosen_room.player2 === querystring.parse(idpath)["user"]){
            console.log(chosen_room.player2);
            chosen_room.player2 =''; 
            response.writeHead(200, { "Content-Type": "text/html" });
        }
        else {
            console.log("no encontrado");
            response.writeHead(404, { "Content-Type": "text/html" });
        }
       
    }else{
        response.writeHead(404, { "Content-Type": "text/html" });
    }
    response.end();
    
}
function ocupationcheck(response, postData, idpath) {
    var chosen_room = rooms.find(room => room.number === querystring.parse(idpath)["room"]);
    if( chosen_room != undefined){
        if (chosen_room.player1 != '' && chosen_room.player2 != '') {
            response.writeHead(403, { "Content-Type": "text/html" });
        }
        else if (chosen_room.player1 == '' && chosen_room.player2 == '') {
            response.writeHead(200, { "Content-Type": "text/html" });
        }
        else {
            response.writeHead(201, { "Content-Type": "text/html" });
        }
    }else{
        response.writeHead(404, { "Content-Type": "text/html" });
    }
    
    response.end();

}
function ocupation(response, postData, idpath) {

    var chosen_room = rooms.find(room => room.number === querystring.parse(idpath)["room"]);
    if( chosen_room != undefined){
        if (chosen_room.player1 != '' && chosen_room.player2 != '') {
            response.writeHead(404, { "Content-Type": "text/html" });
        }
        else {
            if(chosen_room.player1 === '') {
                chosen_room.player1 = querystring.parse(idpath)["user"]
            }
            else{
                chosen_room.player2 = querystring.parse(idpath)["user"]
            }
    
            response.writeHead(200, { "Content-Type": "text/html" });
        }
    }else{
        response.writeHead(404, { "Content-Type": "text/html" });
    }
    response.end();
}


function serveImg(response, postData, idpath) {

    let img = "src/assets/avatars/guerrera.png"
    if (idpath === "2") {
        img = "src/assets/avatars/guerrero.png"
    }
    if (idpath === "3") {
        img = "src/assets/avatars/arquera.png"
    }
    if (idpath === "4") {
        img = "src/assets/avatars/arquero.png"
    }
    if (idpath === "5") {
        img = "src/assets/avatars/maga.png"
    }
    if (idpath === "6") {
        img = "src/assets/avatars/mago.png"
    }
    if (idpath === "7") {
        img = "src/assets/avatars/monstrua.png"
    }
    if (idpath === "8") {
        img = "src/assets/avatars/monstruo.png"
    }
    fs.readFile(img, function (err, data) {
        if (err) {
            console.log(err)
            throw err;
        }

        response.writeHead(200, { "Content-Type": "image/jpeg" });
        response.write(data);
        response.end();
    })
}

function logOut(response, postData, idpath){

    var userNameLogOut = idpath.replace('user=', '');

    rooms.forEach(room => {
        for (const key in room) {
            if(key === 'player1'){
                var value = room[key];
                if(value === userNameLogOut){
                    room[key] = '';
                    console.log(rooms);
                }
            }
            if(key === 'player2'){
                var value = room[key];
                if(value === userNameLogOut){
                    room[key] = '';
                    console.log(rooms);
                }
            }
        }
        
    });

    fs.readFile("public/views/home.html", function (err, data) {
        if (err) {
            throw err;
        }
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    })
}


exports.init = init;
exports.login = login;
exports.register = register;
exports.validatedRegister = validatedRegister;
exports.gameApp = gameApp;
exports.serveImg = serveImg;
exports.ocupation = ocupation;
exports.disconnect = disconnect;
exports.ocupationcheck = ocupationcheck;
exports.logOut = logOut;


