import { useForm, useController } from "react-hook-form";
import Select from "react-select";
import "./StoreForm.css";

export default function StoreForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();

    const refreshPage = () => {
        window.location.reload(false);
    }

    const onSubmit = (data) => {
        console.log("🚀 ~ data:", data);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        fetch("/api/stores", requestOptions)
        .then(response => response.json())
        .then(res => {
            console.log(res.message)
            refreshPage();
        });
    };

    const categoryList = [
        { value: 1, label: "womens trainers" },
        { value: 2, label: "mens trainers" },
        { value: 3, label: "womens dresses" },
        { value: 4, label: "mens jackets" }
    ];
    const { field: { value: catValue, onChange: catOnChange, ...restLangField } } = useController({ name: "category_id", control });

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Store Name</label>
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
                    <label>Language</label>
                    <Select
                        className="select-input"
                        placeholder="Select Language"
                        isClearable
                        options={categoryList}
                        value={catValue ? categoryList.find(x => x.value === catValue) : catValue}
                        onChange={option => catOnChange(option ? option.value : option)}
                        {...restLangField}
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
