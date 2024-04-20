import { useForm } from "react-hook-form";
import "./StoreForm.css";

export default function StoreForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const refreshPage = () => {
        window.location.reload(false);
    }

    const onSubmit = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch("/api/stores", requestOptions)
        .then(response => response.json())
        .then(res => {
            console.log(res.message)
            refreshPage();
        });
    };

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Store Name</label>
                    <input
                        type="text"
                        name="name"
                        {...register("name", {
                            required: true,
                        })}
                    />
                    {errors.name && errors.name.type === "required" && (
                        <p className="errorMsg" style={{color: "#ec3440"}}>Name is required.</p>
                    )}
                </div>
                <div className="form-control">
                    <label>Category</label>
                    <input type="text" name="category" style={{width: "140px"}} {...register("category")} />
                </div>
                <div className="form-control">
                    <label></label>
                    <button type="submit" >Save</button>
                </div>
            </form>
        </>
    )
}
