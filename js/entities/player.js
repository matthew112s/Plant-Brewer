class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.speed = 100;
        this.direction = { x: 0, y: 0 };

        // Create a simple player sprite (16x16 pixel art)
        this.sprite = scene.add.rectangle(x, y, 16, 16, 0x2d5016);
        this.sprite.setStrokeStyle(2, 0x4a7c2c);
        
        // Physics body
        scene.physics.add.existing(this.sprite);
        this.sprite.body.setCollideWorldBounds(true);
        this.sprite.body.setBounce(0, 0);

        this.interactionRadius = 50;
    }

    update(keys) {
        // Reset direction
        this.direction = { x: 0, y: 0 };

        // Handle input
        if (keys.left) {
            this.direction.x = -1;
        } else if (keys.right) {
            this.direction.x = 1;
        }

        if (keys.up) {
            this.direction.y = -1;
        } else if (keys.down) {
            this.direction.y = 1;
        }

        // Apply velocity
        if (this.direction.x !== 0 || this.direction.y !== 0) {
            // Normalize diagonal movement
            const length = Math.sqrt(this.direction.x ** 2 + this.direction.y ** 2);
            const vx = (this.direction.x / length) * this.speed;
            const vy = (this.direction.y / length) * this.speed;
            this.sprite.body.setVelocity(vx, vy);
        } else {
            this.sprite.body.setVelocity(0, 0);
        }
    }

    setPosition(x, y) {
        this.sprite.setPosition(x, y);
    }

    getPosition() {
        return { x: this.sprite.x, y: this.sprite.y };
    }
}
