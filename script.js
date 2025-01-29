// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDukGLg8EuOk4cIKrA6Ferq31fUHXOtOKw",
    authDomain: "painter-20e1a.firebaseapp.com",
    projectId: "painter-20e1a",
    storageBucket: "painter-20e1a.firebasestorage.app",
    messagingSenderId: "231187852047",
    appId: "1:231187852047:web:f1239fdb14db13cb9a2c7a",
    measurementId: "G-M44S6MZGX7"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Authentication Button
const authButton = document.getElementById("authButton");

authButton.addEventListener("click", () => {
    const email = prompt("Enter your email:");
    if (!email) return;

    const password = prompt("Enter your password:");
    if (!password) return;

    auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            alert("Logged in as: " + user.user.email);
            authButton.textContent = "Logout";
        })
        .catch(error => {
            if (error.code === "auth/user-not-found") {
                if (confirm("No account found. Sign up?")) {
                    auth.createUserWithEmailAndPassword(email, password)
                        .then(user => alert("Account created! Logged in as: " + user.user.email))
                        .catch(err => alert(err.message));
                }
            } else {
                alert(error.message);
            }
        });
});

// Logout feature
auth.onAuthStateChanged(user => {
    if (user) {
        authButton.textContent = "Logout";
        authButton.onclick = () => {
            auth.signOut().then(() => {
                authButton.textContent = "Login / Signup";
            });
        };
    } else {
        authButton.textContent = "Login / Signup";
    }
});
