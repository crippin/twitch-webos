var vidi = document.querySelector('video')
var promise = vidi.play();

if (promise !== undefined) {
    promise.then(_ => {
    }).catch(error => {
        console.log(error);
    });
}