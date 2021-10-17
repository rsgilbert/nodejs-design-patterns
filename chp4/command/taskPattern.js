// Most basic implementation of the command pattern
// The Task pattern.
// This is the easiest way in JS to create
// an object representing an invocation.
// It is also a very powerful pattern/idea.

// We create and return a function that will
// call our target function.
// When the task created is invoked, it will trigger the action.
function createTask(target, args) {
    return function() {
        target.apply(null, args)
    }
}

const task = createTask(
    function(greetings) {
        console.log(greetings, 'I am a task to execute')
    }, 
    [ 'Hey dear,' ]
)

task()