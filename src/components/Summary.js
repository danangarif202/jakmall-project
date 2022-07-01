import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import storageKey from "../key/storage.key";

const Summary = () => {
    const history = useNavigate();
    const [summary, setState] = useState({});

    useEffect(() => {
        let summary = JSON.parse(localStorage.getItem(storageKey.storeKey));
        setState(summary);
    }, []);

    const submitButton = (type) => {
        let summary = JSON.parse(localStorage.getItem(storageKey.storeKey));
        if (type === "payment") {
            if ((summary.activeShipment.name != undefined && summary.activePayment.name != undefined)) {
                let code = GenerateCode();
                summary.formDelivery.code = code;
                const dataStr = JSON.stringify(summary);
                localStorage.setItem(storageKey.storeKey, dataStr);
                history("/finish");
            }
        } else {
            history("/payment");
        }
    }

    const GenerateCode = () => {
        var mask = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        var result = '';
        for (var i = 5; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
        return result;
    }

    let cog = 500000;
    let priceDs = 0;
    let total = 0;
    let shipment = 0;

    if (summary?.formDelivery?.activeDs) priceDs = 5900;
    if (summary?.activeShipment?.price) shipment = parseInt(summary?.activeShipment?.price)

    total = cog + priceDs + shipment;
    let pathname = window.location.pathname.replace("/", "");
    let titleSubmitButton = "Continue to Payment"
    if (pathname === "payment") {
        titleSubmitButton = "Pay with " + (summary?.activePayment?.name != undefined ? summary?.activePayment?.name : "")
    } else if (pathname === "finish") {
        titleSubmitButton = null
    }

    let statusPayment = summary?.activeShipment?.name != undefined && summary?.activePayment?.name != undefined;
    let statusShipment = true;

    return (
        <>
            <div className="color-primary text-2xl font-bold mb-2">Summary</div>
            <div className="mb-3 md:mb-10 color-gray">10 items purchased</div>
            {
                summary?.activeShipment?.estimate &&
                <>
                    <div>Delivery estimation</div>
                    <div className="color-green font-bold mb-3 md:mb-10">{`${summary?.activeShipment?.estimate} by ${summary?.activeShipment?.name}`}</div>
                </>
            }
            {
                summary?.activePayment?.name &&
                <>
                    <div>Payment method</div>
                    <div className="color-green font-bold mb-3 md:mb-20">{summary?.activePayment.name}</div>
                </>
            }


            <div className="flex justify-between">
                <div className="color-gray">Cost of goods</div>
                <div className="font-bold"><CurrencyFormat value={cog} displayType={'text'} thousandSeparator={true} /></div>
            </div>
            {summary?.formDelivery?.activeDs &&
                <div className="flex justify-between my-2">
                    <div className="color-gray">Dropshipping Fee</div>
                    <div className="font-bold"><CurrencyFormat value={priceDs} displayType={'text'} thousandSeparator={true} /></div>
                </div>
            }
            {summary?.activeShipment?.name &&
                <div className="flex justify-between">
                    <div className="color-gray"><span className="font-bold">{summary.activeShipment.name}</span> shipment</div>
                    <div className="font-bold"><CurrencyFormat value={summary.activeShipment.price} displayType={'text'} thousandSeparator={true} /></div>
                </div>
            }
            <div className="color-primary flex justify-between text-2xl font-bold my-4">
                <div>Total</div>
                <div>
                    <CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} />
                </div>
            </div>

            {(titleSubmitButton != null && pathname != 'finish') ?

                pathname == 'payment' ?
                    <div
                        onClick={() => {
                            submitButton(pathname);
                        }}
                        className={`${statusPayment ? 'btn-submit' : 'btn-submit-disable'} p-5 text-lg rounded-sm`}
                    >
                        {titleSubmitButton}
                    </div>
                    :
                    <div
                        onClick={() => {
                            submitButton(pathname);
                        }}
                        className={`${statusShipment ? 'btn-submit' : 'btn-submit-disable'} p-5 text-lg rounded-sm`}
                    >
                        {titleSubmitButton}
                    </div>
                : null
            }
        </>
    );
}

export default Summary;