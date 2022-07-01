import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Title from "../components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import storageKey from "../key/storage.key";

export default function Finish() {

    const history = useNavigate();
    const [summary, setState] = useState({});

    useEffect(() => {
        let summary = JSON.parse(localStorage.getItem(storageKey.storeKey));
        if (summary.activeShipment?.name !== undefined) {
            setState(summary);
        }
    }, []);

    return (
        <MainLayout>
            <div className="flex min-h-full items-center justify-center">
                <div className="text-center md:text-left">
                    <Title name="Thank you"></Title>
                    <div className="">Order ID : {summary?.formDelivery?.code}</div>
                    <div className="mb-16 color-gray">Your order will be delivered {summary?.activeShipment?.estimate} with {summary?.activeShipment?.name}</div>
                    <div
                        className="font-semibold cursor-pointer w-full md:w-fit color-gray mb-5 md:mb-0"
                        onClick={() => {
                            let payload = {
                                formDelivery: {},
                                activeShipment: {},
                                activePayment: {},
                            }

                            const dataStr = JSON.stringify(payload);
                            localStorage.setItem(storageKey.storeKey, dataStr);
                            history("/");
                        }}
                    >
                        <FontAwesomeIcon className="mr-2" icon={faArrowLeft}></FontAwesomeIcon>
                        Go to homepage
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}