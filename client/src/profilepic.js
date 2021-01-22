export default function ProfilePic({
    url,
    toggleUploader,
}) {
  
    if (!url) {
        url = "../defaultpic.png";
    }

    return (
        <div className="profile-pic-container">
            <img onClick={toggleUploader} src={url} alt="PROFILE - PIC"></img>
        </div>
    );
}
