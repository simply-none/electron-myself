import testWithSpectron from 'vue-cli-plugin-electron-builder/lib/testWithSpectron';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
// eslint-disable-next-line no-undef
const spectron = __non_webpack_require__('spectron');

chai.should();
chai.use(chaiAsPromised);

describe('Application launch', function a() {
  this.timeout(30000);

  beforeEach(function b() {
    return testWithSpectron(spectron).then((instance) => {
      this.app = instance.app;
      this.stopServe = instance.stopServe;
    });
  });

  beforeEach(function c() {
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness;
  });

  afterEach(function d() {
    if (this.app && this.app.isRunning()) {
      return this.stopServe();
    }
    return undefined;
  });

  it('opens a window', function e() {
    return this.app.client
      .getWindowCount()
      .should.eventually.have.at.least(1)
      .browserWindow.isMinimized()
      .should.eventually.be.false.browserWindow.isVisible()
      .should.eventually.be.true.browserWindow.getBounds()
      .should.eventually.have.property('width')
      .and.be.above(0)
      .browserWindow.getBounds()
      .should.eventually.have.property('height')
      .and.be.above(0);
  });
});
