import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
            console.log("input active");
            axios
                .get(`/api/find-users/${input}`)
                .then(({ data }) => {
                    console.log("data in /api/find-users", data);
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
            console.log("clean up running");
            abort = true;
        };
    }, [input]);

    return (
        <div className="find-people-container">
            <h2>Find other people</h2>
            {error && <p>Something went wrong,try again</p>}
            <input
                placeholder="Type a name here..."
                onChange={(e) => setInput(e.target.value)}
            />
            {!input.length && (
                <ul>
                    {latestUsers.map((user) => (
                        <div key={user.id}>
                            <Link to="/users/:6">
                                <img src={user.url} />{" "}
                            </Link>
                            {user.first}
                            {user.last}
                        </div>
                    ))}
                </ul>
            )}
            {input.length && (
                <ul>
                    {selectedUsers.map((selectedUser) => (
                        <div key={selectedUser.id}>
                            <img src={selectedUser.url} />
                            {selectedUser.first}
                            {selectedUser.last}
                        </div>
                    ))}
                </ul>
            )}
            {input != "" && input.length > 1 && <p>Nothing found</p>}
        </div>
    );
}
