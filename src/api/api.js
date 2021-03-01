import firebase from '../firebase';
const db = firebase.firestore();

export function sendPlayerToDB(obj) {
    db.collection('players').add({
        name: obj.name,
        id: obj.id,
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
};

export function sendPlayersArrayToDB(array) {
    let batch = db.batch();
    array.forEach(player => {
        const newRef = db.collection('players').doc(player.id)
        batch.set(newRef, {
            name: player.name,
            id: player.id,
            session: player.session
        })
    });
    batch.commit().then((docRef) => {
        console.log("success");
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
};

export function getPlayers() {
    db.collection("players").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log({ ...doc.data() });
        });
    });
};

export function getUpdatedPlayerInfo(playerID, callback) {
    let playerInfo = {};
    db.collection("players").doc(playerID).onSnapshot(
        (doc => {
            playerInfo = { ...doc.data() }
            console.log("Current data: ", playerInfo);
            callback(playerInfo);
        })
    );
};

export function checkUserDB(user) {
    let photoURL;
    if (!user.photoURL) {
        photoURL = `http://via.placeholder.com/150/0000FF/FFFFFF/?text=${user.displayName[0]}`;
        user.updateProfile({
            photoURL: photoURL,
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    } else {
        photoURL = user.photoURL;
    }
    return db.collection('users').doc(user.uid).set({
        userName: user.displayName,
        photoURL: photoURL
    })
};
export function getUserNameFromUID(uid) {

    return db.collection('users').doc(uid).get().then(function (doc) {
        if (doc.exists) {
            // console.log("Document data:", doc.data().userName);
            let userData = doc.data()
            return userData;

        } else {
            // console.log("No such document!");
            let userData = 'Legacy'
            return userData;

        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

};