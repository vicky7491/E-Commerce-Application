import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-8 shadow-lg border border-muted">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-green-600">
            Payment Successful!
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </CardHeader>
        <div className="mt-6 flex justify-center">
          <Button onClick={() => navigate("/shop/account")}>
            View My Orders
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
