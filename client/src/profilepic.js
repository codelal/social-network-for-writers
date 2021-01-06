export default function ProfilePic( {first, last, email, url, toggleUploader} ) {
    if (url === null) {
        url = "../defaultpic.png";
    }

    return (
        <div>
            <h2>Component ProfilePic:</h2>
            <img onClick={toggleUploader} src={url} alt={first}></img>
            <p>
                Name: {first} {last}
            </p>
            <p>Contact: {email}</p>
        </div>
    );
}
