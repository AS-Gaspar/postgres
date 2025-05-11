const path = require('path')

exports.errorPage = (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', '..', 'public', 'views', '404.html'))
}