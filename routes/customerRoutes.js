import express from "express";
import {
  getCustomerById,
  getCustomers,
  getAddCustomerPage,
  createCustomer,
  getUpdateCustomerPage,
  updateCustomer,
  getDeleteCustomerPage,
  deleteCustomer,
} from "../controllers/customerController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/add", protect, getAddCustomerPage);
router.get("/", protect, getCustomers);
router.get("/update/:id", protect, getUpdateCustomerPage);
router.post("/add", protect, createCustomer);
router.post("/update/", protect, updateCustomer);
router.get("/delete/:id", protect, getDeleteCustomerPage);
router.delete("/delete/:id", protect, deleteCustomer);
router.get("/:id", protect, getCustomerById);

export default router;

