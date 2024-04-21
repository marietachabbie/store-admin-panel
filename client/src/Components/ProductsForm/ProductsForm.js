import React, { useState } from "react";
import { useForm, useController } from "react-hook-form";
import Select from "react-select";
import "./ProductsForm.css";

export default function ProductsForm(props) {
    const [selectedImage, setSelectedImage] = useState(null);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();

    const refreshPage = () => {
        window.location.reload(false);
    }

    const uploadImage = async() => {
        const formData = new FormData();
        formData.append("product-image", selectedImage);

        const uploadRequestOptions = {
            method: "POST",
            body: formData
        };

        return new Promise((resolve, reject) => {
            fetch("/api/products/upload-image", uploadRequestOptions)
            .then(response => response.json())
            .then(res => {
                console.log("Image uploaded successfully!");
                resolve(res.path)
            })
        })
    }

    const onSubmit = async (data) => {
        data.image = await uploadImage();
        data.category_id = props.category_id;
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        fetch("/api/products", requestOptions)
        .then(response => response.json())
        .then(res => {
            console.log(res.message)
            refreshPage();
        });
    };

    const productList = [
        { value: 1, label: "Nike" },
        { value: 2, label: "Adidas" },
        { value: 3, label: "Chanel" },
    ];

    const { field: { value: productValue, onChange: productOnChange, ...restProductField } } = useController({ name: "store_id", control });

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Name</label>
                    <div>
                        <input
                            type="text"
                            name="name"
                            style={{width: "340px", height: "24px"}}
                            {...register("name", {
                                required: true,
                            })}
                        />
                    </div>
                    {errors.name && errors.name.type === "required" && (
                        <p className="errorMsg" style={{color: "#ec3440"}}>Name is required.</p>
                    )}
                </div>
                <div className="form-control">
                    <label>Price</label>
                    <div>
                        <input
                            type="text"
                            name="price"
                            style={{width: "340px", height: "24px"}}
                            {...register("price", {
                                required: true,
                            })}
                        />
                    </div>
                    {errors.name && errors.name.type === "required" && (
                        <p className="errorMsg" style={{color: "#ec3440"}}>Price is required.</p>
                    )}
                </div>
                <div className="form-control">
                    <label>Store</label>
                    <Select
                        className="select-input"
                        placeholder="Select Category"
                        isClearable
                        options={productList}
                        value={productValue ? productList.find(x => x.value === productValue) : productValue}
                        onChange={option => productOnChange(option ? option.value : option)}
                        {...restProductField}
                    />
                </div>
                <div className="form-control">
                    <label>Upload Image</label>
                    {selectedImage && (
                        <div>
                        <img
                            alt="not found"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                        <button onClick={() => setSelectedImage(null)}>Remove</button>
                        </div>
                    )}
                    <input
                        required
                        type="file"
                        name="productImage"
                        onChange={(event) => setSelectedImage(event.target.files[0])}
                    />
                </div>
                <div className="form-control">
                    <label></label>
                    <button type="submit" >Save</button>
                </div>
            </form>
        </>
    )
}
