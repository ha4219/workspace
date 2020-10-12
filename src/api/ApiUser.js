const { dbService } = require("fbase")

export const getUserData = async(uid) => {
    const data = await dbService.doc(`user/${uid}`).get();
    console.log(data, data.data());
    return data.data();
}


