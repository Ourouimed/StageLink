export const generateValidationCode = (size = 6)=>{
    let code = ''
    for (let i =0 ; i <  size ; i++){
        code += Math.floor(Math.random() * size)
    }
    return code
}