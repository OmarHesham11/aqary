import { useState, useEffect } from "react";
import Paypal from "./Paypal";


function Cart() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [transactionsData, setTransactionData] = useState({});
  useEffect(() => {
    console.log("transactionsData: ", transactionsData)
  }, [transactionsData])
  return (

    <div className="cart container mx-auto">

      <section>
        <div className="container h-100 py-5">
          <>
            <div>
              <Paypal
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                submitSuccess={submitSuccess}
                setSubmitSuccess={setSubmitSuccess}
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