const { rejects } = require('assert');
const { resolve } = require('path');
const fs = require('fs'); //import module fs untuk filesystem
const validator = require('validator'); //import module validator untuk melakukan validasi
const readline = require('readline'); //import module readline untuk membaca data
//membuat fungsi untuk memasukkan data
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//membuat folder data jika folder data belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}
//membuat file baru bernama contacts.json didalam folder data jika file itu belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');
}
//membuat function question untuk petanyaan di app.js
const question = (questions, answers) => {
    return new Promise((resolve, rejects) => {
        rl.question(questions, (answer) => {
            resolve(answer)
        })
    });
}

//membuat function datasave untuk mengecek validasi dari variable name, email, dan phone yang ada di app.js
const datasave = (name,email,phone) => {
        if(!validator.isEmail(email)){
            console.log('your email is wrong format');
            rl.close();
            return(false);
        }
        if(!validator.isMobilePhone(phone, 'id-ID')){
            console.log('your phone is wrong format (use ID format)');
            rl.close();
            return(false);
        }

        //membuat variable untuk menginputkan name, email, dan phone dalam bentuk object
        const contact = {name, email, phone};
        //membuat variable untuk membaca file dari contacts.json
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        //buat variable contacts yang didalamnya ada fungsi pharsing yang berfungsi untuk mentranslate file dari utf-8 menjadi file json
        const contacts = JSON.parse(file);
        // untuk menambah data
        contacts.push(contact);
        // setelah melakukan push, buat menjadi agar bisa di tuliskan di dalam contacts.json 
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); // fungsi stringify = mengubah file dari json menjadi string 
        console.log(`your name is ${name}`)
        console.log(`your email is ${email}`)
        console.log(`your phone is ${phone}`)
        rl.close();
}

//mengeksport function question dan datasave untuk dipanggil ke app.js
module.exports = {question, datasave};