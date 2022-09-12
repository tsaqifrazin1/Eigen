function reverse(str: string): string{
    return str.split("").reverse().slice(1).join("") + str[str.length - 1]
}

function longest(str: string): string{
    const longestWord = str
        .split(" ")
        .reduce((longest, currentWord) => {
            if(currentWord.length > longest.length) return currentWord
            return longest
        }).length
    return `${longestWord} character`
}

function countOccurrence(input: string[], query: string[]): number[]{
    let result: number[] = []
    query.forEach((a)=>{
        result.push(input.filter(b => b === a).length)
    })
    return result
}

function diagonalDifferenceMatrix(matrix: number[][]): number{
    const length = matrix.length;
    let diagonal1 = 0, diagonal2 = 0;

    for(let i = 0; i < length; i++){
        diagonal1 += matrix[i][i];
        diagonal2 += matrix[length -1 - i][i]
    }
    return Math.abs(diagonal1 - diagonal2);
}

console.log(reverse('NEGIE1'))
console.log(longest('Saya sangat senang mengerjakan soal algoritma'))
console.log(countOccurrence(['xc', 'dz', 'bbb', 'dz'], ['bbb', 'ac', 'dz']))
console.log(diagonalDifferenceMatrix([[1, 2, 0], [4, 5, 6], [7, 8, 9]]))
