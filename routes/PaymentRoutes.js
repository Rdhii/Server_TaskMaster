import express from "express";
import midtransClient from "midtrans-client";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post("/proses-transaksi", (req, res) => {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_serverKey,
      clientKey: process.env.MIDTRANS_clientKey,
    });

    const order_id = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: 10000,
      },
    };

    snap.createTransaction(parameter).then((transaction) => {
      const datapPayment = {
        response: JSON.stringify(transaction),
      };
      const token = transaction.token;

      res.status(200).json({
        message: "berhasil",
        datapPayment,
        token: token,
        order_id: order_id,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
