/**
 * Send push notification to the client
 * @param {string} message message for push notification
 * @param {string} body description for push notification **/
function notification(message, body) {
  const img = "../assets/logo.svg";
  const notification = new Notification(message, {
    body: body,
    icon: img,
  });
}

/**
 * Ask user whether to show the push notifcation.
**/
function requestNotification() {
  try {
    Notification.requestPermission().then(
      localStorage.setItem("ask-notification", false)
    );
  } catch (err) {
    console.log(err);
  }
}

export { notification, requestNotification };
