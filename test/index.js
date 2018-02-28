// import mockery from 'mockery';
const sinon = require('sinon');
const assert = require('assert');

describe('clock', () => {

    let Clock = null;
    let sandbox = null;

    before(() => {
        Clock = require('../src');
    })

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    })

    afterEach(() => {
        sandbox.restore();
        sandbox = null;
    })

    describe('# constructor', () => {
        it('Should construct a valid clock', () => {
            const clock = new Clock(200);

            assert.equal(clock._interval, 200);
            assert.equal(clock._timer, null);
        })

        it('Should construct with default timeout', () => {
            const clock = new Clock();

            assert.equal(clock._interval, 60000);
            assert.equal(clock._timer, null);
        })

        it('Should attach a tick handler', () => {
            const spy = sinon.spy();
            const clock = new Clock(200, spy);

            assert.equal(clock._interval, 200);
            assert.equal(clock._timer, null);

            clock.emit('tick');

            assert.equal(spy.callCount, 1);
        })
    })

    describe('# tick', () => {
        it('Should tick at most once every interval', function(done) {
            this.retries(3);

            const clock = new Clock(100);
            let lastTick = null;

            clock.on('tick', () => {
                try {
                    if (lastTick) {
                        const timeout = Date.now() - lastTick;
                        assert(timeout > 90, 'timeout has expired');
                        assert(timeout < 110, 'timeout has not overshot too far');
                        clock.stop();
                        done();
                    }
                    lastTick = Date.now();
                } catch(e) {
                    clock.stop();
                    done(e);
                }
            });

            clock.start();
            assert.notEqual(clock._timer, null);
        })

        it('Should correct for slow handlers', (done) => {
            const clock = new Clock(100);
            let lastTick = null;

            clock.on('tick', () => {
                try {
                    if (lastTick) {
                        const timeout = Date.now() - lastTick;
                        assert(timeout > 95, 'timeout has expired');
                        assert(timeout < 105, 'timeout has not overshot too far');
                        clock.stop();
                        done();
                    }
                    lastTick = Date.now();

                    const s = Date.now();
                    while(Date.now() - s < 70);
                } catch(e) {
                    clock.stop();
                    done(e);
                }
            });

            clock.start();
            assert.notEqual(clock._timer, null);
        })
    })

});
