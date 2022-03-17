/**
 * Send push notification to the client
 * @param {string} message message for push notification
 * @param {string} body description for push notification
 **/
function notification(message, body) {
  const img = "/icons/manifest-icon-192.maskable.png";
  const notify = new Notification(message, {
    body: body,
    icon: img,
  });

  notify.onclick(function () {
    notify.close();
    window.parent.focus();
  });
}

/**
 * Ask user whether to show the push notifcation.
 **/
function requestNotification() {
  try {
    Notification.requestPermission().then(function () {
      localStorage.setItem("ask-notification", false);
    });
  } catch (err) {
    console.log("Unexpected Error: ", err);
    localStorage.setItem("ask-notification", false);
  }
}

export { notification, requestNotification };
