---
author: gbmhunter
date: 2011-09-22 05:57:48+00:00
draft: false
title: A Function Pointer Based State Machine
type: page
url: /programming/general/control-methodology/a-function-pointer-based-state-machine
---

# Overview




This type of state machine involves:





	  * An enumeration of all possible states
	  * An enumeration of all possible events
	  * A state transition matrix (array) where each row contains a state, and event, and the next state to tramsition to
	  * Another array which maps each state with a state function pointer that gets called.
	  * A simple main loop that does not need to be edited (all the control is changed by modifying the state transition matrix)



# Advantages And Disadvantages




**The advantages:**





	  * The 'flow' of the program is really easy to understand
	  * The 'flow' is really easy to change
	  * Function calling is fast, as there is no switch/if statement to determine function to call (instead uses function pointers)



**The disadvantages:**





	  * Single event to function-to-call correlation, i.e. you cannot call a function only when two or more events have occurred.
	  * It is not necessarily clear what the function-to-call does (i.e. does it change the state or keep in the same?)
	  * Event determination can be slow when 'if' statements are used.
	  * Can be potentially difficult to scale in larger programs, where you may want multiple state machines and threading. 



# An Example




This type of state machine is explained and demo'd below with a simple light flashing circuit that is turned on and off with a button press. When the button is pressed, the light starts flashing on/off every 2 seconds. Further button pushes toggle the light between the flashing mode and the off state.




