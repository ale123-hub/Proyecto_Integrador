const usuairoCtrl = {};

usuairoCtrl.renderUserProfile = (req, res, next) => {
  res.render('Seguimiento/listar');
}
module.exports = usuairoCtrl;