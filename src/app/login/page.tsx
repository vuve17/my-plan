"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Backdrop,
  Box,
  TextField,
  Button,
  IconButton,
  Paper,
  Grid,
  OutlinedInput,
  InputLabel,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import colors from "../ui/colors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ErrorBox from "../components/authentication-error-messages-box";

export const dynamic = "force-dynamic";

let registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please eneter valid email")
    .required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

let initialValues = {
  email: "",
  password: "",
};

const LogInForm: React.FC = () => {
  const [disableButton, setDisableButtons] = useState<boolean>(false);
  const [passwordState, setPasswordState] = useState("show");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const HandlePasswordState = () => {
    if (passwordState == "show") {
      setPasswordState("hide");
    } else {
      setPasswordState("show");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setDisableButtons(true);

      try {
        const response = await fetch("/api/log-in", {
          method: "POST",
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          console.log("Response error:", response.status, response.statusText);
          const data = await response.json();
          console.log("Error message:", data.message);
          setPasswordError(data.message);
          console.log("Response not OK");
        }

        const { refreshToken, accessToken, message } = await response.json();
        // console.log(refreshToken, accessToken, message);

        if (refreshToken && accessToken) {
          document.cookie = `refreshToken=${refreshToken}; path=/`;
          document.cookie = `accessToken=${accessToken}; path=/`;
          router.push("/scheduler");
        }
      } catch (error) {
        console.log("Else set pass error: Bad keys - frontend message");
        setPasswordError("Wrong username or password");
      } finally {
        setDisableButtons(false);
      }
    },
  });

  return (
    <Paper
      square={false}
      sx={{
        display: "flex",
        outline: {
          lg: `2px solid ${colors.primaryBlue}`,
          md: `2px solid ${colors.primaryBlue}`,
          sm: "none",
        },
        padding: {
          lg: "2em 5em 2em",
          md: "2em 5em 2em",
          sm: "3em",
          xs: "3em",
        },
        flexDirection: "column",
        boxShadow: "none",
        alignItems: "center",
        justifyContent: "center",
        width: {
          sm: "100vw",
          lg: "15em",
          md: "15em",
        },
        // navbar height
        marginTop: "80px",
      }}
    >
      <form onSubmit={formik.handleSubmit} style={{ marginBottom: "1em" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              marginTop: "1em",
              display: "flex",
              color: `${colors.primaryBlue}`,
            }}
          >
            Log in
            <Image
              src="\svg\login-person.svg"
              alt="person SVG"
              width={40}
              height={40}
              style={{
                marginLeft: "10px",
              }}
            />
          </h1>
          <TextField
            label="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              marginTop: "1em",
              minWidth: "267px",
            }}
          />

          <TextField
            label="password"
            name="password"
            type={passwordState === "show" ? "password" : "text"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onClick={() => setPasswordError("")}
            autoComplete="off"
            style={{
              margin: " 1em 0 1em 0 ",
              minWidth: "267px",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={HandlePasswordState}>
                    <Image
                      src={`/svg/eye-password-${passwordState}.svg`}
                      alt={`${passwordState} password`}
                      width={20}
                      height={20}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {formik.errors.email && formik.touched.email ? (
            <ErrorBox text={formik.errors.email} />
          ) : formik.errors.password && formik.touched.password ? (
            <ErrorBox text={formik.errors.password} />
          ) : (
            <ErrorBox text={passwordError} />
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "2em",
            marginTop: "1em",
          }}
        >
          <Checkbox />
          <div className="openSansRegular">Remeber me</div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: `${colors.primaryBlue}`,
            }}
            disabled={disableButton}
          >
            <div className="openSansSemiBold">Log in</div>
          </Button>
        </div>
      </form>

      <div style={{ marginTop: "1em", display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center" }}>
        <div>Don't have an account? </div>
        <Link
          href="/register"
          style={{
            marginLeft: "0.1em",
          }}
        >
          Register
        </Link>
      </div>
    </Paper>
  );
};

export default LogInForm;
