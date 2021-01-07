import ProfilePic from "./profilepic";
import BioEditor from "./BioEditor";

export default function Profile({ first, last, url }) {
    console.log(first, last);
    return (
        <div className ="profile-container">
            <h2>User Profile Component</h2>
            <ProfilePic url={url} alt={first} name={first} last={last} />
            <BioEditor />
        </div>
    );
}
