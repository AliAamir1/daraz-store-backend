import { stripeWebhook } from "../controllers/webhook.js";
import express from 'express'

const webhookRouter = express.Router();


webhookRouter.post('/stripe', express.raw({type: 'application/json'}),stripeWebhook );

export default webhookRouter;