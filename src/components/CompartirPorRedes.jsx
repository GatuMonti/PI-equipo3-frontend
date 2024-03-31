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


const CompartirPorRedes = ({location}) => {
    return (
        <div className='contenedorIconosCompartir'>
            <FacebookShareButton
                url={location}
                className="Demo__some-network__share-button">
                <FacebookIcon size={30} round />
            </FacebookShareButton>

            <WhatsappShareButton
                url={location}
                className="Demo__some-network__share-button">
                <WhatsappIcon size={30} round/>
            </WhatsappShareButton>

            <TwitterShareButton
                url={location}
                className="Demo__some-network__share-button">
                <TwitterIcon size={30} round/>
            </TwitterShareButton>

            <EmailShareButton
                url={location}
                className="Demo__some-network__share-button">
                <EmailIcon size={30} round/>
            </EmailShareButton>

        </div>
    )
}

export default CompartirPorRedes