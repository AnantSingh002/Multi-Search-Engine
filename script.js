

async function searchWikipedia() {
  const query = document.getElementById("searchInput").value;
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`;

  const response = await fetch(url);
  const data = await response.json();

  let output = "";
  data.query.search.slice(0, 10).forEach((result) => {
    output += `
            <div>
                <h2>${result.title}</h2>
                <p>${result.snippet.replace(/<[^>]+>/g, "")}...</p>
                <a href="https://en.wikipedia.org/wiki/${
                  result.title
                }" target="_blank">Read more</a>
            </div>
        `;
  });
  document.getElementById("results").innerHTML = output;
}

async function searchGoogle() {
  const query = document.getElementById("searchInput").value;
  const apiKey = "AIzaSyDYkpsL28EKjzGAsnjw3s3MDN0WarGwcRY";
  const cx = "d3e3d1326ac62479d";
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`;

  const response = await fetch(url);
  const data = await response.json();
  displayResults(data.items);
}

function displayResults(items) {
  let output = "";
  items.forEach((item) => {
    output += `
            <div>
                <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                <p>${item.snippet}</p>
            </div>
        `;
  });
  document.getElementById("results").innerHTML = output;
}

// google - AIzaSyDYkpsL28EKjzGAsnjw3s3MDN0WarGwcRY

// --- gemini api---

const apiKey = "AIzaSyA_C5ejNSmlWOxoZ43ZsFqucX2Q9h1-AWE"; 

async function searchGemini() {
  const prompt = document.getElementById("searchInput").value; // Get text from input
  const description =
    "give a brief explation including all the major heads and the important details highlighting the essentinal information";

  const fullPrompt = description + " " + prompt;

  if (!prompt) {
    alert("Please enter a prompt.");
    return;
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json(); // Try to get error details
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${
          errorData.error.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    console.log(data); // Log the full response for debugging

    // Extract and display the generated text
    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text
    ) {
      const generatedText = data.candidates[0].content.parts[0].text;
      document.getElementById("results").innerText = generatedText;
    } else {
      document.getElementById("results").innerText =
        "Unexpected response format. Check the console for details.";
    }
  } catch (error) {
    console.error("Error fetching Gemini API:", error);
    document.getElementById("results").innerText = "Error: " + error.message; // Display a user-friendly error message
  }
}



document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchGemini();
    }
  });

  // clicking  event on cards.

  const cards = document.querySelectorAll('.subCards'); // Use querySelectorAll to get all cards

cards.forEach(card => { // Loop through each card
    card.addEventListener('click', () => {
        const text = card.querySelector('p').textContent; // Get text from <p> inside clicked card

        const searchInput = document.getElementById("searchInput");
        searchInput.value = text;

        // card.style.display = 'hidden';
        // searchGemini(); // Or let the user trigger the search

        console.log(searchInput.value); // Log the input value (optional)
    });
});

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}


document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sideBar");
  const hamburger = document.querySelector(".hamburger");
  const newChatBtn = document.querySelector(".newChat");
  const chatHistory = document.querySelector(".history");
  let searchInput = document.getElementById("searchInput");
  let results = document.getElementById("results");



  // Add a new chat when clicking "New Chat"
  newChatBtn.addEventListener("click", function () {
      const chatItem = document.createElement("p");
      chatItem.textContent = `${searchInput.value}`;
      chatItem.classList.add("chat-item");
      chatHistory.appendChild(chatItem);

      // Optionally, you can add a click event to open the new chat
      chatItem.addEventListener("click", function () {
          alert(`Opening ${chatItem.textContent}...`);
      });

      searchInput.value = "";
      results.innerHTML = "" ;
  });
});

document.getElementById("profileImage").addEventListener('click',() =>{
  // alert("Created By - Anant Singh");

  
  document.querySelector("body").classList.toggle("darkMode");
  document.querySelector(".searchBar").classList.toggle("darkMode");
  document.querySelector("input").classList.toggle("darkMode");
  document.querySelector(".sideBar").classList.toggle("darkMode");
  document.getElementById("subCards1").classList.toggle("darkMode");
  document.getElementById("subCards2").classList.toggle("darkMode");
  document.getElementById("subCards3").classList.toggle("darkMode");
  document.getElementById("subCards4").classList.toggle("darkMode");

  
})

  