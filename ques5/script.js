import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to Fetch and Display Novels
async function fetchNovels(filters = {}) {
    let novelsQuery = collection(db, "novels");

    // Apply filters
    if (filters.releaseYear) {
        novelsQuery = query(novelsQuery, where("release_year", "==", Number(filters.releaseYear)));
    }
    if (filters.sortPrice) {
        novelsQuery = query(novelsQuery, orderBy("price", filters.sortPrice));
    }

    const querySnapshot = await getDocs(novelsQuery);
    const novelList = [];
    querySnapshot.forEach(doc => {
        novelList.push(doc.data());
    });

    displayNovels(novelList);
}

// Function to Display Novels
function displayNovels(novels) {
    const tableBody = document.getElementById("novelTableBody");
    tableBody.innerHTML = "";
    
    novels.forEach(novel => {
        const row = `<tr>
            <td>${novel.title}</td>
            <td>${novel.author}</td>
            <td>$${novel.price}</td>
            <td>${novel.release_year}</td>
            <td>${novel.genre}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to Filter Novels
function filterNovels() {
    const releaseYear = document.getElementById("releaseYear").value;
    fetchNovels({ releaseYear });
}

// Function to Sort Novels
function sortNovels() {
    const sortPrice = document.getElementById("sortPrice").value;
    fetchNovels({ sortPrice });
}

// Function to Search Novels
async function searchNovels() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    let novelsQuery = collection(db, "novels");

    const querySnapshot = await getDocs(novelsQuery);
    const novelList = [];

    querySnapshot.forEach(doc => {
        const novel = doc.data();
        if (novel.title.toLowerCase().includes(searchInput) || novel.author.toLowerCase().includes(searchInput)) {
            novelList.push(novel);
        }
    });

    displayNovels(novelList);
}

// Initial Fetch
fetchNovels();
