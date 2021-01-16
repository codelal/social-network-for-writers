export default function ProfilePic({
    first,
    last,
    email,
    url,
    toggleUploader,
}) {
  
    if (!url) {
        url = "../defaultpic.png";
    }

    return (
        <div className="profile-pic-container">
            <img onClick={toggleUploader} src={url} alt="PROFILE - PIC"></img>
            <p>
                Name: {first} {last}{" "}
            </p>
            <p>Contact: {email}</p>
        </div>
    );
}
