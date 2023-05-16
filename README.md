# Ride to work by bike frontend (ride-to-work-by-bike)

A Ride to work by bike web app is based on the [Quasar framework](https://quasar.dev/) ([Vue.js version 3](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/), [TOML](https://toml.io)).

## Install the dependencies

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

Adjust app config via [TOML](https://toml.io/en/) config file `ride_to_work_by_bike_config.toml` or
via SHELL/ENV variables (check vars with `cat ./src/utils/get_app_conf.js`).

App global vars defined inside config file `ride_to_work_by_bike_config.toml` are overrided
by SHELL/ENV vars (defined here `./src/utils/get_app_conf.js`).

When you add some app new global var inside config file `ride_to_work_by_bike_config.toml` you must
add correspoding SHELL/ENV var here `./src/utils/get_app_conf.js`.

And before merge your PR (deploy to k8) you must add new/changed correspoding SHELL/ENV var
[ride-to-work-by-bike-frontend-test.yaml](https://github.com/auto-mat/k8s/blob/master/manifests/config-maps/ride-to-work-by-bike-frontend-test.yaml#)
and [ride-to-work-by-bike-frontend.lib.yaml](https://github.com/auto-mat/k8s/blob/master/manifests/ytt/lib/ride-to-work-by-bike-frontend.lib.yaml).

Start dev server with

```bash
npx qusar dev
```

### Lint the files

```bash
yarn lint
```

### Format the files

```bash
yarn format
```

### Run app tests

```bash
# Component tests with default Electron web browser
npx cypress run --component
# or
npx cypress open --component

# Component tests with Mozilla Firefox web browser
npx cypress run --component --browser $(which firefox-bin)
# or
npx cypress open --browser $(which firefox-bin)

# e2e and unit tests with default Electron web browser
npx cypress run --e2e
# or
npx cypress open --e2e

# e2e and unit tests with Mozilla Firefox web browser
npx cypress run --e2e --browser $(which firefox-bin)
# or
npx cypress open --browser $(which firefox-bin)

```

### Build the app for production

Adjust app config via [TOML](https://toml.io/en/) config file `ride_to_work_by_bike_config.toml` or
via SHELL/ENV variables (check vars with `cat ./src/utils/get_app_conf.js`).

Build app with

```bash
npx quasar build
```

Copy content of the `dist/spa/*` dir into webserver Apache/NGINX dir.

### Deployed app

App is automatically deployed into k8 repository.

Open web app URL https://rtwbb-test.dopracenakole.net/ with your default browser.

```bash
test@test:~$ xdg-open https://rtwbb-test.dopracenakole.net
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### Licence

[GNU AGPLv3](https://www.gnu.org/licenses/agpl-3.0.en.html) or later.
