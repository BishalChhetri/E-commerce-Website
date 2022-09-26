import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import styles from "../styles/Layout.module.css";
import dynamic from "next/dynamic";

function CheckoutWizard({ activeStep = 0 }) {
  return (
    <Stepper
      className={styles.transparentBackground}
      activeStep={activeStep}
      alternativeLabel
    >
      {["Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
}

export default dynamic(() => Promise.resolve(CheckoutWizard), { ssr: false });
