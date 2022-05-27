import { Box, LinearProgress } from "@mui/material";
import Image from "next/image";
import React from "react";
import salesmigoLogo from "../../public/salesmigo_logo.png";
import Modal from "@mui/material/Modal";

const ProgressBar = ({ open }) => {
  return (
    <div style={{ position: "absolute" }}>
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            setOpen(false);
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disablePortal
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            margin: "0 auto",
            width: "100vw",
            height: "100vh",
            border: "0px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              margin: "-25px 0 0 -25px",
              width: "100px",
              height: "50px",
            }}
          >
            <Image src={salesmigoLogo} layout="responsive" />
            <Box
              sx={{
                width: "150px",
                marginTop: "15px",
                position: "relative",
                right: "25%",
              }}
            >
              <LinearProgress
                sx={{
                  backgroundColor: `rgb(22,115,255)`,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: `white`,
                  },
                }}
              />
            </Box>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProgressBar;
