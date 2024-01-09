/**
 * First words.
 */
export const PREFIX = [
  'Cucumber',
  'Marshmallow',
  'Penguin\'s',
  'Gummy Worm',
  'Synchronized',
  'Lullaby',
  'Bouncy',
  'Electric',
  'Tea Time',
  'Meadow',
  'Sunshine',
  'Cloud',
  'Polite',
  'Willow',
  'Turtle',
  'Dandelion',
  'Rainy',
  'Sweet Little',
  'Friendly',
  'Crisp',
  'Kitten',
  'Firefly',
  'Delicate',
  'Sincere',
  'Nostalgic',
  'Falling Leaves',
  'Sunflower',
  'Garden Stroll',
  'Starlit',
  'Uplifting',
  'Melancholy',
  'Bittersweet',
  'Serene',
  'Heartfelt',
  'Enchanted',
  'Soothing',
  'Mysterious',
  'Tender',
  'Graceful',
  'Just a Fucking',
  'Goddamn',
  'I\'m a',
  'Feeling',
];

/**
 * Second words.
 */
export const POSTFIX = [
  'Diddle',
  'in Space',
  'Evening',
  'Parade',
  'Jamboree',
  'Ballet',
  'Tootles',
  'Jive',
  'Nonsense',
  'Serenade',
  'Derby',
  'Mambo',
  'Twirl',
  'Party',
  'Shuffle',
  'Waltz',
  'Harmony',
  'Delight',
  'Attic',
  'at Sunset',
  'Reflections',
  'Summer',
  'on Quiet Lakes',
  'Over the Horizon',
  'Breeze',
  'in a Pond',
  'over Puddles',
  'Calm',
  'Garden Stroll',
];

/**
 * Generates a random name.
 *
 * @returns {string} Random name.
 */
export const getName = (): string => (`${PREFIX[Math.floor(Math.random() * PREFIX.length)]} ${POSTFIX[Math.floor(Math.random() * POSTFIX.length)]}`);

/**
 * Generates a random Id.
 *
 * @returns {string} Random Id.
 */
export const getId = (): string => ((Math.random() + 1).toString(36).substring(7));
