// Phaser Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene,
        GardenShopScene,
        HouseScene,
        UIScene
    ],
    render: {
        pixelArt: true,
        antialias: false
    }
};

const game = new Phaser.Game(config);

// Global game state
window.gameState = {
    gold: 500,
    inventory: [],
    location: 'gardenShop',
    craftingQueue: [],
    time: 0,
    maxInventorySlots: 20
};

// Load game state from localStorage if available
window.loadGameState = function() {
    const saved = localStorage.getItem('plantBrewerSave');
    if (saved) {
        window.gameState = JSON.parse(saved);
    }
};

// Save game state to localStorage
window.saveGameState = function() {
    localStorage.setItem('plantBrewerSave', JSON.stringify(window.gameState));
};

// Add item to inventory
window.addToInventory = function(itemId, quantity = 1) {
    const item = ITEMS[itemId];
    if (!item) return false;

    const existingItem = window.gameState.inventory.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        if (window.gameState.inventory.length >= window.gameState.maxInventorySlots) {
            console.log('Inventory full!');
            return false;
        }
        window.gameState.inventory.push({ id: itemId, quantity });
    }
    
    window.saveGameState();
    return true;
};

// Remove item from inventory
window.removeFromInventory = function(itemId, quantity = 1) {
    const idx = window.gameState.inventory.findIndex(i => i.id === itemId);
    if (idx === -1) return false;

    window.gameState.inventory[idx].quantity -= quantity;
    if (window.gameState.inventory[idx].quantity <= 0) {
        window.gameState.inventory.splice(idx, 1);
    }
    
    window.saveGameState();
    return true;
};

// Add gold
window.addGold = function(amount) {
    window.gameState.gold += amount;
    window.saveGameState();
};

// Remove gold
window.removeGold = function(amount) {
    if (window.gameState.gold >= amount) {
        window.gameState.gold -= amount;
        window.saveGameState();
        return true;
    }
    return false;
};

window.loadGameState();
