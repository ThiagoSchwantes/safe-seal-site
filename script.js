function toggleMenu() {
  const menu = document.getElementById("menu-mobile");
  menu.classList.toggle("active");
}

async function fetchData() {
  try {
    const response = await fetch(CONFIG.API_URL); // Ex: http://127.0.0.1:5000/servidores
    const data = await response.json();
    const servidores = Object.values(data);

    renderizarServidores(servidores);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

function renderizarServidores(servidores) {
  const container = document.getElementById("cards-servidores");
  container.innerHTML = "";

  servidores.forEach((servidor) => {
    const imagemValida =
      servidor.icone && servidor.icone !== "Nenhum ícone"
        ? servidor.icone
        : "https://pm1.aminoapps.com/7654/279e6a3ac2f4066bb5516d02d0367329dff5723dr1-512-512v2_uhq.jpg";

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="avatar" style="background-image: url('${imagemValida}')"></div>
      <h3>${servidor.server_name}</h3>
      <a href="${servidor.invite_url}" class="btn-discord" target="_blank">Entrar no Servidor</a>
    `;
    container.appendChild(card);
  });
}

//window.onload = fetchData;
