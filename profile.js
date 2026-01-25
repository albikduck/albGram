const firebaseConfig = {
  apiKey: "AIzaSyCeb6MX8E-ItrWHNdjsApCx_58FYIVa5wo",
  authDomain: "albgram-6f1cd.firebaseapp.com",
  projectId: "albgram-6f1cd",
  storageBucket: "albgram-6f1cd.firebasestorage.app",
  messagingSenderId: "945556839142",
  appId: "1:945556839142:web:ac32cd88cf2d18c9bcf927"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  db.collection("users").doc(user.uid).get()
    .then(doc => {
      const data = doc.data();
      const verified = data.verified ? " ✔" : "";

      document.getElementById("profile").innerHTML = `
        <p><strong>${data.username}${verified}</strong></p>
        <p>${data.email}</p>
        <p>${data.description || "Нет описания"}</p>
        <p>День рождения: ${data.birthday || "не указан"}</p>
      `;
    });
});

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
