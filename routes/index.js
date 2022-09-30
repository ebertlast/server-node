module.exports = app => {
  require('./test_route')(app);
  require('./test2_route')(app);
  require('./afi_route')(app);
  require('./tgen_route')(app);
}