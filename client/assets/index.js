//On Here
function sendMessage() {
  // Get the input field for the message
  const messageInput = document.getElementById("message");
  // Get the value from the input field and trim any whitespace
  const message = messageInput.value.trim();

  // If the message is not empty, proceed
  if (message !== "") {
    // Get the chat log container
    const chatLog = document.getElementById("chat-log");
    // Create a new XMLHttpRequest object for sending an HTTP request
    const xhr = new XMLHttpRequest();

    // Initialize a POST request to the /chat endpoint
    xhr.open("POST", "/chat");
    // Set the request header to indicate JSON data in the request body
    xhr.setRequestHeader("Content-Type", "application/json");

    // Define what happens when the request is successfully completed
    xhr.onload = function () {
      // If the request was successful (status 200)
      if (xhr.status === 200) {
        // Parse the JSON response to get the message
        const response = JSON.parse(xhr.responseText).message;
        console.log(response);

        // Create a container for the user's message
        const userMessageContainer = document.createElement("div");
        userMessageContainer.classList.add(
          "message-container",
          "user-message-container"
        );

        // Create a div for the user's message content
        const userMessage = document.createElement("div");
        userMessage.innerHTML = `<strong>You:</strong> ${message}`;

        // Add the user's message to the container
        userMessage.classList.add("user-message");
        userMessageContainer.appendChild(userMessage);
        // Append the user's message container to the chat log
        chatLog.appendChild(userMessageContainer);

        // Create a container for the bot's message
        const botMessageContainer = document.createElement("div");
        botMessageContainer.classList.add(
          "message-container",
          "bot-message-container"
        );

        // Create a div for the bot's message content
        const botMessage = document.createElement("div");
        botMessage.innerHTML = `<strong>Kiem:</strong> ${response}`;

        // Add the bot's message to the container
        botMessage.classList.add("bot-message");
        botMessageContainer.appendChild(botMessage);
        // Append the bot's message container to the chat log
        chatLog.appendChild(botMessageContainer);

        // Scroll the chat log to the bottom to show the new messages
        chatLog.scrollTop = chatLog.scrollHeight;

        // Clear the input field for the next message
        document.getElementById("message").value = "";
      }
    };

    // Send the POST request with the message as JSON
    xhr.send(JSON.stringify({ message: message }));
  }
}
