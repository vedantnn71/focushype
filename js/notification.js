function notification(message, body) {
  const img = "../assets/logo.svg";
  const notification = new Notification(message, {
    body: body,
    icon: img,
  });
}

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
