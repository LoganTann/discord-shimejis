# discord-shimejis

<img align="left" src="https://pbs.twimg.com/media/FaJC1SMXwAEbUP6?format=jpg" alt="plugin screenshot"/>

Betterdiscord plugin that adds a desktop pet in your discord client.

**Work in Progress** : Need to add more complex behaviors (such as walking/climbing) and improve discord compatiblity

**To Do** :
* Create moving behaviors (actually, the mascot will just jump randomly)

## Demo and real bundle

To increase development speed, the mascot is made to work on two environments :
- **A faked discord window**, also called "demo".  
  This is where I develop behaviors and animations first. 
- **The real discord window**, that runs under the BetterDiscord client.
  Once enough progress is done, I port the code to make it working in the real discord window. A plugin bundle can be safely created.

## Demo

You can try the latest version of this project on a fake discord window here : https://logantann.github.io/discord-shimejis/

To try it in a real discord window, see next section or wait for the future release.

## Develop / Build the project

Since this project is still in development, I don't provide a drag&drop build of the plugin. You will need to build it yourself.

* Clone the project : `git clone https://github.com/LoganTann/discord-shimejis.git`
* Download the dependancies using `yarn install` (yarnpkg needs to be installed)

If you want to develop/try in the **fake discord window** :

* To compile files and try the plugin using a faked discord window, run `yarn dev-demo`.
* The ViteJs module bundler will serve the window here : `http://localhost:5173/`

If you want to develop/try in a **real discord client** :

* To create a development bundle, run `yarn dev`.
* the dev bundle will be linked automatically to your betterdiscord client

Both dev commands are made to automatically reload the page (or plugin if discord client) on save.

## Create production builds.

* `yarn build-demo` to build the fake window playground
* `yarn build` to build a bundle to be used in a betterdiscord client.

## Other files

I also created a webpage to preview the sprites here : https://logantann.github.io/discord-shimejis/img/index.html

There is a draw.io chart that shows the expected behaviors and their relations in the file `states.drawio`. Screenshot here : https://twitter.com/kagescan/status/1558882099846848514/photo/1

