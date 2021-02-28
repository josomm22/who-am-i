import firebase from '../firebase';

export function sortDescending(arr) {
    return arr.sort((a, b) => (a.date < b.date) ? 1 : -1);

};

export function sendPlayersToDB(obj) {
    firebase.firestore().collection('players').add({
        name: obj.name,
        id: obj.id,
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
};

export function getPlayers() {
    firebase.firestore().collection("players").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc);
        });
    });
};


export function getPlayersLive(callback) {
    let players = [];

    var query = firebase.firestore()
        .collection('players')
        .orderBy('name', 'desc')
    // .limit(num);

    // Start listening to the query.
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === 'added') {
                let message = change.doc.data();
                players = [...players, message];

            }



            // console.log(players);


        })
        callback(players);


    });
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
    return firebase.firestore().collection('users').doc(user.uid).set({
        userName: user.displayName,
        photoURL: photoURL
    })
};
export function getUserNameFromUID(uid) {

    return firebase.firestore().collection('users').doc(uid).get().then(function (doc) {
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