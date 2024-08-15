let express = require('express');
let router = express.Router();

const musics = require('../controllers/music.controller.js');

router.post('/api/musics/create', musics.create);
router.get('/api/musics/all', musics.retrieveAll);
router.get('/api/musics/onebyid/:id', musics.getById);
router.put('/api/musics/update/:id', musics.updateById);
router.delete('/api/musics/delete/:id', musics.deleteById);

module.exports = router;
