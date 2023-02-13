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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";



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

const email = document.getElementById("email");
const pass= document.getElementById("pass");
const btncrear = document.getElementById("crear");
const btnlog = document.getElementById("log");
const btncerrar = document.getElementById("cerrar");
const guardar = document.getElementById("guardar");
const providerGoogle = new GoogleAuthProvider();
const google = document.getElementById("google");
const providerfacebook = new FacebookAuthProvider();
const Facebook = document.getElementById("facebook");
/* formulario */
const NombreCom = document.getElementById('nomCom');
const Edd = document.getElementById('edad');
const genero = document.getElementById('gene');
const crearbtn = document.getElementById('crearbtn');
const mostrarbd = document.getElementById('mbd');
const tabla = document.getElementById('tabla');
const guardarbtn = document.getElementById('gd');
const idnombre = document.getElementById('idNOM');
const borrar = document.getElementById('delete');
const buscarbtn = document.getElementById('buscador');



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

guardar.addEventListener("click",async() =>{
  try {
    const docRef = await addDoc(collection(db, "users"), {
      nombre:`${NombreCom.value} `,
      Edad:`${Edd.value} `,
      sexo:`${genero.value} `,
      
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
    alert('sesion creada')
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

crearbtn.addEventListener("click", async () => {
  try {
      await setDoc(doc(db, "users", NombreCom.value), {
          nombre: NombreCom.value,
          edad: Edd.value,
          sexo: genero.value,
      });
      alert(`Documento ${NombreCom.value} creado!`);
  } catch (error) {
      alert(error);
  }
});

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

guardarbtn.addEventListener("click", async () => {
  const docRef = doc(db, "users", idnombre.value);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      NombreCom.value = docSnap.data().nombre;
      Edd.value = docSnap.data().edad;
      genero.value = docSnap.data().sexo;

      alert("los datos se guardaron corectamente")
  } else {
      // doc.data() will be undefined in this case
      alert("error al guardar ")
  }
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
const ocult_btn = document.getElementById('ocul');
const mostrar = document.getElementById('mos');
mostrar.addEventListener("click", function  () {
  document.getElementById("mos") .style.display = "none"
  document.getElementById("ocul") .style.display = "block"
  document.getElementById("map") .style.display = "block"
  document.getElementById('map').style.visibility = "visible";
  mapboxgl.accessToken = 'pk.eyJ1IjoidGl0aW1tYXllciIsImEiOiJjbGR2dXhhYTEwMTYzM3Bwa3RmOTZ2ZTVtIn0.31vAWCbTRcZ76OVAocSP2A';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [1,1], // starting position [lng, lat]
    zoom: 1 // starting 
  }); 

  
  


 
    

              });

              ocult_btn.addEventListener('click', function (){
                document.getElementById("mos") .style.display = "block"
                document.getElementById("ocul") .style.display = "none"
                document.getElementById("map") .style.display = "none"
              
                            
                          })







