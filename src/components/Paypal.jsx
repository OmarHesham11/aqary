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
  return axios.post("http://localhost:4000/auth/property/", formData)
    .then((response) => {
      const orderData = response.data;
      //   console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
      const transaction = orderData.purchase_units[0].payments.captures[0];
      setTransactionData(orderData);
      setIsSubmitting(true);
      setSubmitSuccess(true);
      onSuccess && onSuccess();
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
  formData,
  onSuccess,
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
              return orderId;
            });
        }}
        onApprove={(data, actions) => {
          return onApprove(data, userId, amount, currency, formData, setTransactionData, setIsSubmitting, setSubmitSuccess);
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
  formData,
  isSubmitting,
  setIsSubmitting,
  submitSuccess,
  setSubmitSuccess,
  setTransactionData,
  onSuccess
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
export default Paypal;
