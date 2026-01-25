// ===== Firebase config =====
const firebaseConfig = {
  apiKey: "AIzaSyCeb6MX8E-ItrWHNdjsApCx_58FYIVa5wo",
  authDomain: "albgram-6f1cd.firebaseapp.com",
  projectId: "albgram-6f1cd",
  storageBucket: "albgram-6f1cd.firebasestorage.app",
  messagingSenderId: "945556839142",
  appId: "1:945556839142:web:ac32cd88cf2d18c9bcf927"
};

// ===== Init Firebase =====
firebase.initializeApp(firebaseConfig);

// ===== Services =====
const auth = firebase.auth();
const db = firebase.firestore();

console.log("Firebase initialized");

// ===== Регистрация =====
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // создаём профиль
      return db.collection("users").doc(user.uid).set({
        email: email,
        username: email.split("@")[0],
        description: "",
        birthday: "",
        avatar: "",
        verified: true, // ТЫ — разработчик
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => {
      document.getElementById("status").innerText =
        "Аккаунт создан 🎉 Профиль сохранён";
    })
    .catch((error) => {
      document.getElementById("status").innerText = error.message;
      console.error(error);
    });
}

// ===== Вход =====
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("status").innerText = "Вход выполнен ✅";
    })
    .catch((error) => {
      document.getElementById("status").innerText = error.message;
    });
}
