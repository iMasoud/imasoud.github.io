//TODO: validate step Two

function  renderAll()
{
    ReactDOM.render(
        <DFASimulator />,
        document.getElementById('DFASimulator')
    );
}

function removeFromArray(array, value)
{
    var arr = array.slice();

    for(var i=0; i<arr.length; i++)
    {
        if(arr[i] == value)
        {
            arr.splice(i, 1);
        }
    }

    return arr;
}

var DFASimulator = React.createClass({

    getInitialState: function()
    {
        return {
            step: 1,
            alphabet: [''],
            states: [''],
            finalStateIndexes: [],
            initialStateIndex: 0
        };
    },

    nextPage: function()
    {
        var step = this.state.step;

        if(step == 1)
        {
            // check for duplicates
            var sorted_arr = this.state.alphabet.slice().sort();
            var has_duplicates = false;
            for (var i = 0; i < sorted_arr.length - 1; i++)
            {
                if (sorted_arr[i + 1] == sorted_arr[i])
                {
                    has_duplicates = true;
                }
            }

            // check for empty fields
            var has_empty = false;
            for(var i=0; i<sorted_arr.length; i++)
            {
                if(sorted_arr[i] == '')
                {
                    has_empty = true;
                }
            }

            // check if there is at least one character
            var no_character = false;
            var length = this.state.alphabet.length;
            if(length < 1)
            {
                no_character = true;
            }

            if(has_empty)
            {
                sweetAlert(
                    'Something is Wrong!',
                    'Empty fields are not allowed!',
                    'error'
                );
            }
            else if(has_duplicates)
            {
                sweetAlert(
                    'Something is Wrong!',
                    'Duplicated characters are not allowed!',
                    'error'
                );
            }
            else if(no_character)
            {
                sweetAlert(
                    'Something is Wrong!',
                    'You should define at least one character!',
                    'error'
                );
            }
            else
            {
                this.setState({step: this.state.step+1});
            }
        }
        else if(step == 2)
        {
            // check for duplicates
            var sorted_arr = this.state.states.slice().sort();
            var has_duplicates = false;
            for (var i = 0; i < sorted_arr.length - 1; i++)
            {
                if (sorted_arr[i + 1] == sorted_arr[i])
                {
                    has_duplicates = true;
                }
            }

            // check for empty fields
            var has_empty = false;
            for(var i=0; i<sorted_arr.length; i++)
            {
                if(sorted_arr[i] == '')
                {
                    has_empty = true;
                }
            }

            // check if there is a valid initial state
            var invalid_initial = false;
            var index = this.state.initialStateIndex;
            var length = this.state.states.length;
            if(index < 0 || index > (length-1))
            {
                invalid_initial = true;
            }

            // check if there is at least one state
            var no_state = false;
            var length = this.state.states.length;
            if(length < 1)
            {
                no_state = true;
            }

            if(has_duplicates)
            {
                sweetAlert(
                    'Something is Wrong!',
                    'Duplicated state names are not allowed!',
                    'error'
                );
            }
            else if(has_empty)
            {
                sweetAlert(
                    'Something is Wrong!',
                    'Empty fields are not allowed!',
                    'error'
                );
            }
            else if(no_state)
            {
                sweetAlert(
                    'Something is Wrong!',
                    'You should define at least one state!',
                    'error'
                );
            }
            else if(invalid_initial)
            {
                sweetAlert(
                    'Something is Wrong!',
                    'You should mark one state as the initial state!',
                    'error'
                );
            }
            else
            {
                // Start generating default transitions
                var states = this.state.states;
                var alphabet = this.state.alphabet;

                var transitions = {};
                for(var i=0; i<states.length; i++)
                {
                    transitions[states[i]] = {};
                    for(var j=0; j<alphabet.length; j++)
                    {
                        transitions[states[i]][alphabet[j]] = states[0];
                    }
                }
                // End generating default transitions
                this.setState({transitions: transitions, step: this.state.step+1});
            }
        }
        else if(step == 3)
        {
            this.setState({step: this.state.step+1});
        }
    },

    addState: function()
    {
        var newStates = this.state.states.slice();
        newStates.push('');
        this.setState({states: newStates});
    },

    removeState: function(index)
    {
        var newStates = this.state.states.slice();
        newStates.splice(index, 1);

        var newFinalStateIndexes = this.state.finalStateIndexes.slice();
        newFinalStateIndexes = removeFromArray(newFinalStateIndexes, index);
        for(var i=0; i<newFinalStateIndexes.length; i++)
        {
            if(newFinalStateIndexes[i] > index)
            {
                newFinalStateIndexes[i] = newFinalStateIndexes[i] - 1;
            }
        }

        var newInitialStateIndex = this.state.initialStateIndex;
        if(newInitialStateIndex == index)
        {
            newInitialStateIndex = -1;
        }
        else if(newInitialStateIndex > index)
        {
            newInitialStateIndex = newInitialStateIndex - 1;
        }

        this.setState({states: newStates, finalStateIndexes: newFinalStateIndexes, initialStateIndex: newInitialStateIndex});
    },

    updateState: function(value, index)
    {
        var newStates = this.state.states.slice();
        newStates[index] = value;
        this.setState({states: newStates});
    },

    addChar: function()
    {
        var newAlphabet = this.state.alphabet.slice();
        newAlphabet.push('');
        this.setState({alphabet: newAlphabet});
    },

    removeChar: function(index)
    {
        var newAlphabet = this.state.alphabet.slice();
        newAlphabet.splice(index, 1);
        this.setState({alphabet: newAlphabet});
    },

    updateChar: function(char, index)
    {
        var newAlphabet = this.state.alphabet.slice();
        newAlphabet[index] = char;
        this.setState({alphabet: newAlphabet});
    },

    addCheck: function(index)
    {
        var newFinalStateIndexes = this.state.finalStateIndexes.slice();
        newFinalStateIndexes.push(index);
        this.setState({finalStateIndexes: newFinalStateIndexes});
    },

    removeCheck: function(index)
    {
        var newFinalStateIndexes = this.state.finalStateIndexes.slice();
        newFinalStateIndexes = removeFromArray(newFinalStateIndexes, index);
        this.setState({finalStateIndexes: newFinalStateIndexes});
    },

    changeRadio: function(index)
    {
        this.setState({initialStateIndex: index});
    },

    updateTransition: function(state, char, value)
    {
        var newTransitions = Object.assign({}, this.state.transitions);
        newTransitions[state][char] = value;
        this.setState({transitions: newTransitions});
    },

    run: function(string)
    {
        var characters = string.split('');

        /* start validating string characters */
        var alphabet = this.state.alphabet;
        var str_chars_are_valid = true;
        for(var i=0; i<characters.length; i++)
        {
            if(alphabet.indexOf(characters[i]) < 0)
            {
                str_chars_are_valid = false;
            }
        }
        /* end validating string characters */

        if(str_chars_are_valid)
        {
            var states = this.state.states;
            var transitions = this.state.transitions;
            var initialStateIndex = this.state.initialStateIndex
            var finalStateIndexes = this.state.finalStateIndexes;

            var start = states[initialStateIndex];
            var finalStates = [];
            for(var i=0; i<finalStateIndexes.length; i++)
            {
                finalStates.push(states[finalStateIndexes[i]]);
            }

            
            var state = start;

            for(var i=0; i<characters.length; i++)
            {
                var char = characters[i];
                state = transitions[state][char];
            }

            if(finalStates.indexOf(state) >= 0)
            {
                return 'accepted';
            }
            else
            {
                return 'rejected';
            }
        }
        else
        {
            return 'invalid';
        }
    },

    restart: function()
    {
        this.setState({
            step: 1,
            alphabet: [''],
            states: [''],
            transitions: {},
            finalStateIndexes: [],
            initialStateIndex: 0
        });
    },

    render: function()
    {
        var body;

        var step = this.state.step;
        var states = this.state.states;
        var alphabet = this.state.alphabet;
        var initialStateIndex = this.state.initialStateIndex;
        var finalStateIndexes = this.state.finalStateIndexes;
        
        var addChar = this.addChar;
        var removeChar = this.removeChar;
        var updateChar = this.updateChar;
        var addState = this.addState;
        var removeState = this.removeState;
        var updateState = this.updateState;
        var addCheck = this.addCheck;
        var removeCheck = this.removeCheck;
        var changeRadio = this.changeRadio;
        var updateTransition = this.updateTransition;
        var run = this.run;
        var restart = this.restart;

        if(step == 1)
        {
            body = (<Alphabet alphabet={alphabet} add={addChar} remove={removeChar} update={updateChar}/>);
        }
        else if(step == 2)
        {
            body = (<States states={states} initialIndex={initialStateIndex} finalIndexes={finalStateIndexes} addState={addState} removeState={removeState} updateState={updateState} addCheck={addCheck} removeCheck={removeCheck} changeRadio={changeRadio}/>);
        }
        else if(step == 3)
        {
            body = (<Transitions states={states} alphabet={alphabet} updateTransition={updateTransition}/>);
        }
        else if(step == 4)
        {
            body = (<Run run={run} restart={restart}/>);
        }

        return(
            <div className="panel panel-default" style={{marginTop:'7%'}}>


                <div className="panel-heading">
                    <Header step={this.state.step} />
                </div>


                <div className="panel-body">
                    {body}
                </div>


                <Footer step={this.state.step} nextPage={this.nextPage}/>


            </div>
        );
    }

});

