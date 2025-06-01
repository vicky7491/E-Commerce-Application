import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <Card className="w-full max-w-md mx-auto shadow-md border border-muted bg-card">
    <CardHeader className="text-center py-8">
      <CardTitle className="text-xl font-semibold text-primary">
        Processing Your Payment
      </CardTitle>
      <p className="mt-2 text-sm text-muted-foreground">
        Please wait a moment while we confirm your transaction.
      </p>
    </CardHeader>
  </Card>
  
  );
}

export default PaypalReturnPage;
