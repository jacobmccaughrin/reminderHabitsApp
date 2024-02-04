/* notifications.js */

var myInterval;
var notificationsEnabled = false;

// Function to display browser notifications
function displayNotification(message) {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
        console.error("This browser does not support system notifications");
        return;
    }

    // Check if notification permission is granted
    if (Notification.permission === "granted") {
        // Create and display the notification
        var notification = new Notification("New Notification", {
            body: message,
            
        });
    } else if (Notification.permission !== "denied") {
        // Otherwise, request permission from the user
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                // If permission is granted, display the notification
                displayNotification(message);
            }
        });
    }
}

// Function to enable notifications
function enableNotifications() {
    notificationsEnabled = true;
    displayNotification("Enabled Notification permissions!");
    localStorage.setItem('notification', notificationsEnabled);
    
    // Start periodic notifications
    myInterval = setInterval(fetchNotifications, 5000); // 5 seconds in milliseconds
}

// Function to disable notifications
function disableNotifications() {
    clearInterval(myInterval); // Clear the interval to stop fetching notifications
    notificationsEnabled = false;
    localStorage.setItem('notification', notificationsEnabled);
    displayNotification("Disabled Notification permissions!"); // Display a notification confirming that notifications are disabled
}

// Function to fetch notifications
function fetchNotifications() {
    // Here you can put your notification fetching logic
    // For demonstration, let's display a message every 5 seconds
    displayNotification("This is a notification message!");
}