var Header = React.createClass({

    render: function()
    {
        var title;
        var step = this.props.step;

        if(step == 1)
        {
            title = 'Step One: Alphabet';
        }
        else if(step == 2)
        {
            title = 'Step Two: States';
        }
        else if(step == 3)
        {
            title = 'Step Three: Transition Function';
        }
        else if(step == 4)
        {
            title = 'Run Your DFA';
        }

        return(
            <ul className="breadcrumb" style={{marginBottom: '0'}}>
                {title}
            </ul>
        );
    }
});

var Footer = React.createClass({

    render: function()
    {
        var step = this.props.step;
        
        if(step == 4)
        {
            return null;
        }
        else
        {
            
            var text;

            if(step == 1)
            {
                text = 'Step Two: States ' + String.fromCharCode( "8594" );
            }
            else if(step == 2)
            {
                text = 'Step Three: Transition Function ' + String.fromCharCode( "8594" );
            }
            else if(step == 3)
            {
                text = String.fromCharCode( "10004" ) + ' Run This DFA';
            }

            var link = (<a onClick={this.props.nextPage} className="pc">{text}</a>);

            return(
                <div className="panel-footer">
                    <ul className="pager" style={{margin: '0'}}>
                        <li className="next">{link}</li>
                    </ul>
                </div>
            );
        }
    }
});

