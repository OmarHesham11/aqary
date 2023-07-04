import { useState, useEffect } from "react";
import Paypal from "./Paypal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";
function Cart({ amount, formData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [transactionsData, setTransactionData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (submitSuccess) {
      setSubmitSuccess(false);
      const propertyId = transactionsData._id;
      navigate(`/property/${propertyId}`, { replace: true });
      // sendTransaction();
    }
  }, [submitSuccess, transactionsData, navigate]);
  return (

    <div className="cart container mx-auto">

      <section>
        <div className="container h-100 py-5">
          <>
            <div>
              <Paypal
                userId={"mohamedadel"}
                amount={amount}
                formData={formData}
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