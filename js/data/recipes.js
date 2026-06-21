// Crafting recipes
const RECIPES = {
    // WATER-BASED INFUSIONS
    lavenderInfusion: {
        id: 'lavenderInfusion',
        name: 'Lavender Water Infusion',
        type: 'infusionWater',
        method: 'water-infusion',
        craftTime: 10,
        ingredients: {
            lavender: 3,
            water: 1
        },
        output: { infusionWater: 1 },
        description: 'A calming water infusion using lavender.'
    },
    peppermintInfusion: {
        id: 'peppermintInfusion',
        name: 'Peppermint Water Infusion',
        type: 'infusionWater',
        method: 'water-infusion',
        craftTime: 10,
        ingredients: {
            peppermint: 3,
            water: 1
        },
        output: { infusionWater: 1 },
        description: 'A refreshing water infusion using peppermint.'
    },

    // DECOCTIONS (simmered preparations)
    gingerDecoction: {
        id: 'gingerDecoction',
        name: 'Ginger Decoction',
        type: 'decoction',
        method: 'decoction',
        craftTime: 20,
        ingredients: {
            gingerRoot: 2,
            cinnamonBark: 1,
            water: 2
        },
        output: { decoction: 1 },
        description: 'A warming decoction of ginger and cinnamon.'
    },
    echinaceaDecoction: {
        id: 'echinaceaDecoction',
        name: 'Echinacea Decoction',
        type: 'decoction',
        method: 'decoction',
        craftTime: 20,
        ingredients: {
            echinacea: 2,
            dandelion: 1,
            water: 2
        },
        output: { decoction: 1 },
        description: 'An immune-boosting decoction.'
    },

    // OIL INFUSIONS
    rosemaryOil: {
        id: 'rosemaryOil',
        name: 'Rosemary Infused Oil',
        type: 'oilInfusion',
        method: 'oil-infusion',
        craftTime: 30,
        ingredients: {
            rosemary: 4,
            oliveOil: 2
        },
        output: { oilInfusion: 1 },
        description: 'Rosemary infused in olive oil for massage or skincare.'
    },
    lavenderOil: {
        id: 'lavenderOil',
        name: 'Lavender Infused Oil',
        type: 'oilInfusion',
        method: 'oil-infusion',
        craftTime: 30,
        ingredients: {
            lavender: 4,
            oliveOil: 2
        },
        output: { oilInfusion: 1 },
        description: 'Lavender infused in olive oil for relaxation.'
    },

    // VINEGARS
    herbVinegar: {
        id: 'herbVinegar',
        name: 'Herbal Vinegar',
        type: 'herbalVinegar',
        method: 'vinegar',
        craftTime: 25,
        ingredients: {
            rosemary: 2,
            thyme: 2,
            appleVinegar: 2
        },
        output: { herbalVinegar: 1 },
        description: 'A tangy culinary herbal vinegar.'
    },

    // SYRUPS
    honeyHerbSyrup: {
        id: 'honeyHerbSyrup',
        name: 'Honey Herb Syrup',
        type: 'syrup',
        method: 'syrup',
        craftTime: 35,
        ingredients: {
            peppermint: 2,
            lemonBalm: 2,
            honey: 2,
            gingerRoot: 1
        },
        output: { syrup: 1 },
        description: 'A sweet and soothing herbal syrup.'
    },

    // TINCTURES (requires alcohol)
    herbTincture: {
        id: 'herbTincture',
        name: 'Herbal Tincture',
        type: 'tincture',
        method: 'tincture',
        craftTime: 40,
        ingredients: {
            echinacea: 3,
            rosemary: 2,
            vodka: 2
        },
        output: { tincture: 1 },
        description: 'A potent herbal tincture for medicinal use.'
    }
};

// Helper function to check if player can craft a recipe
window.canCraftRecipe = function(recipeId) {
    const recipe = RECIPES[recipeId];
    if (!recipe) return false;

    for (const [itemId, needed] of Object.entries(recipe.ingredients)) {
        const inventoryItem = window.gameState.inventory.find(i => i.id === itemId);
        if (!inventoryItem || inventoryItem.quantity < needed) {
            return false;
        }
    }
    return true;
};

// Start crafting a recipe
window.startCrafting = function(recipeId) {
    if (!window.canCraftRecipe(recipeId)) {
        console.log('Cannot craft: missing ingredients');
        return false;
    }

    const recipe = RECIPES[recipeId];

    // Remove ingredients from inventory
    for (const [itemId, needed] of Object.entries(recipe.ingredients)) {
        window.removeFromInventory(itemId, needed);
    }

    // Add to crafting queue
    const craft = {
        id: recipeId,
        recipe: recipe,
        startTime: Date.now(),
        completionTime: Date.now() + (recipe.craftTime * 1000)
    };

    window.gameState.craftingQueue.push(craft);
    window.saveGameState();
    return craft;
};

// Update crafting queue - process completed items
window.updateCraftingQueue = function() {
    const now = Date.now();
    const completed = [];

    window.gameState.craftingQueue = window.gameState.craftingQueue.filter(craft => {
        if (now >= craft.completionTime) {
            // Craft is complete
            const outputs = craft.recipe.output;
            for (const [itemId, quantity] of Object.entries(outputs)) {
                window.addToInventory(itemId, quantity);
            }
            completed.push(craft);
            return false; // Remove from queue
        }
        return true;
    });

    if (completed.length > 0) {
        window.saveGameState();
    }
    return completed;
};
