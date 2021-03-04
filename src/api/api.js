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
export function sendSessionInfo(sessionID, players) {
    db.collection('session').doc(sessionID).set({
        sessionID,
        players
    }).then(() => {
        console.log("session updated");
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
            session: player.session,
            isWinner: false
        })
    });
    batch.commit().then(() => {
        console.log("success");
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
};

export function updateGameStatus(players, selectedPlayerID, word) {
    let batch = db.batch();
    players.forEach(player => {
        const updateRef = db.collection('players').doc(player.id)
        batch.update(updateRef, {
            gameData: {
                currentPlayerID: selectedPlayerID,
                currentPlayerName: players.find(player => player.id === selectedPlayerID).name,
                word: selectedPlayerID === player.id ? "Guess who you are..." : word
            }
        })
    });
    batch.commit().then(() => {
        console.log("success");
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

export function getPlayers() {
    db.collection("players").get().then((querySnapshot) => {
        querySnapshot.forEach(() => {
            // console.log({ ...doc.data() });
        });
    });
};

export async function getSession(sessionID) {

    let response = await db.collection("session").doc(sessionID).get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            return doc.data()
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    console.log("response", response)
    return response
}

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

export function notifyWinner(playerID, isWinner) {
    db.collection('players').doc(playerID).update({
        isWinner: isWinner
    }).catch((error) => {
            console.error("Error adding document: ", error);
        });
}