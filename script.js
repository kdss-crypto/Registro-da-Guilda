// Configurar Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "player-guilda.firebaseapp.com",
  databaseURL: "https://player-guilda.firebaseio.com",
  projectId: "player-guilda",
  storageBucket: "player-guilda.appspot.com",
  messagingSenderId: "SUA_MESSAGING_SENDER_ID",
  appId: "SUA_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const nomesPermitidos = [
  "Alice", "Bruno", "Carlos", "Daniela", "Eduardo",
  "Fernanda", "Gabriel", "Helena", "Igor", "Julia",
  "Karla", "Lucas", "Marina", "Nathan", "Olivia",
  "Paulo", "Quezia", "Rafael", "Simone", "Tiago"
];

const nomeSelect = document.getElementById("nome");
const rankingList = document.getElementById("ranking");

// Preenche o select com nomes
nomesPermitidos.forEach(nome => {
  const option = document.createElement("option");
  option.value = nome;
  option.textContent = nome;
  nomeSelect.appendChild(option);
});

function registrarPontuacao() {
  const nome = nomeSelect.value;
  const pontuacao = parseInt(document.getElementById("pontuacao").value);

  if (!nome || isNaN(pontuacao) || pontuacao < 0 || pontuacao > 50) {
    alert("Preencha corretamente o nome e a pontuação (0 a 50).");
    return;
  }

  db.ref("pontuacoes/" + nome).set(pontuacao).then(() => {
    alert("Pontuação registrada!");
    carregarRanking();
  });
}

function carregarRanking() {
  db.ref("pontuacoes").once("value", snapshot => {
    rankingList.innerHTML = "";
    const dados = snapshot.val();
    if (dados) {
      const ordenado = Object.entries(dados).sort((a, b) => b[1] - a[1]);
      ordenado.forEach(([nome, pontuacao]) => {
        const li = document.createElement("li");
        li.textContent = `${nome}: ${pontuacao}`;
        rankingList.appendChild(li);
      });
    }
  });
}

window.onload = carregarRanking;
