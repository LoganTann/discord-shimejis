# discord-shimejis

<img align="left" src="https://pbs.twimg.com/media/FaJC1SMXwAEbUP6?format=jpg" alt="plugin screenshot"/>

Betterdiscord plugin that adds a desktop pet in your discord client.

**Work in Progress** : Basic idle animations + Throw and Grab behaviors are implemented.

**To Do** :  
* Create a bundle and adapt the code to make it work with the real discord client
* Create moving behaviors (actually, the mascot will just jump randomly)

## Try it (in a fake discord window)

https://logantann.github.io/discord-shimejis/

## Develop / Build the project (in a fake discord window)

Actually, creating a discord plugin needs the source code to be bundled to a specific format. Therefore, in order to develop the plugin faster, it was made only to work on that fake window. I will adapt the code and create a bundle once I make enough progress.

1. Clone the project : `git clone https://github.com/LoganTann/discord-shimejis.git`
2. Download the dependancies using `yarn install` (yarnpkg needs to be installed)
3. To compile files and try the plugin using a faked discord window, run `yarn dev`.
4. The ViteJs module bundler will serve the window here : `http://localhost:5173/`

## Other files

I also created a webpage to preview the sprites here : https://logantann.github.io/discord-shimejis/img/index.html

There is a draw.io chart that shows the expected behaviors and their relations in the file `states.drawio`. Screenshot here : https://twitter.com/kagescan/status/1558882099846848514/photo/1
