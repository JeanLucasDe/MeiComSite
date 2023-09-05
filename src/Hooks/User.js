{/**import {auth} from "../Service/firebase"


const User = []


auth.onAuthStateChanged(user => {
    if (user) {
        const {uid, displayName, photoURL, email} = user
        if (!displayName || !photoURL) {
            throw new Error('Usuário sem Nome ou foto')
        }
        User.push({
            id: uid,
            avatar: photoURL,
            name: displayName,
            email
        })
    }
})



export default User*/}

