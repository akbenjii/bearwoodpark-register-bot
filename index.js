const f = require('faker');
const p = require('phin');
const fs = require('fs');

const result = fs.createWriteStream('./accounts.txt', { flags: 'a' }); 

(async () => {
    console.log('Starting bearwood park yeeter\nsub to https://www.youtube.com/channel/UCp3MZiY8be5wDtwta-7awxA\n');
    while (true) await register_account();
})();

async function register_account() {

    let token = await p('http://127.0.0.1:5000/bearwoodpark.com/token'); // get recaptcha token
    if(token.statusCode === 418) return;

    let species = ranInt(5);
    let username = genUsername();
    let email = f.internet.email();
    let password = f.internet.password() + ranInt(1000);
    token = token.body.toString();

    let request = `https://bearwoodpark.com/api/v1/register/?data%5Bspecies%5D=${species}&data%5Busername%5D=${username}&data%5Bemail%5D=${email}&data%5Bpassword%5D=${password}&data%5Bpassword-repeat%5D=${password}&data%5Btos%5D=on&data%5Bmarketing%5D=on&data%5Btoken%5D=${token}`

    const response = await p(request);
    if (!response.body.toString().includes('\\"success\\":true')) return;

    console.log('Successfully registered an account!');
    return result.write(`${username}:${password}:${email}\n`);

}

function ranInt(max) {
    let num = Math.floor(Math.random() * Math.floor(max));
    if (num === 0) num++;
    return num;
}

function genUsername() {
    let username = f.internet.userName();
    username = username.replace(/[^A-Za-z0-9]/g,''); 
    if (username.length < 3) { 
        username = username + 'ak' + f.random.number({ min: 10, max: 99 });
    } else if (username.length > 12) { 
        username = username.slice(0, 12 - 1);
    };
    return username;
}
