import React, { useState } from 'react';
import styles from '../styles/Login.module.css'; // Certifique-se de que o caminho está correto

const UserForm = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_password: '',
  });

  const [message, setMessage] = useState(''); // Estado para mensagens de sucesso ou erro

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Buscar dados do usuário pelo nome de usuário
      const response = await fetch(`http://localhost:8000/users/${encodeURIComponent(formData.user_name)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }

      const user = await response.json();

      // Verificar se a senha está correta
      if (user.user_password === formData.user_password) {
        console.log('Login successful');
        setMessage('Login successful!');
        // Redirecionar ou fazer algo após login bem-sucedido
      } else {
        setMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(`Error logging in: ${error.message}`);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <header className={styles.header}>
          <a href='http://localhost:3000/'><img className={styles.logo} src='/Vector.png' alt="Logo"/></a>
        </header>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.formTitle}>Welcome to MusicRATE</h2>
            {message && <p>{message}</p>} {/* Mensagem de sucesso ou erro */}
            <div className={styles.formGroup}>
              <label htmlFor="user_name">Usuário:</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="user_password">Senha:</label>
              <input
                type="password"
                id="user_password"
                name="user_password"
                value={formData.user_password}
                onChange={handleChange}
              />
            </div>
            <p>Primeira vez aqui? <a className={styles.cadastro} href='http://localhost:3000/register'>Cadastre-se</a></p>
            <br />
            <button type="submit" className={styles.submitButton}>Acessar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;