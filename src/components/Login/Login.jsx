import axios from "axios";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarReg } from "../Navbar/Navbar";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";



export function Login() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, },
    } = useForm()
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()





    const onSubmit = async (FormData) => {
        setLoading(true)
        try {
            let { data } = await axios.post(" http://accountbased.somee.com/api/Account/Login", {

                email: FormData?.email,
                password: FormData?.password,
            })

            if (data?.token) {
                navigate("/")
                localStorage.setItem("token", data.token)

            }
            setLoading(false)
        } catch (error) {

            toast.error(error.response.data.message)
            setLoading(false)

        }



    }






    return <>
        <Helmet>
            <title>
                Register
            </title>
        </Helmet>
        <section className="Register ">

            <div className="container ">
                <div className="row m-0 p-0">
                    <div className="col-md-6 p-0">
                        <div className="item gaming-img">
                        </div>
                    </div>
                    <div className="col-md-6 p-0">
                        <div className="item">
                            <h2 className="text-center py-3">Log in </h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="py-2 w-75 m-auto">





                                <input type="email" className="form-control my-4" placeholder="email"  {...register("email", {
                                    required: "This filed is required ",
                                    pattern: {
                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        message: "Enter vailed mail"
                                    },
                                    emailAvailable: async (value) => {
                                        const response = await fetch(` http://accountbased.somee.com/api/users?email=${value}`)
                                        const data = await response.json()
                                        return data.length == 0 || "This email is already reserved "

                                    },


                                })} />
                                {errors?.email && <p className="error my-4">{errors.email.message}</p>}


                                <input type="password" className="form-control my-4" placeholder="password" {...register("password", {
                                    required: "This filed is required ",
                                    pattern: {
                                        value: /^.{8,}$/,
                                        message: "Min length is 8"
                                    }


                                })} name="password" />

                                {errors?.password && <p className="error my-4">{errors.password.message}</p>}



                                <button className="btn btn-primary my-3 text-white w-100">{loading ? <i className="fa-solid fa-spin   fa-spinner"></i> : " Log in"}</button>




                            </form>
                            <hr />

                            <p className="text-center fw-bold my-5">Not a Member yet ?  <Link className="link" to={"/Register"} >Register</Link></p>
                        </div>
                    </div>

                </div>

            </div>

        </section>


    </>

}


