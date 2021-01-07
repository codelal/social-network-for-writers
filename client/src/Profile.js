import ProfilePic from "./profilepic";

export default function Profile({ first, last, url }) {
    console.log(first, last);
    return (
        <div>
            <h1>User Profile Component</h1>
            <ProfilePic url={url} alt={first}/>
        </div>
    );
}
