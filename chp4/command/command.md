# Command pattern
A command is an object that encapsulates
all the information necessary to perform an action at a later
time.
Instead of invoking a function directly, we create an object
representing the intention to perform such an invocation. It 
will be the responsibility of another component to materialize
that intent, transforming it into an actual action.
An example of using the command pattern is passing a callback to an asynchronous function.