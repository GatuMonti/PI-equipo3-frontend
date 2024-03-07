import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ListarUsuariosAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Función para obtener la lista de usuarios
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/listar-usuarios');
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };

    // Llamar a la función para obtener la lista de usuarios al cargar el componente
    fetchUsers();
  }, []);

  // Función para cambiar el rol de un usuario
  const changeUserRole = async (username, newRole) => {
    try {
      if (username === 'admin') {
        Swal.fire({
          title: 'Acción no permitida',
          text: 'No se puede cambiar el rol del usuario "admin".',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      const updatedUser = { username: username, role: newRole };
      console.log(updatedUser);
      console.log(newRole);
      const response = await axios.put('http://localhost:8080/auth/changeRol', updatedUser);
      if (response.status === 200) {
        Swal.fire({
          title: 'Rol cambiado',
          text: `El rol del usuario ${username} ha sido cambiado a ${newRole}.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setUsers(prevUsers => prevUsers.map(user => {
          if (user.username === username) {
            return { ...user, role: newRole };
          }
          return user;
        }));
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: `Hubo un error al cambiar el rol del usuario ${username}.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Error al cambiar el rol del usuario:', error);
    }
  };

  return (
    <div>
      <h1>Listado de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Cambiar Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => changeUserRole(user.username, user.role === 'ADMIN' ? 'USER' : 'ADMIN')}>
                  Cambiar Rol
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarUsuariosAdmin;




