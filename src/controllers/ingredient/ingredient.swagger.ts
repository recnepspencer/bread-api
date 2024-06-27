/**
 * @swagger
 * tags:
 *   name: Ingredient
 *   description: Ingredient management
 */

/**
 * @swagger
 * /ingredient:
 *   post:
 *     summary: Create a new ingredient
 *     tags: [Ingredient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The ingredient's name
 *                 example: Salt
 *     responses:
 *       201:
 *         description: Ingredient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: Error creating ingredient
 */

/**
 * @swagger
 * /ingredient:
 *   get:
 *     summary: Get all ingredients
 *     tags: [Ingredient]
 *     responses:
 *       200:
 *         description: List of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 *       500:
 *         description: Error retrieving ingredients
 */

/**
 * @swagger
 * /ingredient/{id}:
 *   get:
 *     summary: Get a single ingredient by ID
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ingredient ID
 *     responses:
 *       200:
 *         description: Ingredient found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 *       500:
 *         description: Error retrieving ingredient
 */

/**
 * @swagger
 * /ingredient/name/{name}:
 *   get:
 *     summary: Get a single ingredient by name
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The ingredient name
 *     responses:
 *       200:
 *         description: Ingredient found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 *       500:
 *         description: Error retrieving ingredient
 */

/**
 * @swagger
 * /ingredient/{id}:
 *   put:
 *     summary: Update an ingredient by ID
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ingredient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The ingredient's name
 *                 example: Salt
 *     responses:
 *       200:
 *         description: Ingredient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 *       400:
 *         description: Error updating ingredient
 */

/**
 * @swagger
 * /ingredient/{id}:
 *   delete:
 *     summary: Delete an ingredient by ID
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ingredient ID
 *     responses:
 *       200:
 *         description: Ingredient deleted successfully
 *       404:
 *         description: Ingredient not found
 *       500:
 *         description: Error deleting ingredient
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the ingredient
 *         name:
 *           type: string
 *           description: The name of the ingredient
 *       example:
 *         id: d5fE_asz
 *         name: Salt
 */
