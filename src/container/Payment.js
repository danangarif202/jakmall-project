import { Component } from "react";
import MainLayout from "../components/MainLayout";
import CurrencyFormat from "react-currency-format";
import Title from "../components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import storageKey from "../key/storage.key";

class Payment extends Component {
    state = {
        listShipment: [
            {
                name: "GO-SEND",
                price: "15000",
                estimate: "today"
            },
            {
                name: "JNE",
                price: "9000",
                estimate: "2 days"
            },
            {
                name: "Personal Courier",
                price: "29000",
                estimate: "1 day"
            },
        ],
        listPayment: [
            {
                name: "e-Wallet",
                price: "1,500,000 left"
            },
            {
                name: "Bank Transfer",
                price: ""
            },
            {
                name: "Virtual Account",
                price: ""
            },
        ],
        activeShipment: {
            name: "",
            price: "",
            estimate: ""
        },
        activePayment: {
            name: "",
            price: ""
        },
    }

    componentDidMount() {
        let summary = JSON.parse(localStorage.getItem(storageKey.storeKey));

        if (summary.activeShipment?.name !== undefined) {
            this.setState({ activeShipment: summary.activeShipment })
        }
        if (summary.activePayment?.name !== undefined) {
            this.setState({ activePayment: summary.activePayment })
        }
    }

    selectShipment = (value) => {
        this.setState({ activeShipment: value });
        this.setLocalStorage("shipment", value);
    }

    selectPayment = (value) => {
        this.setState({ activePayment: value });
        this.setLocalStorage("payment", value);
    }

    setLocalStorage = (type, val) => {
        let summary = JSON.parse(localStorage.getItem(storageKey.storeKey));

        if (type === "shipment") {
            summary.activeShipment = val
        } else if (type === "payment") {
            summary.activePayment = val
        }

        const dataStr = JSON.stringify(summary);
        localStorage.setItem(storageKey.storeKey, dataStr);
    }

    render() {
        const { listShipment, listPayment, activeShipment, activePayment } = this.state;
        return (
            <MainLayout>
                <Title name="Shipment"></Title>
                <div className="flex flex-wrap mb-16">
                    {listShipment.map((e, index) => (
                        <div
                            key={index}
                            className={`${activeShipment.name === e.name ? 'active-list' : 'default-list'} w-full md:w-52 mb-3 border mr-0 md:mr-3 p-3 cursor-pointer`}
                            onClick={() => {
                                this.selectShipment(e)
                            }}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-semibold text-sm">{e.name}</div>
                                    <div className="font-bold"><CurrencyFormat value={e.price} displayType={'text'} thousandSeparator={true} /></div>
                                </div>
                                {activeShipment.name === e.name && <div><FontAwesomeIcon icon={faCheck} className="my-auto color-icon-payment"></FontAwesomeIcon></div>}
                            </div>
                        </div>
                    ))}
                </div>
                <Title name="Payment"></Title>
                <div className="flex flex-wrap mb-10">
                    {listPayment.map((e, index) => {
                        return (
                            <div
                                key={index}
                                className={`${activePayment.name === e.name ? 'active-list' : 'default-list'} w-full md:w-52 mb-3 border mr-0 md:mr-3 p-3 cursor-pointer`}
                                onClick={() => {
                                    this.selectPayment(e)
                                }}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className={e.price === "" ? "font-bold" : "font-semibold text-sm"}>{e.name}</div>
                                        {e.price !== "" && <div className="font-bold">{e.price}</div>}
                                    </div>
                                    {activePayment.name === e.name && <div><FontAwesomeIcon icon={faCheck} className="my-auto color-icon-payment"></FontAwesomeIcon></div>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </MainLayout>
        );
    }
}

export default Payment;