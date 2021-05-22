var fs = require('fs')
var db = require('../../data/example.json')



exports.checkAmount = (name) => {
    var path = __dirname.replace('src/operations', 'data')+'/example.json'
    var file = fs.readFileSync(path,'utf-8')
    var customer = JSON.parse(file)
    var matchCustomer
    for(var i = 0; i < customer.clients.length; i++){
        if(customer.clients[i].name === name){
            matchCustomer = customer.clients[i]
        }
    }
    if(matchCustomer === undefined){
        return 3
    } 
    if(matchCustomer.disponibles > 0){
        return 0
    }else{
        return 3
    }
    
}
