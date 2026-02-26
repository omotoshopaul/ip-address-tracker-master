const ipAddress = document.getElementById("ip_address");
const locationEl = document.getElementById("location");
const timezoneEl = document.getElementById("timezone");
const ispEl = document.getElementById("isp");
const searchForm = document.getElementById("searchForm");
const ipInput = document.getElementById("ipInput");

const API_KEY = "at_nMIDj0h6gZnM4Nnb20hqecdXewEhj";

const map = L.map("map").setView([0, 0], 2);
let marker = L.marker([0, 0]).addTo(map);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

async function getIPData(query = "") {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${query}`
  );

  if (!response.ok) throw new Error("API failed");

  return response.json();
}

async function updateTracker(query = "") {
  try {
    const data = await getIPData(query);

    ipAddress.textContent = data.ip;
    locationEl.textContent =
      `${data.location.city}, ${data.location.country}`;
    timezoneEl.textContent = `UTC ${data.location.timezone}`;
    ispEl.textContent = data.isp;

    const { lat, lng } = data.location;
    map.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]);

  } catch (error) {
    console.error(error);
    alert("Error fetching IP data. Check console.");
  }
}

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  updateTracker(ipInput.value.trim());
});