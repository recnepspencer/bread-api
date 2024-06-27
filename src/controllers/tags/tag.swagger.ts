
/**
 * @swagger
 * tags:
 *   name: Tag
 *   description: Tag management
 */

/**
 * @swagger
 * /tag:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The tag's name
 *                 example: Vegan
 *     responses:
 *       201:
 *         description: Tag created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Error creating tag
 */

/**
 * @swagger
 * /tag:
 *   get:
 *     summary: Get all tags
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: List of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 *       500:
 *         description: Error retrieving tags
 */

/**
 * @swagger
 * /tag/{id}:
 *   get:
 *     summary: Get a single tag by ID
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: Tag found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Error retrieving tag
 */

/**
 * @swagger
 * /tag/{id}:
 *   put:
 *     summary: Update a tag by ID
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The tag ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The tag's name
 *                 example: Vegan
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       404:
 *         description: Tag not found
 *       400:
 *         description: Error updating tag
 */

/**
 * @swagger
 * /tag/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Error deleting tag
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the tag
 *         name:
 *           type: string
 *           description: The name of the tag
 *       example:
 *         id: d5fE_asz
 *         name: Vegan
 */