var Alphabet = React.createClass({

    addRow: function()
    {
        this.props.add();
    },

    render: function()
    {
        var alphabet = this.props.alphabet;
        var self = this;

        var rows = alphabet.map(function(char, index)
        {
            return <AlphabetRow char={char} index={index} remove={self.props.remove} update={self.props.update} key={index}/>
        });

        return (
            <div className="container">

                {rows}

                <div className="row" style={{marginTop: '1%'}}>
                    <div className="col-md-5"></div>
                    <div className="col-md-2" style={{fontSize: '300%'}}><a onClick={this.addRow}><i className="fa fa-plus-circle pc" aria-hidden="true"></i></a></div>
                    <div className="col-md-5"></div>
                </div>

            </div>
        );
    }

});

var AlphabetRow = React.createClass({

    handleChange: function(event)
    {
        var index = this.props.index;
        var value = event.target.value;

        this.props.update(value, index);
    },

    handleRemove: function()
    {
        var index = this.props.index;

        this.props.remove(index);
    },

    render: function()
    {
        var char = this.props.char;
        var number = this.props.index + 1;

        var placeholder = 'Symbol for Character No. ' + number;

        return (
            <div className="row" style={{marginTop: '1%'}}>
                <div className="col-md-2"><h4>#{number} Character:</h4></div>
                <div className="col-md-8">
                    <input type="text" className="form-control" placeholder={placeholder} value={char} onChange={this.handleChange} maxLength="1"></input>
                </div>
                <div className="col-md-1" style={{fontSize: '200%'}}><a onClick={this.handleRemove}><i className="fa fa-minus-circle pc" aria-hidden="true"></i></a></div>
                <div className="col-md-1"></div>
            </div>
        );
    }

});

var States = React.createClass({

    addRow: function()
    {
        this.props.addState();
    },

    render: function()
    {
        var states = this.props.states;
        var self = this;

        var rows = states.map(function(name, index)
        {
            var isInitial = (self.props.initialIndex == index);
            var isFinal = (self.props.finalIndexes.indexOf(index) >= 0);

            return (<StateRow name={name} isInitial={isInitial} isFinal={isFinal} removeState={self.props.removeState} updateState={self.props.updateState} addCheck={self.props.addCheck} removeCheck={self.props.removeCheck} changeRadio={self.props.changeRadio} addState={self.props.addState} index={index} key={index}/>);
        });

        return (
            <div className="container">

                {rows}

                <div className="row" style={{marginTop: '1%'}}>
                    <div className="col-md-5"></div>
                    <div className="col-md-2" style={{fontSize: '300%'}}><a onClick={this.addRow}><i className="fa fa-plus-circle" aria-hidden="true"></i></a></div>
                    <div className="col-md-5"></div>
                </div>

            </div>
        );
    },

});

