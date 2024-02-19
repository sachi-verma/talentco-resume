const profileReducer = (profile={
    name: "Your Name",
    location: "City, Country",
    github: "Github",
    linkedin: "LinkedIn",
    website: "Website",
    email: "Email",
    contact: "Contact",
    position: "Your Position",
    tagline: "Describe yourself in one line"
}, action) => {
    switch(action.type){
        case "MANAGE_PROFILE":
            return action.payload;
        default:
            return profile;
    }
}
export default profileReducer