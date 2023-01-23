import React from 'react';
import s from '../Services.module.sass';

export const SYMBOLS = [
    {
        key: 'answer',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsSvgOuter}>
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g className={s.SymbolsPath}>
                        <path d="M25,4c-12.67187,0 -23,8.87891 -23,19.99219c0,6.45313 3.53125,12.07031 8.96094,15.73828c-0.00781,0.21484 0.00781,0.56641 -0.27734,1.61328c-0.34766,1.30078 -1.05859,3.12891 -2.49609,5.19141l-1.02344,1.46484h1.78516c6.19141,0 9.77344,-4.03516 10.32813,-4.68359c1.84375,0.43359 3.74219,0.67188 5.72266,0.67188c12.67188,0 23,-8.87891 23,-19.99609c0,-11.11328 -10.32812,-19.99219 -23,-19.99219zM26,34.19922h-2.69922v-2.89844h2.69922zM30.5,21.60156c-0.39844,0.59766 -1.19922,1.5 -2.5,2.69922c-0.89844,0.89844 -1.5,1.59766 -1.80078,2.19922c-0.30078,0.5 -0.39844,1.30078 -0.39844,2.5h-2.5c0,-1.30078 0.19922,-2.39844 0.5,-3.19922c0.30078,-0.80078 1,-1.69922 2.09766,-2.80078l1.10156,-1.10156c0.30078,-0.29687 0.60156,-0.59766 0.80078,-1c0.39844,-0.59766 0.59766,-1.19922 0.59766,-1.89844c0,-0.89844 -0.29687,-1.69922 -0.79687,-2.30078c-0.5,-0.69922 -1.5,-1 -2.70312,-1c-1.59766,0 -2.69922,0.60156 -3.29687,1.69922c-0.30078,0.60156 -0.5,1.60156 -0.60156,2.70313h-2.5c0.10156,-1.90234 0.60156,-3.5 1.80078,-4.70312c1.09766,-1.19922 2.69922,-1.79687 4.69922,-1.79687c1.80078,0 3.30078,0.5 4.39844,1.59766c1.10156,1 1.70313,2.40234 1.70313,4c0,1 -0.20312,1.80078 -0.60156,2.40234z"></path>
                    </g>
                </g>
            </svg>
        )
    },
    {
        key: 'star',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsSvgOuter}>
                    <path  d="M0,172v-172h172v172z" fill="none"></path>
                    <g className={s.SymbolsPath}>
                        <path d="M10.2,48.6c-0.2,0 -0.4,-0.1 -0.6,-0.2c-0.3,-0.2 -0.5,-0.7 -0.4,-1.1l4.4,-16.4l-13.2,-10.7c-0.4,-0.2 -0.5,-0.7 -0.4,-1.1c0.1,-0.4 0.5,-0.7 0.9,-0.7l17,-0.9l6.1,-15.9c0.2,-0.3 0.6,-0.6 1,-0.6c0.4,0 0.8,0.3 0.9,0.6l6.1,15.9l17,0.9c0.4,0 0.8,0.3 0.9,0.7c0.1,0.4 0,0.8 -0.3,1.1l-13.2,10.7l4.4,16.4c0.1,0.4 0,0.8 -0.4,1.1c-0.3,0.2 -0.8,0.3 -1.1,0l-14.3,-9.2l-14.3,9.2c-0.2,0.2 -0.3,0.2 -0.5,0.2z"></path>
                    </g>
                </g>
            </svg>)
    },
    {
        key: 'heart',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsSvgOuter}>
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g className={s.SymbolsPath}>
                        <path d="M25,47.30078l-0.64062,-0.53125c-1.21484,-1.01562 -2.85937,-2.11719 -4.76562,-3.39062c-7.42578,-4.97266 -17.59375,-11.77734 -17.59375,-23.37891c0,-7.16797 5.83203,-13 13,-13c3.89453,0 7.54297,1.73438 10,4.69922c2.45703,-2.96484 6.10547,-4.69922 10,-4.69922c7.16797,0 13,5.83203 13,13c0,11.60156 -10.16797,18.40625 -17.59375,23.37891c-1.90625,1.27344 -3.55078,2.375 -4.76562,3.39063z"></path>
                    </g>
                </g>
            </svg>
        )
    },
    {
        key: 'quotes',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsSvgOuter}>
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g className={s.SymbolsPath}>
                        <path d="M2,9v20h11v2c0,3.85938 -2.24219,7 -5,7h-1v7h1c7.71875,0 14,-6.28125 14,-14v-22zM28,9v20h11v2c0,3.85938 -2.24219,7 -5,7h-1v7h1c7.71875,0 14,-6.28125 14,-14v-22z"></path>
                    </g>
                </g>
            </svg>
        )
    },
    {
        key: 'trash',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsSvgOuter}>
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g className={s.SymbolsPath}>
                        <path d="M21,2c-1.64545,0 -3,1.35455 -3,3v2h-10c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h1v36c0,1.654 1.346,3 3,3h26c1.654,0 3,-1.346 3,-3v-36h1c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-10v-2c0,-1.64545 -1.35455,-3 -3,-3zM21,4h8c0.55455,0 1,0.44545 1,1v2h-10v-2c0,-0.55455 0.44545,-1 1,-1zM19,14c0.552,0 1,0.448 1,1v25c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1v-25c0,-0.552 0.448,-1 1,-1zM25,14c0.552,0 1,0.448 1,1v25c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1v-25c0,-0.552 0.448,-1 1,-1zM31,14c0.553,0 1,0.448 1,1v25c0,0.553 -0.447,1 -1,1c-0.553,0 -1,-0.447 -1,-1v-25c0,-0.552 0.447,-1 1,-1z"></path>
                    </g>
                </g>
            </svg>
        )
    },
    {
        key: 'exclamation',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsSvgOuter}>
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g className={s.SymbolsPath}>
                        <path d="M46.21484,7.84766c-7.40234,-1.625 -11.77344,-3.92578 -14.96484,-5.60547c-2.48047,-1.30078 -4.26953,-2.24219 -6.25,-2.24219c-1.98047,0 -3.76953,0.94141 -6.25,2.24219c-3.19141,1.67969 -7.5625,3.98047 -14.96484,5.60547l-0.78516,0.17188v0.80469c0,30.46094 21.36328,40.67969 21.58203,40.77734l0.4375,0.20313l0.43359,-0.21875c0.21484,-0.10937 21.54688,-11.3125 21.54688,-40.76172v-0.80469zM26.79688,36.9375c0,0.21484 -0.14453,0.35547 -0.35547,0.35547h-2.72656c-0.21875,0 -0.35937,-0.14453 -0.35937,-0.35547v-3.08594c0,-0.21484 0.14063,-0.35937 0.35938,-0.35937h2.72656c0.21484,0 0.35547,0.14453 0.35547,0.35938zM26.79688,29.64063c0,0.21484 -0.14453,0.35938 -0.35547,0.35938h-2.72656c-0.21875,0 -0.35937,-0.14453 -0.35937,-0.35937v-17.08203c0,-0.21484 0.14063,-0.35937 0.35938,-0.35937h2.72656c0.21484,0 0.35547,0.14453 0.35547,0.35938z"></path>
                    </g>
                </g>
            </svg>
        )
    },
    {
        key: 'clock',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsSvgOuter}>
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g className={s.SymbolsPath}>
                        <path d="M6,1v4c0,1.65234 1.34766,3 3,3h2v6.71875c0,3.00781 1.50391,5.82031 4.00781,7.48828l4.19141,2.79297l-4.19141,2.79297c-2.50391,1.66797 -4.00781,4.48047 -4.00781,7.48828v6.71875h-2c-1.65234,0 -3,1.34766 -3,3v4h38v-4c0,-1.65234 -1.34766,-3 -3,-3h-2v-6.71875c0,-3.00781 -1.50391,-5.82031 -4.00781,-7.48828l-4.19141,-2.79297l4.19141,-2.79297c2.50391,-1.66797 4.00781,-4.48047 4.00781,-7.48828v-6.71875h2c1.65234,0 3,-1.34766 3,-3v-4zM13,8h24v6.71875c0,2.33984 -1.16797,4.52734 -3.11719,5.82422l-6.68359,4.45703l6.68359,4.45703c1.94922,1.30078 3.11719,3.48438 3.11719,5.82422v6.71875h-24v-6.71875c0,-2.33984 1.16797,-4.52344 3.11719,-5.82422l6.68359,-4.45703l-6.68359,-4.45703c-1.94922,-1.29687 -3.11719,-3.48437 -3.11719,-5.82422zM16,13c0,8.08984 9,10 9,10c0,0 9,-2.01562 9,-10z"></path>
                    </g>
                </g>
            </svg>
        )
    },
    {
        key: 'thumb',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsSvgOuter}>
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g className={s.SymbolsPath}>
                        <path d="M23,3c-0.55078,0 -1,0.44922 -1,1v7.75l-4,10.25v21c0.41406,1.16406 1.69531,2 3,2h19c2.20703,0 4,-1.79297 4,-4c0,-0.82422 -0.26172,-1.58203 -0.6875,-2.21875c1.55859,-0.54687 2.6875,-2.03906 2.6875,-3.78125c0,-0.98047 -0.35156,-1.86719 -0.9375,-2.5625c1.16016,-0.69922 1.9375,-1.98437 1.9375,-3.4375c0,-0.98047 -0.35156,-1.86719 -0.9375,-2.5625c1.16016,-0.69922 1.9375,-1.98437 1.9375,-3.4375c0,-2.20703 -1.79297,-4 -4,-4h-14.625c0.60938,-1.92969 1.625,-5.38281 1.625,-7c0,-3.76562 -2.75781,-9 -5.46875,-9zM3,19c-0.28516,0 -0.55859,0.12891 -0.75,0.34375c-0.19141,0.21484 -0.28516,0.49609 -0.25,0.78125l3,24c0.0625,0.5 0.49609,0.875 1,0.875h9c0.55078,0 1,-0.44531 1,-1v-24c0,-0.55078 -0.44922,-1 -1,-1zM11.5,38c0.82813,0 1.5,0.67188 1.5,1.5c0,0.82813 -0.67187,1.5 -1.5,1.5c-0.82812,0 -1.5,-0.67187 -1.5,-1.5c0,-0.82812 0.67188,-1.5 1.5,-1.5z"></path>
                    </g>
                </g>
            </svg>
        )
    },
    {
        key: 'flower',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsSvgOuter}>
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g className={s.SymbolsPath}>
                    <path d="M20.4375,0c-3.09766,0 -7.4375,1.89453 -7.4375,6.0625c0,5.69141 4.04297,10.625 6.71875,13.90625c0.64063,0.78906 1.38672,1.73047 1.8125,2.375c-0.67187,-0.28516 -1.625,-0.80469 -2.5,-1.28125c-3.18359,-1.73828 -7.54297,-4.125 -12.09375,-4.125c-0.96875,0 -3.35547,0.19141 -4.84375,2.0625c-1.0625,1.33594 -1.35156,3.11719 -0.84375,5.3125c0.37891,1.63672 0.94922,2.58203 1.375,3.25c0.23438,0.36328 0.41406,0.62109 0.46875,0.875c0.05859,0.28125 0.01563,0.83203 -0.03125,1.4375c-0.08594,1.10938 -0.21875,2.64844 0.125,4.28125c0.57031,2.69531 2.62109,5.84375 6.53125,5.84375c0.50391,0 1.05859,-0.07812 1.59375,-0.1875c4.42969,-0.89062 7.89844,-5.23437 10.4375,-8.40625c0.59375,-0.74219 1.3125,-1.59766 1.9375,-2.28125c-0.74219,5.55078 -0.56641,12.69531 3.1875,18.84375l0.09375,0.15625c0.71484,1.19531 2.05078,1.875 3.65625,1.875c1.1875,0 2.68359,-0.42578 3.1875,-1.34375c0.24609,-0.44922 0.23828,-0.94922 -0.03125,-1.375c-0.05078,-0.07812 -0.12109,-0.15625 -0.1875,-0.21875c-4.79297,-4.26172 -6.20703,-10.75 -7.34375,-18.75c1.29297,0.64063 2.81641,2.11719 4.40625,3.65625c2.48047,2.40234 5.31641,5.13672 8.6875,6.28125c0.61719,0.21094 1.26172,0.3125 1.90625,0.3125c2.71484,0 5.15625,-1.88672 5.6875,-4.40625c0.34766,-1.64062 0.21094,-3.01172 0.125,-4c-0.04687,-0.54297 -0.05859,-1.00391 0,-1.28125c0.05469,-0.26562 0.21094,-0.54687 0.4375,-0.9375c0.40625,-0.70312 0.96484,-1.66406 1.3125,-3.3125c0.38281,-1.82031 0.26953,-4.39062 -1.1875,-6.1875c-0.72266,-0.89062 -2.10156,-1.96875 -4.5625,-1.96875c-4.54687,0 -8.91406,2.53906 -12.09375,4.375c-0.77344,0.44531 -1.64062,0.96094 -2.3125,1.28125c0.46094,-0.73437 1.19531,-1.75 1.84375,-2.625c2.80078,-3.78125 6.625,-8.97656 6.625,-13.9375c0,-3.22656 -3.11719,-5.5625 -7.4375,-5.5625c-1.67187,0 -2.75,0.28906 -3.53125,0.5c-0.875,0.23438 -1.30469,0.23828 -2.1875,0c-0.78125,-0.21094 -1.85937,-0.5 -3.53125,-0.5z"></path>
                    </g>
                </g>
            </svg>
        )
    },
    {
        key: 'document',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsPath}>
                    <path d="M 30.398438 2 L 7 2 L 7 48 L 43 48 L 43 14.601563 Z M 30 15 L 30 4.398438 L 40.601563 15 Z"></path>
                </g>
            </svg>
        )
    },
    {
        key: 'person',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsSvgOuter}>
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g className={s.SymbolsPath}>
                        <path d="M23.75,2c-10.94922,0 -17.75,6.82031 -17.75,17.78125c0,1.5625 0.21484,3.10156 0.4375,4.75c0.60547,4.44141 1.23438,9.04688 -2.4375,14.03125c-0.16016,0.21875 -0.23437,0.48047 -0.1875,0.75c0.04688,0.26953 0.21094,0.50391 0.4375,0.65625c0.16797,0.10938 4.15234,2.71094 13.25,3.71875c2.30469,2.77734 4.94922,4.3125 7.5,4.3125c2.5625,0 5.22656,-1.52734 7.53125,-4.3125c9.09375,-1.01562 13.32422,-3.57812 13.5,-3.6875c0.24219,-0.14844 0.38672,-0.41016 0.4375,-0.6875c0.05078,-0.27734 -0.01172,-0.55859 -0.1875,-0.78125c-3.72656,-4.78906 -3.22656,-8.86328 -2.6875,-13.1875c0.19141,-1.54297 0.40625,-3.14844 0.40625,-4.78125c0,-6.53516 -2.92187,-14.15234 -11.125,-14.40625c-3.47266,-3.4375 -6.86719,-4.15625 -9.125,-4.15625zM31.84375,17.34375c1.48438,1.57813 4.15625,5.1875 4.15625,10.9375c0,7.67188 -4.76562,13.78125 -4.8125,13.84375c-0.00781,0.01172 0.00781,0.01953 0,0.03125c-1.96875,2.47266 -4.16406,3.84375 -6.1875,3.84375c-2.02734,0 -4.24219,-1.37891 -6.21875,-3.875c-0.00781,-0.01172 -0.02344,-0.01953 -0.03125,-0.03125c-0.04687,-0.04297 -4.75,-4.52344 -4.75,-11.09375c0,-5.00391 4.29688,-6.05469 8.09375,-6.96875c0.78516,-0.1875 1.51563,-0.35547 2.1875,-0.5625c4.48828,-1.39062 6.64063,-4.34375 7.5625,-6.125zM19.5,28c-0.82812,0 -1.5,0.67188 -1.5,1.5c0,0.82813 0.67188,1.5 1.5,1.5c0.82813,0 1.5,-0.67187 1.5,-1.5c0,-0.82812 -0.67187,-1.5 -1.5,-1.5zM30.5,28c-0.82812,0 -1.5,0.67188 -1.5,1.5c0,0.82813 0.67188,1.5 1.5,1.5c0.82813,0 1.5,-0.67187 1.5,-1.5c0,-0.82812 -0.67187,-1.5 -1.5,-1.5z"></path>
                    </g>
                </g>
            </svg>
        )
    },
    {
        key: 'location',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsSvgOuter}>
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g className={s.SymbolsPath}>
                        <path d="M25,1c-8.82031,0 -16,7.17969 -16,16c0,14.11328 14.62891,30.94531 15.25,31.65625c0.19141,0.21875 0.46094,0.34375 0.75,0.34375c0.30859,-0.01953 0.55859,-0.125 0.75,-0.34375c0.62109,-0.72266 15.25,-17.84375 15.25,-31.65625c0,-8.82031 -7.17969,-16 -16,-16zM25,12c3.3125,0 6,2.6875 6,6c0,3.3125 -2.6875,6 -6,6c-3.3125,0 -6,-2.6875 -6,-6c0,-3.3125 2.6875,-6 6,-6z"></path>
                    </g>
                </g>
            </svg>
        )
    },
    {
        key: 'cafe',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsSvgOuter}>
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g className={s.SymbolsPath}>
                        <path d="M25.98438,1.98438c-0.55078,0.01172 -0.99219,0.46484 -0.98437,1.01563c0,3.05469 -1.16797,3.96484 -2.66016,5.30469c-1.49219,1.33594 -3.32422,3.10547 -3.32422,6.69531c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891c0,-2.98437 1.16016,-3.86328 2.66016,-5.20703c1.5,-1.34375 3.32422,-3.14453 3.32422,-6.79297c0.00391,-0.26953 -0.10156,-0.53125 -0.29297,-0.72266c-0.19141,-0.19141 -0.45312,-0.29687 -0.72266,-0.29297zM30.99219,6.98438c-0.55078,0.01172 -0.99219,0.46484 -0.98437,1.01563c0,1.95313 -0.67187,2.41797 -1.66797,3.30469c-0.99609,0.88672 -2.33984,2.20703 -2.33984,4.69531c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891c0,-1.875 0.66016,-2.30469 1.66797,-3.20312c1.00781,-0.89453 2.33984,-2.25 2.33984,-4.79687c0.00391,-0.26953 -0.10156,-0.53125 -0.29297,-0.72266c-0.19141,-0.19141 -0.45312,-0.29687 -0.72266,-0.29297zM11,19c-0.55078,0 -1,0.44531 -1,1v12c0,3.27344 1.58594,6.17578 4.02734,8h19.94531c1.9375,-1.44922 3.32422,-3.58203 3.81641,-6.03906c2.28516,-0.1875 3.95703,-1.18359 4.91016,-2.71484c1.02734,-1.66406 1.27344,-3.77734 1.28516,-6.07422c0.00391,-0.00781 0.00391,-0.01562 0.00391,-0.02344c0.00781,-0.05078 0.01172,-0.09766 0.01172,-0.14844c0,-1.64453 -1.35547,-3 -3,-3h-3v-2c0,-0.55469 -0.44922,-1 -1,-1zM38,24h3c0.56641,0 1,0.43359 1,1c0,2.21484 -0.28906,4.04297 -1,5.19141c-0.59766,0.96094 -1.44141,1.57031 -3,1.74609zM7,42c-0.55078,0 -1,0.44531 -1,1c0,2.76953 3.82813,5 7,5h22c3.23828,0 7,-2.18359 7,-5c0,-0.55469 -0.44922,-1 -1,-1z"></path>
                    </g>
                </g>
            </svg>
        )
    },
    {
        key: 'puzzle',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsPath}>
                    <path d="M 26.5625 1 C 22.621094 1 19.40625 4.140625 19.40625 8 C 19.40625 9.769531 20.035156 10.992188 21.125 12.53125 C 21.894531 13.621094 21.988281 14.34375 21.84375 14.625 C 21.703125 14.894531 21.164063 15.046875 20.46875 15 C 17.996094 14.832031 10.339844 13.941406 10.3125 13.9375 C 10.140625 13.910156 9.964844 13.90625 9.8125 13.90625 C 8.9375 13.90625 7.417969 14.328125 7.09375 17.15625 C 7.007813 17.570313 6.617188 19.808594 6.03125 27.5625 C 5.96875 27.878906 6.015625 28.164063 6.0625 28.40625 C 6.277344 29.503906 7.003906 30.15625 8 30.15625 C 9.03125 30.15625 10.203125 29.460938 11.78125 28.34375 C 13.097656 27.414063 14.191406 27 15.3125 27 C 18.152344 27 20.46875 29.242188 20.46875 32 C 20.46875 34.757813 18.152344 37 15.3125 37 C 13.988281 37 13.078125 36.632813 11.71875 35.5625 C 10.140625 34.320313 8.949219 33.75 8 33.75 C 7.160156 33.75 6.511719 34.210938 6.1875 35 C 6 35.460938 5.964844 36.144531 6.03125 36.53125 C 6.550781 41.972656 6.808594 42.972656 7.03125 43.84375 L 7.125 44.21875 C 7.511719 45.90625 8.707031 47 10.15625 47 L 42.1875 47 C 44.507813 47 46 45.527344 46 43.25 L 46 17.375 C 46 15.660156 45.085938 14.515625 43.25 13.96875 C 43.125 13.929688 42.976563 13.925781 42.84375 13.9375 C 42.769531 13.945313 35.261719 14.691406 32.59375 15 C 32.492188 15.011719 32.378906 15.03125 32.28125 15.03125 C 32.027344 15.03125 31.574219 14.992188 31.40625 14.6875 C 31.222656 14.359375 31.273438 13.605469 31.96875 12.5 L 32.09375 12.3125 C 33.160156 10.617188 33.6875 9.761719 33.6875 8 C 33.6875 4.140625 30.503906 1 26.5625 1 Z"></path>
                </g>
            </svg>
        )
    },
    {
        key: 'home',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsPath}>
                    <path d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z"></path>
                </g>
            </svg>
        )
    },
    {
        key: 'phone',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsPath}>
                    <path d="M 14 3.9902344 C 8.4886661 3.9902344 4 8.4789008 4 13.990234 L 4 35.990234 C 4 41.501568 8.4886661 45.990234 14 45.990234 L 36 45.990234 C 41.511334 45.990234 46 41.501568 46 35.990234 L 46 13.990234 C 46 8.4789008 41.511334 3.9902344 36 3.9902344 L 14 3.9902344 z M 18.005859 12.033203 C 18.633859 12.060203 19.210594 12.414031 19.558594 12.957031 C 19.954594 13.575031 20.569141 14.534156 21.369141 15.785156 C 22.099141 16.926156 22.150047 18.399844 21.498047 19.589844 L 20.033203 21.673828 C 19.637203 22.237828 19.558219 22.959703 19.824219 23.595703 C 20.238219 24.585703 21.040797 26.107203 22.466797 27.533203 C 23.892797 28.959203 25.414297 29.761781 26.404297 30.175781 C 27.040297 30.441781 27.762172 30.362797 28.326172 29.966797 L 30.410156 28.501953 C 31.600156 27.849953 33.073844 27.901859 34.214844 28.630859 C 35.465844 29.430859 36.424969 30.045406 37.042969 30.441406 C 37.585969 30.789406 37.939797 31.366141 37.966797 31.994141 C 38.120797 35.558141 35.359641 37.001953 34.556641 37.001953 C 34.000641 37.001953 27.316344 37.761656 19.777344 30.222656 C 12.238344 22.683656 12.998047 15.999359 12.998047 15.443359 C 12.998047 14.640359 14.441859 11.879203 18.005859 12.033203 z"></path>
                </g>
            </svg>
        )
    },
];

