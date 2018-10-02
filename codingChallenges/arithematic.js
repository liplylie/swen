const solution = () =>{
    return 3 + 1 % 3 * 9
}

const check = (test) => {
    return test === 12
}

console.log(solution());
console.log(check(solution()))