var StateRow = React.createClass({

    checkHandler: function(event)
    {
        var index = this.props.index;
        this.check = !this.check;

        if(this.check == true)
        {
            this.props.addCheck(index);
        }
        else
        {
            this.props.removeCheck(index);
        }
    },

    radioHandler: function(event)
    {
        var index = this.props.index;

        this.props.changeRadio(index);        
    },

    removeHandler: function()
    {
        var index = this.props.index;

        this.props.removeState(index);
    },

    nameHandler: function(event)
    {
        var index = this.props.index;
        var value = event.target.value;

        this.props.updateState(value, index);
    },

    render: function()
    {
        this.check = this.props.isFinal;
        this.radio = this.props.isInitial;

        var check = this.check;
        var radio = this.radio;
        var name = this.props.name;
        var index = this.props.index;
        var number = index + 1;
        var placeholder = "Name of State No. " + number;

        return (
            <div className="row" style={{marginTop: '1%'}}>
                <div className="col-md-2"><h4>#{number} State Name:</h4></div>
                <div className="col-md-4">
                    <input type="text" className="form-control" value={name} onChange={this.nameHandler} placeholder={placeholder}></input>
                </div>
                <div className="col-md-2" style={{marginTop: '1%'}}>
                    <input type="checkbox" checked={check} onChange={this.checkHandler}></input>
                    &nbsp;Is a Final State
                </div>
                <div className="col-md-2" style={{marginTop: '1%'}}>
                    <input type="radio" value={index} name="initial" checked={radio} onChange={this.radioHandler}></input>
                    &nbsp;Is the Initial State
                </div>
                <div className="col-md-1" style={{fontSize: '200%'}}><a onClick={this.removeHandler}><i className="fa fa-minus-circle" aria-hidden="true"></i></a></div>
                <div className="col-md-1"></div>
            </div>
        );
    }

});

var Transitions = React.createClass({

    render: function()
    {
        var states = this.props.states;
        var alphabet = this.props.alphabet;
        var self = this;

        var rows = states.map(function(name, index)
        {
            var updateTransition = self.props.updateTransition;

            return (<TransitionRow name={name} states={states} alphabet={alphabet} updateTransition={updateTransition} key={index}/>);
        });

        return (
            <div className="container">

                {rows}

            </div>
        );
    }

});

var TransitionRow = React.createClass({

    render: function()
    {
        var name = this.props.name;
        var states = this.props.states;
        var alphabet = this.props.alphabet;
        var self = this;

        var subRows = alphabet.map(function(char, index)
        {
            var updateTransition = self.props.updateTransition;

            return (<TransitionSubRow char={char} name={name} states={states} updateTransition={updateTransition} key={index}/>);
        });

        return (
            <div className="row" style={{marginTop: '1%'}}>
                <div className="col-md-11">
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <h3 className="panel-title">State '{name}':</h3>
                        </div>
                        <div className="panel-body">

                            {subRows}

                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

var TransitionSubRow = React.createClass({

    changeHandler: function(event)
    {
        var name = this.props.name;
        var char = this.props.char;
        var value = event.target.value;
        
        this.props.updateTransition(name, char, value);
    },

    render: function()
    {
        var char = this.props.char;
        var states = this.props.states;
        var self = this;

        var options = states.map(function(state, index)
        {
            return (<option key={index}>{state}</option>)
        });

        return (
            <div className="row" style={{marginTop: '1%'}}>
                <div className="col-md-3" style={{marginTop: '1%'}}>
                    Transition with Character '{char}':
                </div>
                <div className="col-md-9">
                    <select className="form-control" onChange={this.changeHandler}>
                        
                        {options}

                    </select>
                </div>
            </div>
        );
    }

});

var Run = React.createClass({

    getInitialState: function()
    {
        return {
            string: ''
        }
    },

    updateString: function(event)
    {
        var value = event.target.value;

        this.setState({string: value});
    },

    run: function()
    {
        var string = this.state.string;

        var result = this.props.run(string);

        if(result == 'accepted')
        {
            sweetAlert(
                'String Accepted!',
                'String "' + string + '" Accepted by the DFA!',
                'success'
            );
        }
        else if(result == 'rejected')
        {
            sweetAlert(
                'String Rejected!',
                'String "' + string + '" Rejected by the DFA!',
                'error'
            );
        }
        else /* restart == 'invalid' */
        {
            sweetAlert(
                'String is Invalid!',
                'String "' + string + '" has characters that are not present in DFA alphabet!',
                'error'
            );
        }
    },

    restart: function()
    {
        this.props.restart();
    },

    render: function()
    {
        var run = this.run;
        var restart = this.restart;
        var string = this.state.string;

        return (
            <div className="container">

                <div className="row" style={{marginTop: '1%'}}>
                    <div className="col-md-3">
                        <h4>
                            String to Run DFA with:
                        </h4>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="DFA Input String" value={string} onChange={this.updateString}></input>
                    </div>
                    <div className="col-md-2">
                        <a className="btn btn-success pc" onClick={run}>
                            Run DFA
                        </a>
                    </div>
                    <div className="col-md-1"></div>
                </div>

                <div className="row" style={{marginTop: '2.4%'}}>
                    <div className="col-md-5"></div>
                    <div className="col-md-2 pc"  onClick={restart}>
                        <a className="btn btn-primary disabled">
                            <i className="fa fa-repeat" aria-hidden="true"></i> &nbsp; Try Another DFA
                        </a>
                    </div>
                    <div className="col-md-5"></div>
                </div>

            </div>
        );
    }

});

// Initiate application
renderAll();
