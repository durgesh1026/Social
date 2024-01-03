"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postsController_1 = require("../controllers/postsController");
const router = (0, express_1.Router)();
router.post('/api/v1/posts', postsController_1.createPost);
router.get('/api/v1/posts/:id/analysis', postsController_1.getAnalysis);
exports.default = router;
