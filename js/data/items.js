// All items in the game
const ITEMS = {
    // BASE PLANTS & INGREDIENTS
    lavender: {
        id: 'lavender',
        name: 'Lavender',
        type: 'plant',
        price: 25,
        rarity: 'common',
        description: 'Calming purple flowers. Great for infusions.'
    },
    peppermint: {
        id: 'peppermint',
        name: 'Peppermint',
        type: 'plant',
        price: 20,
        rarity: 'common',
        description: 'Refreshing leaves. Popular in teas and infusions.'
    },
    chamomile: {
        id: 'chamomile',
        name: 'Chamomile',
        type: 'plant',
        price: 22,
        rarity: 'common',
        description: 'Delicate flowers for relaxation.'
    },
    rosemary: {
        id: 'rosemary',
        name: 'Rosemary',
        type: 'plant',
        price: 24,
        rarity: 'common',
        description: 'Aromatic evergreen herb. Works great in oils.'
    },
    gingerRoot: {
        id: 'gingerRoot',
        name: 'Ginger Root',
        type: 'plant',
        price: 30,
        rarity: 'common',
        description: 'Warm spicy root. Best in decoctions.'
    },
    cinnamonBark: {
        id: 'cinnamonBark',
        name: 'Cinnamon Bark',
        type: 'plant',
        price: 28,
        rarity: 'common',
        description: 'Sweet woody bark. Essential for syrups.'
    },
    echinacea: {
        id: 'echinacea',
        name: 'Echinacea Root',
        type: 'plant',
        price: 35,
        rarity: 'uncommon',
        description: 'Immune-boosting root. Great in tinctures.'
    },
    dandelion: {
        id: 'dandelion',
        name: 'Dandelion Root',
        type: 'plant',
        price: 18,
        rarity: 'common',
        description: 'Detoxifying root. Used in many preparations.'
    },
    lemonBalm: {
        id: 'lemonBalm',
        name: 'Lemon Balm',
        type: 'plant',
        price: 20,
        rarity: 'common',
        description: 'Citrusy leaves. Good for infusions.'
    },
    thyme: {
        id: 'thyme',
        name: 'Thyme',
        type: 'plant',
        price: 22,
        rarity: 'common',
        description: 'Small aromatic leaves. Works in many recipes.'
    },

    // BASE SOLVENTS & CARRIERS
    water: {
        id: 'water',
        name: 'Water',
        type: 'solvent',
        price: 2,
        rarity: 'common',
        description: 'Pure water for infusions and decoctions.'
    },
    appleVinegar: {
        id: 'appleVinegar',
        name: 'Apple Cider Vinegar',
        type: 'solvent',
        price: 15,
        rarity: 'common',
        description: 'Base for herbal vinegars.'
    },
    oliveOil: {
        id: 'oliveOil',
        name: 'Olive Oil',
        type: 'solvent',
        price: 12,
        rarity: 'common',
        description: 'Base for oil infusions.'
    },
    honey: {
        id: 'honey',
        name: 'Honey',
        type: 'solvent',
        price: 18,
        rarity: 'common',
        description: 'Sweetener for syrups and preservative.'
    },
    vodka: {
        id: 'vodka',
        name: 'Vodka (80 proof)',
        type: 'solvent',
        price: 20,
        rarity: 'common',
        description: 'Base for tinctures and alcohol extracts.'
    },
    glycerin: {
        id: 'glycerin',
        name: 'Food-Grade Glycerin',
        type: 'solvent',
        price: 25,
        rarity: 'uncommon',
        description: 'Preservative base for tinctures.'
    },

    // FINISHED PRODUCTS
    infusionWater: {
        id: 'infusionWater',
        name: 'Herbal Water Infusion',
        type: 'product',
        price: 40,
        rarity: 'common',
        description: 'A light herbal tea-like preparation.',
        craftTime: 10 // in seconds for MVP testing
    },
    decoction: {
        id: 'decoction',
        name: 'Herbal Decoction',
        type: 'product',
        price: 50,
        rarity: 'common',
        description: 'A strong simmered herbal preparation.',
        craftTime: 20
    },
    oilInfusion: {
        id: 'oilInfusion',
        name: 'Infused Oil',
        type: 'product',
        price: 60,
        rarity: 'uncommon',
        description: 'Herbal oil extract for topical use.',
        craftTime: 30
    },
    herbalVinegar: {
        id: 'herbalVinegar',
        name: 'Herbal Vinegar',
        type: 'product',
        price: 55,
        rarity: 'uncommon',
        description: 'Tangy herbal vinegar for culinary use.',
        craftTime: 25
    },
    syrup: {
        id: 'syrup',
        name: 'Herbal Syrup',
        type: 'product',
        price: 70,
        rarity: 'uncommon',
        description: 'Sweet herbal syrup for remedies.',
        craftTime: 35
    },
    tincture: {
        id: 'tincture',
        name: 'Herbal Tincture',
        type: 'product',
        price: 85,
        rarity: 'rare',
        description: 'Potent alcohol-based herbal extract.',
        craftTime: 40
    }
};
