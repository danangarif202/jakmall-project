import { useEffect, useState, useRef } from "react";
import MainLayout from "../components/MainLayout";
import Title from "../components/Title";
import FormDelivery from "../components/FormDelivery";
import storageKey from "../key/storage.key";

export default function Delivery() {
    const [activeDs, setState] = useState(false);

    useEffect(() => {
        let summary = JSON.parse(localStorage.getItem(storageKey.storeKey));
        if (summary.formDelivery?.activeDs !== undefined) {
            setState(summary.formDelivery.activeDs);
        }
    }, []);

    const setDataLocal = (data, type) => {
        let summary = JSON.parse(localStorage.getItem(storageKey.storeKey));

        if (type === "activeDs") {
            summary.formDelivery.activeDs = data;
            if (!data) {
                summary.formDelivery.dsName = "";
                summary.formDelivery.dsPhoneNumber = "";
            }
        }

        const dataStr = JSON.stringify(summary);
        localStorage.setItem(storageKey.storeKey, dataStr);

    };

    return (
        <MainLayout>
            <div className="flex justify-between pl-3 pr-0 md:pr-10">
                <Title name="Delivery Details"></Title>
                <div
                    className="hidden pb-6 md:inline-flex items-center font-semibold color-gray"
                    onClick={() => {
                        let value = !activeDs;
                        setState(value);
                        setDataLocal(value, "activeDs");
                    }}
                >
                    <input
                        type="checkbox"
                        className="mr-2 accent-orange-600 w-4 h-4 bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 cursor-pointer"
                        checked={activeDs}
                        onChange={() => { }}
                    />
                    <span className="cursor-pointer">Send as dropshipper</span>
                </div>
            </div>
            <div>
                <FormDelivery activeDs={activeDs}></FormDelivery>
            </div>
        </MainLayout>
    );
}