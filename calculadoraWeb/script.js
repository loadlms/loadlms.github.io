function calcular(operacao){
    const n1 = document.getElementById("n1").value
    const n2 = document.getElementById("n2").value
    
    let resultado
    
    switch(operacao){
        case '+':
            resultado = somar(n1, n2)
            break
        case '-':
            resultado = sub(n1, n2)
            break
        case '/':
            resultado = dividir(n1, n2)
            break
        case '*':
            resultado = mult(n1, n2)
            break
    }

    document.getElementById("result").innerHTML = resultado
}

const somar = (n1, n2) => Number(n1)+Number(n2)
const sub = (n1, n2) => Number(n1)-Number(n2)
const dividir = (n1, n2) => {
    if(Number(n2)==0){
        console.error("Impossível dividir por 0")
        return "null"
    }else{
        return Number(n1)/Number(n2)}
}
const mult = (n1, n2) => Number(n1)*Number(n2)