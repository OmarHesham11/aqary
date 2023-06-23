import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const currency = "USD";
const style = { layout: "vertical" };

const ButtonWrapper = ({
    currency,
    showSpinner,
    setIsSubmitting,
    setSubmitSuccess,
    setTransactionData,
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
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "USD",
                                        value: 25.2,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        setTransactionData(details);
                        setIsSubmitting(true);
                        setSubmitSuccess(true);
                    });
                }}
                onCancel={() => {
                    console.log("cancelled");
                }}
                onError={function (data, actions) {
                    return actions.order.capture().then(function () {
                        console.log("An Error occured with your payment ");
                    });
                }}
            />
        </>
    );
};

function Paypal({
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
                />
            </PayPalScriptProvider>
        </div>
    );
}
export default Paypal;
