class HouseScene extends Phaser.Scene {
    constructor() {
        super('house');
    }

    create() {
        window.gameState.location = 'house';

        // Background (interior)
        this.add.rectangle(400, 300, 800, 600, 0xd4a574);

        // Title
        this.add.text(400, 30, 'Your Kitchen', {
            font: 'bold 24px courier',
            fill: '#654321',
            align: 'center'
        }).setOrigin(0.5);

        // Create player
        this.player = new Player(this, 400, 450);

        // Create crafting stations
        this.createCraftingStations();

        // Create exit to garden shop (top right)
        this.exitShop = this.add.rectangle(750, 100, 60, 40, 0x90ee90);
        this.exitShop.setStrokeStyle(2, 0x2d5016);
        this.add.text(750, 100, 'Garden\nShop', {
            font: 'bold 10px courier',
            fill: '#000000'
        }).setOrigin(0.5);

        // Input handling
        this.keys = {
            left: this.input.keyboard.addKey('LEFT'),
            right: this.input.keyboard.addKey('RIGHT'),
            up: this.input.keyboard.addKey('UP'),
            down: this.input.keyboard.addKey('DOWN'),
            e: this.input.keyboard.addKey('E'),
            i: this.input.keyboard.addKey('I'),
            space: this.input.keyboard.addKey('SPACE')
        };

        this.createInventoryUI();
        this.createCraftingQueueUI();

        this.uiScene = this.scene.get('ui');
    }

    createCraftingStations() {
        const stations = [
            { x: 150, y: 200, name: 'Infusion\nStation', recipes: ['lavenderInfusion', 'peppermintInfusion'] },
            { x: 350, y: 200, name: 'Decoction\nStation', recipes: ['gingerDecoction', 'echinaceaDecoction'] },
            { x: 550, y: 200, name: 'Oil\nStation', recipes: ['rosemaryOil', 'lavenderOil'] }
        ];

        this.stations = [];
        stations.forEach(config => {
            const station = this.add.rectangle(config.x, config.y, 80, 60, 0xb0c4de);
            station.setStrokeStyle(2, 0x4169e1);
            station.setInteractive();
            station.setData('recipes', config.recipes);
            station.setData('name', config.name);

            this.add.text(config.x, config.y, config.name, {
                font: 'bold 10px courier',
                fill: '#000000',
                align: 'center',
                wordWrap: { width: 70 }
            }).setOrigin(0.5);

            station.on('pointerdown', () => {
                this.showRecipeMenu(config.recipes, config.name);
            });

            this.stations.push(station);
        });
    }

    showRecipeMenu(recipes, stationName) {
        // Clear existing menu if any
        if (this.recipeMenu) {
            this.recipeMenu.destroy();
        }

        // Create recipe menu
        let menuText = `${stationName} Recipes:\n\n`;
        recipes.forEach((recipeId, index) => {
            const recipe = RECIPES[recipeId];
            const canCraft = window.canCraftRecipe(recipeId);
            const color = canCraft ? '#00ff00' : '#ff6b6b';
            menuText += `[${index + 1}] ${recipe.name} - ${canCraft ? 'Ready' : 'Missing items'}\n`;
        });
        menuText += '\nPress 1-9 to craft';

        this.recipeMenu = this.add.text(50, 300, menuText, {
            font: '11px courier',
            fill: '#000000',
            backgroundColor: '#ffffe0',
            padding: { x: 10, y: 10 },
            wordWrap: { width: 300 }
        });
        this.recipeMenu.setDepth(100);

        // Add number key listeners
        recipes.forEach((recipeId, index) => {
            const key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes['ONE'] + index);
            key.once('down', () => {
                this.craftRecipe(recipeId);
                if (this.recipeMenu) {
                    this.recipeMenu.destroy();
                    this.recipeMenu = null;
                }
            });
        });

        // Close menu on ESC
        const escKey = this.input.keyboard.addKey('ESC');
        escKey.once('down', () => {
            if (this.recipeMenu) {
                this.recipeMenu.destroy();
                this.recipeMenu = null;
            }
        });
    }

    craftRecipe(recipeId) {
        const recipe = RECIPES[recipeId];
        if (window.canCraftRecipe(recipeId)) {
            window.startCrafting(recipeId);
            this.showNotification(`Crafting ${recipe.name}...`);
        } else {
            this.showNotification('Missing ingredients!');
        }
    }

    createInventoryUI() {
        this.add.text(50, 380, 'Inventory', {
            font: 'bold 12px courier',
            fill: '#654321'
        });

        this.inventoryText = this.add.text(50, 400, '', {
            font: '9px courier',
            fill: '#000000'
        });
    }

    createCraftingQueueUI() {
        this.add.text(400, 380, 'Crafting Queue', {
            font: 'bold 12px courier',
            fill: '#654321'
        });

        this.queueText = this.add.text(400, 400, '', {
            font: '9px courier',
            fill: '#000000'
        });
    }

    showNotification(message) {
        const notif = this.add.text(400, 100, message, {
            font: 'bold 14px courier',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        });
        notif.setOrigin(0.5);
        notif.setDepth(101);

        this.time.delayedCall(2000, () => {
            notif.destroy();
        });
    }

    update() {
        // Update player
        this.player.update(this.keys);

        // Check for garden shop exit
        const playerPos = this.player.getPosition();
        const dist = Phaser.Math.Distance.Between(
            playerPos.x, playerPos.y,
            750, 100
        );

        if (dist < 40 && this.keys.e.isDown) {
            this.scene.start('gardenShop');
        }

        // Update crafting queue
        const completed = window.updateCraftingQueue();
        if (completed.length > 0) {
            completed.forEach(craft => {
                this.showNotification(`${craft.recipe.name} completed!`);
            });
        }

        // Update UI displays
        this.updateInventoryDisplay();
        this.updateQueueDisplay();
    }

    updateInventoryDisplay() {
        let text = '';
        window.gameState.inventory.forEach(item => {
            const itemData = ITEMS[item.id];
            text += `${itemData.name}: ${item.quantity}\n`;
        });
        this.inventoryText.setText(text);
    }

    updateQueueDisplay() {
        let text = '';
        window.gameState.craftingQueue.forEach(craft => {
            const now = Date.now();
            const timeLeft = Math.max(0, Math.ceil((craft.completionTime - now) / 1000));
            text += `${craft.recipe.name}: ${timeLeft}s\n`;
        });
        this.queueText.setText(text);
    }
}
