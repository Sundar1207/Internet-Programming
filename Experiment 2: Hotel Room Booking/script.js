const $ = s => document.querySelector(s);
const today = new Date().toISOString().slice(0,10);
$("#checkin").min = today; $("#checkout").min = today;
$("#checkin").addEventListener("change", () => { $("#checkout").min = $("#checkin").value; });
let selectedRoom = null;
$("#searchForm").addEventListener("submit", e => {
  e.preventDefault();
  const start = new Date($("#checkin").value), end = new Date($("#checkout").value);
  if(end <= start) { $("#searchMessage").textContent = "Check-out must be after check-in."; return; }
  $("#searchMessage").textContent = `Showing demo room options for ${$("#destination").value}, for ${$("#guests").value} guest(s).`;
});
document.querySelectorAll("button[data-room]").forEach(btn => btn.addEventListener("click", () => {
  const destination = $("#destination").value.trim();
  const checkin = $("#checkin").value, checkout = $("#checkout").value;
  if(!destination || !checkin || !checkout) { $("#bookingResult").textContent = "Enter destination and dates, then select a room."; return; }
  const nights = Math.ceil((new Date(checkout)-new Date(checkin))/86400000);
  if(nights <= 0) { $("#bookingResult").textContent = "Check-out must be after check-in."; return; }
  selectedRoom = {room:btn.dataset.room,price:Number(btn.dataset.price)};
  const total = nights * selectedRoom.price;
  $("#bookingResult").innerHTML = `<strong>Demo booking summary</strong><br>Destination: ${destination}<br>Room: ${selectedRoom.room}<br>Guests: ${$("#guests").value}<br>Nights: ${nights}<br>Estimated total: ₹${total.toLocaleString("en-IN")}<br><button id="confirmBooking">Confirm demo booking</button>`;
  $("#confirmBooking").addEventListener("click", () => { $("#bookingResult").innerHTML = `<strong>Demo booking confirmed!</strong><br>${selectedRoom.room} · ${nights} night(s) · ₹${total.toLocaleString("en-IN")}<br><small>This front-end demo does not process real bookings or payments.</small>`; });
}));