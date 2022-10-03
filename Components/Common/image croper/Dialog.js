import React, { PureComponent, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { withStyles } from "@material-ui/styles";
import { Box, Grid, Container, Modal } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Fade from '@material-ui/core/Fade';
// mrx : context
import { Contexts } from '../../../contexts';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
    dialogPaper: {
        minHeight: "80vh",
        maxHeight: "80vh"
    },
    paragraphPost: {
        color: '#353333e6',
        lineHeight: '2rem',
        fontSize: '1.3rem',
        width: "100%",
        overflow: "hidden",
        background: "#fafafa",
        border: "none",
    },
    selectBoxTextFeildCheck: {
        '& select': {
            border: 'none',
            outline: 'none',
            borderRadius: '.5rem',
            backgroundColor: '#d1d3d487',
            width: '49%',
            fontWeight: '700',
            padding: '.75rem',
            boxShadow: '0px 14px 16px 0px rgba(188, 190, 192, 0.004)',
        }
    },
};

class AlertDialogSlide extends PureComponent {

    state = {
        open: false,
        src: null,
        crop: {
            unit: "pixel",
            width: 10000000,
            aspect: 1000 / 1000
        }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
            this.props.setPicture(e.target.files[0]);
            this.props.setButtonType(false);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                "newFile.jpeg"
            );
            this.setState({ croppedImageUrl });
            this.props.setImage(croppedImageUrl);
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        this.props.setPicDt({
            x: parseInt(crop.x * scaleX),
            y: parseInt(crop.y * scaleY),
            w: parseInt(crop.width * scaleX),
            h: parseInt(crop.height * scaleY)
        })
        console.log("sdfsdf " + JSON.stringify({
            x: parseInt(crop.x * scaleX),
            y: parseInt(crop.y * scaleY),
            w: parseInt(crop.width * scaleX),
            h: parseInt(crop.height * scaleY)
        }))
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error("Canvas is empty");
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, "image/jpeg");
        });
    }

    render() {
        let fileInput = React.createRef();
        const { crop, croppedImageUrl, src } = this.state;
        return (
            <div>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{
                        background: "rgb(210 192 192 / 60%)",
                        padding: "20PX",
                        overflow: "scroll",
                        borderRadius: "20px",
                        width: this.props.type === "edit" ? "50%" : "100%",
                        marginBottom: this.props.type === "edit" ? "0px" : "1rem",
                        cursor: "pointer",
                        position: this.props.type === "edit" ? "relative" : "",
                        top: this.props.type === "edit" ? "-135px" : "0px",
                        margin: this.props.type === "edit" ? "auto" : "0px",
                    }}
                >
                    <label htmlFor="icon-button-file">
                        {this.props.ButtonType ? (
                            <Grid
                                onClick={this.handleClickOpen}
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                <AddAPhotoIcon />
                                انتخاب عکس
                            </Grid>
                        ) : (
                            " "
                        )}
                    </label>
                    <label onClick={this.handleClickOpen} htmlFor="icon-button-file">
                        {!this.props.ButtonType ? (
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                <AddAPhotoIcon />
                                تغییر عکس
                            </Grid>
                        ) : (
                            " "
                        )}
                    </label>
                </Grid>

                <Modal
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                    style={{
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "50px"
                    }}
                >
                    <Fade in={this.state.open} mountOnEnter unmountOnExit>
                        <Grid
                            style={{
                                maxWidth: "50rem",
                                backgroundColor: "#fafafa",
                                width: "100%",
                                overflow: "scroll",
                                borderRadius: "20px",
                                padding: "20px",
                                margin: "0px 10px"
                            }}
                            container justify="center">
                            {/* <h2>{src === null ? "انتخاب" : "تغییر"} عکس آگهی</h2> */}
                            <Grid>
                                <input
                                    ref={fileInput}
                                    style={{ display: "none" }}
                                    multiple
                                    accept="image/*"
                                    type="file"
                                    onChange={(e) => this.onSelectFile(e)}
                                />

                                {src && (
                                    <ReactCrop
                                        src={src}
                                        crop={crop}
                                        onImageLoaded={this.onImageLoaded}
                                        onComplete={this.onCropComplete}
                                        onChange={this.onCropChange}
                                    />
                                )}
                                {/* {croppedImageUrl && (
                                    <img
                                        alt="Crop"
                                        style={{ maxWidth: "100%", borderRadius: "10px" }}
                                        src={croppedImageUrl}
                                    />
                                )} */}
                            </Grid>
                            <Box display='flex' width='100%' justifyContent='space-evenly'>
                                <Button
                                    onClick={() => fileInput.current.click()}
                                    style={{
                                        background: "#eaeaea",
                                        width: "100%",
                                        fontSize: "15px !important",
                                        color: "#585591",
                                        borderRadius: "20px",
                                        border: "solid 1px blue",
                                        margin: 10
                                    }}
                                >
                                    {src === null ? "انتخاب عکس" : "تغییر عکس"}
                                </Button>
                                <Button
                                    style={{
                                        background: "#eaeaea",
                                        width: "100%",
                                        fontSize: "15px !important",
                                        color: "#585591",
                                        borderRadius: "20px",
                                        border: "solid 1px #b7b2b2",
                                        margin: 10
                                    }}
                                    onClick={this.handleClose}
                                >
                                    انصراف
                                </Button>

                                {src !== null ? (
                                    <Button
                                        style={{
                                            background: "#eaeaea",
                                            width: "100%",
                                            fontSize: "15px !important",
                                            color: "#585591",
                                            borderRadius: "20px",
                                            border: "solid 1px #b7b2b2",
                                            margin: 10
                                        }}
                                        onClick={() => this.setState({ src: null, open: false })}
                                    >
                                        ذخیره عکس
                                    </Button>
                                ) : null}
                            </Box>
                        </Grid>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default AlertDialogSlide;
