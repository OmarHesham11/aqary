import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";

const currency = "USD";
const style = { layout: "vertical" };

const createOrder = async (data, actions, userId, amount, description) => {
    const orderID = await axios.post("http://localhost:4000/checkout/create-paypal-order", {
      cart: [
        {
          sku: description,
          quantity: 1,
          amount: {
            currency_code: "USD",
            value: amount,
          },
        },
      ],
      userId: userId,
    }).then((response) => {
      return response.data.order.id;
    }).catch((error) => {
      console.error(error);
    })
    return orderID;
  }
  
  const onApprove = (data, userId, transactionData, setIsSubmitting, setSubmitSuccess) => {
    console.log("hello from approval")
    return axios.post("http://localhost:4000/checkout/capture-paypal-order", {
      orderID: data.orderID,
      userId: userId,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const orderData = response.data;
      console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
      const transaction = orderData.purchase_units[0].payments.captures[0];
      transactionData.current.status = transaction.status;
      transactionData.current.id = transaction.id;
      setIsSubmitting(true);
      setSubmitSuccess(true);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const ButtonWrapper = ({
    currency,
    showSpinner,
    setIsSubmitting,
    setSubmitSuccess,
    setTransactionData,
    userId,
    amount,
    description,
}) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[25.2, "USD", style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return createOrder(data, actions, userId, amount, description)
                      .then((orderId) => {
                        return orderId;
                      });
                  }}
                onApprove={(data, actions) => {
                    console.log("hello from approval")
                    return onApprove(data, userId, setTransactionData, setIsSubmitting, setSubmitSuccess);
                }}
                onCancel={() => {
                    console.log("cancelled");
                }}
                onError={(data, actions) => {
                    console.log("An Error occured with your payment ");
                }}
            />
        </>
    );
};

function Paypal({
    userId,
    amount,
    description,
    isSubmitting,
    setIsSubmitting,
    submitSuccess,
    setSubmitSuccess,
    setTransactionData,
}) {
    
  const PAYPAL_CLIENT_ID = "AQQkpnREaeh7NJI3jD_C6VZ6YxaoqNj167r-l_50LttN1Xa06MyMP0Eq_gJlmc5RjlG7fWuqdMihcfT4";
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider
                options={{
                    "client-id": PAYPAL_CLIENT_ID,
                    components: "buttons",
                    currency: "USD",
                }}
            >
                <ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                    isSubmitting={isSubmitting}
                    submitSuccess={submitSuccess}
                    setIsSubmitting={setIsSubmitting}
                    setSubmitSuccess={setSubmitSuccess}
                    setTransactionData={setTransactionData}
                    userId={userId}
                    amount={amount}
                    description={description}
                />
            </PayPalScriptProvider>
        </div>
    );
}
export default Paypal;
