# Retro Snake Game

> [Live Demo](https://johnpham.net/snake)

## About

This is a version of the classic snake game written in Javascript. This version takes a twist on the classic game by adding a music component to it. The longer the game lasts, the harder the game will get.

## Working Features

- The UI for the game is drawn using HTML canvas
- Saves the high score to local storage
- Controls
  - You can use the arrow keys, wasd, or if you prefer Vim, hjkl.

## Next Steps

- Below is the Features log. The unchecked features are items that I did not get to within the 3 hour working session.

## Features Log

- [x] Start Game Screen
  - Prompt controls
  - Press space or enter to start the game
- [x] Add WASD controls
- [x] Game Over Screen
- [x] Track high score using local storage
- [x] Add sound effects when eating
- [ ] Add a delay from when the user starts the game to the game actually starting
- [ ] Flash head and intersected segment upon collision
- [ ] Add sound effects when changing direction
- [ ] Allow for song tempo change to be triggered by current score rather than time
- [ ] Add a timer for last eaten, if you haven't eaten within x time from the last thing, you will lose a segment
- [ ] Make responsive for mobile
  - Add swipe controls
- [ ] Add animations for screen transitions
- [ ] Bundle/minify/uglify `.js` and `.css` files

## Live Demo

Test out the game live [here](https://johnpham.net/snake)!

## Credits

- [Soundtrack is from the Impossible Game](https://impossiblegame.org/)
  - Track was edited for this game
