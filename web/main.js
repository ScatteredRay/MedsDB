console.log("main begun.");

function onDepsLoaded() {
    console.log("All scripts loaded.");
}

function onAllReady() {
    console.log("All ready.");
}

var DBPromise = firebaseScript.then(() => {
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

Promise.all([preactScript, DBPromise]) .then(() => {
    var db = firebase.firestore();

    console.log("begin render.");

    class MedEntry extends preact.Component {
        constructor(name) {
            super();
            this.state.name = name;
        }
        render(props, state) {
            console.log("render");
            return preact.h('div', {id: "main"}, "hai");//state.name)
        }
    }

    console.dir(db);
    console.dir(db.collection("medications"));

    db.collection("medications").onSnapshot((query) => {
        console.dir(query);
        query.forEach((doc) => {
            const entry = new MedEntry(doc.data().name);
            preact.render(preact.h('MedEntry'),
                          document.body);
            console.log(`${doc.id} => ${doc.data().name}`);
        });
    },
    (err) => {
        console.log(err);
    });
});

console.log("main done.");
