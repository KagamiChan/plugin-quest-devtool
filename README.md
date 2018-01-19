DEVTOOL FOR POI PLUGIN QUEST INFO
---------------------------------

How to:
=======

### Installation
1. Prerequisites: `git`, `yarn`
1. Clone this repo: `git clone https://github.com/KagamiChan/plugin-quest-devtool.git`
1. Initialize submodule and update: `git submodule init && git submodule update`
1. Update plugin-quest to latest:
    ```shell
    cd ./src/plugin-quest
    git checkout master
    git pull --rebase
    cd ../..
    ```
    Note that this will bring in changes
1. Install dependencies: `yarn`

### Usage
1. Start web server: `yarn start`
1. Open `http://127.0.0.1:5000` in MODERN browser
1. Paste your json to the editor on the left, and parsing results will be shown on the right pane.
