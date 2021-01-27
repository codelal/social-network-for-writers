export default function ProfilePic({ url, first, last, email, toggleUploader }) {
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