The full, working example can be found at [https://github.com/mbedded-ninja/FunctionPointerStateMachineExample](https://github.com/mbedded-ninja/FunctionPointerStateMachineExample).




## The State And Event Enumerations




These enumerations hold values for every possible state and every possible event that your program will require. I have prefixed all states with ST_ and events with EV_ for readability. Sometimes, you could just use #define commands for every state and manually associate them with a number. But since the number doesn't actually matter, why not use an enumeration? Enumerations also allow you to insert new states/events anywhere on the list, allowing you to keep a visual clue of the flow between states/events (one after the other), which would get messy if you used the #define command.



    
    typedef enum {
        ST_INIT,
        ST_IDLE,
        ST_LED_ON,
        ST_LED_OFF
    } state_t;




Our events are defined in another enum:



    
    /// @brief      All the possible events that can occur for this state machine.
    /// @details    Unlike states_t, these do not need to be kept in a special order.
    typedef enum {
        EV_ANY,
        EV_NONE,
        EV_BUTTON_PUSHED,
        EV_TIME_OUT,
    } event_t;




## The State Transition Matrix




This following code defines a row in the state transition matrix (the state transition matrix is just an array of this structure). This structure contains the current state, an event, and the state to transition to.



    
    typedef struct {
        state_t currState;
        event_t event;
        state_t nextState;
    } stateTransMatrixRow_t;




The state transition matrix is the heart of this state machine methodology. It specifies what the next state should be, given the current state and the event that just occurred. It is built as an array of the current-state/event/next-state structure defined above.



    
    static stateTransMatrixRow_t stateTransMatrix[] = {
        // CURR STATE  // EVENT           // NEXT STATE
        { ST_INIT,     EV_ANY,               ST_IDLE    },
        { ST_IDLE,     EV_BUTTON_PUSHED,     ST_LED_ON  },
        { ST_LED_ON,   EV_TIME_OUT,          ST_LED_OFF },
        { ST_LED_ON,   EV_BUTTON_PUSHED,     ST_IDLE    },
        { ST_LED_OFF,  EV_TIME_OUT,          ST_LED_ON  },
        { ST_LED_OFF,  EV_BUTTON_PUSHED,     ST_IDLE    }
    };




## The State Function Array




The state function array holds a function pointer to the function which gets called for each state. In this example, we also store a printable state name for debugging purposes. Each row in the state function array is defined by a struct:



    
    typedef struct {
        const char * name;
        void (*func)(void);
    } stateFunctionRow_t;




And then the actual array is initialised as follows:



    
    /// @brief  Maps a state to it's state transition function, which should be called
    ///         when the state transitions into this state.
    /// @warning    This has to stay in sync with the state_t enum!
    static stateFunctionRow_t stateFunctionA[] = {
          // NAME         // FUNC
        { "ST_INIT",      &Led_Init },      // ST_INIT
        { "ST_IDLE",      &Led_Idle },      // ST_IDLE
        { "ST_LED_ON",    &Led_On },        // ST_LED_ON
        { "ST_LED_OFF",   &Led_Off },       // ST_LED_OFF
    };




**Note that this array has to stay in sync with the state_t enumeration. That is, there must be the same number of rows in stateFunctionA as there are states in state_t, and they must be in the same order.**




This could be mitigated by saving the state enumeration in the array also, and iterating over each element until you have found the state you are looking for. However, this will incur a performance penalty (which may be insignificant).




## The State Functions




The state functions are the functions which are called when the current state and event matches a pair in the state transition matrix. While the rest of the state machine controls the high-level flow, the state functions are the guts of the state machine and are the functions which actually DO THINGS.




These state functions below are only really stubs, and don't do much. Real life state functions might toggle GPIO pins, send bytes of data over UART, e.t.c.



    
    void Led_Init() {
        printf("Led_Init() called.\r\n");
    }
    
    void Led_On() {
        printf("LED turned on.\r\n");
    }
    
    void Led_Off() {
        printf("LED turned off.\r\n");
    }
    
    void Led_Idle() {
        printf("LED in idle state.\r\n");
    }




## The State Machine Internal Variables




This simple state machine needs to remember only one thing, the current state. As I am writing this code in a "C with classes" style, all the state machine's variables are declared in the stateMachine_t struct, as shown below:



    
    typedef struct {
        state_t currState;
    } stateMachine_t;




A pointer to this struct gets passed in as the first variable to all the state machine functions, just like the this object in an object-orientated world.




## The Get Event Function




The function provides the state machine with an event to act upon (incl. EV_NONE, if no real event occurred). In an embedded environment, this would do things like read GPIO pins to see if a button had been pushed, check a UART flag to see if a byte has been received, e.t.c.




In our example world, we will just check the flag buttonPushed, which simulates a button press.



    
    event_t StateMachine_GetEvent() {
        if(buttonPushed) {
            buttonPushed = false;
            return EV_BUTTON_PUSHED;
        }
    
        // No event
        return EV_NONE;
    }




## The State Machine RunIteration() Function




The RunIteration() function for this state machine is pretty generic and simple, and you don't usually have to modify it. All of the logic is controlled by the state transition matrix above. Essentially, the function gets an event (lets call it the current event), and then runs through the state transition matrix row by row to find a pre-defined state and event pair that match the current state and event. If so, it transitions to the specified next state, and then calls the state function pointed to by the function pointer.



    
    void StateMachine_RunIteration(stateMachine_t *stateMachine) {
        // Get an event
        event = StateMachine_GetEvent();
    
        // Iterate through the state transition matrix, checking if there is both a match with the current state
        // and the event
        for(int i = 0; i < sizeof(stateTransMatrix)/sizeof(stateTransMatrix[0]); i++) {
            if(stateTransMatrix[i].currState == stateMachine->currState) {
                if((stateTransMatrix[i].event == event) || (stateTransMatrix[i].event == EV_ANY)) {
    
                    // Transition to the next state
                    stateMachine->currState =  stateTransMatrix[i].nextState;
    
                    // Call the function associated with transition
                    (stateFunctionA[stateMachine->currState].func)();
                    break;
                }
            }
        }
    }




As mentioned above, the full working example can be found at [https://github.com/mbedded-ninja/FunctionPointerStateMachineExample](https://github.com/mbedded-ninja/FunctionPointerStateMachineExample).
