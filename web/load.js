function loadPromise(src) {
    return new Promise((resolve, reject) => {
        console.log("Requesting " + src);
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        script.onload = () => {
            console.log("Loaded " + src);
            resolve(script);
        }
        script.onerror = (err) => {
            console.log("Failed to load " + src);
            reject(err);
        }
        document.head.appendChild(script);
    });
}

var allScripts = [];

var preactScript = loadPromise("https://cdn.jsdelivr.net/npm/preact/dist/preact.min.js");
allScripts.push(preactScript);
var firebaseScript = loadPromise("https://www.gstatic.com/firebasejs/5.8.2/firebase.js");
allScripts.push(firebaseScript);
var mainScript = loadPromise("main.js");
allScripts.push(mainScript);

Promise.all(allScripts).then(() => { onDepsLoaded(); }, (err) => { throw err; });

var onReady = new Promise((resolve, reject) => {
    if(document.readyState === "complete" ||
       document.readyState === "loaded" ||
       document.readyState === "interactive") {
        resolve(document)
    }
    else {
        document.addEventListener('DOMContentLoaded', () => { resolve(document); }, false);
    }
});

Promise.all(allScripts.concat(onReady)).then(() => { onAllReady(); }, (err) => { throw err; });
