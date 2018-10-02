

const isAnagram = (string1, string2) => {
    string1 = string1.replace(/\s/g, '')
    string2 = string2.replace(/\s/g, '')
    if (string1.length !== string2.length) {
        return false;
    }
    let letters = {}
    for (let i = 0; i < string1.length; i++){
        if (letters.hasOwnProperty(string1[i])){
            letters[string1[i]]++
        } else {
            letters[string1[i]] = 1
        }
    }
    for (let i = 0; i < string2.length; i++){
        if (!letters[string2[i]]){
            return false;
        }
        letters[string2[i]]--
        if (letters[string2[i]] < 0){
            return false;
        }
    }
    return true;
}

console.log(isAnagram("angel", "angle"))
console.log(isAnagram("tacos", "coast"))
console.log(isAnagram("angel", "angl"))
console.log(isAnagram("Goku", "Vegeta"))
console.log(isAnagram("punishment","nine thumps"))