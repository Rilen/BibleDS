fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAaYoRVZR1KdkrcSajQDun3HD_ntUSacNI", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: "Quem é Jesus?" }] }] })
})
    .then(r => r.json())
    .then(j => console.log(JSON.stringify(j, null, 2)))
    .catch(console.error);
