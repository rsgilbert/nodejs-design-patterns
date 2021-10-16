let output = []
for(let i = 1; i <= 100; i++ ){
    let addition = ''
    if(i % 2 === 0) {
        addition = 'Lease'
    }
    else if(i % 5 === 0) {
        addition = 'Plan'
    }
    if(i % 10 === 0) {
        addition = 'LeasePlan'
    }   
    if(i % 2 !== 0 && i % 5 !== 0) {
        addition = i.toString()
    }
    output.push(addition)
}

const finalOutput = output.join(',')
console.log(finalOutput)