interface iSymbol{
    [key: string]: () => JSX.Element
}

export const SYMBOLS_OBJ = SYMBOLS.reduce((next: iSymbol, val) => {
    next[val.key] = val.render;
    return next;
}, {});


export const EDITOR_SYMBOLS = [
    {
        key: 'bold',
        render: () => (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className={s.SymbolsSvg}>
                <g className={s.SymbolsSvgOuter}>
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g className={s.SymbolsPath}>
                        <path d="M40.95313,25.92188c-0.9375,-1.36719 -2.22266,-2.44531 -3.83594,-3.21875c0.99609,-0.70312 1.80859,-1.51562 2.43359,-2.42969c0.99219,-1.45703 1.49609,-3.28125 1.49609,-5.42187c0,-1.94531 -0.33594,-3.61719 -0.99219,-4.97266c-0.66797,-1.37891 -1.625,-2.5 -2.84375,-3.33203c-1.18359,-0.80859 -2.60937,-1.39844 -4.24609,-1.74609c-1.57422,-0.33594 -3.33594,-0.50781 -5.23047,-0.50781h-18.14453c-0.55078,0 -1,0.44531 -1,1v38.55469c0,0.55078 0.44922,1 1,1h18.68359c1.80859,0 3.59375,-0.23047 5.30469,-0.68359c1.74609,-0.46094 3.32422,-1.18359 4.69531,-2.14453c1.40234,-0.98828 2.53125,-2.27734 3.35938,-3.83203c0.82813,-1.55859 1.25,-3.41797 1.25,-5.51562c0,-2.60547 -0.65234,-4.875 -1.92969,-6.75zM18.06641,11.87891h7.94141c0.75391,0 1.48438,0.0625 2.1875,0.1875c0.69922,0.12891 1.32031,0.35547 1.86328,0.67578c0.53906,0.32422 0.96875,0.77734 1.29297,1.35156c0.32422,0.57813 0.48828,1.31641 0.48828,2.21484c0,1.62109 -0.48828,2.78906 -1.46094,3.50781c-0.97266,0.72266 -2.21484,1.08203 -3.72656,1.08203h-8.58594zM32.89063,34.66797c-0.33984,0.64844 -0.80078,1.16016 -1.375,1.53906c-0.57812,0.37891 -1.24219,0.64844 -2,0.8125c-0.75391,0.16016 -1.54687,0.24219 -2.375,0.24219h-9.07422v-10.58594h9.23438c1.83984,0 3.3125,0.42578 4.42969,1.26953c1.11719,0.84766 1.67578,2.26172 1.67578,4.24219c-0.00391,1.00391 -0.17578,1.83203 -0.51562,2.48047z"></path>
                    </g>
                </g>
            </svg>
        )
    },
]

export const EDITOR_SYMBOLS_OBJ = EDITOR_SYMBOLS.reduce((next: iSymbol, val) => {
    next[val.key] = val.render;
    return next;
}, {});
