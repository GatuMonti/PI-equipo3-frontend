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


    return (
        <>
            <FacebookShareButton
                url={location}
                className="Demo__some-network__share-button">
                <FacebookIcon size={50} round />
            </FacebookShareButton>

            <WhatsappShareButton
                url={location}
                className="Demo__some-network__share-button">
                <WhatsappIcon size={50} round/>
            </WhatsappShareButton>

            <TwitterShareButton
                url={location}
                className="Demo__some-network__share-button">
                <TwitterIcon size={50} round/>
            </TwitterShareButton>

            <EmailShareButton
                url={location}
                className="Demo__some-network__share-button">
                <EmailIcon size={50} round/>
            </EmailShareButton>

        </>
    )
}

export default ComparteRedesSociales