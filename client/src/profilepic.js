export default function ProfilePic({
    first,
    last,
    email,
    url,
    toggleUploader,
}) {
    if (url === null) {
        url = "../defaultpic.png";
    }

    return (
        <div className ="profile-pic">
            <img className ="profile-pic"
                onClick={toggleUploader}
                src={url}
                alt={first}
            ></img>
            <p className="a">
                {first} {last}{" "}
            </p>
            <p>Contact: {email}</p>
        </div>
    );
}
