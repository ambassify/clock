# @ambassify/clock

A timer with drift correction

## Installation

```sh
npm install --save @ambassify/clock
```

## Usage

```sh
const Clock = require('@ambassify/clock');

const clock = new Clock(1000);

clock.on('tick', function() {
    console.log('1000ms elapsed');
});

clock.start();
```

## API

### Clock

**``new Clock(<interval>, [handler])``**

 - `interval` is the interval at which to fire the `tick` event in milliseconds.
 - `handler` optionally, a default handler for the `tick` event which will be attached for you.

**``.start()``**

Starts the interval, from this point onwards the `tick` event will fire every `interval` milliseconds.

**``.stop()``**

Stops the clock from ticking, no `tick` events will be fired until the clock is restarted using `.start()`.

**``.on('tick', <handler>)``**

Attaches a new `tick` handler to the clock, a clock can have many `tick` handlers at the same time.

**``.off(`tick`, <handler>)``**

Detaches the `handler` function from the clock such that it will no longer receive `tick` events.

## Contributing

If you have some issue or code you would like to add, feel free to open a Pull Request or Issue and we will look into it as soon as we can.

## License

We are releasing this under a MIT License.

## About us

If you would like to know more about us, be sure to have a look at [our website](https://www.ambassify.com), or our Twitter accounts [Ambassify](https://twitter.com/Ambassify), [Sitebase](https://twitter.com/Sitebase), [JorgenEvens](https://twitter.com/JorgenEvens)