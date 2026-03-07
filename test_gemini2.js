fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyAaYoRVZR1KdkrcSajQDun3HD_ntUSacNI")
    .then(r => r.json())
    .then(j => console.log(JSON.stringify(j, null, 2)))
    .catch(console.error);
