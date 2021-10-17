# State pattern
The state pattern is a variation of the strategy pattern
where the strategy changes depending on the state of the context.

The state transition can be initialized and controlled by 
the context object, the client or the state object/strategy.

A change in state activates a change in strategy. The strategy 
is dynamic and can change during the lifetime of the context and
this allows its behaviour to change depending on the state.