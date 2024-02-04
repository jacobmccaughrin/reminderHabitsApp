var myInterval;

Notification.requestPermission(function(result) {
 if (result === 'granted') {
  navigator.serviceWorker.ready.then(function(registration) {
   myInterval = setInterval(function () {
     registration.showNotification('Notification with ServiceWorker')
   }, 5000);
  });
 } else if (result !== 'granted') {
    navigator.serviceWorker.ready.then(function(registration) {
     myInterval = setInterval(function () {
       registration.showNotification('Disabled Notification permissions!')
     }, 5000);
    });
   }
});
