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
  const orderID = await axios.post("https://aqary-eg.onrender.com/checkout/create-paypal-order", {
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
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then((response) => {
    return response.data.order.id;
  }).catch((error) => {
    console.error(error);
  })
  return orderID;
}

const onApprove = (
  { orderID },
  userId,
  amount,
  currency,
  formData,
  setTransactionData,
  setIsSubmitting,
  setSubmitSuccess,
  onSuccess
) => {
  formData.set('userId', userId);
  formData.set('orderID', orderID);
  formData.set('amount', amount);
  formData.set('currency', currency);
  return axios.post("https://aqary-eg.onrender.com/auth/property/", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((response) => {
      const orderData = response.data;
      setTransactionData(orderData);
      setIsSubmitting(true);
      setSubmitSuccess(true);
      onSuccess && onSuccess();
    })
    .catch((error) => {
      console.error(error);
    });
}

function Paypal({
  userId,
  amount,
  formData,
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
          formData={formData}
        />
      </PayPalScriptProvider>
    </div>
  );
}

const ButtonWrapper = ({
  currency,
  showSpinner,
  setIsSubmitting,
  setSubmitSuccess,
  setTransactionData,
  userId,
  amount,
  formData,
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
          return createOrder(data, actions, userId, amount, formData)
            .then((orderId) => {
              console.log(orderId)
              return orderId;
            });
        }}
        onApprove={(data, actions) => {
          return onApprove(data, userId, amount, currency, formData, setTransactionData, setIsSubmitting, setSubmitSuccess);
        }}
        onCancel={() => {
          console.log("cancelled");
        }}
        onError={() => {
          console.log("An Error occured with your payment ");
        }}
      />
    </>
  );
};

export default Paypal;
