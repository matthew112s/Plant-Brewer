class BootScene extends Phaser.Scene {
    constructor() {
        super('boot');
    }

    preload() {
        // Load any assets here if needed
        // For MVP, we're using simple geometric shapes
    }

    create() {
        // Start the first scene
        this.scene.start('gardenShop');
    }
}
