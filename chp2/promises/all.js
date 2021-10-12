Promise.all([
    1,2,Promise.resolve(3),4,5,6,7,Promise.resolve(8),9,7,6,5,4,4
])
.then(v => console.log('value is', v))