export default function ProfilePic({ first, last, email, url }) {
    console.log(first, last, email, url);
    return (
        <div>
            <h2>Component ProfilePic:</h2>
            <img src={url}></img>
            <p>
                Name: {first} {last}
            </p>
            <p>Contact: {email}</p>
        </div>
    );
}
