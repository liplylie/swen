const fibanacciR = n => {
    if (n === 0) {
        return 0
    }
    if (n <= 2) {
        return 1
    }
    return fibanacciR(n-1) + fibanacciR(n - 2)
}

const fibanacciI = n => {
    let arr = [0,1];
    if ( n <=2 ) {
       return arr[n]
    }
    for (let i = 2; i <= n; i++){
        arr.push(arr[i - 1] + arr[i - 2])
    }
    return arr[arr.length - 1]
}

console.log(fibanacciR(10))
console.log(fibanacciI(10));