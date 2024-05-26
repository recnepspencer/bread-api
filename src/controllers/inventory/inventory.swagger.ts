/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management
 */

/**
 * @swagger
 * /inventories:
 *   post:
 *     summary: Create a new inventory item
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of the inventory item
 *                 example: seed
 *               cost:
 *                 type: number
 *                 description: The cost of the inventory item
 *                 example: 100.50
 *               expirationDate:
 *                 type: string
 *                 format: date
 *                 description: The expiration date of the inventory item (can be null)
 *                 example: 2025-12-31
 *               orderNumber:
 *                 type: string
 *                 description: The order number associated with the inventory item
 *                 example: ORD123456
 *               dateReceived:
 *                 type: string
 *                 format: date
 *                 description: The date the inventory item was received
 *                 example: 2024-05-23
 *               quantity:
 *                 type: number
 *                 description: The quantity of the inventory item
 *                 example: 200
 *               supplier:
 *                 type: string
 *                 description: The supplier of the inventory item
 *                 example: Acme Seeds
 *               notes:
 *                 type: string
 *                 description: Additional notes about the inventory item
 *                 example: High-quality seeds
 *     responses:
 *       201:
 *         description: Inventory item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       400:
 *         description: Error creating inventory item
 */

/**
 * @swagger
 * /inventories:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventory'
 *       500:
 *         description: Error retrieving inventory items
 */

/**
 * @swagger
 * /inventories/{id}:
 *   get:
 *     summary: Get a single inventory item by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the inventory item
 *     responses:
 *       200:
 *         description: Inventory item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Error retrieving inventory item
 */

/**
 * @swagger
 * /inventories/{id}:
 *   put:
 *     summary: Update an inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The inventory item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of the inventory item
 *                 example: fertilizer
 *               cost:
 *                 type: number
 *                 description: The cost of the inventory item
 *                 example: 75.00
 *               expirationDate:
 *                 type: string
 *                 format: date
 *                 description: The expiration date of the inventory item
 *                 example: 2025-06-30
 *               orderNumber:
 *                 type: string
 *                 description: The order number associated with the inventory item
 *                 example: ORD654321
 *               dateReceived:
 *                 type: string
 *                 format: date
 *                 description: The date the inventory item was received
 *                 example: 2024-05-24
 *               quantity:
 *                 type: number
 *                 description: The quantity of the inventory item
 *                 example: 50
 *               supplier:
 *                 type: string
 *                 description: The supplier of the inventory item
 *                 example: Best Fertilizers Co.
 *               notes:
 *                 type: string
 *                 description: Additional notes about the inventory item
 *                 example: Organic fertilizer
 *     responses:
 *       200:
 *         description: Inventory item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       404:
 *         description: Inventory item not found
 *       400:
 *         description: Error updating inventory item
 */

/**
 * @swagger
 * /inventories/{id}:
 *   delete:
 *     summary: Delete an inventory item by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The inventory item ID
 *     responses:
 *       200:
 *         description: Inventory item deleted successfully
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Error deleting inventory item
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Inventory:
 *       type: object
 *       required:
 *         - type
 *         - cost
 *         - orderNumber
 *         - dateReceived
 *         - quantity
 *         - supplier
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the inventory item
 *         type:
 *           type: string
 *           description: The type of the inventory item
 *         cost:
 *           type: number
 *           description: The cost of the inventory item
 *         expirationDate:
 *           type: string
 *           format: date
 *           description: The expiration date of the inventory item (can be null)
 *         orderNumber:
 *           type: string
 *           description: The order number associated with the inventory item
 *         dateReceived:
 *           type: string
 *           format: date
 *           description: The date the inventory item was received
 *         quantity:
 *           type: number
 *           description: The quantity of the inventory item
 *         supplier:
 *           type: string
 *           description: The supplier of the inventory item
 *         notes:
 *           type: string
 *           description: Additional notes about the inventory item
 *       example:
 *         id: 60d21b4667d0d8992e610c85
 *         type: seed
 *         cost: 100.50
 *         expirationDate: 2025-12-31
 *         orderNumber: ORD123456
 *         dateReceived: 2024-05-23
 *         quantity: 200
 *         supplier: Acme Seeds
 *         notes: High-quality seeds
 */
