function onFormSubmit(e) {
  var data = e.namedValues;

  // SAFETY: read email field (must match sheet header exactly)
  var emailValue = data["Email Address"];

  if (!emailValue || !emailValue[0]) {
    console.log("Email missing. Skipping trigger.");
    return;
  }

  var payload = {
    eventType: "music_band", //  CHANGE THIS PER FORM
    name: data["Team Leader (Person in Charge) - Full Name"][0],
    email: emailValue[0],
    teamName: data["Team Name"][0]
  };

  var options = {
    method: "post",
    headers: {
      "Authorization": "token <<actual token>>",
      "Accept": "application/vnd.github.v3+json"
    },
    contentType: "application/json",
    payload: JSON.stringify({
      event_type: "send_email",
      client_payload: payload
    })
  };

  UrlFetchApp.fetch(
    "https://api.github.com/repos/<<repo file path>>",
    options
  );
}
