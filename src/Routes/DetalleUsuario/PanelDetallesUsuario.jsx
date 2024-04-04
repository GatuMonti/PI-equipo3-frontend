import React from 'react';
import Avatar from 'react-avatar';
import styles from './panelDetallesUsuario.module.css'

const PanelDetallesUsuario = () => {
  // Obtener los datos del usuario del localStorage
  const nombre = localStorage.getItem('nombre');
  const apellido = localStorage.getItem('apellido');
  const email = localStorage.getItem('username');
  const rol = localStorage.getItem('userRole');

  return (
    <main className={styles.panelDetallesDeUsuario}>
      <h1>Mi Perfil</h1>
      <div className={styles.detallesDeUsuario}>
      <Avatar name={nombre+" "+apellido} round={true} className={styles.avatarUser} />
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Nombre:</strong> {nombre}</p>
        <p><strong>Apellido:</strong> {apellido}</p>
        <p><strong>Rol:</strong> {rol}</p>
      </div>
    </main>
  );
};
export default PanelDetallesUsuario;


