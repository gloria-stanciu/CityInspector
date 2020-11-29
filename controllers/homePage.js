const homePage = (req, res) => {
    return res.status(200)
}

module.exports = {
    '/': {
        get: {
            action: homePage,
            level: 'public',
        },
    },
}