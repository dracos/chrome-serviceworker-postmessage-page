var postTextToClient = response => {
    self.clients.matchAll().then(clients => 
        clients.map(client => {
            console.log('Posting ' + response.url + ' to client ' + client.id);
            client.postMessage(response.url);
        })
    );
    return response;
};

self.addEventListener("install", event => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
    var request = event.request;
    console.log('Fetch event received for ' + request.url);
    return event.respondWith(
        fetch(request).then(postTextToClient)
    );
});
