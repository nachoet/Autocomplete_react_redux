import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../store/actions/userAction'
import "./styles.css";

const Autocomplete = () => {



    const dispatch = useDispatch()
    const usersList = useSelector(state => state.usersList)
    const { error, users } = usersList
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])


    const [usernameSuggestions, setUsernameSuggestions] = useState([]);
    const [input, setInput] = useState("");
    if (error) console.log(error);

    const autoCompleteValue = name => {
        setInput(name);
        setUsernameSuggestions([]);
    };

    const onTextChange = e => {
        setInput(e.target.value);
        let value = e.target.value.toLowerCase();
        if (value.length > 0) {
            let searchResults = [];

            for (let index = 0; index < users.length; index++) {
                let name = users[index].name.toLocaleLowerCase();

                if (name.startsWith(value, 0)) {
                    searchResults.push(users[index]);
                }
            }

            setUsernameSuggestions(
                searchResults.map((user, index) => {
                    let firstCharacter = user.name.substr(0, value.length);
                    let name = user.name;
                    name = name.replace(firstCharacter, "");

                    return (
                        <div
                            onClick={() => autoCompleteValue(searchResults[index].name)}
                            key={index}
                            id={index}
                        >
                            <strong>
                                {firstCharacter}
                            </strong>
                            {name}
                            <input type="hidden" value={name} />
                        </div>
                    )
                })
            );
        } else setUsernameSuggestions([]);
    }

    const onKeyDown = (key) => {
        if (key.keyCode === 13 || key.keyCode === 9) {
            setInput(input)
        }
    }

    return (
        <>
            < div className="App" >
                <h1>Autocomplete username suggestion</h1>

                <form autoComplete="off">
                    <div className="autocomplete">
                        <input
                            id="myInput"
                            type="text"
                            name="username"
                            placeholder="Enter user name"
                            onChange={onTextChange}
                            value={input}
                            style={{ width: "300px" }}
                            onKeyDown={onKeyDown}
                        />
                        <input type="submit" />
                    </div>
                    <div className="autocomplete-items">
                        {usernameSuggestions}
                    </div>
                </form>
            </div >
        </>
    )

}

export default Autocomplete