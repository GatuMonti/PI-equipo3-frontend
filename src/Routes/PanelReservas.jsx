import React from "react";
import ListarReservas from "../components/ListarReservas";
const PanelReservas = () => {
  return (
    <main className="pageAdmin">
      <div className="panel"></div>
      <div className="vacio"></div>
      <ListarReservas/>      
    </main>
  );
};

export default PanelReservas;
