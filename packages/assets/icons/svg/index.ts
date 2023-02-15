// const fs = require('fs');
// const dirnameExportImg = './assets/export'
// fs.readdir(dirnameExportImg, function (err, files) {
//     if (err) {
//         console.log(err)
//     }
//     files.map(
//         (file) => { console.log(file) }
//     )
// })
//-------------------------------------------------------------------
// const cache = {};
// function importAll(r) {
//     r.keys().forEach((key) => (cache[key] = r(key)));
// }
// importAll(require.context('./.', false, /\.svg$/));
// export cache;

import lion from './lion.svg';
import usermale from './usermale.svg';
import userfemale from './userfemale.svg';
import bear from './bear.svg';
import whale from './whale.svg';
import sloth from './sloth.svg';
import microbe from './microbe.svg';
import admin from './microbe.svg';
import oldking from './oldking.svg';

export {
    lion,
    usermale,
    userfemale,
    bear,
    whale,
    sloth,
    microbe,
    admin,
    oldking
};
