// Implement a more complex command.
// Supports undo sending status updates


// Mock of Twitter update service
const statusUpdateService = {
    statusUpdates: {},
    // target
    sendUpdate: function(status) {
        console.log('Status sent:', status)
        const id = Math.floor(Math.random() * 1000000)
        statusUpdateService.statusUpdates[id] = status 
        return id;
    },
    // target
    destroyUpdate: function(id) {
        console.log('Status removed', id)
        delete statusUpdateService.statusUpdates[id]
    }
}

// We create a command to represent the posting of
// a new status update.
// We implement a factory that produces new sendStatus commnands.
function createSendStatusCmd(service, status) {
    let postId = null;
    // When the command is invoked it will trigger the action
    // ie. it implements the task patern

    // Command
    const command = function() {
        postId = service.sendUpdate(status)
    }
    command.undo = function() {
        if(postId) {
            service.destroyUpdate(postId)
            postId = null
        }
    }

    // Builds a JSON object that contains all the 
    // necessary information to reconstruct the command object.
    command.serialize = function() {
        return { type: 'status', action: 'post', status: status }
    }

    return command;
}

// Invoker
// Implement an invoker
function Invoker() {
    this.history = []
}

// Basic functionality of an invoker.
// Responsible for saving the command into the 
// history instance variable, triggering execution 
// and logging command details
Invoker.prototype.run = function(cmd) {
    this.history.push(cmd)
    cmd()
    console.log('Command executed', cmd.serialize(), 'history is', this.history)
}

// Add a method that delays the execution of the command
Invoker.prototype.delay = function(cmd, delayMs) {
    const self = this;
    setTimeout(function() {
        self.run(cmd)
        console.log('Ran command after a delay', cmd.serialize())
    }, delayMs)
}

// Add an undo method that reverses the last command
Invoker.prototype.undo = function() {
    const lastCmd = this.history.pop()
    lastCmd.undo()
    console.log('Command undone', lastCmd.serialize())
}

// Run a command on a remote server
Invoker.prototype.runRemotely = function(cmd) {
    const self = this;
    // request.post('http://localhost:3000/cmd', 
    //     { json: cmd.serialize() }, function(err) {
    //     console.log('Command executed remotely', cmd.serialize())
    // })
    console.log('to run remotely')
}


// We have the Command, Invoker and Target.

// Client.
// Use our invoker 
const inv = new Invoker()

// create command
const command = createSendStatusCmd(statusUpdateService, 'Hey there')

// Dispatch command immediately
inv.run(command)

// Undo invocation of command
inv.undo()

// Schedule the message to be sent in one second from now
inv.delay(command, 1000)

// Run command remotely
inv.runRemotely(command)
