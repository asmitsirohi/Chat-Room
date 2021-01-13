class DashboardController {
    index = (req, res) => {
        let params = {title: 'Chat Room'}
        res.status(200).render('dashboard', params);
    }
}

module.exports = DashboardController;