import { useState } from "react";
import Paypal from "./Paypal";

function Cart({ amount, formData, setIsPaymentSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionsData, setTransactionData] = useState({});

  return (

    <div className="cart container mx-auto">

      <section>
        <div className="container h-100 py-5">
          <>
            <div>
              <Paypal
                userId={''}
                amount={amount}
                formData={formData}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                // submitSuccess={submitSuccess}
                setSubmitSuccess={setIsPaymentSuccess}
                setTransactionData={setTransactionData}

              />

            </div>


          </>
        </div>
      </section>
    </div>
  );
}
export default Cart