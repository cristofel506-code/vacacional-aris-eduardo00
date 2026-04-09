import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import flatpickr from "https://cdn.jsdelivr.net/npm/flatpickr/+esm";

// FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDyIdyX_sH9FGB6VPL4Mz9dPlKmyMDYlFc",
  authDomain: "vacacional-aris-543d8.firebaseapp.com",
  projectId: "vacacional-aris-543d8",
  storageBucket: "vacacional-aris-543d8.firebasestorage.app",
  messagingSenderId: "745069402487",
  appId: "1:745069402487:web:83dc369ee1ad1edde2e972"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let noches = 0;
let datos = null;

// calendario
flatpickr("#fecha", {
  mode: "range",
  minDate: "today",
  onChange: function(d){
    if(d.length === 2){
      noches = Math.ceil((d[1] - d[0]) / (1000*60*60*24));
    }
  }
});

// CALCULAR
window.calcular = function(){

let s = +document.getElementById("s").value || 0;
let d = +document.getElementById("d").value || 0;
let a = +document.getElementById("a").value || 0;
let t = +document.getElementById("t").value || 0;
let p = +document.getElementById("personas").value || 0;

if(noches === 0) return alert("Selecciona fechas");

let capacidad = (s*2)+(d*4)+(a*2)+(t*6);

if(p > capacidad) return alert("No hay capacidad suficiente");

let total = (s*1500)+(d*2500)+(a*2000)+(t*2800);
total = total * noches;

let adelanto = total * 0.5;

datos = {s,d,a,t,p,noches,total,adelanto};

// mostrar
document.getElementById("resultado").innerHTML =
`Total: RD$ ${total}<br>Adelanto: RD$ ${adelanto}`;

// botón + whatsapp
document.getElementById("btnConfirmar").style.display = "block";

let wa = document.getElementById("wa");
wa.style.display = "block";

let numero = "8092823624";
let mensaje = "Hola quiero reservar información";

wa.href = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
};

// CONFIRMAR
window.confirmar = async function(){

if(!datos) return;

await addDoc(collection(db,"reservas"),{
...datos,
fecha: new Date().toLocaleString()
});

let numero = "8092823624";

let mensaje = `
RESERVA VACACIONAL

Noches: ${datos.noches}
Personas: ${datos.p}

Total: RD$ ${datos.total}
Adelanto: ${datos.adelanto}
`;

let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

window.open(url, "_blank");
};