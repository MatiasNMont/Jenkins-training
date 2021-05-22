let user = require('./operations/checkUser').checkValidUser
let amount = require('./operations/checkAmount').checkAmount


exports.main = (name) => {
    try {
        user(name)
        amount(name)
    } catch (error) {
        return 3
    }
    
}
