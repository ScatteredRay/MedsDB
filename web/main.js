console.log("main begun.");

function onDepsLoaded() {
    console.log("All scripts loaded.");
}

function onAllReady() {
    console.log("All ready.");
}

firebaseScript.then(() => {
    var config = {
        apiKey: "AIzaSyCQj7xr0sOQ8XnlvH6KphMgHsh_SVrAZAY",
        authDomain: "medsdb-6e5d9.firebaseapp.com",
        databaseURL: "https://medsdb-6e5d9.firebaseio.com",
        projectId: "medsdb-6e5d9",
        storageBucket: "medsdb-6e5d9.appspot.com",
        messagingSenderId: "890420888649"
    };
    firebase.initializeApp(config);

    console.log("firebase initialized.");
});

console.log("main done.");
