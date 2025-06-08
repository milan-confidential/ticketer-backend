/**
 * @swagger
 * tags:
 *   - name: Series
 *     description: Series management
 *
 * components:
 *   schemas:
 *     Series:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateSeriesInput:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - startDate
 *         - endDate
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         hostCountryIds:
 *           type: array
 *           items:
 *             type: string
 *         teamIds:
 *           type: array
 *           items:
 *             type: string
 *         formats:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               format:
 *                 type: string
 *               matchCount:
 *                 type: integer
 *
 *     UpdateSeriesInput:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateSeriesInput'
 *
 * /series:
 *   get:
 *     summary: Get all series
 *     tags: [Series]
 *     responses:
 *       200:
 *         description: List of all series
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Series'
 *
 *   post:
 *     summary: Create a new series
 *     tags: [Series]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSeriesInput'
 *     responses:
 *       201:
 *         description: Series created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Series'
 *
 * /series/{id}:
 *   get:
 *     summary: Get a series by ID
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Series ID
 *     responses:
 *       200:
 *         description: Series found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Series'
 *       404:
 *         description: Series not found
 *
 *   put:
 *     summary: Update a series
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSeriesInput'
 *     responses:
 *       200:
 *         description: Series updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Series'
 *
 *   delete:
 *     summary: Delete a series by ID
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       400:
 *         description: Foreign key constraint error
 *
 * /series/{id}/hosts:
 *   put:
 *     summary: Update host countries for a series
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hostCountryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Host countries updated
 *
 * /series/{id}/teams:
 *   put:
 *     summary: Update teams for a series
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Series teams updated
 *
 * /series/{id}/formats:
 *   put:
 *     summary: Update formats for a series
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               formats:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     format:
 *                       type: string
 *                     matchCount:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Series formats updated
 */