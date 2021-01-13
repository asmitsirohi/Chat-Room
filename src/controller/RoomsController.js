class RoomsController {
    index = (req, res) => {
        let params = {title: 'Chat Room'}
        res.status(200).render('rooms', params);
    }
}

module.exports = RoomsController;