class NPC {
    constructor(scene, x, y, config = {}) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.name = config.name || 'NPC';
        this.role = config.role || 'vendor';
        this.color = config.color || 0x8b4513;
        this.interactionRadius = 60;

        // Create NPC sprite
        this.sprite = scene.add.rectangle(x, y, 20, 20, this.color);
        this.sprite.setStrokeStyle(2, 0xffd700);
        this.sprite.setDepth(1);

        // Create name label
        this.label = scene.add.text(x, y - 25, this.name, {
            font: '12px courier',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 4, y: 2 }
        });
        this.label.setOrigin(0.5);
        this.label.setDepth(1);

        this.onInteract = config.onInteract || null;
    }

    interact() {
        if (this.onInteract) {
            this.onInteract();
        }
    }

    setPosition(x, y) {
        this.sprite.setPosition(x, y);
        this.label.setPosition(x, y - 25);
    }

    getPosition() {
        return { x: this.sprite.x, y: this.sprite.y };
    }
}
