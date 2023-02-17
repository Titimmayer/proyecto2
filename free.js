import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider   } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
const pn = document.getElementById("logi").value
    const vg = document.getElementById("lati").value

  



const firebaseConfig = {
    apiKey: "AIzaSyCJHEQXd1DXohdLh7-Gd2YIPTY0PQoviZU",
    authDomain: "appghost-54dbb.firebaseapp.com",
    projectId: "appghost-54dbb",
    storageBucket: "appghost-54dbb.appspot.com",
    messagingSenderId: "1007114067093",
    appId: "1:1007114067093:web:2f1eaffd6816b1c1968f9c",
    measurementId: "G-FJ374TRM2V"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const providergithub = new GithubAuthProvider();

const email = document.getElementById("email");
const btnma = document.getElementById("mapaaa");

const pass= document.getElementById("pass");
const btncrear = document.getElementById("crear");
const btnlog = document.getElementById("log");
const btncerrar = document.getElementById("cerrar");
const guardar = document.getElementById("guardar");
const providerGoogle = new GoogleAuthProvider();
const google = document.getElementById("google");
const providerfacebook = new FacebookAuthProvider();
const Facebook = document.getElementById("facebook");
const github = document.getElementById("github");
const juego11 = document.getElementById("game1");
const btnconti = document.getElementById("continuar");

juego11.addEventListener("click",function(){
  document.getElementById("documen").style.display  = "none";
  document.getElementById("juego").style.display  = "block";
  document.getElementById("guardar").style.display  = "inline-block";

})


 

btncrear.addEventListener("click", function(){

createUserWithEmailAndPassword(auth, email.value, pass.value)
  .then((userCredential) => {
    
    const user = userCredential.user;
    console.log("usuario creado")
    alert("Su cuenta fue creada")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });
    
})

btnlog.addEventListener("click", function(){
    signInWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("sesion iniciada")
      document.getElementById("git").style.display  = "block";
      document.getElementById("registro").style.display  = "none";

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });


})


btncerrar.addEventListener("click", function(){
    signOut(auth).then(() => {
        // Sign-out successful.
        alert("sesion cerrada")
        document.getElementById("git").style.display  = "none";
      document.getElementById("registro").style.display  = "block";
      }).catch((error) => {
        // An error happened.
      });
        

})
const NombreCom = document.getElementById("nomCom");
const Edd = document.getElementById("edad");
const genero = document.getElementById("gene");

guardar.addEventListener("click",async() =>{
  try {
    const docRef = await addDoc(collection(db, "users"), {
      nombre:`${NombreCom.value} `,
      Edad:`${Edd.value} `,
      sexo:`${genero.value} `,
      score: score
      
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})

google.addEventListener("click", function(){
signInWithPopup(auth, providerGoogle)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
    alert('sesion iniciada')
    document.getElementById("git").style.display  = "block";
    document.getElementById("registro").style.display  = "none";
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    
    // ...
    alert('error al intentar iniciar sesion')
  });
})





Facebook.addEventListener("click", function() {
  

signInWithPopup(auth, providerfacebook)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // ...
    alert("sesion iniciada")
    document.getElementById("git").style.display  = "block";
    document.getElementById("registro").style.display  = "none";
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });

});



github.addEventListener('click', function () {
  signInWithPopup(auth, providergithub)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    alert("sesion iniciada")
    document.getElementById("git").style.display  = "block";
    document.getElementById("registro").style.display  = "none";
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
})


mostrarbd.addEventListener("click", async () => {
  tabla.innerHTML =
      `<tr>
      <td>Id</td>
      <td>Nombre</td>
      <td>Edad</td>
      <td>sexo</td>
  </tr>`;
  

  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {

      console.log(doc.id, " => ", doc.data());
      tabla.innerHTML+=
          `<tr>
          <td>${doc.id}</td>
          <td>${doc.data().nombre}</td>
          <td>${doc.data().edad}</td>
          <td>${doc.data().sexo}</td>
      </tr>`;
  });
});
buscarbtn.addEventListener("click", async()=>{
  const docRef = doc(db, "users", idnombre.value);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      NombreCom.value = docSnap.data().nombre;
      Edd.value = docSnap.data().edad;
      genero.value = docSnap.data().sexo;
      alert("archivo encontrado")
  } else {
      // doc.data() will be undefined in this case
      alert("Este archivo no existe")
  }
});

borrar.addEventListener("click", async()=>{
  await deleteDoc(doc(db, "users", idnombre.value));
});
    
btnma.addEventListener("click", function () {
  document.getElementById("map").style.display="block "

  mapboxgl.accessToken = 'pk.eyJ1IjoidGl0aW1tYXllciIsImEiOiJjbGR2dXhhYTEwMTYzM3Bwa3RmOTZ2ZTVtIn0.31vAWCbTRcZ76OVAocSP2A';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [pn.value, vg.value], // starting position [lng, lat]
    zoom: 1 // starting zoom
  });

  // Event listener para el botón "Mostrar mapa"
  document.getElementById('btn-mostrar').addEventListener('click', function() {
    const latitud = parseFloat(document.getElementById('input-latitud').value);
    const longitud = parseFloat(document.getElementById('input-longitud').value);
    map.setCenter([longitud, latitud]);
    document.getElementById('map').style.display = 'block';
  });

  // Event listener para el botón "Ocultar mapa"
  document.getElementById('btn-ocultar').addEventListener('click', function() {
    document.getElementById('map').style.display = 'none';
  });


})