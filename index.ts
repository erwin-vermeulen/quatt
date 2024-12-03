export function fizz_buzz(number: number) {
    let result:string[] = []
    
    if(number == 3) {
        result.push('Erwin');
    } else if(number == 5) {
        result.push('Vermeulen');
    } else {
        result.push('Test');
    }
    
    return result.join(', ')
}