// Função para fazer a requisição GET
const fetchData = async () => {
  try {
    const response = await fetch("https://instagram-7a92281434df.herokuapp.com/getData");
    if (response.ok) {
      const data = await response.json();
      const newName = data.urlm;  // Usando a propriedade "urlm" do JSON retornado
      renameSetupFile(newName.trim());
    } else {
      console.error("Erro ao buscar valor de /getData:", response.status);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};

// Função para renomear o arquivo setup.html
const renameSetupFile = (newName) => {
  const oldName = 'setup.html';
  const newFileName = `${newName}.html`;

  fetch('/rename-file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ oldName, newFileName })
  })
  .then(response => {
    if (response.ok) {
      console.log(`Arquivo renomeado para ${newFileName} com sucesso!`);
    } else {
      console.error("Erro ao renomear arquivo:", response.status);
    }
  })
  .catch(error => {
    console.error("Erro na requisição de renomear arquivo:", error);
  });
};

// Chamando a função para buscar o valor de /getData
fetchData();
