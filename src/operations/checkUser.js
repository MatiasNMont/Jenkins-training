
exports.checkValidUser = (user) => {
    if(user.length <= 0){
        console.error('Debe rellenar este campo')
        console.error('Este un ejemplo ')
        return 'error 1'
    } else {
        const completeName = user.split(' ')
        if(completeName.length < 2) {
            console.error('Debe rellenar el campo con nombre completo')
            return 'error 2'
        }
    }
    console.log('User checking')
    return 0
}

