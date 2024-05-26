/**
 * @swagger
 * tags:
 *   name: Crop
 *   description: Crop management
 */

/**
 * @swagger
 * /crop:
 *   post:
 *     summary: Create a new crop
 *     tags: [Crop]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the crop
 *                 example: Wheat
 *               waterRequirement:
 *                 type: number
 *                 description: Water requirement of the crop in mm
 *                 example: 500
 *     responses:
 *       201:
 *         description: Crop created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Crop'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /crop:
 *   get:
 *     summary: Get all crops
 *     tags: [Crop]
 *     responses:
 *       200:
 *         description: List of crops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Crop'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /crop/{id}:
 *   get:
 *     summary: Get a single crop by ID
 *     tags: [Crop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The crop ID
 *     responses:
 *       200:
 *         description: Crop found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Crop'
 *       404:
 *         description: Crop not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /crop/{id}:
 *   put:
 *     summary: Update a crop by ID
 *     tags: [Crop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The crop ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the crop
 *                 example: Wheat
 *               waterRequirement:
 *                 type: number
 *                 description: Water requirement of the crop in mm
 *                 example: 500
 *     responses:
 *       200:
 *         description: Crop updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Crop'
 *       404:
 *         description: Crop not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /crop/{id}:
 *   delete:
 *     summary: Delete a crop by ID
 *     tags: [Crop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The crop ID
 *     responses:
 *       200:
 *         description: Crop deleted successfully
 *       404:
 *         description: Crop not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Crop:
 *       type: object
 *       required:
 *         - name
 *         - waterRequirement
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the crop
 *         name:
 *           type: string
 *           description: The name of the crop
 *         waterRequirement:
 *           type: number
 *           description: Water requirement of the crop in mm
 *       example:
 *         id: d5fE_asz
 *         name: Wheat
 *         waterRequirement: 500
 */

