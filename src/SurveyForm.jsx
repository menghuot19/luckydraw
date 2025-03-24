import React, { useState } from "react";

function SurveyForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  // Replace these with your actual bot token and chat ID
  const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN";
  const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID";

  // Function to get the user's current location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setError(""); // Clear any previous error
      },
      () => {
        setError("Unable to retrieve your location.");
      }
    );
  };

  // Function to send message to Telegram Bot API
  const sendToTelegram = async (data) => {
    // Construct the message text
    const message = `New Survey Submission:\nName: ${data.name}\nLatitude: ${data.location?.lat}\nLongitude: ${data.location?.lon}`;
    
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    try {
      const response = await fetch(telegramUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to send message to Telegram.");
      }
    } catch (error) {
      console.error("Telegram Error:", error);
    }
  };

  // Save submission to localStorage
  const saveToLocalStorage = (data) => {
    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    submissions.push(data);
    localStorage.setItem("submissions", JSON.stringify(submissions));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location) {
      alert("Please enter your name and get your location first.");
      return;
    }

    const data = {
      name,
      location,
      timestamp: new Date().toISOString(),
    };

    // Save data in localStorage
    saveToLocalStorage(data);

    // Send data to Telegram Bot
    await sendToTelegram(data);

    alert("Survey submitted successfully!");
    
    // Reset form state
    setName("");
    setLocation(null);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>User Survey</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <button type="button" onClick={handleGetLocation}>
            Get Current Location
          </button>
        </div>
        {location && (
          <div style={{ marginTop: "10px" }}>
            <p>
              <strong>Latitude:</strong> {location.lat}
            </p>
            <p>
              <strong>Longitude:</strong> {location.lon}
            </p>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ marginTop: "10px" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SurveyForm;
