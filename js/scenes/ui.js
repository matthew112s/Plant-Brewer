class UIScene extends Phaser.Scene {
    constructor() {
        super('ui');
    }

    create() {
        // This scene handles the persistent UI overlay
        this.updateUI();
    }

    updateUI() {
        // Update the HTML UI elements
        document.getElementById('gold').textContent = window.gameState.gold;
        document.getElementById('location').textContent =
            window.gameState.location === 'gardenShop' ? 'Garden Shop' : 'Kitchen';
        
        const inventoryCount = window.gameState.inventory.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('inventory-count').textContent = 
            `${inventoryCount}/${window.gameState.maxInventorySlots}`;
    }

    update() {
        this.updateUI();
    }
}
