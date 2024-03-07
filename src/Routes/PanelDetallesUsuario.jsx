import React from 'react';
import Avatar from 'react-avatar';

const PanelDetallesUsuario = () => {
  // Obtener los datos del usuario del localStorage
  const nombre = localStorage.getItem('nombre');
  const apellido = localStorage.getItem('apellido');
  const email = localStorage.getItem('username');
  const rol = localStorage.getItem('userRole');

  return (
    <main className='panelDetallesDeUsuario'>
      <h1>Detalles del Usuario</h1>
      <div className='detallesDeUsuario'>
      <Avatar name={nombre+" "+apellido} round={true} className='avatarUser' />
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Nombre:</strong> {nombre}</p>
        <p><strong>Apellido:</strong> {apellido}</p>
        <p><strong>Rol:</strong> {rol}</p>
      </div>
    </main>
  );
};
export default PanelDetallesUsuario;


