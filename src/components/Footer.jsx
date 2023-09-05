import React from "react";

function Footer() {
    return (
        <footer>
            <div className="font-body text-sm text-red-interactive text-opacity-70 flex justify-center items-center gap-4 mb-2">
                <a href="https://github.com/kylezhao101/va11halla-drink-recipes" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                <a href="https://va11halla.fandom.com/wiki/Drinktionary" target="_blank" rel="noopener noreferrer">
                    Source
                </a>
            </div>
        </footer>
    );
}

export default Footer;