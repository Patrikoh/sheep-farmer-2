# Sheep Herder 2

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run watch` | Build project and open web server running project, watching for changes |
| `npm run dev` | Builds project and open web server, but do not watch for changes |
| `npm run build` | Builds code bundle with production settings (minification, no source maps, etc..) 

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm run watch`.

After starting the development server with `npm run watch`, you can edit any files in the `src` folder
and Rollup will automatically recompile and reload your server (available at `http://localhost:5000`
by default).

## Sprites

Use https://www.aseprite.org/

## Editing tilemap

Use https://www.mapeditor.org/

## Fonts

1. Download ttf fonts.
2. Use https://github.com/andryblack/fontbuilder/downloads and import the ttf font.
3. Edit the font so it works for a low pixel count.
4. Export to png file + definitions with sparrow format.

## Deploy

Commits to `master` are automatically deployed using AWS Amplify to https://sheepherder2.com.
