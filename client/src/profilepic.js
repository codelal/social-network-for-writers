export default function ProfilePic({
    first,
    last,
    email,
    url,
    toggleUploader,
}) {
    console.log("no url", url);
    if (!url) {
        url = "../defaultpic.png";
    }

    return (
        <div className="profile-pic-container">
            <img onClick={toggleUploader} src={url} alt="profile-picture"></img>
            <p>
                Name: {first} {last}{" "}
            </p>
            <p>Contact: {email}</p>
        </div>
    );
}
