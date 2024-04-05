import React from 'react'
import {
    EmailShareButton,
    WhatsappShareButton,
    FacebookShareButton,
    TwitterShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";


function ComparteRedesSociales({location}) {
const mensajePersonalizado = "Mira este nuevo lanzamiento en Vortex games!";
   
    return (
        <>
            <FacebookShareButton
                title={mensajePersonalizado}
                url={location} 
                className="Demo__some-network__share-button">
                <FacebookIcon size={30} round />
            </FacebookShareButton>

            <WhatsappShareButton
                title={mensajePersonalizado}
                url={location} 
                className="Demo__some-network__share-button">
                <WhatsappIcon size={30} round/>
            </WhatsappShareButton>

            <TwitterShareButton
                title={mensajePersonalizado}
                url={location}
                className="Demo__some-network__share-button">
                <TwitterIcon size={30} round/>
            </TwitterShareButton>

            <EmailShareButton
                title={mensajePersonalizado}
                url={location}
                className="Demo__some-network__share-button">
                <EmailIcon size={30} round/>
            </EmailShareButton>

        </>
    )
}

export default ComparteRedesSociales