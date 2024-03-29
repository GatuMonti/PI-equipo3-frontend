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
                <FacebookIcon size={35} round />
            </FacebookShareButton>

            <WhatsappShareButton
                url={location}
                className="Demo__some-network__share-button">
                <WhatsappIcon size={35} round/>
            </WhatsappShareButton>

            <TwitterShareButton
                url={location}
                className="Demo__some-network__share-button">
                <TwitterIcon size={35} round/>
            </TwitterShareButton>

            <EmailShareButton
                url={location}
                className="Demo__some-network__share-button">
                <EmailIcon size={35} round/>
            </EmailShareButton>

        </>
    )
}

export default ComparteRedesSociales