import express from "express";
import midtransClient from "midtrans-client";

const router = express.Router();

router.post("/proses-transaksi", (req, res) => {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-rzog5W2wmA0_igfWD6oDdHoC",
      clientKey: "SB-Mid-client-VC2kHjBBqXVV8OBr",
    });

    const order_id = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: 1000,
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
