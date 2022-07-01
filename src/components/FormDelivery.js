import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import storageKey from "../key/storage.key";

const FormDelivery = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [count, setCount] = useState(0);
    const [activeDs, setState] = useState(false);
    const [dataForm, setDataForm] = useState({
        email: "",
        phoneNumber: "",
        deliveryAddress: "",
        dsName: "",
        dsPhoneNumber: "",
    });

    useEffect(() => {
        let obj = localStorage.getItem(storageKey.storeKey);
        let summary = JSON.parse(obj)

        if (summary.formDelivery.email !== undefined ||
            summary.formDelivery.phoneNumber !== undefined ||
            summary.formDelivery.deliveryAddress !== undefined ||
            summary.formDelivery.dsName !== undefined ||
            summary.formDelivery.dsPhoneNumber !== undefined
        ) {
            setDataForm(summary.formDelivery);
        }

        if (summary.formDelivery?.activeDs !== undefined) {
            setState(summary.formDelivery.activeDs);
        }
    }, []);

    const onSubmit = data => console.log(data);

    const setDataLocal = (e) => {
        const { name, value } = e.target;
        let summary = JSON.parse(localStorage.getItem(storageKey.storeKey));

        setDataForm(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'deliveryAddress') setCount(value.length);

        summary.formDelivery[name] = value;
        const dataStr = JSON.stringify(summary);
        localStorage.setItem(storageKey.storeKey, dataStr);
    };

    const setDataLocalDs = (data, type) => {
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
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
                    <div className="w-full md:w-1/2 p-2">
                        <input
                            {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                            placeholder="email"
                            value={dataForm.email}
                            className="w-full border p-3 focus:border-orange-400 focus:outline-none"
                            onChange={setDataLocal}
                        />
                        {errors.email && <span>This field is required</span>}

                        <input
                            {...register("phoneNumber", { required: true, minLength: 6, maxLength: 20, pattern: /^[0-9]+$/ })}
                            placeholder="Phone Number"
                            value={dataForm.phoneNumber}
                            className="w-full border p-3 mt-2 focus:border-orange-400 focus:outline-none"
                            onChange={setDataLocal}
                        />
                        {errors.phoneNumber != undefined ?
                            errors.phoneNumber.type === 'maxLength' ?
                                <span>Maksimal 20 digit</span>
                                :
                                errors.phoneNumber.type === 'minLength' ?
                                    <span>Minimal 6 digit</span>
                                    :
                                    <span>This field is required</span>
                            : null}

                        <textarea
                            {...register("deliveryAddress", { required: true, maxLength: 120 })}
                            placeholder="Delivery Address"
                            rows="3"
                            value={dataForm.deliveryAddress}
                            onChange={setDataLocal}
                            className="w-full border p-3 mt-2 focus:border-orange-400 focus:outline-none"
                        />
                        <div className='flex justify-between'>
                            <div className=''>
                                {errors.deliveryAddress != undefined ?
                                    errors.deliveryAddress.type === 'maxLength' ?
                                        <span>Maksimal 120 character</span>
                                        :
                                        <span>This field is required</span>
                                    : null}</div>
                            <div className='text-sm'>{count > 0 && `${count}/120`}</div>
                        </div>

                    </div>

                    <div
                        className="md:hidden ml-2 inline-flex items-center font-semibold color-gray"
                        onClick={() => {
                            let value = !activeDs;
                            setState(value);
                            setDataLocalDs(value, "activeDs");
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

                    <div className="w-full md:w-1/2 py-2 px-2 md:px-4">
                        <input
                            {...register("dsName", { required: activeDs })} disabled={!activeDs}
                            placeholder="Dropshipper name"
                            value={dataForm.dsName}
                            onChange={setDataLocal}
                            className="w-full border p-3 focus:border-orange-400 focus:outline-none"
                        />
                        {errors.dsName && <span>This field is required</span>}

                        <input
                            {...register("dsPhoneNumber", { required: activeDs })} disabled={!activeDs}
                            placeholder="Dropshipper phone number"
                            value={dataForm.dsPhoneNumber}
                            onChange={setDataLocal}
                            className="w-full border p-3 mt-2 focus:border-orange-400 focus:outline-none"
                        />
                        {errors.dsPhoneNumber != undefined ?
                            errors.dsPhoneNumber.type === 'maxLength' ?
                                <span>Maksimal 20 digit</span>
                                :
                                errors.dsPhoneNumber.type === 'minLength' ?
                                    <span>Minimal 6 digit</span>
                                    :
                                    <span>This field is required</span>
                            : null}
                    </div>
                </form>
            </div>
            {/* <button
                style={{ background: "#FF8A00" }}
                className="w-full p-5 text-white text-center font-bold text-lg cursor-pointer mt-4"
                onClick={handleSubmit((d) => { console.log(d) })}
            /> */}
        </>
    )
}

export default FormDelivery