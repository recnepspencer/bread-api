/**
 * @swagger
 * tags:
 *   name: Field
 *   description: Field management
 */

/**
 * @swagger
 * /field:
 *   post:
 *     summary: Create a new field
 *     tags: [Field]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the field
 *                 example: North Field
 *               location:
 *                 type: string
 *                 description: The location of the field
 *                 example: "41.40338, 2.17403"
 *               crop:
 *                 type: string
 *                 description: The crop grown in the field
 *                 example: Wheat
 *               irrigationType:
 *                 type: string
 *                 description: The irrigation type of the field
 *                 example: Drip
 *     responses:
 *       201:
 *         description: Field created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Field'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /field:
 *   get:
 *     summary: Get all fields
 *     tags: [Field]
 *     responses:
 *       200:
 *         description: List of fields
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Field'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /field/{id}:
 *   get:
 *     summary: Get a single field by ID
 *     tags: [Field]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The field ID
 *     responses:
 *       200:
 *         description: Field found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Field'
 *       404:
 *         description: Field not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /field/{id}:
 *   put:
 *     summary: Update a field by ID
 *     tags: [Field]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The field ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the field
 *                 example: North Field
 *               location:
 *                 type: string
 *                 description: The location of the field
 *                 example: "41.40338, 2.17403"
 *               crop:
 *                 type: string
 *                 description: The crop grown in the field
 *                 example: Wheat
 *               irrigationType:
 *                 type: string
 *                 description: The irrigation type of the field
 *                 example: Drip
 *     responses:
 *       200:
 *         description: Field updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Field'
 *       404:
 *         description: Field not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /field/{id}:
 *   delete:
 *     summary: Delete a field by ID
 *     tags: [Field]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The field ID
 *     responses:
 *       200:
 *         description: Field deleted successfully
 *       404:
 *         description: Field not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Field:
 *       type: object
 *       required:
 *         - name
 *         - location
 *         - crop
 *         - irrigationType
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the field
 *         name:
 *           type: string
 *           description: The name of the field
 *         location:
 *           type: string
 *           description: The location of the field
 *         crop:
 *           type: string
 *           description: The crop grown in the field
 *         irrigationType:
 *           type: string
 *           description: The irrigation type of the field
 *       example:
 *         id: d5fE_asz
 *         name: North Field
 *         location: "41.40338, 2.17403"
 *         crop: Wheat
 *         irrigationType: Drip
 */

