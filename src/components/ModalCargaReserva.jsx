import React from 'react'
import { Modal } from "react-bootstrap";
import { Vortex } from "react-loader-spinner";


function ModalCargaReserva({ mostrarSpinnerModal }) {
    return (
        <Modal
          show={mostrarSpinnerModal}
          centered
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          <Modal.Body style={{ textAlign: "center" }}>
            <div>
              <Vortex
                visible={mostrarSpinnerModal}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={["#3657CD", "darkBlue", "#6269D3", "#4867DB", "#AC6AB4", "purple"]}
              />
              <p>Realizando Reserva...</p>
            </div>
          </Modal.Body>
        </Modal>
      );
    };
    


export default ModalCargaReserva