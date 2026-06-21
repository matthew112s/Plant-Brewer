# Plant Brewer 🌿

A 2D plant infusion and concoction simulator game with 16-bit graphics.

## Game Overview

Manage your own herbal business! Buy plants from a garden shop, craft infusions, decoctions, oils, and special concoctions, and sell them for profit.

### Features (MVP)

- **Garden Shop**: Browse and purchase plants and base ingredients
- **House with Kitchen**: Craft various herbal preparations
- **Inventory System**: Manage plants, ingredients, and finished products
- **Economy System**: Start with money, earn profit from sales
- **Crafting Mechanics**:
  - Water-based infusions (hot & cold)
  - Decoctions (simmered preparations)
  - Oil infusions
  - Herbal vinegars
  - Syrups
  - Tinctures
- **Time-based progression**: Different recipes take different times

### Future Features

- Forest foraging system
- Home garden growing mechanics
- Equipment upgrades
- Magical ingredients
- Essential oil distillation
- Expanded recipe system

## Getting Started

1. Open `index.html` in a web browser
2. Start with 500 gold
3. Visit the Garden Shop to buy plants
4. Go home and craft preparations in your kitchen
5. Sell finished products for profit

## Technology

- **Phaser 3**: Game framework
- **HTML5 Canvas**: Rendering
- **Local Storage**: Game saves
- **Pixel Art**: 16-bit aesthetic

## Project Structure

```
├── index.html           # Main game file
├── js/
│   ├── game.js         # Main game config
│   ├── scenes/         # Game scenes
│   ├── entities/       # Game objects
│   └── data/           # Game data (recipes, items, etc)
└── assets/
    ├── sprites/        # Pixel art sprites
    └── tiles/          # Tilemap data
```
