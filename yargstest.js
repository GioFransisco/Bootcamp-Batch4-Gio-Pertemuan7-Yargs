const func = require('./callfunction.js')
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'add new contact',
    builder:{
        name:{
            describe:'contact name',
            demandOption:true,
            type:'string',
        },
        email:{
            describe:'contact email',
            demandOption:false,
            type:'string',
        },
        phone:{
            describe:'contact mobile phone number',
            demandOption:true,
            type:'string',
        },
    },
    //apa yang akan dilakukan selanjutnya
    handler(argv){
        const contact = {
            name:argv.name,
            email:argv.email,
            phone:argv.phone,
        };
        //menggunakan function datasave untuk menerapkan module yargs diterminal
        func.datasave(argv.name,argv.email,argv.phone)
        console.log(contact);
    },
})

yargs.parse();