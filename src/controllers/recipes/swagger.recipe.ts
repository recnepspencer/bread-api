/**
 * @swagger
 * tags:
 *   name: Recipe
 *   description: Recipe management
 */

/**
 * @swagger
 * /recipe:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The recipe's name
 *                 example: Spicy Mango Lassi Bread
 *               description:
 *                 type: string
 *                 description: The recipe's description
 *                 example: This Spicy Mango Lassi Bread combines the sweet and tangy flavors of mango with the creamy richness of lassi, spiced with a hint of chili for an unforgettable taste experience.
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredient:
 *                       type: string
 *                       description: Ingredient ID
 *                     quantity:
 *                       type: string
 *                       description: Quantity of the ingredient
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Instructions for the recipe
 *               tools:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tools needed for the recipe
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags for the recipe
 *               imagePath:
 *                 type: string
 *                 description: Image path of the recipe
 *               difficulty:
 *                 type: number
 *                 description: Difficulty level of the recipe
 *                 example: 5
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Error creating recipe
 */

/**
 * @swagger
 * /recipe:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipe]
 *     responses:
 *       200:
 *         description: List of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Error retrieving recipes
 */

/**
 * @swagger
 * /recipe/{id}:
 *   get:
 *     summary: Get a single recipe by ID
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The recipe ID
 *     responses:
 *       200:
 *         description: Recipe found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Error retrieving recipe
 */

/**
 * @swagger
 * /recipe/{id}:
 *   put:
 *     summary: Update a recipe by ID
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The recipe's name
 *               description:
 *                 type: string
 *                 description: The recipe's description
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredient:
 *                       type: string
 *                       description: Ingredient ID
 *                     quantity:
 *                       type: string
 *                       description: Quantity of the ingredient
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Instructions for the recipe
 *               tools:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tools needed for the recipe
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags for the recipe
 *               imagePath:
 *                 type: string
 *                 description: Image path of the recipe
 *               difficulty:
 *                 type: number
 *                 description: Difficulty level of the recipe
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 *       400:
 *         description: Error updating recipe
 */

/**
 * @swagger
 * /recipe/{id}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The recipe ID
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Error deleting recipe
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - ingredients
 *         - instructions
 *         - tools
 *         - tags
 *         - imagePath
 *         - difficulty
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the recipe
 *         name:
 *           type: string
 *           description: The name of the recipe
 *         description:
 *           type: string
 *           description: The description of the recipe
 *         ingredients:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               ingredient:
 *                 type: string
 *                 description: Ingredient ID
 *               quantity:
 *                 type: string
 *                 description: Quantity of the ingredient
 *         instructions:
 *           type: array
 *           items:
 *             type: string
 *           description: Instructions for the recipe
 *         tools:
 *           type: array
 *           items:
 *             type: string
 *           description: Tools needed for the recipe
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags for the recipe
 *         imagePath:
 *           type: string
 *           description: Image path of the recipe
 *         difficulty:
 *           type: number
 *           description: Difficulty level of the recipe
 *       example:
 *         id: d5fE_asz
 *         name: Spicy Mango Lassi Bread
 *         description: This Spicy Mango Lassi Bread combines the sweet and tangy flavors of mango with the creamy richness of lassi, spiced with a hint of chili for an unforgettable taste experience.
 *         ingredients:
 *           - ingredient: 667b5996ecbfb310ce3f69eb
 *             quantity: "3 cups (375 grams)"
 *           - ingredient: 667b5996ecbfb310ce3f69fb
 *             quantity: "1/2 cup (100 grams)"
 *           - ingredient: 667b5996ecbfb310ce3f69f2
 *             quantity: "1 cup (240 mL), warmed"
 *           - ingredient: 667d948add9457e238a087d7
 *             quantity: "1/4 cup"
 *           - ingredient: 667b5996ecbfb310ce3f6a0b
 *             quantity: "1/4 cup"
 *           - ingredient: 667b5996ecbfb310ce3f6a02
 *             quantity: "4 tablespoons (57 grams), room temperature"
 *           - ingredient: 667b5996ecbfb310ce3f6a05
 *             quantity: "2, room temperature"
 *           - ingredient: 667b5996ecbfb310ce3f6a1d
 *             quantity: "2 teaspoons"
 *           - ingredient: 667b5996ecbfb310ce3f69fa
 *             quantity: "1 teaspoon"
 *           - ingredient: 667b5996ecbfb310ce3f69f6
 *             quantity: "2 teaspoons"
 *           - ingredient: 667d94dedd9457e238a087db
 *             quantity: "1 teaspoon"
 *           - ingredient: 667d94cadd9457e238a087d9
 *             quantity: "1/2 teaspoon"
 *           - ingredient: 667d9513dd9457e238a087de
 *             quantity: "1/4 cup"
 *         instructions:
 *           - "In the bowl of your mixer, combine the warm milk and instant yeast. Let it sit for 5 minutes until the yeast is foamy."
 *           - "Add the sugar, mango puree, yogurt, eggs, and vanilla extract to the milk mixture. Mix until combined."
 *           - "Add the bread flour, salt, ground cardamom, and chili powder to the wet ingredients. Mix on low speed until the dough starts to come together."
 *           - "Add the room temperature butter to the dough and knead in the mixer for about 10 minutes until the dough is smooth and elastic."
 *           - "Gently fold in the chopped dried mango pieces."
 *           - "Place the dough in a lightly oiled bowl, cover with plastic wrap, and let it rise in a warm place for about 1 to 2 hours or until doubled in size."
 *           - "Punch down the dough and divide it into two equal pieces. Shape each piece into a loaf and place them in buttered 9 inch by 5 inch loaf pans."
 *           - "Cover the pans with plastic wrap and let the dough rise again for about 1 hour or until it reaches about an inch above the tops of the pans."
 *           - "Preheat your oven to 350°F (175°C)."
 *           - "Bake the loaves for 25 to 30 minutes or until they are golden brown and sound hollow when tapped on the bottom."
 *           - "Let the loaves cool in the pans for 10 minutes, then remove them from the pans and let them cool completely on a wire rack."
 *         tools:
 *           - Mixer
 *           - Plastic wrap
 *           - Two 9 inch by 5 inch loaf pans
 *           - Wire rack
 *         tags:
 *           - 667d8f9e07b0c5d8a9b61b44
 *           - 667d8f1b07b0c5d8a9b61b34
 *           - 667d8f4407b0c5d8a9b61b3a
 *           - 667d8f8a07b0c5d8a9b61b42
 *         imagePath: /images/spicy-mango-lassi-bread.jpg
 *         difficulty: 5
 */