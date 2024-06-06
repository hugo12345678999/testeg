import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [time] = useState(5000);
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordType, setPasswordType] = useState('password');

  useEffect(() => {
    // Simula o carregamento por 3 segundos
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const carouselImages = document.querySelectorAll(".carousel__image");
    setImages(carouselImages);

    const interval = setInterval(() => {
      nextImage();
    }, time);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []); // Executa apenas uma vez após a montagem do componente

  const nextImage = () => {
    images[currentIndex].classList.remove("selected");
    let nextIndex = currentIndex + 1;
    if (nextIndex >= images.length) {
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
    images[nextIndex].classList.add("selected");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordValue(value);

    if (value === "" || value.length < 6) {
      // Lógica para definir o estilo do botão
    } else {
      // Lógica para definir o estilo do botão
    }
  };

  const handleShowPassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleFormSubmit = () => {
    const email = emailValue;
    const pass = passwordValue;

    if (email && pass && pass.length >= 6) {
      registerUser(email, pass);
    } else {
      console.log("Por favor, preencha o email e a senha corretamente.");
    }
  };

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

  return (
    <div>
      {loading && (
        <div className="loading">
          <p>Carregando...</p>
        </div>
      )}
      <input
        type="email"
        id="user"
        placeholder="Email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
      />
      <input
        type={passwordType}
        id="password"
        placeholder="Senha"
        value={passwordValue}
        onChange={handlePasswordChange}
      />
      <span className="show" onClick={handleShowPassword}>
        {passwordType === 'password' ? 'Mostrar' : 'Ocultar'}
      </span>
      <button id="submit" onClick={handleFormSubmit}>
        Enviar
      </button>
    </div>
  );
};

export default AdminPage;
