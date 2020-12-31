var dfa_transitions =
{
    'a':
    {
        '0': 'b',
        '1': 'a'
    },
    'b':
    {
        '0': 'b',
        '1': 'c'
    },
    'c':
    {
        '0': 'd',
        '1': 'a'
    },
    'd':
    {
        '0': 'd',
        '1': 'd'
    }
};
var dfa_start = 'a';
var final_states = ['d'];


/**
 * Gets transitions of a DFA and returns it's alphabet
 * @returns {Array} Array of characters
 * @param {Object} transitions Transitions of DFA
 */
function get_alphabet(transitions)
{
    var alphabet = new Array;

    for(state in transitions)
    {
        for(character in state)
        {
            alphabet.push(character);
        }
        break;
    }

    return alphabet;
}

/**
 * Gets transitions of a DFA and returns it's state names
 * @returns {Array} Array of state names
 * @param {Object} transitions Transitions of DFA
 */
function get_states(transitions)
{
    var states = new Array;

    for(state in transitions)
    {
        states.push(state);
    }

    return Array;
}

/**
 * Computes a string to see if it's accepted by the DFA or not
 * @returns {Boolean} True: Accepted, False: Rejected
 * @param {Array} alphabet Array of characters
 * @param {Array} states Array of state names
 * @param {Object} transitions Transitions of DFA
 * @param {String} start Name of initial state
 * @param {Array} final_states Array of accept state names
 * @param {String} string The string to compute by DFA
 */
function run(alphabet, states, transitions, start, final_states, string)
{
    var characters = string.split('');
    var state = start;

    for(var i=0; i<characters.length; i++)
    {
        var char = characters[i];
        state = transitions[state][char];
    }

    return (final_states.indexOf(state) >= 0);
}

// console.log(run(get_alphabet(dfa_transitions), get_states(dfa_transitions), dfa_transitions, dfa_start, final_states, '11110000011'));