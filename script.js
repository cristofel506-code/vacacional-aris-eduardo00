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
let wa = document.getElementById("wa");
wa.style.display = "block";

let numero = "8092823624";
let mensaje = "Hola quiero reservar información";

wa.href = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
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

// guardar en firebase
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

// 🔥 IMPORTANTE: usar location.href (NO window.open)
let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

window.location.href = url;
};
