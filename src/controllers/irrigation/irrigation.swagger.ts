/**
 * @swagger
 * tags:
 *   name: Irrigation
 *   description: Irrigation management
 */

/**
 * @swagger
 * /irrigation:
 *   post:
 *     summary: Create a new irrigation system
 *     tags: [Irrigation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of irrigation system
 *                 example: Drip
 *               isAutomatable:
 *                 type: boolean
 *                 description: Whether the irrigation system is automatable
 *                 example: true
 *               hoursPerInch:
 *                 type: number
 *                 description: Hours required per inch of water
 *                 example: 5
 *     responses:
 *       201:
 *         description: Irrigation system created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Irrigation'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /irrigation:
 *   get:
 *     summary: Get all irrigation systems
 *     tags: [Irrigation]
 *     responses:
 *       200:
 *         description: List of irrigation systems
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Irrigation'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /irrigation/{id}:
 *   get:
 *     summary: Get a single irrigation system by ID
 *     tags: [Irrigation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The irrigation system ID
 *     responses:
 *       200:
 *         description: Irrigation system found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Irrigation'
 *       404:
 *         description: Irrigation system not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /irrigation/{id}:
 *   put:
 *     summary: Update an irrigation system by ID
 *     tags: [Irrigation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The irrigation system ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of irrigation system
 *                 example: Drip
 *               isAutomatable:
 *                 type: boolean
 *                 description: Whether the irrigation system is automatable
 *                 example: true
 *               hoursPerInch:
 *                 type: number
 *                 description: Hours required per inch of water
 *                 example: 5
 *     responses:
 *       200:
 *         description: Irrigation system updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Irrigation'
 *       404:
 *         description: Irrigation system not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /irrigation/{id}:
 *   delete:
 *     summary: Delete an irrigation system by ID
 *     tags: [Irrigation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The irrigation system ID
 *     responses:
 *       200:
 *         description: Irrigation system deleted successfully
 *       404:
 *         description: Irrigation system not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Irrigation:
 *       type: object
 *       required:
 *         - type
 *         - isAutomatable
 *         - hoursPerInch
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the irrigation system
 *         type:
 *           type: string
 *           description: The type of irrigation system
 *         isAutomatable:
 *           type: boolean
 *           description: Whether the irrigation system is automatable
 *         hoursPerInch:
 *           type: number
 *           description: Hours required per inch of water
 *       example:
 *         id: d5fE_asz
 *         type: Drip
 *         isAutomatable: true
 *         hoursPerInch: 5
 */
