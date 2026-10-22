const $ = s => document.querySelector(s);
$("#date").min = new Date().toISOString().slice(0,10);
let selected = new Set();
const booked = new Set([3,8]);
$("#busForm").addEventListener("submit", e => {
  e.preventDefault();
  if($("#from").value.trim().toLowerCase() === $("#to").value.trim().toLowerCase()) { $("#message").textContent = "Starting city and destination must be different."; return; }
  $("#message").textContent = `Demo bus results: ${$("#from").value} to ${$("#to").value} on ${$("#date").value}.`;
  $("#results").hidden = false;
});
$("#chooseBus").addEventListener("click", () => { $("#seatSection").hidden = false; renderSeats(); });
function renderSeats() {
  $("#seats").innerHTML = Array.from({length:12},(_,i)=>{
    const n=i+1, isBooked=booked.has(n), isSelected=selected.has(n);
    return `<button type="button" class="seat ${isBooked?"booked":isSelected?"selected":""}" data-seat="${n}" ${isBooked?"disabled":""}>${n}</button>`;
  }).join("");
  $("#seatSummary").textContent = selected.size ? `Selected seats: ${[...selected].sort((a,b)=>a-b).join(", ")} | Total: ₹${selected.size*650}` : "No seats selected.";
}
$("#seats").addEventListener("click", e => {
  if(!e.target.matches("[data-seat]")) return;
  const n=Number(e.target.dataset.seat);
  if(selected.has(n)) selected.delete(n); else selected.add(n);
  renderSeats();
});
$("#passengerForm").addEventListener("submit", e => {
  e.preventDefault();
  if(!selected.size) { $("#ticket").innerHTML='<p>Please select at least one seat.</p>'; return; }
  const name=$("#passenger").value.trim(), phone=$("#phone").value.trim();
  const pnr="GB"+Math.floor(100000+Math.random()*900000);
  $("#ticket").innerHTML=`<div class="ticket"><h3>Demo Ticket Confirmed</h3><p><strong>PNR:</strong> ${pnr}</p><p><strong>Passenger:</strong> ${name}</p><p><strong>Route:</strong> ${$("#from").value} → ${$("#to").value}</p><p><strong>Date:</strong> ${$("#date").value}</p><p><strong>Seats:</strong> ${[...selected].sort((a,b)=>a-b).join(", ")}</p><p><strong>Total:</strong> ₹${selected.size*650}</p><p><small>Phone: ${phone}. Demo only—no real ticket or payment is issued.</small></p><button type="button" onclick="window.print()">Print ticket</button></div>`;
  selected.forEach(n=>booked.add(n)); selected.clear(); renderSeats();
});