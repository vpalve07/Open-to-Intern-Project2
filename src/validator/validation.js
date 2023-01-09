
function isNameValid(value){
    if(typeof value == undefined || typeof value == "" || typeof value ==  null) return false
    else true
}

function isValidUrl(value){
    let urlFormat = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    if(urlFormat.test(value)) return true
    else return false
}


module.exports = {isNameValid,isValidUrl}