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

const messagesDiv = document.getElementById("messages");

let currentUserData = null;

// Проверка входа
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // загружаем профиль
  db.collection("users").doc(user.uid).get()
    .then(doc => {
      currentUserData = doc.data();
      listenMessages();
    });
});

// Слушаем сообщения в реальном времени
function listenMessages() {
  db.collection("messages")
    .orderBy("createdAt")
    .limit(100)
    .onSnapshot(snapshot => {
      messagesDiv.innerHTML = "";
      snapshot.forEach(doc => {
        const msg = doc.data();
        const verified = msg.verified ? " ✔" : "";

        const el = document.createElement("div");
        el.innerHTML = <strong>${msg.username}${verified}:</strong> ${msg.text};
        el.style.margin = "8px 0";

        messagesDiv.appendChild(el);
      });

      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}

// Отправка сообщения
function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();

  if (!text || !currentUserData) return;

  db.collection("messages").add({
    text: text,
    username: currentUserData.username,
    verified: currentUserData.verified,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  input.value = "";
}
