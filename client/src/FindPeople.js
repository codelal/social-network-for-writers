import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function FindPeople() {
    const [latestUsers, setLatestUsers] = useState([]);
    const [input, setInput] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        let abort;
        axios
            .get("/api/latest-users")
            .then(({ data }) => {
                setLatestUsers(data);
            })
            .catch((err) => {
                console.log("error in api/latest-users", err);
                setError(true);
            });

            
        if (input.length) {
            axios
                .get(`/api/find-users/${input}`)
                .then(({ data }) => {
                    if (!abort) {
                        setSelectedUsers(data);
                    }
                })
                .catch((err) => {
                    console.log("error in api/latest-users", err);
                    setError(true);
                });
        }

        return () => {
            abort = true;
        };
    }, [input]);

    return (
        <div className="find-people-container">
            <h2>Find other people</h2>
            {error && <p className ="error">Something went wrong,try again!</p>}
            <input
                placeholder="Type a name here..."
                onChange={(e) => setInput(e.target.value)}
            />
            {!input.length && (
                <ul className="users">
                    {latestUsers.map((user) => (
                        <div key={user.id}>
                            <Link to={`/find-people/${user.id}`}>
                                {!user.url && <img src="../defaultpic.png" />}
                                {user.url && <img src={user.url} />}
                            </Link>
                            {user.first} {user.last}
                        </div>
                    ))}
                </ul>
            )}
            {input.length > 0 && (
                <ul className="users">
                    {selectedUsers.map((selectedUser) => (
                        <div key={selectedUser.id}>
                            <Link to={`/find-people/${selectedUser.id}`}>
                                {!selectedUser.url && (
                                    <img src="../defaultpic.png" />
                                )}
                                {selectedUser && <img src={selectedUser.url} />}
                            </Link>
                            {selectedUser.first} {selectedUser.last}
                        </div>
                    ))}
                </ul>
            )}

            {input.length > 0 && !selectedUsers.length && <p className ="no-results">No results</p>}
        </div>
    );
}
