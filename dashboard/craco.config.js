const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@store': resolvePath('./src/store'),
            '@components': resolvePath('./src/components'),
            '@pages': resolvePath('./src/pages'),
            '@assets': resolvePath('./src/assets')
        }
    },
}