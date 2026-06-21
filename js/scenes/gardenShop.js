class GardenShopScene extends Phaser.Scene {
    constructor() {
        super('gardenShop');
    }

    create() {
        window.gameState.location = 'gardenShop';

        // Background
        this.add.rectangle(400, 300, 800, 600, 0xc4d96f);

        // Title
        this.add.text(400, 30, 'Garden Shop', {
            font: 'bold 24px courier',
            fill: '#2d5016',
            align: 'center'
        }).setOrigin(0.5);

        // Create player
        this.player = new Player(this, 400, 450);

        // Create vendor NPC
        const vendor = new NPC(this, 100, 150, {
            name: 'Vendor',
            role: 'vendor',
            color: 0x8b4513,
            onInteract: () => this.showShopMenu()
        });
        this.vendor = vendor;

        // Create exit to house (bottom left)
        this.exitHouse = this.add.rectangle(50, 500, 60, 40, 0x654321);
        this.exitHouse.setStrokeStyle(2, 0x8b4513);
        this.add.text(50, 500, 'House', {
            font: 'bold 12px courier',
            fill: '#ffffff'
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

        // Create plant display
        this.createPlantDisplay();

        // Create inventory UI
        this.createInventoryUI();

        this.uiScene = this.scene.get('ui');
    }

    createPlantDisplay() {
        // Display available plants to buy
        const plants = ['lavender', 'peppermint', 'chamomile', 'rosemary', 'gingerRoot'];
        const startX = 200;
        const startY = 200;
        const spacing = 120;

        plants.forEach((plantId, index) => {
            const plant = ITEMS[plantId];
            const x = startX + (index % 3) * spacing;
            const y = startY + Math.floor(index / 3) * 100;

            // Plant box
            const box = this.add.rectangle(x, y, 80, 60, 0x90ee90);
            box.setStrokeStyle(2, 0x2d5016);
            box.setInteractive();
            box.setData('plantId', plantId);

            // Plant name
            this.add.text(x, y - 15, plant.name, {
                font: 'bold 10px courier',
                fill: '#000000',
                align: 'center',
                wordWrap: { width: 70 }
            }).setOrigin(0.5);

            // Price
            this.add.text(x, y + 10, `${plant.price}g`, {
                font: 'bold 10px courier',
                fill: '#ffd700'
            }).setOrigin(0.5);

            // Click to buy
            box.on('pointerdown', () => {
                this.purchasePlant(plantId);
            });
        });
    }

    purchasePlant(plantId) {
        const plant = ITEMS[plantId];
        if (window.gameState.gold >= plant.price) {
            window.removeGold(plant.price);
            window.addToInventory(plantId);
            this.uiScene.updateUI();
            this.showNotification(`Purchased ${plant.name}!`);
        } else {
            this.showNotification('Not enough gold!');
        }
    }

    createInventoryUI() {
        // Simple inventory display
        this.add.text(700, 100, 'Inventory', {
            font: 'bold 12px courier',
            fill: '#2d5016'
        });

        this.inventoryText = this.add.text(700, 120, '', {
            font: '10px courier',
            fill: '#000000'
        });
        this.updateInventoryDisplay();
    }

    updateInventoryDisplay() {
        let text = '';
        window.gameState.inventory.slice(0, 5).forEach(item => {
            const itemData = ITEMS[item.id];
            text += `${itemData.name}: ${item.quantity}\n`;
        });
        if (window.gameState.inventory.length > 5) {
            text += `... +${window.gameState.inventory.length - 5} more`;
        }
        this.inventoryText.setText(text);
    }

    showNotification(message) {
        const notif = this.add.text(400, 50, message, {
            font: 'bold 16px courier',
            fill: '#ff6b6b',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        });
        notif.setOrigin(0.5);

        this.time.delayedCall(2000, () => {
            notif.destroy();
        });
    }

    showShopMenu() {
        this.showNotification('Shop menu (press E again)');
    }

    update() {
        // Update player
        this.player.update(this.keys);

        // Check for house exit
        const playerPos = this.player.getPosition();
        const dist = Phaser.Math.Distance.Between(
            playerPos.x, playerPos.y,
            50, 500
        );

        if (dist < 40 && this.keys.e.isDown) {
            this.scene.start('house');
        }

        // Update inventory display
        this.updateInventoryDisplay();
    }
}
