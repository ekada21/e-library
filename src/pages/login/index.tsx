import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useFormik } from 'formik';
import * as yup from 'yup'
import React from "react";
// import { useNavigate } from "react-router-dom";
import InputComponent from "../../components/shared_components/custom_input";
import { LoginDataType, useLoginCallback } from "../../connections/useauth";
import { useMutation } from "react-query";


export default function LoginPage() {

    const toast = useToast()
    // const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false)
    const { handleLogin } = useLoginCallback();
    const loginSchema = yup.object({
        email: yup.string().email('This email is not valid').required('Your email is required'),
        password: yup.string().required('Your password is required').min(6, 'A minimium of 6 characters')
    })

    // formik
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: () => { },
    });


    //API call to handle user login
    const loginMutation = useMutation(async (formData: LoginDataType) => {
        const response = await handleLogin(formData);
        // localStorage.setItem("token", response.data.access_token);
        // localStorage.setItem("refresh_token", response.data.refresh_token);

        console.log(response);


        return response;
    });

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formik.dirty || !formik.isValid) {
            toast({
                title: "You have to fill in the form to continue",
                status: "error",
                duration: 3000,
                position: "top",
            });
            return;
        }

        const loginData = {
            email: formik.values.email.toLocaleLowerCase().trim(),
            password: formik.values.password,
        };

        loginMutation.mutateAsync(loginData, {
            onSuccess: (data: any) => {
                console.log(data?.data?.statusCode);
                 if(data?.data?.statusCode){
                    toast({
                        title: "Something went wrong",
                        status: "error",
                        duration: 3000,
                        position: "top",
                    });
                 } else {
                    toast({
                        title: "Login Successful",
                        status: "success",
                        duration: 3000,
                        position: "top",
                    });
                 }
                
            },
        })
            .catch(() => {
                toast({
                    title: "Something went wrong",
                    status: "error",
                    duration: 3000,
                    position: "top",
                });
            });
    }

    return (
        <Flex w={"full"} h={"100vh"} p={"6"} justifyContent={"center"} alignItems={"center"} >
            <form onSubmit={(e) => submit(e)} style={{ maxWidth: "350px", width: "100%", display: "flex", flexDirection: "column", gap: "16px" }} >
                <Box>
                    <Text fontSize={"14px"} fontWeight={"600"} mb={"1"} >Email Address</Text>
                    <InputComponent
                        name="email"
                        onChange={formik.handleChange}
                        onFocus={() =>
                            formik.setFieldTouched("email", true, true)
                        }
                        touch={formik.touched.email}
                        error={formik.errors.email}
                        type="email" placeholder="Email Address" />
                </Box>
                <Box> 
                    <Text fontSize={"14px"} fontWeight={"600"} mb={"1"} >Email Address</Text>
                    <InputComponent
                        name="password"
                        onChange={formik.handleChange}
                        onFocus={() =>
                            formik.setFieldTouched("password", true, true)
                        }
                        right={true}
                        touch={formik.touched.password}
                        error={formik.errors.password}
                        type="password" placeholder="Password" />
                </Box>

                <Button type="submit" h={"45px"} isLoading={loginMutation.isLoading} isDisabled={(!formik.values.email && !formik.values.password) || loginMutation.isLoading ? true : false} marginTop={"3"} rounded={"5px"} width={"full"} mt={"4"} bgColor={"#1F7CFF"} _hover={{ backgroundColor: "#1F7CFF" }} display={"flex"} alignItems={"center"} justifyContent={"center"} color={"white"} >
                    Login
                </Button>
            </form>
        </Flex>
    )
} 
