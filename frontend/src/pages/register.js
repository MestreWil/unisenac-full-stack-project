import React, { useState } from 'react';
import styles from '../styles/Register.module.css'; // Certifique-se de que o caminho está correto

const UserForm = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_password: '',
    user_email: '',
    user_description: '',
    user_image: null,
  });

  const [message, setMessage] = useState(''); // Estado para mensagens de sucesso ou erro

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('user_name', formData.user_name);
    formDataToSend.append('user_password', formData.user_password);
    formDataToSend.append('user_email', formData.user_email);
    formDataToSend.append('user_description', formData.user_description);
    formDataToSend.append('user_image', formData.user_image);

    try {
      const response = await fetch('http://localhost:8000/users/new_user/', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Network response was not ok: ${errorResponse}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      setMessage('User registered successfully!');
    } catch (error) {
      console.error('Error:', error);
      setMessage(`Error registering user: ${error.message}`);
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
            <div className={styles.formGroup}>
              <label htmlFor="user_email">Email:</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="user_description">Biografia:</label>
              <textarea
                id="user_description"
                name="user_description"
                value={formData.user_description}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="user_image">Imagem:</label>
              <input
                type="file"
                id="user_image"
                name="user_image"
                onChange={handleChange}
              />
            </div>
            <p>Já tem cadastro? <a className={styles.login} href='http://localhost:3000/login'>Faça Login</a></p>
            <br />
            <button type="submit" className={styles.submitButton}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
