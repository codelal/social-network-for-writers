import { useState, useEffect } from "react"; // useEffect is equivalent to ComponentDidUpdate
import axios from "./axios";

export default function Hello() {
    console.log("learn hooks");
    const [first, setFirst] = useState("Anna");
    const [query, setQuery] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        //console.log(`${first} works in useEffekt`);
        let abort;
        //if we want to use asyn function inside useEffekt muss in ein iffee, da in useEffekt nicht direkt async-await nutzen kann)
        (async () => {
            const { data } = await axios.get(
                `https://spicedworld.herokuapp.com/?q=${query}`
            );
            if (!abort) {
                console.log(data);
                setCountries(data);
                // = infinite loop // durch dieses appdate wird countries aktualisiert und immwe wenn countries akualisiert wird, rerenderd etc.
            }
        })();
        //cleanup function
        return () => {
            console.log(`About to replace ${query} with a new value`);
            abort = true;
        };
    }, [query]);

    return (
        <div>
            <h3>Hooks</h3>
            <input
                defaultValue={first}
                onChange={(e) => setFirst(e.target.value)}
            />
            <input
                onChange={(e) => setQuery(e.target.value)}
                placeholder="type country"
            />
            <ul>
                {countries.map((country, index) => (
                    <li key={index}>{country}</li>
                ))}
            </ul>
            {!countries.length && query && <li>Nothing Found</li>}
        </div>
    );
}

//key = {country.id}
