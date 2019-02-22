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

    const MedEntry = (props) => {
            console.log("render " + props.name);
            return preact.h('div', {id: "main"}, props.name)
    };

    class MedList extends preact.Component {
        constructor() {
            console.log("Construct");
            //console.dir(state);
            super();
            db.collection("medications").onSnapshot((query) => {
                var meds = [];
                console.dir(query);
                query.forEach((doc) => {
                    console.dir(doc);
                    meds.push(doc.data());
                });
                console.log("medS");
                meds.map((med) => { console.log(med); });
                this.setState({"meds": meds});
            },
            (err) => {
                console.log(err);
            });
        }

        render(props, state) {
            console.log("medlist render");
            console.dir(state);
            var meds = "main";
            if(typeof(state.meds) !== 'undefined') {
                meds = state.meds.map((med) => {
                    console.log("map");
                    console.dir(med);
                    //return MedEntry(med);
                    return preact.h(MedEntry, med);
                });
            }
            //var meds = "ho";
            return preact.h('div', {id: "main"}, meds);
        }
    }

    //preact.render(preact.h(MedList), document.body);
    preact.render(preact.h('div', {}, preact.h(MedList)), document.body);

    console.dir(db);
    console.dir(db.collection("medications"));

});

console.log("main done.");
