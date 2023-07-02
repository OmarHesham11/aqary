import { useState, useEffect } from "react";
import Paypal from "./Paypal";
import axios from "axios";

function Cart({amount, description}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [transactionsData, setTransactionData] = useState({});
  useEffect(() => {
    console.log("transactionsData: ", transactionsData);
  }, [transactionsData])

  // const sendTransaction = () => {
  //   console.log(("heelo world"))
  //   axios.post('http://localhost:4000/checkout/create-paypal-order', {transactionsData})
  //   .then ((res) => {
  //     alert("Transaction successfully sent");
  //   })
  //   .catch (err => {
  //     console.error(err.message);
  //   });
  // };

  useEffect(() => {
    if (submitSuccess) {
      setSubmitSuccess(false);
      // sendTransaction();
    }
  }, [submitSuccess]);
  
  return (

    <div className="cart container mx-auto">

      <section>
        <div className="container h-100 py-5">
          <>
            <div>
            <Paypal
              userId={"mohamedadel"}
              amount={amount}
              description={description}
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